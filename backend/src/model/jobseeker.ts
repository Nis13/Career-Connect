import { GetUserQuery, Jobseeker, Jobseekerup, updateJobseeker, UserUpdate} from "../interface/users";
import { BaseModel } from "./base";

export class JobseekerModel extends BaseModel {

    static async signup(jobseeker: Jobseeker){
        const userToCreate = {
            email: jobseeker.email,
            password: jobseeker.password,
            role: 'jobseeker', 
            name: jobseeker.name
        };
        console.log("user to create",userToCreate);
        await this.queryBuilder()
        .insert(userToCreate)
        .table("users");

        const userId =  await this.queryBuilder()
        .select('user_id')
        .table("users")
        .where("email", jobseeker.email)
        .first();
        console.log("user id",userId);

        const jobseekerToCreate = {
            user_id: userId.userId, 
            education:jobseeker.jobseekerEducation,
            skills:jobseeker.jobseekerSkills,
            industry:jobseeker.jobseekerIndustry,
            contact_no:jobseeker.contactNo,
            resume:jobseeker.jobseekerResume
        };
        console.log(jobseekerToCreate);
        return await this.queryBuilder()
            .insert(jobseekerToCreate)
            .table("jobseeker");
    }


    static async getallJobseeker(filter:GetUserQuery){
        const query = this.queryBuilder().select('*').table('users').innerJoin("jobseeker","jobseeker.user_id","users.user_id");
        if (filter.page) {
            query.limit(filter.page);
        }
    
        if (filter.size) {
            query.offset(filter.size);
        }
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

    static async getJobseekerById(id:number){
        const query = this.queryBuilder().select('*').from("users").innerJoin("jobseeker",{"jobseeker.user_id":"users.user_id"}).where("users.user_id",id).first();
        const respone = await query;
        return respone;
    }

    static async deleteUser(id: number) {
        return await this.queryBuilder().from("users").where('user_id', id).delete();
    }

    static async updateJobseeker(userId: number, updatedData: Partial<Jobseekerup>) {
            const userUpdates:UserUpdate = {};
            if (updatedData.name) userUpdates.name = updatedData.name;
            if (updatedData.email) userUpdates.email = updatedData.email;
           
            const jobseekerUpdates: updateJobseeker = {};
            if (updatedData.contactNo) jobseekerUpdates.contact_no = updatedData.contactNo;
            if (updatedData.education) jobseekerUpdates.education = updatedData.education;
            if (updatedData.skills) jobseekerUpdates.skills = updatedData.skills;
            if (updatedData.industry) jobseekerUpdates.industry = updatedData.industry;
            
            return await this.queryBuilder().transaction(async trx => {
                if (Object.keys(userUpdates).length > 0) {
                    await trx('users')
                        .where('user_id', userId)
                        .update(userUpdates);
                }
                
                if (Object.keys(jobseekerUpdates).length > 0) {
                    await trx('jobseeker')
                        .where('user_id', userId)
                        .update(jobseekerUpdates);
                }
            });
}
}
