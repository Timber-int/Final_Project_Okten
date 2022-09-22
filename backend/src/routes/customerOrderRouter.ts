import { Router } from 'express';
import { customerDataOrderController } from '../controller';
import { authMiddleware, customerOrderMiddleware } from '../middlewares';

const router = Router();

router.post('/',
    authMiddleware.checkAuthorizationHeader,
    customerOrderMiddleware.checkIsCustomerRegistered,
    customerDataOrderController.createCustomerDataOrder,
);

export const customerOrderRouter = router;
