import { NextFunction, Response} from "express";
import { GetUserQuery } from "../interface/users";
import * as EmployerService from "../service/employer";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interface/auth";

// export async function getUsers(req: Request<any,any,any,GetUserQuery>, res: Response, next: NextFunction) {
//     try {
//       const {query} = req;
//       const data = await EmployerService.getUsers(query);
//       if (!data){
//         return {message:"users data no accessible"};
//       }
//       res.status(HttpStatusCodes.OK).json(data);
//     } catch (error) {
//       next(error);
//     }
//   }
  
  // export async function getUserById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     if (!id) {
  //       return {message:"User ID is required"};
  //     }
  //     const data = await  EmployerService.getUserById(parseInt(id));
  //     if (!data) {
  //      return {message:`User with ID ${id} not found`};
  //     }
  //     res.status(HttpStatusCodes.OK).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  
  // export function deleteUser(req: Request, res: Response, next: NextFunction) {
  //   try{
  //     const { id } = req.params;
  //     const data = EmployerService.deleteUser(parseInt(id));
  //     if (!data) {
  //       return {message:`User with id ${id} not found`};
  //     }
  //     res.status(HttpStatusCodes.OK).json(data);
  //   }
  //   catch(error){
  //     next(error);
  //   }
  // }
  
  export async function getEmployerDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return {message:"User ID is required"};
      }
      const data = await  EmployerService.getEmployerDetails(userId);
      if (!data) {
       return {message:`User with ID ${userId} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }