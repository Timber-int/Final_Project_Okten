import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { userOrderService } from '../service';

class UserOrderController {
    public async getAllUserOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userOrderData = await userOrderService.getAllUserOrder();

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }

    public async getUserOrderById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const userOrderData = await userOrderService.getUserOrderById(Number(id));

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }

    public async deleteUserOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const userOrderData = await userOrderService.deleteUserOrder(Number(id));

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }

    public async createUserOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const userOrderData = await userOrderService.createUserOrder(req.body);

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }
}

export const userOrderController = new UserOrderController();
