import upload from './../utils/multer';
import { NextFunction, Request, Response } from 'express';

async function addPathToBody(req: Request, res: Response, next: NextFunction) {
  if (req.files) req.body['images'] = req.files.map(file => file.path.replace('\\', '/'));

  if (req.file) req.body['image'] = req.file.path.replace('\\', '/');

  next();
}

export default field => {
  return [upload.single(field), addPathToBody];
};
