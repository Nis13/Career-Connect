import { Application } from '../interface/joblisting';
import { BaseModel } from './base';
export class applicationModel extends BaseModel{
    static async createApplication(user_id:number,job_id:number, application:Application){
        
        const seekerId = await this.queryBuilder()
        .select('seeker_id')
        .table("jobseeker")
        .where("user_id", user_id)
        .first();

        console.log(seekerId.seeker_id);

        console.log(job_id);
        const applicationToAdd = {
            jobId:job_id,
            seekerId:seekerId.seekerId,
            resume:application.resume,
            coverLetter:application.coverLetter,
            additionalMessage:application.additionalMessage
        }
        console.log("from model")
        console.log(applicationToAdd);
        await this.queryBuilder()
        .insert(applicationToAdd)
        .table("application");

        // console.log(response);
        return {message:"Applied successfully"};

    }
    static async updateApplicationById(application_id:number, application:Application){
        const query = await this.queryBuilder().select('*').from("application").where("application_id",application_id).first();
        const applicationToAdd = {
            jobId:query.job_id,
            seekerId:query.seekerId.seekerId,
            resume:application.resume,
            coverLetter:application.coverLetter,
            additionalMessage:application.additionalMessage
        }

        const response = this.queryBuilder()
        .update(applicationToAdd)
        .table("application")
        .where('application_id',application_id);

        // console.log(response);
        if (response) return response;
        else return "problem";

    }

    static async getApplicationByJobId(jobId:number){
        const query = this.queryBuilder().select('*').from("application").innerJoin("jobseeker",{ "jobseeker.seeker_id": "application.seeker_id" })
        .innerJoin("users",{"jobseeker.user_id":"users.user_id"}).where("job_id",jobId);
        const respone = await query;
        return respone;
    }

    static async getApplicationById(id:number){
        const query = this.queryBuilder().select('*').from("application").where("application_id",id);
        const respone = await query;
        return respone;
    }
    static async getApplicationByUserId(userId:number){
        const query = this.queryBuilder()
        // .select('*')
        .select('*')
        .from("application")
        .innerJoin("jobseeker",{ "jobseeker.seeker_id": "application.seeker_id" })
        .innerJoin("users",{"jobseeker.user_id":"users.user_id"})
        .where("users.user_id",userId);
        const respone = await query;
        return respone;
    }
    
    static async updateApplicationStatus(id:number,status:string) {
        await this.queryBuilder()
            .table('application') // Replace with your actual table name
            .where('application_id', id)
            .update('application_status' ,status);
        return { success: true };
    }
}