import {Request as ExpressRequest } from "express";
import { User } from "./users";
import { Multer } from 'multer';

export interface Request extends ExpressRequest{
    user?:User;
}
// export interface FileRequest extends Request{
//     file?:Express.Multer.File;
// }
