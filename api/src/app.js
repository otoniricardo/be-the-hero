import express from 'express';
import { errors } from 'celebrate';
import { resolve } from 'path';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.handleValidationErrors();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }

  handleValidationErrors() {
    this.server.use(errors());
  }
}
export default new App().server;
