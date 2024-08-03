import { User } from "../interface/users";
import { BaseModel } from "./base"

export class AdminModel extends BaseModel{
    static async createAdmin(admin:User){
        const userToCreate = {
            email: admin.email,
            password: admin.password,
            role: 'admin', 
            name: admin.name
        };
        await this.queryBuilder()
        .insert(userToCreate)
        .table("users");

        return {message:"Employer Created successfully"};
    }

    static async getallAdmin(){
        const query = await this.queryBuilder().select("*").from("users").where("role","admin");
        return query;
    }

    static async deleteAdminById(userId:number){
        const query = await this.queryBuilder().delete("*").from("users").where("user_id",userId);
    }
}