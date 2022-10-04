import { NextFunction, Response, Router } from 'express';
import { productIngredientController } from '../controller';
import { IRequestExtended } from '../interface';
import { dataValidatorMiddleware, fileMiddleware, productIngredientMiddleware } from '../middlewares';
import { createProductIngredientValidator, updateProductIngredientValidator } from '../validator/productIngredientValidator';

const router = Router();

router.get('/', productIngredientController.getAllProductIngredients);
router.get('/:id', productIngredientController.getProductIngredientById);
router.post('/', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = createProductIngredientValidator;
    next();
}, dataValidatorMiddleware.dataValidator, productIngredientMiddleware.checkIsProductIngredientExist, fileMiddleware.checkIsProductPhotoFileExist, productIngredientController.createProductIngredient,
);

router.put('/:id', (req: IRequestExtended, res: Response, next: NextFunction) => {
    req.chosenValidationType = updateProductIngredientValidator;
    next();
}, dataValidatorMiddleware.dataValidator, productIngredientMiddleware.checkIsProductIngredientExist, fileMiddleware.checkIsProductPhotoToUpdateFileExist, productIngredientController.updateProductIngredientById,

);
router.delete('/:id', productIngredientController.deleteProductIngredientById);

export const productIngredientRouter = router;
