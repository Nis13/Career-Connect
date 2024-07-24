import { NextFunction , Response} from "express";

import { GetUserQuery } from "../interface/users";
import * as JoblistingService from "../service/joblisting";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interface/auth";

export async function getJoblistings(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await JoblistingService.getJoblistings();
      if (!data){
        return {message:"users data no accessible"};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  
  export async function getJoblistingById(req: Request, res: Response, next: NextFunction) {
    try {
    const userId = req.user?.id;
      const { id } = req.params;
      if (!id) {
        return {message:"joblisting ID is required"};
      }
      const data = await  JoblistingService.getJoblistingById(parseInt(id));
      if (!data) {
       return {message:`joblisting with ID ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  export async function createJoblisting(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      console.log(userId);
      const joblisting = req.body;
      const data = await JoblistingService.createJoblisting(userId!,joblisting);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  

  
  export function deleteJoblistingById(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params;
      const data = JoblistingService.deleteJoblistingById(parseInt(id));
      if (!data) {
        return {message:`User with id ${id} not found`};
      }
      res.status(HttpStatusCodes.OK).json(data);
    }
    catch(error){
      next(error);
    }
  }
  