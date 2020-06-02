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

routes.post('/points', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;

  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'placeholder',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const [point_id] = insertedIds;

  const pointItems = items.map((item_id: number) => ({
    item_id,
    point_id,
  }));

  await trx('point_items').insert(pointItems);

  return res.json({ success: true });
});

export default routes;
