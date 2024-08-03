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

        return {message:"Admin Created successfully"};
    }

    static async getallAdmin(adminId:number){
        const query = await this.queryBuilder().select("*").from("users").where("role","admin").whereNot("userId",adminId);
        console.log("get all");
        return query;
    }

    static async getAdminById(userId:number){
        const query = await this.queryBuilder().select("*").from("users").where("user_id",userId);
        return {message:"Employer deleted successfully"};
    }

    static async deleteAdminById(userId:number){
        const query = await this.queryBuilder().delete("*").from("users").where("user_id",userId);
        return {message:"Employer deleted successfully"};
    }

    static async updateAdminByID(userId:number,updateData:Partial<User>){

        const query = await this.queryBuilder().update(updateData).from("users").where("user_id",userId);  
        return {message:"Admin updated successfully"};
    }
}