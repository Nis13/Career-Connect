import express from "express";
import { getEmployerById, getEmployerDetails, getEmployerImage, updateEmployer, } from "../controller/employer";
import { authenticate } from "../middleware/auth";



const router = express();

router.get('/detail',authenticate,getEmployerDetails);
router.get('/image',authenticate, getEmployerImage);
router.put('/updateprofile',authenticate, updateEmployer);
// router.get('/',authenticate,getEmployerById);
// router.get('/', getUsers);

// router.delete('/:id',deleteUser);

export default router;