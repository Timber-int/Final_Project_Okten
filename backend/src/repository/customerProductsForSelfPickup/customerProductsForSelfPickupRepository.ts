import { EntityRepository, getManager, Repository } from 'typeorm';
import { CustomerProductsForSelfPickup, ICustomerProductsForSelfPickup } from '../../entity';
import { ICustomerProductsForSelfPickupRepository } from './customerProductsForSelfPickupRepositoryInterface';

@EntityRepository(CustomerProductsForSelfPickup)
class CustomerProductsForSelfPickupRepository extends Repository<CustomerProductsForSelfPickup> implements ICustomerProductsForSelfPickupRepository {
    public async createCustomerProductsForSelfPickup(customerProduct: CustomerProductsForSelfPickup): Promise<ICustomerProductsForSelfPickup> {
        return getManager()
            .getRepository(CustomerProductsForSelfPickup)
            .save(customerProduct);
    }
}

export const customerProductsForSelfPickupRepository = new CustomerProductsForSelfPickupRepository();
