import { Router } from "express";
import multer from "multer";
import { body, param, query } from "express-validator";

import {
  addSavedPassenger,
  changePassword,
  deleteAccount,
  deleteSavedPassenger,
  getProfile,
  getSavedPassengers,
  getUserBookings,
  updateAvatar,
  updatePreferences,
  updateProfile,
  updateSavedPassenger
} from "@/controllers/user.controller";
import { authenticate } from "@/middleware/auth.middleware";
import { validateMiddleware } from "@/middleware/validate.middleware";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const router = Router();
router.use(authenticate);

router.get("/me", getProfile);
router.put(
  "/me",
  [body("firstName").optional().notEmpty(), body("lastName").optional().notEmpty(), validateMiddleware],
  updateProfile
);
router.put("/me/avatar", upload.single("avatar"), updateAvatar);
router.put(
  "/me/preferences",
  [
    body("language").optional().isString(),
    body("currency").optional().isString(),
    body("notifyEmail").optional().isBoolean(),
    body("notifyWhatsApp").optional().isBoolean(),
    body("notifySMS").optional().isBoolean(),
    body("seatPreference").optional().isString(),
    body("mealPreference").optional().isString(),
    validateMiddleware
  ],
  updatePreferences
);
router.get(
  "/me/bookings",
  [
    query("status").optional().isIn(["UPCOMING", "COMPLETED", "CANCELLED"]),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    validateMiddleware
  ],
  getUserBookings
);
router.get("/me/saved-passengers", getSavedPassengers);
router.post(
  "/me/saved-passengers",
  [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("dateOfBirth").notEmpty().isISO8601(),
    body("gender").notEmpty().isString(),
    body("passportExpiry").optional().isISO8601(),
    validateMiddleware
  ],
  addSavedPassenger
);
router.put(
  "/me/saved-passengers/:id",
  [
    param("id").isUUID(),
    body("dateOfBirth").optional().isISO8601(),
    body("passportExpiry").optional().isISO8601(),
    validateMiddleware
  ],
  updateSavedPassenger
);
router.delete(
  "/me/saved-passengers/:id",
  [param("id").isUUID(), validateMiddleware],
  deleteSavedPassenger
);
router.put(
  "/me/password",
  [body("currentPassword").notEmpty(), body("newPassword").isLength({ min: 8 }), validateMiddleware],
  changePassword
);
router.delete("/me", [body("password").notEmpty(), validateMiddleware], deleteAccount);

export default router;
