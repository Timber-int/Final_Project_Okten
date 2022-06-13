import { NextFunction, Response, Router } from 'express';
import { categoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { createOrUpdateCategoryValidator } from '../validator';
import { categoryMiddleware, dataValidatorMiddleware } from '../middlewares';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createOrUpdateCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryExist,
    categoryController.createCategory,
);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createOrUpdateCategoryValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryIdExist,
    categoryMiddleware.checkIsCategoryExist,
    categoryController.updateCategoryById,
);

router.delete('/:id',
    categoryMiddleware.checkIsCategoryIdExist,
    categoryController.deleteCategoryById,
);

export const categoryRouter = router;
