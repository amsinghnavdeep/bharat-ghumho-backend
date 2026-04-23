import { Router } from "express";

const router = Router();

/**
 * Basic liveliness and environment endpoint.
 */
router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "development"
  });
});

export default router;
