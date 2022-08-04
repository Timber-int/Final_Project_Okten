import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const partnersRequestService = {
    createPartnerRequest: (data) => axiosService.post(baseURL + urls.partnerRequests, data)
        .then(value => value.data),
};
