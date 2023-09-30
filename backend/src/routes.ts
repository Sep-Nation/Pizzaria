{/* ESSENCIAIS */}
import {Router, Request, Response} from 'express'
import multer from 'multer';

{/* CONTROLLERS */}
// user controllers
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
// category controllers
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
// product controllers
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController  } from './controllers/product/ListByCategoryController';
// order controllers
import { CreateOrderController } from './controllers/order/CreateOrderController';

{/* MIDDLEWARES */}
import { isAuthenticated } from './middlewares/isAuthenticated';

{/* MULTER CONFIG AND OTHERS */}
import uploadConfig from './config/multer'
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

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

{/* ROTAS PRODUCTS */}
// cadastro de produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
// listar produtos por categoria
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

{/* ROTAS ORDER */}
// cadastro de order - Abertura de mesa
router.post('/order', isAuthenticated, new CreateOrderController().handle)
// deletar order
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

export { router };