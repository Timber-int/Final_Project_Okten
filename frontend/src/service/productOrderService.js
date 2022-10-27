import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productOrderService = {
    getAllProductOrder: () => axiosService.get(baseURL + urls.customerProductsForOrder)
        .then(value => value.data),
};
