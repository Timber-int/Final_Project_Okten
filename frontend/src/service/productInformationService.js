import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productInformationService = {
    getAllProductsInformation: () => axiosService.get(baseURL + urls.productInformation)
        .then(value => value.data),
    getProductInformationById: (id) => axiosService.get(baseURL + urls.productInformation + '/' + id)
        .then(value => value.data),
    deleteProductInformationById: (id) => axiosService.delete(baseURL + urls.productInformation + '/' + id)
        .then(value => value.data),
    createProductInformation: (productInformation) => axiosService.post(baseURL + urls.productInformation, productInformation)
        .then(value => value.data),
    updateProductInformationById: (id, productInformation) => axiosService.put(baseURL + urls.productInformation + '/' + id, productInformation)
        .then(value => value.data),

};
