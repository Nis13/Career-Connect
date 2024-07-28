import { Application } from '../interface/joblisting';
import { BaseModel } from './base';
export class applicationModel extends BaseModel{
    static async createApplication(user_id:number,job_id:number, application:Application){
        
        const seekerId = await this.queryBuilder()
        .select('seeker_id')
        .table("jobseeker")
        .where("user_id", user_id)
        .first();

        console.log(seekerId.seekerId);

        console.log(job_id);
        const applicationToAdd = {
            jobId:job_id,
            seekerId:seekerId.seekerId,
            resume:application.resume,
            coverLetter:application.coverLetter,
            additionalMessage:application.additionalMessage
        }

        const response = this.queryBuilder()
        .insert(applicationToAdd)
        .table("application");

        // console.log(response);
        if (response) return response;
        else return "problem";

    }
}