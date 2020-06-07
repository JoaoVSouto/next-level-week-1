import path from 'path';
import crypto from 'crypto';
import multer, { Options, CustomFile } from 'multer';

import createPointSchema from '../validators/Points/create';

const multerOptions: Options = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),

    filename(req, file: CustomFile, cb) {
      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      file.resizedname = `resized_${fileName}`;

      cb(null, fileName);
    },
  }),

  fileFilter(req, file, cb) {
    const schemaValidated = createPointSchema.validate(req.body, {
      abortEarly: false,
    });

    if (schemaValidated.error) {
      cb(new Error(schemaValidated.error.message));
      return;
    }

    const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

    if (!acceptedTypes.includes(file.mimetype)) {
      cb(new Error('File type is not permitted.'));
      return;
    }

    cb(null, true);
  },
};

export default multerOptions;
