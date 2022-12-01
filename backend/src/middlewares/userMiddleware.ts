import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userService } from '../service';
import { ErrorHandler } from '../errorHandler';
import { MESSAGE } from '../message';
import { STATUS } from '../errorCode';
import { IUser } from '../entity';
import { UserRole } from '../constants';
import { config } from '../config';

class UserMiddleware {
    public async checkIsUserExistsOnDB(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userWithEmail = await userService.getUserByEmail(req.body.email);

            if (userWithEmail) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async setUserRole(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            if (req.body.email === config.SECRET_ADMIN_EMAIL && req.body.password === config.SECRET_ADMIN_PASSWORD) {
                req.body.role = UserRole.ADMIN;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsUserByEmailExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userWithEmail = await userService.getUserByEmail(req.body.email);

            if (!userWithEmail) {
                next(new ErrorHandler(MESSAGE.WRONG_EMAIL_OR_PASSWORD, STATUS.CODE_404));
                return;
            }

            req.user = userWithEmail;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserRole(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userRole = req.userRoles;

            const { role } = req.user as IUser;

            if (role) {
                if (!userRole?.includes(role)) {
                    next(new ErrorHandler(MESSAGE.UNAUTHORIZED, STATUS.CODE_401));
                    return;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
