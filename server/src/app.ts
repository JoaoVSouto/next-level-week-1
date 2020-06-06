import path from 'path';
import * as core from 'express-serve-static-core';
import express, { Errback, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import Youch from 'youch';

import routes from './routes';

class App {
  public readonly server: core.Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(errors());

    this.server.use(
      async (err: Errback, req: Request, res: Response, next: NextFunction) => {
        if (process.env.NODE_ENV === 'development') {
          const errors = await new Youch(err, req).toJSON();

          return res.status(500).json(errors);
        }

        return res.status(500).json({ error: 'Internal server error.' });
      }
    );
  }
}

export default new App().server;
