import { Employer, GetUserQuery, User } from "../interface/users";
import { BaseModel } from "./base";

interface UserUpdate {
    name?: string;
    email?: string;
    // Add other user fields if necessary
}

interface EmployerUpdate {
    description?: string;
    location?: string;
    contact_no?: number;
}

export class EmployerModel extends BaseModel {

    static async signup(employer:Employer){
        const userToCreate = {
            email: employer.email,
            password: employer.password,
            role: 'employer', 
            name: employer.name
        };

        await this.queryBuilder()
        .insert(userToCreate)
        .table("users");

        const userId =  await this.queryBuilder()
        .select('user_id')
        .table("users")
        .where("email", employer.email)
        .first();

        const employerToCreate = {
            user_id: userId.userId, 
            description: employer.companyDescription,
            logo: employer.companyLogo,
            location: employer.companyLocation,
            contact_no: employer.companyContact
        };

        await this.queryBuilder()
            .insert(employerToCreate)
            .table("employer");
    
    // const createdUser = await this.queryBuilder()
    //     .select('user_id', 'email', 'name')
    //     .table("users")
    //     .where("email", employer.email)
    //     .first();

    return {message:"user Created successfully"};

    }

static async updateEmployer(userId: number, updatedData: Partial<Employer>) {
    try {
        console.log(userId);
        console.log(updatedData);
        const userUpdates:UserUpdate = {};
        if (updatedData.name) userUpdates.name = updatedData.name;
        if (updatedData.email) userUpdates.email = updatedData.email;
       
        const employerUpdates: EmployerUpdate = {};
        if (updatedData.companyDescription) employerUpdates.description = updatedData.companyDescription;
        if (updatedData.companyLocation) employerUpdates.location = updatedData.companyLocation;
        if (updatedData.companyContact) employerUpdates.contact_no = updatedData.companyContact;

        await this.queryBuilder().transaction(async trx => {
            if (Object.keys(userUpdates).length > 0) {
                await trx('users')
                    .where('user_id', userId)
                    .update(userUpdates);
            }

            if (Object.keys(employerUpdates).length > 0) {
                await trx('employer')
                    .where('user_id', userId)
                    .update(employerUpdates);
            }
        });

        return { message: "Profile updated successfully" };

    } catch (error) {
        console.error('Error updating employer profile:', error);
        return { message: "Failed to update profile" };
    }
}



    static async getEmployerImage(id:number){
        const query = await this.queryBuilder().select('logo').table('employer').where('user_id',id);
        console.log(query);
        return query;
    }


    static async getUsers(filter:GetUserQuery){
        const query = this.queryBuilder().select('*').table('users');
        return query;
    }
    static async count(filter:GetUserQuery){
        const { q } = filter;

        const query = this.queryBuilder()
        .count("*")
        .table("users")
        .first();
        
        if (q){
            query.whereLike("name",`%${q}%`);
        }

        return query;
    }

    static async getUserByEmail(email: string) {
        const query = await this.queryBuilder().select('*').from("users").where("email", email).first();
        const result = JSON.stringify(query);
        console.log(`getQuery by email: ${result}`);
        // const userPermissions =  this.queryBuilder().select('permission').from("permissions").innerjoin("permissions" , { "userPermissions.permission": "permission.id" })
        return query;
    }

    static async getUserById(id:number){
        const query = this.queryBuilder().select('*').from("users").where("user_id",id).first();
        const respone = await query;
        return respone;
    }
    
    static async getEmployerById(id:number){
        const query = this.queryBuilder().select('*').from("users").innerJoin("employer",{"employer.user_id":"users.user_id"}).where("user_id",id).first();
        const respone = await query;
        return respone;
    }

    static async deleteUser(id: number) {
        await this.queryBuilder().from("employer").where('user_id', id).delete();
        await this.queryBuilder().from("users").where('user_id', id).delete();
        return { message: 'User deleted successfully' };
    }

    static async getEmployerDetails(id:number) {
        return await this.queryBuilder().select('*').from("employer").innerJoin('users', 'employer.user_id', 'users.user_id').where('users.user_id', id).first();
    }
};