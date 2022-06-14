import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { productService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class ProductInformationMiddleware {
    public async checkIsProductInformationExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productFromDB = await productService.getProductById(req.body.productId);

            if (!productFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_PRODUCT, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const productInformationMiddleware = new ProductInformationMiddleware();
