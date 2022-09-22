import { CustomerProductsForOrder, ICustomerProductsForOrder } from '../entity';
import { customerProductsForOrderRepository } from '../repository';

class CustomerProductsForOrderService {
    public async createCustomerProductsForOrder(customerProduct: CustomerProductsForOrder): Promise<ICustomerProductsForOrder> {
        return customerProductsForOrderRepository.createCustomerProductsForOrder(customerProduct);
    }
}

export const customerProductsForOrderService = new CustomerProductsForOrderService();
