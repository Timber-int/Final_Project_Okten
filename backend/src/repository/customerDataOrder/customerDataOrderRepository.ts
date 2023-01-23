import { EntityRepository, getManager, Repository } from 'typeorm';
import { ICustomerDataOrderRepository } from './customerDataOrderRepositoryInterface';
import { CustomerDataOrder, ICustomerDataOrder } from '../../entity';

@EntityRepository(CustomerDataOrder)
class CustomerDataOrderRepository extends Repository<CustomerDataOrder> implements ICustomerDataOrderRepository {
    public async createCustomerDataOrder(customerData: ICustomerDataOrder): Promise<ICustomerDataOrder> {
        return getManager()
            .getRepository(CustomerDataOrder)
            .save(customerData);
    }

    public async getCustomerDataOrder(): Promise<ICustomerDataOrder[]> {
        return getManager()
            .getRepository(CustomerDataOrder)
            .find({ relations: ['products'] });
    }
}

export const customerDataOrderRepository = new CustomerDataOrderRepository();