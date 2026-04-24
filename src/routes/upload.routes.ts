import { Router } from 'express';
import * as uploadCtrl from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.use(authenticate);

router.post('/image', upload.single('file'), uploadCtrl.uploadImage);
router.post('/document', upload.single('file'), uploadCtrl.uploadDocument);
router.get('/presigned-url', uploadCtrl.getPresignedUrl);

export { router as uploadRouter };
