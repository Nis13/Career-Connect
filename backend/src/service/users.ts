import { GetUserQuery, User } from "../interface/users";
import { UserModel } from "../model/users";

import bcrypt from "bcrypt";

export function getUsers(query:GetUserQuery){
    return UserModel.getUsers(query);
}

export async function getUserById(id:number){
    const data = await UserModel.getUserById(id);
    if (!data){
        return {message:`user of ${id} not found`}
    }
    return data;
};



export function getUserByEmail(email:string){
    const data = UserModel.getUserByEmail(email);
    return data;
};

export function updateUser(id: number, updatedUser: User){
    const userExists = UserModel.getUserById(id);
    if (!userExists) {
      return {message:"user doesn't exists"};
    }
    const data = UserModel.update(id, updatedUser);
    return data;
  };

  export function deleteUser(id: number) {
    const userToDelete = UserModel.getUserById(id);
    if (!userToDelete) {
      return {message:'User not found'};
    }
    return UserModel.deleteUser(id);
  }