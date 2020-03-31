import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authMiddleware from './app/middlewares/auth';

import OngController from './app/controllers/Ong';
import IncidentController from './app/controllers/Incident';
import ProfileController from './app/controllers/Profile';
import SessionController from './app/controllers/Session';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .length(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2),
    }),
  }),
  OngController.store
);

routes.get('/ongs', OngController.index);

routes.get('/incidents', IncidentController.index);

routes.use(authMiddleware);

routes.post(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.store
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

export default routes;
