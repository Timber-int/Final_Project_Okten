import { NextFunction, Response, Router } from 'express';
import { productInformationController } from '../controller/productInformationController';
import { IRequestExtended } from '../interface';
import { createProductInformationValidator, updateProductInformationValidator } from '../validator';
import { dataValidatorMiddleware } from '../middlewares';
import { productInformationMiddleware } from '../middlewares/productInformationMiddleware';

const router = Router();

router.get('/', productInformationController.getAllProductInformation);
router.get('/:id', productInformationController.getProductInformationById);
router.post('/',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = createProductInformationValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productInformationMiddleware.checkIsProductInformationExist,
    productInformationController.createProductInformation);
router.put('/:id',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = updateProductInformationValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    productInformationController.updateProductInformationById);
router.delete('/:id', productInformationController.deleteProductInformationById);

export const productInformationRoute = router;
