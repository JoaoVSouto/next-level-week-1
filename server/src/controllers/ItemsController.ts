import { Request, Response } from 'express';

import knex from '../database/connection';

import externalIPv4 from '../utils/externalIPv4';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => ({
      ...item,
      image_url: `http://${externalIPv4?.address}:3333/uploads/${item.image}`,
    }));

    return res.json(serializedItems);
  }
}

export default new ItemsController();
