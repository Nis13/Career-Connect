import { NextFunction, Request , Response} from "express";
import { GetUserQuery } from "../interface/users";
import * as JobseekerService from "../service/jobseeker";
import HttpStatusCodes from "http-status-codes";

export async function getUsers(req: Request<any,any,any,GetUserQuery>, res: Response, next: NextFunction) {
    try {
      const {query} = req;
      const data = await JobseekerService.getUsers(query);
      if (!data){
        return {message:"users data no accessible"};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  
  export async function getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return {message:"User ID is required"};
      }
      const data = await  JobseekerService.getUserById(parseInt(id));
      if (!data) {
       return {message:`User with ID ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  
  export function deleteUser(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params;
      const data = JobseekerService.deleteUser(parseInt(id));
      if (!data) {
        return {message:`User with id ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    }
    catch(error){
      next(error);
    }
  }
  