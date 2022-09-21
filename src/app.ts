import express from 'express';
import routes from './routes';
import * as mongoose from 'mongoose';
import Logging from './library/logging/logging';
export class App{
  public app: express.Application;
  private mongoUrl = 'mongodb://localhost/';
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
    mongoose.connect(this.mongoUrl, { dbName: 'mono_traders'})
    .then(() => { Logging.info('mongo connected') })
    .catch((error) => { Logging.error(`Error in connecting mongo ${error}`)});
  }
}
