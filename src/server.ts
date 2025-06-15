import type { Application } from 'express';
import app from './app';
import { DB, DB_HOST, DB_PARAMETERS, PORT } from './constants';
import { connectMongodb } from './lib';
import { handleShutDown } from './shutdown';

const server = (app: Application) => {
  return app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
  });
};

connectMongodb(DB_HOST, DB, DB_PARAMETERS)
  .then(() => {
    console.log('MongoDB is connected to the application');
    const application = server(app);
    handleShutDown(application);
  })
  .catch((err) => console.error(err));
