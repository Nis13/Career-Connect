import { Employer, GetUserQuery, User } from "../interface/users";
import { EmployerModel } from "../model/employer";

import bcrypt from "bcrypt";

export function getUsers(query:GetUserQuery){
    return EmployerModel.getUsers(query);
}

export async function getUserById(id:number){
    const data = await EmployerModel.getUserById(id);
    if (!data){
        return {message:`user of ${id} not found`}
    }
    return data;
};

export async function getEmployerById(id:number){
  const data = await EmployerModel.getEmployerById(id);
  if (!data){
      return {message:`user of ${id} not found`}
  }
  return data;
};

export function getUserByEmail(email:string){
    const data = EmployerModel.getUserByEmail(email);
    return data;
};

  export function deleteUser(id: number) {
    const userToDelete = EmployerModel.getUserById(id);
    if (!userToDelete) {
      return {message:'User not found'};
    }
    return EmployerModel.deleteUser(id);
  }

  export function getEmployerDetails(id:number){
    return EmployerModel.getEmployerDetails(id);
  }

  export function getEmployerImage(id:number){
    return EmployerModel.getEmployerImage(id);
  }

  export function UpdateEmployer(id: number, updatedData: Partial<Employer>) {
    const userToUpdate = EmployerModel.getUserById(id);
    if (!userToUpdate) {
      return {message:'User not found'};
    }
    return EmployerModel.updateEmployer(id, updatedData);
  }