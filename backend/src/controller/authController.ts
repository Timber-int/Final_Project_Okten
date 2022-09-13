import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import {
    authService, passwordService, tokenService, userService,
} from '../service';
import { IUser } from '../entity';
import { MESSAGE } from '../message';
import { CONSTANTS } from '../constants';

class AuthController {
    public async registration(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            req.body.isActivated = true;

            const user = await userService.createUser(req.body);

            const tokenPair = await authService.registration(user);

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            const userNormalized = await passwordService.userNormalization(user);

            res.cookie(CONSTANTS.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                password: hashPassword,
                id,
                email,
            } = req.user as IUser;

            const { password } = req.body;

            await userService.comparePassword(password, hashPassword);

            const tokenPair = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveTokenToDB({
                userId: id,
                refreshToken,
                accessToken,
            });

            const userNormalized = await passwordService.userNormalization(req.user);

            res.cookie(CONSTANTS.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
                firstName,
                lastName,
            } = req.user as IUser;

            await tokenService.deleteToken(id);

            res.clearCookie(CONSTANTS.REFRESH_TOKEN);

            res.json(`${MESSAGE.LOGOUT_USER} ${firstName} ${lastName}`);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
                email,
            } = req.user as IUser;

            const tokenPair = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            const {
                accessToken,
                refreshToken,
            } = tokenPair;

            await tokenService.saveTokenToDB({
                userId: id,
                refreshToken,
                accessToken,
            });

            const userNormalized = await passwordService.userNormalization(req.user);

            res.clearCookie(CONSTANTS.REFRESH_TOKEN);

            res.cookie(CONSTANTS.REFRESH_TOKEN, refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({
                accessToken,
                refreshToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
                email,
            } = req.user as IUser;

            const actionToken = await tokenService.generateActionToken({
                userId: id,
                userEmail: email,
            });

            await tokenService.saveActionTokenToDB({
                userId: id,
                actionToken,
            });

            const userNormalized = await passwordService.userNormalization(req.user);

            res.json({
                actionToken,
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }

    public async setNewPassword(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id,
            } = req.user as IUser;

            await userService.updateUser(id, req.body);

            await tokenService.deleteActionToken(id);

            const userNormalized = await passwordService.userNormalization(req.user);

            res.json({
                user: userNormalized,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
