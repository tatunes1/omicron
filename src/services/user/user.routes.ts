import { Router } from 'express';

const userRouter = Router();

userRouter.get('/getUsers', (request, response) => {
  response.send('ok');
});

export default userRouter;
