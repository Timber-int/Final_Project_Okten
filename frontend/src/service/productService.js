import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productService = {
    getAllProducts: (page = 1) => axiosService.get(baseURL + urls.products)
        .then(value => value.data),
    getProductById: (id) => axiosService.get(baseURL + urls.products + '/' + id)
        .then(value => value.data),

};
