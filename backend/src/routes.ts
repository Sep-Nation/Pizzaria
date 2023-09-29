import {Router, Request, Response} from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

{/* ROTAS USER */}
// criação de usuario
router.post('/users', new CreateUserController().handle)
// login de sessão de usuario
router.post('/session', new AuthUserController().handle)
// buscar info do usuario
router.get('/me', isAuthenticated, new DetailUserController().handle)

export { router };