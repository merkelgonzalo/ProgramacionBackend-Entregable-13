import { Router } from 'express';
import { 
    getCartsController, 
    getCartController, 
    createCartController, 
    addProductController, 
    deleteProductController, 
    deleteProductsController, 
    updateProductsController, 
    updateProductController,
    buyCartController
} from '../controllers/carts.controller.js';

const router = Router();

router.get('/', getCartsController);

router.get('/:cid', getCartController);

router.post('/', createCartController);

router.post('/:cid/product/:pid', addProductController);

router.delete('/:cid/products/:pid', deleteProductController);

router.delete('/:cid', deleteProductsController);

router.put('/:cid', updateProductsController);

router.put('/:cid/products/:pid', updateProductController);

router.post('/:cid/purchase', buyCartController);

export default router;