import { CustomerProductsForSelfPickup, ICustomerProductsForSelfPickup } from '../entity';
import { customerProductsForSelfPickupRepository } from '../repository';

class CustomerProductsForSelfPickupService {
    public async createCustomerProductsForSelfPickup(customerProduct: CustomerProductsForSelfPickup): Promise<ICustomerProductsForSelfPickup> {
        return customerProductsForSelfPickupRepository.createCustomerProductsForSelfPickup(customerProduct);
    }

    public async getCustomerProductsForSelfPickup(): Promise<ICustomerProductsForSelfPickup[]> {
        return customerProductsForSelfPickupRepository.getCustomerProductsForSelfPickup();
    }
}

export const customerProductsForSelfPickupService = new CustomerProductsForSelfPickupService();
