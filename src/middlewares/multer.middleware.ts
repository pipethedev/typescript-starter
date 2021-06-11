import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const options: multer.Options = {
  storage,
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req: Request, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/)) return cb(new Error('file format incorrect'));
    cb(null, true);
  },
};

export const upload = multer(options);
