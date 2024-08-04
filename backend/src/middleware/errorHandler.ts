import HttpStatusCodes from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import BadRequestError from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { UnauthorizedError } from '../error/UnauthorizedError';

export const notFoundError = (req: Request, res: Response) => {
    res.status(HttpStatusCodes.NOT_FOUND).json({
      message: "NOT FOUND",
    });
  };

export function genericErrorHandler(error:Error,req:Request, res:Response, next:NextFunction){
    if (error instanceof BadRequestError) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    }
    if (error instanceof UnauthenticatedError) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
          message: error.message,
        });
      }
      if (error instanceof NotFoundError) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: error.message,
        });
      }
      if (error instanceof UnauthorizedError) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
          message: error.message,
        });
      }
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
}