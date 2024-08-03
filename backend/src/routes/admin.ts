import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { createAdmin, deleteAdminById, getAdminById, getallAdmin, updateAdmin } from "../controller/admin";

const router = express();
router.get('/all',authenticate,authorize('admin') ,getallAdmin);
router.get('/:id',authenticate,authorize('admin') ,getAdminById);
router.post('/create',authenticate,authorize('admin') ,createAdmin);
router.put('/updateprofile/:id',authenticate, authorize('admin'), updateAdmin);

router.delete('/:id',authenticate, authorize('admin'), deleteAdminById);

export default router;