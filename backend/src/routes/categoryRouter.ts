import { NextFunction, Response, Router } from 'express';
import { categoryController } from '../controller';
import { IRequestExtended } from '../interface';
import { createCategoryValidator, updateCategoryValidator } from '../validator';
import {
    authMiddleware,
    categoryMiddleware, dataValidatorMiddleware, fileMiddleware,
} from '../middlewares';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createCategoryValidator;
        next();
    },
    authMiddleware.checkIsUserHasLawAdministrator,
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryNameExist,
    fileMiddleware.checkIsCategoryPhotoFileExist,
    categoryController.createCategory,
);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateCategoryValidator;
        next();
    },
    authMiddleware.checkIsUserHasLawAdministrator,
    dataValidatorMiddleware.dataValidator,
    categoryMiddleware.checkIsCategoryIdExist,
    fileMiddleware.checkIsCategoryPhotoToUpdateFileExist,
    categoryMiddleware.checkIsCategoryNameExist,
    categoryController.updateCategoryById,
);

router.delete('/:id',
    authMiddleware.checkIsUserHasLawAdministrator,
    categoryMiddleware.checkIsCategoryIdExist,
    categoryController.deleteCategoryById,
);

export const categoryRouter = router;
