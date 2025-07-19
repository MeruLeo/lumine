import { Router } from "express";
import {
  changeUserStatus,
  createUser,
  deleteUserById,
  getAllUsers,
  getMe,
  getUserById,
  updateUserById,
  verifyUser,
} from "../controllers/user.controller";
import { verifyDeveloperOrAdmin } from "../../middlewares/user.isAdmin";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();
router.get("/me", authenticate, getMe);
router
  .route("/")
  .get(authenticate, verifyDeveloperOrAdmin, getAllUsers)
  .post(authenticate, verifyDeveloperOrAdmin, createUser);
router.put(
  "/status/:userId",
  authenticate,
  verifyDeveloperOrAdmin,
  changeUserStatus
);
router
  .route("/:userId")
  .get(authenticate, verifyDeveloperOrAdmin, getUserById)
  .delete(authenticate, verifyDeveloperOrAdmin, deleteUserById)
  .put(authenticate, verifyDeveloperOrAdmin, updateUserById);
router.put("/verify/:userId", authenticate, verifyDeveloperOrAdmin, verifyUser);

export default router;
