import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const cityService = {
    getAllCities: () => axiosService(baseURL + urls.cities)
        .then(value => value.data),
    getAllCityById: (id) => axiosService(baseURL + urls.cities + '/' + id)
        .then(value => value.data),
};
