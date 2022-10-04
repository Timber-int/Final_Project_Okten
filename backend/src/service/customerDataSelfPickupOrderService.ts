import { ICustomerDataSelfPickupOrder } from '../entity';
import { customerDataSelfPickupOrderRepository } from '../repository';

export class CustomerDataSelfPickupOrderService {
    public async createCustomerDataSelfPickupOrder(customerDataSelfPickup: ICustomerDataSelfPickupOrder): Promise<ICustomerDataSelfPickupOrder> {
        return customerDataSelfPickupOrderRepository.createCustomerDataSelfPickupOrder(customerDataSelfPickup);
    }

    public async getCustomerDataSelfPickupOrder(): Promise<ICustomerDataSelfPickupOrder[]> {
        return customerDataSelfPickupOrderRepository.getCustomerDataSelfPickupOrder();
    }
}

export const customerDataSelfPickupOrderService = new CustomerDataSelfPickupOrderService();
