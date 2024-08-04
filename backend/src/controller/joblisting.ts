import { NextFunction , Response} from "express";
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
      const joblisting = req.body;
      const data = await JoblistingService.createJoblisting(userId!,joblisting);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  

  export async function updateJoblisting(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
      const joblisting = req.body;
      const data = await JoblistingService.updateJoblisting(userId!,parseInt(id),joblisting);
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

  export async function getJoblistingByFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req;
      const data = await JoblistingService.getJobListingByFilter(query);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
  
  export async function getJoblistingByUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      const data = await JoblistingService.getJoblistingByUserId(userId!);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  export async function totaljobpostByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      const data = await JoblistingService.totaljobpostByUser(userId!);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  export async function totalactiveJobByEmployer(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      const data = await JoblistingService.totalactiveJobByEmployer(userId!);
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }