import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { customerProductsForOrderService } from '../service';

class CustomerProductsForOrderController {
    public async getCustomerProductsForOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productsForOrder = await customerProductsForOrderService.getCustomerProductsForOrder();

            res.json({ productsForOrder });
        } catch (e) {
            next(e);
        }
    }
}

export const customerProductsForOrderController = new CustomerProductsForOrderController();
