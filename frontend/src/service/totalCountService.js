import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const totalCountService = {
    getAllOrderCount: () => axiosService.get(baseURL + urls.totalCounts)
        .then(value => value.data),
    createOrderCount: (dataCount) => axiosService.post(baseURL + urls.totalCounts, dataCount)
        .then(value => value.data),
    deleteTotalOrderCount: (deletePath) => axiosService.delete(baseURL + urls.totalCounts + '/' + deletePath)
        .then(value => value.data),
};
