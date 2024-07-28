import { NextFunction , Response} from "express";
import { Request } from "../interface/auth";
import * as ApplicationService from "../service/application";
import HttpStatusCodes from "http-status-codes";

export async function createApplication(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
      console.log(userId);
      const {job_id} = req.params;
      const jobApplication = req.body;
      const data = await ApplicationService.createApplication(userId!,parseInt(job_id),jobApplication)
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }