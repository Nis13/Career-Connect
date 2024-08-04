import { NextFunction, Request as ExpressRequest, Response } from "express";
import { Request } from "../interface/auth";
import * as ApplicationService from "../service/application";
import HttpStatusCodes from "http-status-codes";
import { GetUserQuery } from "../interface/users";

export async function createApplication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.file);
    if (req.file) {
      const fileUrl = `resumes/${req.file.filename}`;
      console.log(fileUrl);

      const userId = req.user?.id;
      console.log(userId);
      const { job_id } = req.params;
      const { body } = req;
      console.log("from body");
      console.log(body);
      const applicationData = {
        ...body,
        resume: fileUrl,
      };
      const data = await ApplicationService.createApplication(
        userId!,
        parseInt(job_id),
        applicationData
      );
      res.status(HttpStatusCodes.OK).json(data);
    }
  } catch (error) {
    next(error);
  }
}

export async function getApplicationByJobId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { job_id } = req.params;
    const data = await ApplicationService.getApplicationByJobId(
      parseInt(job_id)
    );
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getApplicationById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { application_id } = req.params;
    const data = await ApplicationService.getApplicationById(
      parseInt(application_id)
    );
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { application_id } = req.params;
    const body = req.body;
    console.log(body);
    const data = await ApplicationService.updateApplicationStatus(
      parseInt(application_id),
      body.applicationStatus
    );
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
export async function getApplicationByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const data = await ApplicationService.getApplicationByUserId(userId!);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
export async function getApplicationByJobseekerId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const data = await ApplicationService.getApplicationByJobseekerId(userId!);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getallApplications(
  req: ExpressRequest<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const data = await ApplicationService.getallApplications(query);
    if (!data) {
      return { message: "application data no accessible" };
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function totalApplicationByEmployer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const data = await ApplicationService.totalApplicationByEmployer(userId!);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function totalJobApplied(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const data = await ApplicationService.totalJobApplied(userId!);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function totalJobRejected(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const data = await ApplicationService.totalJobRejected(userId!);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
