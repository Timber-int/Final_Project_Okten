import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const orderService = {
    createOrder: (orderData) => axiosService.post(baseURL + urls.orders, orderData)
        .then(value => value.data),
    getAllOrder: () => axiosService.get(baseURL + urls.orders)
        .then(value => value.data),
    deleteOrderById: (id) => axiosService.delete(baseURL + urls.orders + '/' + id)
        .then(value => value.data),
    plusOrderProduct: (id, productData) => axiosService.put(baseURL + urls.orders + '/plus/' + id, productData)
        .then(value => value.data),
};
