import { Router } from 'express';
import { customerOrderSelfPickupController } from '../controller/customerOrderSelfPickupController';
import { authMiddleware, customerOrderMiddleware } from '../middlewares';

const router = Router();

router.post('/',
    authMiddleware.checkAuthorizationHeader,
    customerOrderMiddleware.checkIsCustomerRegistered,
    customerOrderSelfPickupController.createCustomerDataOrderSelfPickup,
);

export const customerOrderSelfPickupRouter = router;
