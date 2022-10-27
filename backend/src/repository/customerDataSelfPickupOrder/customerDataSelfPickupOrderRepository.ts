import { EntityRepository, getManager, Repository } from 'typeorm';
import { CustomerDataSelfPickupOrder, ICustomerDataSelfPickupOrder } from '../../entity';
import { ICustomerDataOrderRepository } from '../customerDataOrder/customerDataOrderRepositoryInterface';

@EntityRepository(CustomerDataSelfPickupOrder)
class CustomerDataSelfPickupOrderRepository extends Repository<CustomerDataSelfPickupOrder> implements ICustomerDataOrderRepository {
    public async createCustomerDataSelfPickupOrder(customerDataSelfPickup: ICustomerDataSelfPickupOrder): Promise<ICustomerDataSelfPickupOrder> {
        return getManager()
            .getRepository(CustomerDataSelfPickupOrder)
            .save(customerDataSelfPickup);
    }

    public async getCustomerDataSelfPickupOrder(): Promise<ICustomerDataSelfPickupOrder[]> {
        return getManager()
            .getRepository(CustomerDataSelfPickupOrder)
            .find({ relations: ['products'] });
    }
}

export const customerDataSelfPickupOrderRepository = new CustomerDataSelfPickupOrderRepository();
