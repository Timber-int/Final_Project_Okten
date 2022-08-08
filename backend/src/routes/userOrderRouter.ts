import { NextFunction, Response, Router } from 'express';
import { userOrderController } from '../controller';
import { dataValidatorMiddleware } from '../middlewares';
import { IRequestExtended } from '../interface';
import { createProductOrderValidator } from '../validator';

const router = Router();

router.get('/', userOrderController.getAllUserOrder);
router.get('/:id', userOrderController.getUserOrderById);
router.delete('/:id', userOrderController.deleteUserOrder);
router.put('/plus/:id', userOrderController.plusOrderProduct);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createProductOrderValidator;
    next();
}, dataValidatorMiddleware.dataValidator, userOrderController.createUserOrder);

export const userOrderRouter = router;
