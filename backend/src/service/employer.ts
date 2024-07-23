import { GetUserQuery, User } from "../interface/users";
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