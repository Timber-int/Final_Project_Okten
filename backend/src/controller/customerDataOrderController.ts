import { NextFunction, Response } from 'express';
import { CustomerProductsForOrder } from '../entity';
import { IRequestExtended } from '../interface';
import { customerDataOrderService, customerProductsForOrderService, emailService } from '../service';
import { EmailActionEnum } from '../emailInformation';

class CustomerDataOrderController {
    public async createCustomerDataOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
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

            const customerData = await customerDataOrderService.createCustomerDataOrder({
                ...userData,
                totalOrderCount,
                usedOrderType,
                servetStatus,
            })
                .then((customerData) => {
                    chosenOrderProducts.forEach((customerProductData: CustomerProductsForOrder) => {
                        // @ts-ignore
                        delete customerProductData['id'];
                        customerProductsForOrderService.createCustomerProductsForOrder({
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

    public async getCustomerDataOrder(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const customerData = await customerDataOrderService.getCustomerDataOrder();

            res.json(customerData);
        } catch (e) {
            next(e);
        }
    }
}

export const customerDataOrderController = new CustomerDataOrderController();
