import HttpStatusCodes from 'http-status-codes';
import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    
    try {
      if (!body.email || !body.password) {
        return {message:"name and password are required"};
      }
      
      const data = await AuthService.login(body);
  
      if (!data) {
        return {message:"Invalid name or password"};
      }
  
      res.status(HttpStatusCodes.OK).json(data);
    } catch (error) {
      return error;
    }
  }

  export async function signupEmployer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body} = req;
      if (req.file) {
        // The uploaded file information is available in req.file
        const fileUrl = `uploads/${req.file.filename}`;
        console.log(fileUrl);
      

      if (!body || !body.name || !body.password) {
       return {message:"name and password are required"};
      }
      console.log(body.companyLogo);
      const employerData = {
        ...body,
        companyLogo: fileUrl // Add Cloudinary URL to your data
    };
      const data = await AuthService.signupEmployer(employerData);
      
      res.status(HttpStatusCodes.CREATED).json(data);
  }
    } catch (error) {
      return error;
    }
  }

  export async function signupJobseeker(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req;
      if (!body || !body.name || !body.password) {
       return {message:"name and password are required"};
      }
      const data = await AuthService.signupJobseeker(body);
      res.status(HttpStatusCodes.CREATED).json(data);
    } catch (error) {
      return error;
    }
  }