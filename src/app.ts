import express from 'express';
import routes from './routes';
import * as mongoose from 'mongoose';
export class App{
  public app: express.Application;
  private mongoUrl = 'mongodb://localhost/';
  constructor(){
    this.app = express();
    this.setupRoutes();
    this.mongoSetup();
  }
  
  private setupRoutes(){
    this.app.use(routes);
    this.app.get('/user', (req, res) => {
      res.send('Hello World!');
    });
  }
 
  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { dbName: 'mono_traders'});
  }
}
