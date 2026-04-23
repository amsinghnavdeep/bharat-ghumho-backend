import multer from "multer";

export const uploadMiddleware = multer({
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
