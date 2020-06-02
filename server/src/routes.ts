import { Router } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = Router();

routes.get('/items', ItemsController.index);

routes.get('/points/:id', PointsController.show);
routes.post('/points', PointsController.create);

export default routes;
