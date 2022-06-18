import { NextFunction, Response, Router } from 'express';
import { productController } from '../controller/productController';
import { IRequestExtended } from '../interface';
import { createProductValidator, updateProductValidator } from '../validator';
import { dataValidatorMiddleware, fileMiddleware, productMiddleware } from '../middlewares';

const router = Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.get('/photo/:photo', productMiddleware.checkIsProductPhotoExist, productController.getProductPhoto);

router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createProductValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productMiddleware.checkIsProductExist,
    fileMiddleware.checkIsProductPhotoFileExist,
    productController.createProduct);

router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productMiddleware.checkIsProductExist,
    productController.updateProductById);

router.delete('/:id', productController.deleteProductById);

export const productRouter = router;
