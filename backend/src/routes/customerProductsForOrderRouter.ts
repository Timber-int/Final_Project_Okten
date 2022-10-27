import { Router } from 'express';
import { customerProductsForOrderController } from '../controller';

const router = Router();

router.get('/', customerProductsForOrderController.getCustomerProductsForOrder);

export const customerProductsForOrderRouter = router;
