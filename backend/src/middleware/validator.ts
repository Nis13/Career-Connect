import { NextFunction, Response, Request } from "express";
import { Schema } from "joi";

export function validateReqBody(schema:Schema){
    return (req:Request, res:Response, next:NextFunction) =>{
        const {error,value} = schema.validate(req.body);
    if (error){
        res.json({message:error.message});
    }
    req.body = value;
    next();
}
}