import { Application } from "../interface/joblisting";
import { applicationModel } from "../model/application";

export function createApplication(userId:number, seekerId:number, application:Application){
    return applicationModel.createApplication(userId, seekerId, application);
}