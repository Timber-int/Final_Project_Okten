import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService, productService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class TotalOrderCountMiddleware {
    public async checkIsTotalCountProductAndCategoryExists(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productCategory = await categoryService.getCategoryById(req.body.categoryId);

            if (!productCategory) {
                next(new ErrorHandler(MESSAGE.NOT_CATEGORY, STATUS.CODE_404));
                return;
            }
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

export const totalOrderCountMiddleware = new TotalOrderCountMiddleware();
