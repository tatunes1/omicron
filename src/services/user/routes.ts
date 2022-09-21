import { request, response, Router } from 'express';
import Logging from '../../library/logging/logging';
import { UserService } from './service';

const userRouter = Router();
const userService: UserService =  new UserService();

userRouter.get('/getUsers', async (request, response) => {
  const users = await userService.getUsers()
  return response.send(users);
});

userRouter.post('/addUser', async (request, response) => {
  Logging.info(`request: ${JSON.stringify(request.params)}`);
  Logging.info(`request body: ${JSON.stringify(request.body)}`);
  await userService.addUser(request.body);
  response.send('Successfully added user');
})

export default userRouter;
