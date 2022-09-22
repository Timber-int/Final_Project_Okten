import { EntityRepository, getManager, Repository } from 'typeorm';
import { CustomerProductsForOrder, ICustomerProductsForOrder } from '../../entity';
import { ICustomerProductsForOrderRepository } from './customerProductsForOrderRepositoryInterface';

@EntityRepository(CustomerProductsForOrder)
class CustomerProductsForOrderRepository extends Repository<CustomerProductsForOrder> implements ICustomerProductsForOrderRepository {
    public async createCustomerProductsForOrder(customerProduct: CustomerProductsForOrder): Promise<ICustomerProductsForOrder> {
        return getManager()
            .getRepository(CustomerProductsForOrder)
            .save(customerProduct);
    }
}

export const customerProductsForOrderRepository = new CustomerProductsForOrderRepository();
