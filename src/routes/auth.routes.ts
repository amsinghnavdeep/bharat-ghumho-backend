import { Router } from "express";
import { body } from "express-validator";

import {
  appleAuth,
  forgotPassword,
  googleAuth,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  verifyEmail
} from "@/controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";
import { validateMiddleware } from "@/middleware/validate.middleware";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    validateMiddleware
  ],
  register
);

router.post("/login", [body("email").isEmail(), body("password").notEmpty(), validateMiddleware], login);
router.post("/refresh", [body("refreshToken").notEmpty(), validateMiddleware], refreshToken);
router.post("/logout", authenticate, logout);
router.post("/forgot-password", [body("email").isEmail(), validateMiddleware], forgotPassword);
router.post("/reset-password", [body("token").notEmpty(), body("newPassword").isLength({ min: 8 }), validateMiddleware], resetPassword);
router.post("/verify-email", [body("token").notEmpty(), validateMiddleware], verifyEmail);
router.post("/google", [body("idToken").notEmpty(), validateMiddleware], googleAuth);
router.post("/apple", [body("idToken").notEmpty(), validateMiddleware], appleAuth);

export default router;
