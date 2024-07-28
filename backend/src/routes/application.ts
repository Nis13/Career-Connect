import express from "express";
import { createApplication } from "../controller/application";
import { authenticate } from "../middleware/auth";



const router = express();

router.post('/:job_id',authenticate,createApplication);

export default router;