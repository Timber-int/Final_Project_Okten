import { Router } from 'express';
import { customerOrderSelfPickupController } from '../controller/customerOrderSelfPickupController';
import { authMiddleware, customerOrderMiddleware } from '../middlewares';

const router = Router();

router.post('/',
    authMiddleware.checkAuthorizationHeader,
    customerOrderMiddleware.checkIsCustomerRegistered,
    customerOrderSelfPickupController.createCustomerDataOrderSelfPickup,
);

router.get('/', authMiddleware.checkAuthorizationHeader, customerOrderSelfPickupController.getCustomerDataOrderSelfPickup);

export const customerOrderSelfPickupRouter = router;
