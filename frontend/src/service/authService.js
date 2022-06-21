import {axiosService} from "./axiosService";
import {baseURL, urls} from "../config";

export const authService = {
    registration: (data) => axiosService.post(baseURL + urls.auth + urls.registration, data).then(value => value.data),
    login: (data) => axiosService.post(baseURL + urls.auth + urls.login, data).then(value => value.data),
}
