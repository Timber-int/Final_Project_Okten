import { ICustomerDataOrder } from '../entity';
import { customerDataOrderRepository } from '../repository';

class CustomerDataOrderService {
    public async createCustomerDataOrder(customerData: ICustomerDataOrder): Promise<ICustomerDataOrder> {
        return customerDataOrderRepository.createCustomerDataOrder(customerData);
    }

    public async getCustomerDataOrder(): Promise<ICustomerDataOrder[]> {
        return customerDataOrderRepository.getCustomerDataOrder();
    }
}

export const customerDataOrderService = new CustomerDataOrderService();
