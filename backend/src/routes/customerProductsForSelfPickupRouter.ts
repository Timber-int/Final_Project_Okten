import { Router } from 'express';
import { customerProductsForSelfPickupController } from '../controller';

const router = Router();

router.get('/', customerProductsForSelfPickupController.getCustomerProductsForSelfPickup);

export const customerProductsForSelfPickupRouter = router;
