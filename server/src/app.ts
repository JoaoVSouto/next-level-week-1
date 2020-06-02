import * as core from 'express-serve-static-core';
import express from 'express';
import helmet from 'helmet';

import routes from './routes';

class App {
  public readonly server: core.Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
  }

  private routes() {
    this.server.use(routes);
  }
}

export default new App().server;