import { Router } from 'express';
import expenditureRouter from './services/expenditureService/routes';
import userRouter from './services/user/routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/expenditure', expenditureRouter);

export default routes;
