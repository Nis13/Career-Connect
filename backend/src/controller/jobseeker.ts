import { NextFunction, Request as ExpressRequest, Response } from "express";
import { GetUserQuery } from "../interface/users";
import * as JobseekerService from "../service/jobseeker";
import HttpStatusCodes from "http-status-codes";
import { Request } from "../interface/auth";

export async function getallJobseeker(
  req: ExpressRequest<any, any, any, GetUserQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const { query } = req;
    const data = await JobseekerService.getallJobseeker(query);
    if (!data) {
      return { message: "users data no accessible" };
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getJobseekerById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return { message: "User ID is required" };
    }
    const data = await JobseekerService.getJobseekerById(userId);
    if (!data) {
      return { message: `User with ID ${userId} not found` };
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = JobseekerService.deleteUser(parseInt(id));
    if (!data) {
      return { message: `User with id ${id} not found` };
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateJobseeker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const updateData = req.body;
    if (!userId) {
      return { message: "User ID is required" };
    }
    const data = await JobseekerService.UpdateJobseeker(userId, updateData);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateJobseekerByAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const updateData = req.body;
    const { userId } = req.params;
    if (!userId) {
      return { message: "User ID is required" };
    }
    const data = await JobseekerService.UpdateJobseeker(
      parseInt(userId),
      updateData
    );
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
