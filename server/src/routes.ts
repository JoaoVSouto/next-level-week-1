import { Router } from 'express';
import { celebrate } from 'celebrate';
import multer from 'multer';

import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import showPointSchema from './validators/Points/show';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', ItemsController.index);

routes.post('/points', upload.single('image'), PointsController.create);
routes.get('/points', PointsController.index);
routes.get(
  '/points/:id',
  celebrate({
    params: showPointSchema,
  }),
  PointsController.show
);

export default routes;
