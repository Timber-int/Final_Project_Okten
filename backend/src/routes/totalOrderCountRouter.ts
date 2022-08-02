import { Router } from 'express';
import { totalOrderCountController } from '../controller';
import { totalOrderCountMiddleware } from '../middlewares';

const router = Router();

router.get('/', totalOrderCountController.getAllTotalOrderCount);
router.post('/', totalOrderCountMiddleware.checkIsTotalCountProductAndCategoryExists, totalOrderCountController.createTotalOrderCount);
router.delete('/:deletePath', totalOrderCountController.deleteTotalOrderCount);

export const totalOrderCountRouter = router;
