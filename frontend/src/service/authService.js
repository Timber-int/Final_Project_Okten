import { axiosService } from './axiosService';
import { baseURL, urls } from '../config';

export const authService = {
    registration: (data) => axiosService.post(baseURL + urls.auth + urls.registration, data)
        .then(value => value.data),
    login: (data) => axiosService.post(baseURL + urls.auth + urls.login, data)
        .then(value => value.data),
    logout: () => axiosService.post(baseURL + urls.auth + urls.logout)
        .then(value => value.data),
    refresh: () => axiosService.post(baseURL + urls.auth + urls.refresh)
        .then(value => value.data),
    changePassword: (emailData) => axiosService.post(baseURL + urls.auth + urls.forgotPassword, emailData)
        .then(value => value.data),
    setNewPassword: (passwordData) => axiosService.post(baseURL + urls.auth + urls.setNewPassword, passwordData)
        .then(value => value.data),
};
