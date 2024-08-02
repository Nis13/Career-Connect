import { Application } from '../interface/joblisting';
import { GetUserQuery } from '../interface/users';
import { BaseModel } from './base';
export class applicationModel extends BaseModel{
    static async createApplication(user_id:number,job_id:number, application:Application){
        
        const seekerId = await this.queryBuilder()
        .select('seeker_id')
        .table("jobseeker")
        .where("user_id", user_id)
        .first();

        const applicationToAdd = {
            jobId:job_id,
            seekerId:seekerId.seekerId,
            applicationResume:application.resume,
            coverLetter:application.coverLetter,
            additionalMessage:application.additionalMessage
        }
        await this.queryBuilder()
        .insert(applicationToAdd)
        .table("application");

        return {message:"Applied successfully"};

    }
    static async updateApplicationById(application_id:number, application:Application){
        const query = await this.queryBuilder().select('*').from("application").where("application_id",application_id).first();
        const applicationToAdd = {
            jobId:query.job_id,
            seekerId:query.seekerId.seekerId,
            applicationResume:application.resume,
            coverLetter:application.coverLetter,
            additionalMessage:application.additionalMessage
        }

        const response = this.queryBuilder()
        .update(applicationToAdd)
        .table("application")
        .where('application_id',application_id);

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
        const query = this.queryBuilder().select('*').from("application").where("application_id",id).first();
        const respone = await query;
        return respone;
    }
    
    static async getApplicationByUserId(userId:number){
        const query = this.queryBuilder()
        .select('*')
        .from('employer')
        .innerJoin('job_listings', 'employer.employer_id', 'job_listings.created_by')
        .innerJoin('application', 'job_listings.listing_id', 'application.job_id')
        .innerJoin('jobseeker', 'application.seeker_id', 'jobseeker.seeker_id')
        .innerJoin('users', 'users.user_id', 'jobseeker.user_id')
        .where('employer.user_id', userId);
        const respone = await query;
        return respone;
    }

    static async getApplicationByJobseekerId(userId:number){
        const query = this.queryBuilder()
        .select('*')
        .from("application")
        .innerJoin("jobseeker",{ "jobseeker.seeker_id": "application.seeker_id" })
        .innerJoin("job_listings",{ "application.job_id": "job_listings.listing_id" })
        .where("jobseeker.user_id",userId);
        const respone = await query;
        return respone;
    }
    
    
    static async updateApplicationStatus(id:number,status:string) {
        await this.queryBuilder()
            .table('application') 
            .update({ application_status: status })
            .where('application_id', id);
        return { message: "success" };
    }

    static async getallApplications(filter:GetUserQuery){
        const query = this.queryBuilder()
        .select('*')
        .from("application")
        .innerJoin("jobseeker",{ "jobseeker.seeker_id": "application.seeker_id" })
        .innerJoin("job_listings",{ "application.job_id": "job_listings.listing_id" })
        .innerJoin('users', 'users.user_id', 'jobseeker.user_id');

        if (filter.page) {
            query.limit(filter.page);
        }
    
        if (filter.size) {
            query.offset(filter.size);
        }
        return query;
    }
}