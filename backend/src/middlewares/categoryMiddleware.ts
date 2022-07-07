import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { categoryService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CategoryMiddleware {
    public async checkIsCategoryNameExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const categoryFromDB = await categoryService.getCategoryByName(req.body.name);

            if (categoryFromDB) {
                next(new ErrorHandler(MESSAGE.CATEGORY_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsCategoryIdExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const categoryFromDB = await categoryService.getCategoryById(Number(id));

            if (!categoryFromDB) {
                next(new ErrorHandler(MESSAGE.NOT_CATEGORY, STATUS.CODE_404));
                return;
            }

            req.category = categoryFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const categoryMiddleware = new CategoryMiddleware();
