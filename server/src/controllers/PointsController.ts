import { Request, Response } from 'express';

import knex from '../database/connection';

class PointsController {
  async create(req: Request, res: Response) {
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

    const point = {
      image: 'placeholder',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx('points').insert(point);

    const [point_id] = insertedIds;

    const pointItems = items.map((item_id: number) => ({
      item_id,
      point_id,
    }));

    await trx('point_items').insert(pointItems);

    return res.json({ id: point_id, ...point });
  }
}

export default new PointsController();
