

import express, { Router } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { deleteUser, getallJobseeker, getJobseekerById, updateJobseeker, updateJobseekerByAdmin } from "../controller/jobseeker";



const router = express();
router.get('/detail', authenticate, getJobseekerById);
router.put('/updateprofile',authenticate,authorize('admin','jobseeker'), updateJobseeker);
router.put('/updateprofile/:userId',authenticate,authorize('admin'), updateJobseekerByAdmin);
router.get('/getall',authenticate, authorize('admin'),getallJobseeker);
router.delete('/deleteuser/:id',authenticate,authorize('admin'),deleteUser);

export default router;