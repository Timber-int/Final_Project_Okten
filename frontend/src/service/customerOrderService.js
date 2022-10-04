import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const customerOrderService = {
    createCustomerOrder: (payload) => axiosService.post(baseURL + urls.customerOrders, payload)
        .then(value => value.data),
    createCustomerOrderSelfPickup: (payload) => axiosService.post(baseURL + urls.customerOrderSelfPickup, payload)
        .then(value => value.data),
    getCustomerOrders: () => axiosService.get(baseURL + urls.customerOrders)
        .then(value => value.data),
    getCustomerOrdersSelfPickup: () => axiosService.get(baseURL + urls.customerOrderSelfPickup)
        .then(value => value.data),
};
