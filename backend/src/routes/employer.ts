import express from "express";
import { getEmployerDetails, } from "../controller/employer";
import { authenticate } from "../middleware/auth";



const router = express();

router.get('/detail',authenticate,getEmployerDetails);
// router.get('/', getUsers);

// router.delete('/:id',deleteUser);

export default router;