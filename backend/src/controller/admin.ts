import { NextFunction,Request as ExpressRequest, Response} from "express";
import { GetUserQuery } from "../interface/users";
import * as AdminService from "../service/admin";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interface/auth";


export async function getallAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      const data = await AdminService.getallAdmin(userId!);
      if (!data){
        return {message:"users data no accessible"};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  export function deleteAdminById(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params;
      const data = AdminService.deleteAdminById(parseInt(id));
      if (!data) {
        return {message:`User with id ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    }
    catch(error){
      next(error);
    }
  }

  export async function getAdminById(req: Request, res: Response, next: NextFunction) {
    try {
      const {id }= req.params;
      if (!id) {
        return {message:"User ID is required"};
      }
      const data = await  AdminService.getAdminById(parseInt(id));
      if (!data) {
       return {message:`User with ID ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }


  
  export async function updateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const updateData = req.body;
      const {id} = req.params;
      if (!id) {
        return {message:"User ID is required"};
      }
      const data = await  AdminService.UpdateAdmin(parseInt(id),updateData);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  export async function createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const adminData = req.body;
      const data = await  AdminService.createAdmin(adminData);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }