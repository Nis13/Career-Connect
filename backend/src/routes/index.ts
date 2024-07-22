import express from "express";

// import authRouter from "./auth";
import userRouter from "./users";
import jobRouter from "./jobRoutes";



const router = express();

// router.use("/auth",authRouter);
router.use("/users",userRouter);
router.use("/job", jobRouter);
export default router;