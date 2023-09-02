import * as mongoose from "mongoose";
import Logging from "../../logging/logging";

export class MongoDbConnect{
  private static mongoUrl = 'mongodb://localhost/';
  private static connection = mongoose.connection;
  public static async createConnection(){
   await mongoose.connect(this.mongoUrl, { dbName: 'mono_traders'})
    .then(() => { Logging.info('mongo connected') })
    .catch((error) => { Logging.error(`Error in connecting mongo ${error}`)});
  }

  public static getConnection(){
    return this.connection;
  }
}