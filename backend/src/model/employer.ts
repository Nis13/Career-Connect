import { Employer, EmployerUpdate, GetUserQuery, User, UserUpdate } from "../interface/users";
import { BaseModel } from "./base";



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
            company_description: employer.companyDescription,
            logo: employer.companyLogo,
            location: employer.companyLocation,
            employer_contact_no: employer.companyContactNo
        };

        return await this.queryBuilder()
            .insert(employerToCreate)
            .table("employer");

    
 
    }

static async updateEmployer(userId: number, updatedData: Partial<Employer>) {
    try {
        const userUpdates:UserUpdate = {};
        if (updatedData.name) userUpdates.name = updatedData.name;
        if (updatedData.email) userUpdates.email = updatedData.email;
       
        const employerUpdates: EmployerUpdate = {};
        if (updatedData.companyDescription) employerUpdates.company_description = updatedData.companyDescription;
        if (updatedData.companyLocation) employerUpdates.location = updatedData.companyLocation;
        if (updatedData.companyContactNo) employerUpdates.employer_contact_no = updatedData.companyContactNo;

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
        console.log('Error updating employer profile:', error);
        return { message: "Failed to update profile" };
    }
}



    static async getEmployerImage(id:number){
        const query = await this.queryBuilder().select('logo').table('employer').where('user_id',id);
        return query;
    }


    static async getallEmployers(filter:GetUserQuery){
        const query = this.queryBuilder().select('*').table('employer').innerJoin('users','users.user_id','employer.user_id');
        // if (filter.page && filter.size) {
        //     const offset = (filter.page - 1) * filter.size;
        //     query.limit(filter.size).offset(offset);
        // }
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

    // static async deleteUser(id: number) {
    //     await this.queryBuilder().from("users").where('user_id', id).delete();
    //     return { message: 'User deleted successfully' };
    // }

    static async getEmployerDetails(id:number) {
        return await this.queryBuilder().select('*').from("employer").innerJoin('users', 'employer.user_id', 'users.user_id').where('users.user_id', id).first();
    }
};