import path from 'path';
import * as core from 'express-serve-static-core';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errors } from 'celebrate';

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
  }
}

export default new App().server;
