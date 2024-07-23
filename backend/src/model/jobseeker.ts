import { GetUserQuery, Jobseeker} from "../interface/users";
import { BaseModel } from "./base";



export class JobseekerModel extends BaseModel {

    static async signup(jobseeker: Jobseeker){
        const userToCreate = {
            email: jobseeker.email,
            password: jobseeker.password,
            role: 'jobseeker', 
            name: jobseeker.name
        };

        await this.queryBuilder()
        .insert(userToCreate)
        .table("users");

        const userId =  await this.queryBuilder()
        .select('user_id')
        .table("users")
        .where("email", jobseeker.email)
        .first();

        const jobseekerToCreate = {
            user_id: userId.userId, 
            education:jobseeker.jobseekerEducation,
            skills:jobseeker.jobseekerSkills,
            industry:jobseeker.jobseekerIndustry,
            contact_no:jobseeker.jobseekerContact,
            resume:jobseeker.jobseekerResume
        };

        await this.queryBuilder()
            .insert(jobseekerToCreate)
            .table("jobseeker");
    
    const createdUser = await this.queryBuilder()
        .select('user_id', 'email', 'name')
        .table("users")
        .where("email", jobseeker.email)
        .first();

    return createdUser;

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
        const query = this.queryBuilder().select('*').from("users").where("user_id",id).first();
        const respone = await query;
        return respone;
    }

    static async deleteUser(id: number) {
        await this.queryBuilder().from("jobseeker").where('user_id', id).delete();
        await this.queryBuilder().from("users").where('user_id', id).delete();
        return { message: 'User deleted successfully' };
    }
};