import HttpStatusCodes from 'http-status-codes';
import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      if (!body.name || !body.password) {
        return {message:"name and password are required"};
      }
  
      const data = await AuthService.login(body);
  
      if (!data) {
        return {message:"Invalid name or password"};
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
      if (!body || !body.name || !body.password) {
       return {message:"name and password are required"};
      }
      const data = await AuthService.signup(body);
      res.status(HttpStatusCodes.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  }