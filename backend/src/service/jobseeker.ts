import { GetUserQuery, User } from "../interface/users";
import { JobseekerModel } from "../model/jobseeker";

import bcrypt from "bcrypt";

export function getUsers(query:GetUserQuery){
    return JobseekerModel.getUsers(query);
}

export async function getUserById(id:number){
    const data = await JobseekerModel.getUserById(id);
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