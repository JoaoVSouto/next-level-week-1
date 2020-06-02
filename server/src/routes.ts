import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  const users = ['Diego', 'Cleiton', 'Robson', 'Daniel'];

  return res.json(users);
});

export default routes;
