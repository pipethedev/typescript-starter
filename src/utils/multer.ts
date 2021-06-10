import HttpException from '@exceptions/HttpException';
import multer from 'multer';
import shortid from 'shortid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in "uploads" folder
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // Generate unique filename form current date and shortid
    const fileExt = file.originalname.split('.').pop();
    const filename = `${shortid.generate()}_${new Date().getTime()}.${fileExt}`;

    cb(null, filename);
  },
});

const limits = {
  // Maximum file size of 5mb
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  //Accepted file types
  const mimeTypes = ['image/jpeg', 'image/png'];

  // Check if file type is accepted
  if (mimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new HttpException(400, 'Invalid file type'), false);
  }
};

export default multer({ storage, limits, fileFilter });
