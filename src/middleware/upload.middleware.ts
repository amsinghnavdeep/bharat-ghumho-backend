/**
 * Multer file upload configuration
 */
import multer from 'multer';
import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '../utils/constants';
import { BadRequestError } from '../utils/errors';

const storage = multer.memoryStorage();

/**
 * Image upload — max 5MB, jpeg/png/webp only
 */
export const imageUpload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestError('Only JPEG, PNG, and WebP images are allowed') as any, false);
    }
  },
});

/**
 * General file upload — max 10MB
 */
export const fileUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
