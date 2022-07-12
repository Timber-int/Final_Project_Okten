import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const productIngredientService = {
    getAllProductIngredients: () => axiosService.get(baseURL + urls.productIngredients)
        .then(value => value.data),
    deleteProductIngredientById: (id) => axiosService.delete(baseURL + urls.productIngredients + '/' + id)
        .then(value => value.data),
    createProductIngredient: (productIngredient) => axiosService.post(baseURL + urls.productIngredients, productIngredient)
        .then(value => value.data),
    updateProductIngredientById: (id, productIngredient) => axiosService.put(baseURL + urls.productIngredients + '/' + id, productIngredient)
        .then(value => value.data),
};
