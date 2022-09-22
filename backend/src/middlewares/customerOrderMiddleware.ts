import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';

class CustomerOrderMiddleware {
    public async checkIsCustomerRegistered(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userWithEmail = await userService.getUserByEmail(req.body.userData.email);

            if (!userWithEmail) {
                next(new ErrorHandler(MESSAGE.USER_EXIST, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const customerOrderMiddleware = new CustomerOrderMiddleware();
