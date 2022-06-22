import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productIngredientService = {
    getAllProductIngredients: () => axiosService.get(baseURL + urls.productIngredients)
        .then(value => value.data),
};
