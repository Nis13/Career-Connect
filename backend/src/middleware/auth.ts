import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import { verify } from "jsonwebtoken";

import config from "../config";
import { User } from "../interface/users";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return {message:"token not found"};
    }
  
    const token = authorization.split(" ");
  
    if (token.length !== 2 || token[0] !== "Bearer") {
        return{message:"unauthenticated"};
    }
  
    try {
      const user = verify(token[1], config.jwt.secret!) as User;
      req.user = user;
    } catch (error) {
      return {message:"unauthenicated"};
    }
  
    next();
  }

  export function authorize(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user!;
      if (roles.includes(user.role)) {
        next();
      }
      else return {message:"Forbidden"}
    };
  }
  
  
  