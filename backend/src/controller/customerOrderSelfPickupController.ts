import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { customerDataSelfPickupOrderService, customerProductsForSelfPickupService } from '../service';
import { CustomerProductsForSelfPickup } from '../entity';

class CustomerOrderSelfPickupController {
    public async createCustomerDataOrderSelfPickup(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                userData,
                totalOrderCount,
                usedOrderType,
                servetStatus,
                chosenOrderProducts,
            } = req.body;

            if (chosenOrderProducts.length === 0) {
                return;
            }

            const customerData = await customerDataSelfPickupOrderService.createCustomerDataSelfPickupOrder({
                ...userData,
                totalOrderCount,
                usedOrderType,
                servetStatus,
            })
                .then((customerData) => {
                    chosenOrderProducts.forEach((customerProductData: CustomerProductsForSelfPickup) => {
                        // @ts-ignore
                        delete customerProductData['id'];
                        customerProductsForSelfPickupService.createCustomerProductsForSelfPickup({
                            ...customerProductData,
                            customerId: customerData.id,
                        });
                    });
                });

            res.json(customerData);
        } catch (e) {
            next(e);
        }
    }
}

export const customerOrderSelfPickupController = new CustomerOrderSelfPickupController();
