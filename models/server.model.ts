import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.route';
import db from '../db/connection';

import './user.model';
import './group.model';
import './payment.model';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Init methods
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.sync();
      console.log('Database is online');
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    // Parse body
    this.app.use(express.json());
    // Public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

export default Server;
