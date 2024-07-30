import { Application, GetJobQuery } from "../interface/joblisting";
import { applicationModel } from "../model/application";

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
