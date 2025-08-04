import Logging from "../../library/logging/logging";
import { UserDao } from "./dao";

export class UserService{
  public  async getUsers() {
    console.log('getting user information');
    const users = await UserDao.getUsers();
    console.log('users: ', users);
    return users;
  }

  public async addUser(payload: any){
    Logging.info(`addUser ${payload.first_name}`);
    const response = await UserDao.addUser(payload);
    Logging.info(`user has been added with fields ${payload}`);
  }
}