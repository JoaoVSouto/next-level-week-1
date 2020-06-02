import { Router } from 'express';

import knex from './database/connection';

const routes = Router();

routes.get('/items', async (req, res) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map(item => ({
    ...item,
    image_url: `http://localhost:3333/uploads/${item.image}`,
  }));

  return res.json(serializedItems);
});

export default routes;
