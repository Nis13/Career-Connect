import { Employer, GetUserQuery, User } from "../interface/users";
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

    static async deleteUser(id: number) {
        await this.queryBuilder().from("employer").where('user_id', id).delete();
        await this.queryBuilder().from("users").where('user_id', id).delete();
        return { message: 'User deleted successfully' };
    }
};