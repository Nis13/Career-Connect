

import express, { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { getallJobseeker, getJobseekerById, updateJobseeker } from "../controller/jobseeker";
// import { deleteUser, getUsers } from "../controller/employer";



const router = express();
router.get('/detail', authenticate, getJobseekerById);
router.put('/updateprofile',authenticate,authorize('admin','jobseeker'), updateJobseeker);
// router.get('/',authenticate,getjobseekerById);

router.get('/getall',authenticate, authorize('admin'),getallJobseeker);
// router.delete('/:id',deleteUser);

export default router;