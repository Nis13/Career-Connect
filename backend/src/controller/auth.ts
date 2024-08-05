import HttpStatusCodes from "http-status-codes";
import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;

  try {
    if (!body.email || !body.password) {
      return { message: "name and password are required" };
    }

    const data = await AuthService.login(body);

    if (!data) {
      return { message: "Invalid name or password" };
    }

    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function signupEmployer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    if (req.file) {
      const fileUrl = `uploads/${req.file.filename}`;

      if (!body || !body.name || !body.password) {
        return { message: "name and password are required" };
      }
      const employerData = {
        ...body,
        companyLogo: fileUrl,
      };
      const data = await AuthService.signupEmployer(employerData);
      res.status(HttpStatusCodes.CREATED).json(data);
    }
  } catch (error) {
    next(error);
  }
}

export async function signupJobseeker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.file) {
      const fileUrl = `resumes/${req.file.filename}`;
      const { body } = req;
      if (!body || !body.name || !body.password) {
        return { message: "name and password are required" };
      }
      const jobseekerData = {
        ...body,
        jobseekerResume: fileUrl,
      };
      const data = await AuthService.signupJobseeker(jobseekerData);
      res.status(HttpStatusCodes.CREATED).json(data);
    }
  } catch (error) {
    next(error);
  }
}
