import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const categoryService = {
    getAllCategories: () => axiosService.get(baseURL + urls.categories)
        .then(value => value.data),
    getCategoryById: (id) => axiosService.get(baseURL + urls.categories + '/' + id)
        .then(value => value.data),
    deleteCategoryById: (id) => axiosService.delete(baseURL + urls.categories + '/' + id)
        .then(value => value.data),
    updateCategoryById: (id, formData) => axiosService.put(baseURL + urls.categories + '/' + id, formData)
        .then(value => value.data),
    createCategory: (category) => axiosService.post(baseURL + urls.categories, category)
        .then(value => value.data),
};
