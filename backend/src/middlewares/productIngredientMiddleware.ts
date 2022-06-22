import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productIngredientService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class ProductIngredientMiddleware {
    public async checkIsProductIngredientExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productIngredientFromDB = await productIngredientService.getProductIngredientByName(req.body.productIngredientName);

            if (productIngredientFromDB) {
                next(new ErrorHandler(MESSAGE.PRODUCT_INGREDIENT_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productIngredientMiddleware = new ProductIngredientMiddleware();
