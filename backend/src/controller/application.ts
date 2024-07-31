import { NextFunction , Response} from "express";
import { Request } from "../interface/auth";
import * as ApplicationService from "../service/application";
import HttpStatusCodes from "http-status-codes";

export async function createApplication(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file)
      if (req.file){
        const fileUrl = `pdf/${req.file.filename}`;
        console.log(fileUrl);
      
        const userId = req.user?.id;
      console.log(userId);
      const {job_id} = req.params;
      const { body } = req;
      console.log('from body')
      console.log(body);
      const applicationData = {
        ...body,
        resume: fileUrl
      }
      const data = await ApplicationService.createApplication(userId!,parseInt(job_id),applicationData)
      res.status(HttpStatusCodes.OK).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

export async function getApplicationByJobId(req: Request, res: Response, next: NextFunction){
  try {
  const {job_id} = req.params;
  const data = await ApplicationService.getApplicationByJobId(parseInt(job_id));
  res.status(HttpStatusCodes.OK).json(data);
} catch (error) {
  next(error);
}
}

export async function getApplicationById(req: Request, res: Response, next: NextFunction){
  try {
  const {application_id} = req.params;
  const data = await ApplicationService.getApplicationById(parseInt(application_id));
  res.status(HttpStatusCodes.OK).json(data);
} catch (error) {
  next(error);
}
}

export async function updateApplicationStatus(req: Request, res: Response, next: NextFunction){
  try {
  const {application_id} = req.params;
  const body = req.body;
  console.log(body);
  const data = await ApplicationService.updateApplicationStatus(parseInt(application_id),body.applicationStatus);
  res.status(HttpStatusCodes.OK).json(data);
} catch (error) {
  next(error);
}
}
export async function getApplicationByUserId(req: Request, res: Response, next: NextFunction){
  try {
  const userId = req.user?.id;
  const data = await ApplicationService.getApplicationByUserId(userId!);
  res.status(HttpStatusCodes.OK).json(data);
} catch (error) {
  next(error);
}
}
export async function getApplicationByJobseekerId(req: Request, res: Response, next: NextFunction){
  try {
  const userId = req.user?.id;
  const data = await ApplicationService.getApplicationByJobseekerId(userId!);
  res.status(HttpStatusCodes.OK).json(data);
} catch (error) {
  next(error);
}
}


