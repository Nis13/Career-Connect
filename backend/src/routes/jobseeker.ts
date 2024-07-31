

import express, { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getJobseekerById } from "../controller/jobseeker";
// import { deleteUser, getUsers } from "../controller/employer";



const router = express();
router.get('/detail', authenticate, getJobseekerById);
// router.get('/',authenticate,getjobseekerById);

// router.get('/', getUsers);
// router.delete('/:id',deleteUser);

export default router;