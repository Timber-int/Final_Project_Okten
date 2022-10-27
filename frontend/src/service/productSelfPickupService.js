import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productSelfPickupService ={
    getAllProductSelfPickup: () => axiosService.get(baseURL + urls.customerProductsForSelfPickup)
        .then(value => value.data),
}
