import { Joblisting } from './../interface/joblisting';

import bcrypt from "bcrypt";
import { JoblistingModel } from "../model/joblisting";

export function getJoblistings(){
    return JoblistingModel.getJoblistings();
}

export async function getJoblistingById(id:number){
    const data = await JoblistingModel.getJoblistingById(id);
    if (!data){
        return {message:`job of ${id} not found`}
    }
    return data;
};

export async function createJoblisting(employerId:number,joblisting:Joblisting){
    return await JoblistingModel.createJoblisting(employerId,joblisting);
}
export async function updateJoblisting(employerId:number,listing_id:number,joblisting:Joblisting){
  return await JoblistingModel.updateJoblistingById(employerId,listing_id,joblisting);
}


  export function deleteJoblistingById(id: number) {
    const userToDelete = JoblistingModel.getJoblistingById(id);
    if (!userToDelete) {
      return {message:'User not found'};
    }
    return JoblistingModel.deleteJoblistingById(id);
  }