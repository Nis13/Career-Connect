import express from "express";

import authRouter from "./auth";
import employerRouter from "./employer";
import jobseekerRouter from "./jobseeker";
import jobApplicationRouter from "./application";
import jobRouter from "./jobRoutes";
import joblistingRouter from "./joblisting";



const router = express();

router.use("/auth",authRouter);
router.use("/employer",employerRouter);
router.use("/jobseeker",jobseekerRouter);
router.use("/joblisting", joblistingRouter);
router.use("/application", jobApplicationRouter);
router.use("/job", jobRouter);
export default router;