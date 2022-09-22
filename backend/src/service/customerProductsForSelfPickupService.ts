import { CustomerProductsForSelfPickup, ICustomerProductsForSelfPickup } from '../entity';
import { customerProductsForSelfPickupRepository } from '../repository';

class CustomerProductsForSelfPickupService {
    public async createCustomerProductsForSelfPickup(customerProduct: CustomerProductsForSelfPickup): Promise<ICustomerProductsForSelfPickup> {
        return customerProductsForSelfPickupRepository.createCustomerProductsForSelfPickup(customerProduct);
    }
}

export const customerProductsForSelfPickupService = new CustomerProductsForSelfPickupService();
