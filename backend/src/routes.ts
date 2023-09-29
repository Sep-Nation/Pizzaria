import {Router, Request, Response} from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

{/* CONTROLLERS */}
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

{/* ROTAS USER */}
// criação de usuario
router.post('/users', new CreateUserController().handle)
// login de sessão de usuario
router.post('/session', new AuthUserController().handle)
// buscar info do usuario
router.get('/me', isAuthenticated, new DetailUserController().handle)

{/* ROTAS CATEGORY */}
// cadastro de categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
// listar todas as categorias
router.get('/category/all', isAuthenticated, new ListCategoryController().handle)

export { router };