import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import OngController from './app/controllers/Ong';
import IncidentController from './app/controllers/Incident';
import ProfileController from './app/controllers/Profile';
import SessionController from './app/controllers/Session';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/ongs', OngController.store);
routes.get('/ongs', OngController.index);

routes.get('/incidents', IncidentController.index);
routes.use(authMiddleware);

routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

export default routes;
