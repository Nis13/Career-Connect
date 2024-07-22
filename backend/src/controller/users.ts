import { NextFunction, Request , Response} from "express";
import { GetUserQuery } from "../interface/users";
import * as UserService from "../service/users";
import HttpStatusCodes from "http-status-codes";

export async function getUsers(req: Request<any,any,any,GetUserQuery>, res: Response, next: NextFunction) {
    try {
      const {query} = req;
      const data = await UserService.getUsers(query);
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
      const data = await  UserService.getUserById(parseInt(id));
      if (!data) {
       return {message:`User with ID ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  
  // export function getUserByQuery(req: Request<any,any,any,GetUserQuery>, res: Response) {
  //   const {query} = req;
  //   const data = UserService.getUserByQuery(query);
  //   res.json(data)
  // };
  
  
  
  export async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id: userId } = req.params;
      const { body: updatedUser } = req;
  
      const user = UserService.updateUser(parseInt(userId), updatedUser);
  
      if (!user) return {message:"user can't be updated"};
      res.status(HttpStatusCodes.OK).json({
        message: "User updated successfully"
      });
    } catch (error) {
      next(error);
    }
  }
  
  export function deleteUser(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params;
      const data = UserService.deleteUser(parseInt(id));
      if (!data) {
        return {message:`User with id ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    }
    catch(error){
      next(error);
    }
  }
  