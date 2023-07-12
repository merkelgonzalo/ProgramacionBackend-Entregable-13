import { Router } from 'express';
import { createProductsController } from "../controllers/mockings.controller.js";
import { autorization } from '../middlewares/autorization.js';

const router = Router();

router.post('/', /*autorization,*/ createProductsController);

export default router;