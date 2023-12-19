import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user.route';

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
    this.middlewares();
    this.routes();
  }

  // TODO: Connect to database

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
