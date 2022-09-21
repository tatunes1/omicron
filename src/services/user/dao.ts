import Logging from "../../library/logging/logging";
import Users from "./schema";

export class UserDao{
  public static getUsers(){
    return Users.find();
  }

  public static getUserByName(name: string){
    return Users.find({ 'name.first_name': name });
  }

  public static async addUser(addUserReq: any){
    Logging.info(`adding user dao ${JSON.stringify(addUserReq)}`);
    return await Users.create(addUserReq);
  }
}