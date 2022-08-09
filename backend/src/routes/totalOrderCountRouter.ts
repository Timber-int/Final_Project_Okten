import { Router } from 'express';
import { totalOrderCountController } from '../controller';
import { totalOrderCountMiddleware } from '../middlewares';

const router = Router();

router.get('/', totalOrderCountController.getAllTotalOrderCount);
router.post('/', totalOrderCountMiddleware.checkIsTotalCountProductAndCategoryExists, totalOrderCountController.createTotalOrderCount);
router.delete('/:deletePath', totalOrderCountController.deleteTotalOrderCount);
router.put('/plus/:uniqueName', totalOrderCountMiddleware.checkIsTotalCountProductAndCategoryExists, totalOrderCountController.plusTotalOrderCount);
router.put('/minus/:uniqueName', totalOrderCountMiddleware.checkIsTotalCountProductAndCategoryExists, totalOrderCountController.minusTotalOrderCount);

export const totalOrderCountRouter = router;
