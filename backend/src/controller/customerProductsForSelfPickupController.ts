import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { customerProductsForSelfPickupService } from '../service';

class CustomerProductsForSelfPickupController {
    public async getCustomerProductsForSelfPickup(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const productsForSelfPickup = await customerProductsForSelfPickupService.getCustomerProductsForSelfPickup();

            res.json({ productsForSelfPickup });
        } catch (e) {
            next(e);
        }
    }
}

export const customerProductsForSelfPickupController = new CustomerProductsForSelfPickupController();
