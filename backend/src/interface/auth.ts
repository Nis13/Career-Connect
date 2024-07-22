import {Request as ExpressRequest } from "express";
import { User } from "./users";

export interface Request extends ExpressRequest{
    user?:User;
}
