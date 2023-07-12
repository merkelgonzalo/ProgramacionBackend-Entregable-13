import { Router } from 'express';
import { getProductsController, getProductController, createProductController, updateProductController, deleteProductController } from "../controllers/products.controller.js";
import { autorization } from '../middlewares/autorization.js';

const router = Router();

router.get('/', getProductsController);

router.get('/:pid', getProductController);

router.post('/', /*autorization,*/ createProductController);

router.put('/:pid', /*autorization,*/ updateProductController);

router.delete('/:pid', /*autorization,*/ deleteProductController);

export default router;