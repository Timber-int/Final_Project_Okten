import { NextFunction, Response, Router } from 'express';
import { productController } from '../controller';
import { IRequestExtended } from '../interface';
import { createProductValidator, updateProductValidator } from '../validator';
import {
    authMiddleware, dataValidatorMiddleware, fileMiddleware, productMiddleware,
} from '../middlewares';

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createProductValidator;
        next();
    },
    authMiddleware.checkIsUserHasLawAdministrator,
    dataValidatorMiddleware.dataValidator,
    productMiddleware.checkIsProductExist,
    fileMiddleware.checkIsProductPhotoFileExist,
    fileMiddleware.checkIsProductBigPhotoFileExist,
    productController.createProduct);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductValidator;
        next();
    },
    authMiddleware.checkIsUserHasLawAdministrator,
    dataValidatorMiddleware.dataValidator,
    productMiddleware.checkIsProductExist,
    fileMiddleware.checkIsProductBigPhotoFileExist,
    fileMiddleware.checkIsProductPhotoToUpdateFileExist,
    productController.updateProductById);

router.delete('/:id', authMiddleware.checkIsUserHasLawAdministrator, productController.deleteProductById);

export const productRouter = router;
