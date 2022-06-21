import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const sliderService = {
    getAllSliders: () => axiosService.get(baseURL + urls.sliders)
        .then(value => value.data),
};
