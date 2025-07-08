import { Router } from "express";
import {
  forgetPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  sendEmailVerificationCode,
  verifyEmailCode,
  verifyPasswordCode,
} from "../controllers/auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", authenticate, logout);
router.post("/send-verification-code", asyncHandler(sendEmailVerificationCode));
router.post("/verify-code", asyncHandler(verifyEmailCode));
router.post("/forget-password", asyncHandler(forgetPassword));
router.post("/verify-password-code", asyncHandler(verifyPasswordCode));
router.post("/reset-password", asyncHandler(resetPassword));

export default router;
