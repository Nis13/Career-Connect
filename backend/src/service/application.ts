import { Application} from "../interface/joblisting";
import { applicationModel } from "../model/application";
import { GetUserQuery } from '../interface/users';

export function createApplication(userId:number, seekerId:number, application:Application){
    return applicationModel.createApplication(userId, seekerId, application);
}

export function getApplicationByJobId(jobId:number){
    return applicationModel.getApplicationByJobId(jobId);
}

export function getApplicationById(applicationId:number){
    return applicationModel.getApplicationById(applicationId);
}

export function updateApplicationStatus(applicationId:number, status:string){
    return applicationModel.updateApplicationStatus(applicationId,status);
}

export function getApplicationByUserId(userId:number){
    return applicationModel.getApplicationByUserId(userId);
}
export function getallApplications(query:GetUserQuery){
    return applicationModel.getallApplications(query);
}

export function getApplicationByJobseekerId(userId:number){
    return applicationModel.getApplicationByJobseekerId(userId);
}

export function totalApplicationByEmployer(userId:number){
    return applicationModel.totalApplicationByEmployer(userId);
}

