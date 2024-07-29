import express from "express";
import { createApplication, getApplicationById, getApplicationByJobId } from "../controller/application";
import { authenticate } from "../middleware/auth";



const router = express();

router.post('/:job_id',authenticate,createApplication);
router.get('/:job_id',authenticate,getApplicationByJobId);
router.get('/get/:application_id', authenticate, getApplicationById);

export default router;