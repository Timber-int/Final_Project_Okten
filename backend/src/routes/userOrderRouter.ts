import { NextFunction, Response, Router } from 'express';
import { userOrderController } from '../controller';
import { dataValidatorMiddleware, totalOrderCountMiddleware } from '../middlewares';
import { IRequestExtended } from '../interface';
import { createProductOrderValidator } from '../validator';

const router = Router();

router.get('/', userOrderController.getAllUserOrder);
router.get('/:id', userOrderController.getUserOrderById);
router.delete('/:id', userOrderController.deleteUserOrder);
router.put('/plus/:id', userOrderController.plusOrderProduct);
router.put('/minus/:id', userOrderController.minusOrderProduct);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createProductOrderValidator;
    next();
}, dataValidatorMiddleware.dataValidator, totalOrderCountMiddleware.checkIsTotalCountProductAndCategoryExists, userOrderController.createUserOrder);

export const userOrderRouter = router;
