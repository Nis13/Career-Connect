import express from "express";

import authRouter from "./auth";
import employerRouter from "./employer";
import jobseekerRouter from "./jobseeker";
import jobApplicationRouter from "./application";
import joblistingRouter from "./joblisting";
import adminRouter from "./admin";
import { verify } from "jsonwebtoken";
import config from "../config";



const router = express();

router.use("/auth",authRouter);
router.use("/admin",adminRouter);
router.use("/employer",employerRouter);
router.use("/jobseeker",jobseekerRouter);
router.use("/joblisting", joblistingRouter);
router.use("/application", jobApplicationRouter);


router.get('/parse/:access', (req,res) => {
    const token = req.params.access;
    try {
       const decoded = verify(token, config.jwt.secret!);
       const userData = decoded;
       res.status(200).json(userData);
    } catch (error) {
       console.log('Token Verification Error:', error);
       res.status(401).json({ error: 'Token verification failed' });
    }
})

export default router;