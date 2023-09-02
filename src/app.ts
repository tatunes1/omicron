import express from 'express';
import { MongoDbConnect } from './library/databaseManagement/mongodb/mongoDb.connect';

import routes from './routes';
export class App{
  public app: express.Application;
  constructor(){
    this.app = express();
    this.app.use(express.json());
    this.setupRoutes();
    this.setupMongo();
  }
  
  private setupRoutes(){
    this.app.use(routes);
    this.app.get('/user', (req, res) => {
      res.send('Hello World!');
    });
  }
 
  private setupMongo(): void {
   MongoDbConnect.createConnection();
  }
}
