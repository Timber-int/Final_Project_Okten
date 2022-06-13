import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userRepository } from '../repository';

class UserController {
    public async getAllUsers(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const users = await userRepository.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
