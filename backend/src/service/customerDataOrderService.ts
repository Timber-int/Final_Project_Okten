import { ICustomerDataOrder } from '../entity';
import { customerDataOrderRepository } from '../repository';

class CustomerDataOrderService {
    public async createCustomerDataOrder(customerData: ICustomerDataOrder): Promise<ICustomerDataOrder> {
        return customerDataOrderRepository.createCustomerDataOrder(customerData);
    }
}

export const customerDataOrderService = new CustomerDataOrderService();
