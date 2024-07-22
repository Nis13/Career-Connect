import express from "express";
import { deleteUser, getUsers, updateUser } from "../controller/users";


const router = express();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.delete('/:id',deleteUser);

export default router;