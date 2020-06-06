import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

import createPointSchema from '../validators/Points/create';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      const schemaValidated = createPointSchema.validate(req.body, {
        abortEarly: false,
      });

      if (schemaValidated.error) {
        cb(new Error(schemaValidated.error.message), '');
        return;
      }

      const hash = crypto.randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
