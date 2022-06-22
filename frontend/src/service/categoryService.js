import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const categoryService = {
    getAllCategories: () => axiosService.get(baseURL + urls.categories)
        .then(value => value.data),

};
