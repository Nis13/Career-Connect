import { UnauthorizedError } from './../error/UnauthorizedError';
import { UnauthenticatedError } from './../error/UnauthenticatedError';
import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import { verify } from "jsonwebtoken";

import config from "../config";
import { User } from "../interface/users";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new UnauthorizedError("Token not Found");
    }
  
    const token = authorization.split(" ");
  
    if (token.length !== 2 || token[0] !== "Bearer") {
        throw new UnauthorizedError("Token not Found");
    }
  
    try {
      const user = verify(token[1], config.jwt.secret!) as User;
      if (!user) throw new UnauthorizedError("Invalid Token");
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }

  export function authorize(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try{
        if (!req.user) {
          throw new UnauthenticatedError("User is not authenticated");
        }
        const user = req.user!;
        if (!roles.includes(user.role)) {
          throw new UnauthenticatedError("Role not authorized");
        }
        next();
      }
      catch(error){
        next(error);
      }
      }
     
  }
  
  
  