import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userRepository } from '../repository';
import { passwordService, userService } from '../service';

class UserController {
    public async getAllUsers(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const users = await userRepository.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getUserById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userFormDB = await userService.getUserById(Number(req.params.id));

            const userNormalized = await passwordService.userNormalization(userFormDB);

            res.json({ user: userNormalized });
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
