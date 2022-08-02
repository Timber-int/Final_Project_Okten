import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const cityService = {
    getAllCities: () => axiosService.get(baseURL + urls.cities)
        .then(value => value.data),
    getAllCityById: (id) => axiosService.get(baseURL + urls.cities + '/' + id)
        .then(value => value.data),
    deleteCityById: (id) => axiosService.delete(baseURL + urls.cities + '/' + id)
        .then(value => value.data),
    getCityByName: (cityName) => axiosService.get(baseURL + urls.cities + '/city/' + cityName)
        .then(value => value.data),
    createCity: (city) => axiosService.post(baseURL + urls.cities, city)
        .then(value => value.data),
};
