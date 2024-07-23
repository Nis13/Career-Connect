import express from "express";
import { deleteUser, getUsers } from "../controller/employer";



const router = express();

router.get('/', getUsers);

router.delete('/:id',deleteUser);

export default router;