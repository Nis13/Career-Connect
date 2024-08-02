import { GetUserQuery, Jobseeker, User } from "../interface/users";
import { JobseekerModel } from "../model/jobseeker";

import bcrypt from "bcrypt";

export function getallJobseeker(query:GetUserQuery){
    return JobseekerModel.getallJobseeker(query);
}

export async function getJobseekerById(id:number){
    const data = await JobseekerModel.getJobseekerById(id);
    if (!data){
        return {message:`user of ${id} not found`}
    }
    return data;
};

export function getUserByEmail(email:string){
    const data = JobseekerModel.getUserByEmail(email);
    return data;
};

  export function deleteUser(id: number) {
    const userToDelete = JobseekerModel.getUserById(id);
    if (!userToDelete) {
      return {message:'User not found'};
    }
    return JobseekerModel.deleteUser(id);
  }
  export function UpdateJobseeker(id: number, updatedData: Partial<Jobseeker>) {
    const userToUpdate = JobseekerModel.getUserById(id);
    if (!userToUpdate) {
      return {message:'User not found'};
    }
    return JobseekerModel.updateJobseeker(id, updatedData);
  }
  