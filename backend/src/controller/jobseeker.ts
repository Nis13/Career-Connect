import { NextFunction , Response} from "express";
import { GetUserQuery } from "../interface/users";
import * as JobseekerService from "../service/jobseeker";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interface/auth";

// export async function getUsers(req: Request<any,any,any,GetUserQuery>, res: Response, next: NextFunction) {
//     try {
//       const {query} = req;
//       const data = await JobseekerService.getUsers(query);
//       if (!data){
//         return {message:"users data no accessible"};
//       }
//       res.status(HttpStatusCodes.OK).json(data);
//     } catch (error) {
//       next(error);
//     }
//   }
  
  export async function getJobseekerById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      console.log(userId)
      if (!userId) {
        return {message:"User ID is required"};
      }
      const data = await  JobseekerService.getJobseekerById(userId);
      if (!data) {
       return {message:`User with ID ${userId} not found`};
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
  