import { Router } from 'express';
import { customerDataOrderController } from '../controller';
import { authMiddleware, customerOrderMiddleware } from '../middlewares';

const router = Router();

router.post('/',
    authMiddleware.checkAuthorizationHeader,
    customerOrderMiddleware.checkIsCustomerRegistered,
    customerDataOrderController.createCustomerDataOrder,
);

router.get('/', customerDataOrderController.getCustomerDataOrder);

export const customerOrderRouter = router;
