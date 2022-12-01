import { NextFunction, Response, Router } from 'express';
import { IRequestExtended } from '../interface';
import { authMiddleware, dataValidatorMiddleware, userMiddleware } from '../middlewares';
import {
    forgotPasswordValidator,
    loginDataValidator,
    setForgotPasswordValidator,
    userBodyForRegistrationValidator,
} from '../validator';
import { authController } from '../controller';
import { UserRole } from '../constants';

const router = Router();

router.post(
    '/registration',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = userBodyForRegistrationValidator;
        next();
    },
    dataValidatorMiddleware.dataValidator,
    userMiddleware.checkIsUserExistsOnDB,
    userMiddleware.setUserRole,
    authController.registration,
);
router.post(
    '/login',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = loginDataValidator;
        req.userRoles = [UserRole.USER, UserRole.MANAGER, UserRole.ADMIN];
        next();
    },
    dataValidatorMiddleware.dataValidator,
    userMiddleware.checkIsUserByEmailExist,
    userMiddleware.checkUserRole,
    authController.login,
);
router.post(
    '/logout',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.userRoles = [UserRole.USER, UserRole.MANAGER, UserRole.ADMIN];
        next();
    },
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole,
    authController.logout,
);
router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
router.post(
    '/forgot/password',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = forgotPasswordValidator;
        req.userRoles = [UserRole.USER, UserRole.MANAGER];
        next();
    },
    dataValidatorMiddleware.dataValidator,
    userMiddleware.checkIsUserByEmailExist,
    userMiddleware.checkUserRole,
    authController.forgotPassword,
);

router.post(
    '/forgot/password/set',
    (req: IRequestExtended, res: Response, next: NextFunction) => {
        req.chosenValidationType = setForgotPasswordValidator;
        req.userRoles = [UserRole.USER, UserRole.MANAGER];
        next();
    },
    dataValidatorMiddleware.dataValidator,
    authMiddleware.checkActionToken,
    userMiddleware.checkUserRole,
    authController.setNewPassword,
);
export const authRouter = router;
