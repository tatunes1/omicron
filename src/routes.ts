import { Router } from 'express';
import userRouter from './services/user/user.routes';

const routes = Router();

routes.use('/users', userRouter);

export default routes;
