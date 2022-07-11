import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productService = {
    getAllProducts: (page = 1) => axiosService.get(baseURL + urls.products)
        .then(value => value.data),
    getProductById: (id) => axiosService.get(baseURL + urls.products + '/' + id)
        .then(value => value.data),
    deleteProductById: (id) => axiosService.delete(baseURL + urls.products + '/' + id)
        .then(value => value.data),
    createProduct: (product) => axiosService.post(baseURL + urls.products, product)
        .then(value => value.data),
    updateProductById: (id, product) => axiosService.put(baseURL + urls.products + '/' + id, product)
        .then(value => value.data),

};
