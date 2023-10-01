import {Router, Request, Response} from 'express'
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

{/* CONTROLLERS */}
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer'

const router = Router();

{/* UPLOAD MODULE */}
const upload = multer(uploadConfig.upload(process.env.PATH_PASTE));

{/* ROTAS USER */}
// criação de usuário
router.post('/users', new CreateUserController().handle)
// login de sessão de usuário
router.post('/session', new AuthUserController().handle)
// buscar info do usuário
router.get('/me', isAuthenticated, new DetailUserController().handle)

{/* ROTAS CATEGORY */}
// cadastro de categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
// listar todas as categorias
router.get('/category/all', isAuthenticated, new ListCategoryController().handle)

{/* PRODUCTS */}
// cadastro de produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router };