import bcrypt  from 'bcrypt';
import { GetUserQuery, User } from "../interface/users";
import { AdminModel } from "../model/admin";

export function getallAdmin(adminId:number){
    return AdminModel.getallAdmin(adminId);
}

export async function createAdmin(adminData:User){
  const password = await bcrypt.hash(adminData.password, 10);
  adminData.password = password;
    const data = AdminModel.createAdmin(adminData);
    return data;
}
export async function getAdminById(id:number){
    const data = await AdminModel.getAdminById(id);
    if (!data){
        return {message:`user of ${id} not found`}
    }
    return data;
};

  export function deleteAdminById(id: number) {
    const userToDelete = AdminModel.getAdminById(id);
    if (!userToDelete) {
      return {message:'User not found'};
    }
    return AdminModel.deleteAdminById(id);
  }

  export function UpdateAdmin(id: number, updatedData: Partial<User>) {
    const userToUpdate = AdminModel.getAdminById(id);
    if (!userToUpdate) {
      return {message:'User not found'};
    }
    return AdminModel.updateAdminByID(id,updatedData);
  }