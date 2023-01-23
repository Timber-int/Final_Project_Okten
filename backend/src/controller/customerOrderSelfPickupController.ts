import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interface';
import { customerDataSelfPickupOrderService, customerProductsForSelfPickupService, emailService } from '../service';
import { CustomerProductsForSelfPickup } from '../entity';
import { EmailActionEnum } from '../emailInformation';

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

            await emailService.sendMail(userData.email, EmailActionEnum.SEND_ORDER_DATA, {
                userData,
                chosenOrderProducts,
                totalOrderCount,
                usedOrderType,
            });

            res.json(customerData);
        } catch (e) {
            next(e);
        }
    }

    public async getCustomerDataOrderSelfPickup(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const customerData = await customerDataSelfPickupOrderService.getCustomerDataSelfPickupOrder();

            res.json(customerData);
        } catch (e) {
            next(e);
        }
    }
}

export const customerOrderSelfPickupController = new CustomerOrderSelfPickupController();
