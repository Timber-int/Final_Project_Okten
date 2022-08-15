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

    public async plusOrderProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const userOrderFromDB = await userOrderService.getUserOrderById(Number(id));

            if (userOrderFromDB) {
                await userOrderService.plusOrderProduct(Number(id), userOrderFromDB);
            }

            const userOrderData = await userOrderService.getUserOrderById(Number(id));

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }

    public async minusOrderProduct(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const { id } = req.params;

            const userOrderFromDB = await userOrderService.getUserOrderById(Number(id));

            if (userOrderFromDB) {
                await userOrderService.minusOrderProduct(Number(id), userOrderFromDB);
            }

            const userOrderData = await userOrderService.getUserOrderById(Number(id));

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }

    public async createUserOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const order = req.body;
            console.log(order);
            let userOrderData;

            const orderFromDB = await userOrderService.getUserOrderByProductName(order.productName, order.productIngredients);
            console.log(orderFromDB);
            if (orderFromDB
                && orderFromDB.productName === req.body.productName
                && orderFromDB.productIngredients === order.productIngredients) {
                await userOrderService.updateUserOrderById(orderFromDB.id, order, orderFromDB);
                userOrderData = await userOrderService.getUserOrderById(orderFromDB.id);
            } else if (!orderFromDB
                || orderFromDB?.productIngredients !== order.productIngredients
                || orderFromDB?.productName !== req.body.productName) {
                userOrderData = await userOrderService.createUserOrder(order);
            }

            res.json({ data: userOrderData });
        } catch (e) {
            next(e);
        }
    }
}

export const userOrderController = new UserOrderController();
