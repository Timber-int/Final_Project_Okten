import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const cityAddressService = {
    getAllCityAddress: () => axiosService.get(baseURL + urls.cityAddress)
        .then(value => value.data),
    createCityAddress: (cityAddress) => axiosService.post(baseURL + urls.cityAddress, cityAddress)
        .then(value => value.data),
    deleteCityAddressById: (id) => axiosService.delete(baseURL + urls.cityAddress + '/' + id)
        .then(value => value.data),
};
