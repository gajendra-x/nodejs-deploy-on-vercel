import express, { type Application } from 'express';
import { injectRouters } from './components/injectRouter';
import { injectMiddleware } from './middlewares/injectMiddlewares';

const app: Application = express();

injectMiddleware(app);
injectRouters(app);

export default app;
