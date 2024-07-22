import express from "express";

import authRouter from "./auth";
import employerRouter from "./employer";
import jobRouter from "./jobRoutes";



const router = express();

router.use("/auth",authRouter);
router.use("/employer",employerRouter)
router.use("/job", jobRouter);
export default router;