import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
  getNotificationById,
} from "../controllers/notification.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { verifyDeveloperOrAdmin } from "../../middlewares/user.isAdmin";
import { asyncHandler } from "../../utils/asyncHandler";

const router = express.Router();

router.post(
  "/",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(createNotification)
);
router.get("/", authenticate, asyncHandler(getUserNotifications));
router.get("/:id", authenticate, asyncHandler(getNotificationById));
router.patch("/:id/read", authenticate, asyncHandler(markAsRead));
router.delete(
  "/:id",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(deleteNotification)
);

export default router;
