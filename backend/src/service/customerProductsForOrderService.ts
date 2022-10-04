import { CustomerProductsForOrder, ICustomerProductsForOrder } from '../entity';
import { customerProductsForOrderRepository } from '../repository';

class CustomerProductsForOrderService {
    public async createCustomerProductsForOrder(customerProduct: CustomerProductsForOrder): Promise<ICustomerProductsForOrder> {
        return customerProductsForOrderRepository.createCustomerProductsForOrder(customerProduct);
    }

    public async getCustomerProductsForOrder(): Promise<ICustomerProductsForOrder[]> {
        return customerProductsForOrderRepository.getCustomerProductsForOrder();
    }
}

export const customerProductsForOrderService = new CustomerProductsForOrderService();
