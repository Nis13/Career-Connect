import { GetUserQuery, User } from "../interface/users";
import { BaseModel } from "./base";



export class UserModel extends BaseModel {

    static async signup(user:User){
        const userToCreate = {
            name: user.name,
            email: user.email,
            password: user.password,
        };
        const query = await this.queryBuilder().insert(userToCreate).table("users");



        if (query){
            const userid = await this.queryBuilder()
            .select('id')
            .table("users")
            .where("email",user.email)
            .first()
        }

        const createdUser = await this.queryBuilder()
        .select('id','name','email')
        .table("users")
        .where("email",user.email)

        return createdUser;

    }

    static async update(id:number, user:User){
        const userToUpdate = {
            name: user.name,
            email: user.email,
            password: user.password,
            updatedAt: new Date(),
        };

        const query = this.queryBuilder().update(userToUpdate).table("users").where({id});

        console.log(query.toString());
        await query;
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
        const query = this.queryBuilder().select('*').from("users").where("email", email).first();
        const result = await query;
        return result;
    }

    static async getUserById(id:number){
        const query = this.queryBuilder().select('*').from("users").where("id",id).first();
        const respone = await query;
        return respone;
    }

    static async deleteUser(id: number) {
        await this.queryBuilder().from("users").where('id', id).delete();
        return { message: 'User deleted successfully' };
    }

};