import express from "express";
import { createApplication, getApplicationById, getApplicationByJobId, updateApplicationStatus } from "../controller/application";
import { authenticate } from "../middleware/auth";



const router = express();

router.post('/:job_id',authenticate,createApplication);
router.get('/byjob/:job_id',getApplicationByJobId);
router.get('/get/:application_id', authenticate, getApplicationById);
router.put('/:application_id',updateApplicationStatus);

export default router;