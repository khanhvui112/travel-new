import axios from "axios";
import constant from "../constants/constant.js";

export const httpClientGet = axios.create({
    baseURL: constant.URL,
    headers: {
        'method':'get',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
    }
});

export const httpClientPost = axios.create({
    baseURL: constant.URL,
    headers: {
        'method':'post',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
    }
});

export const httpClientDelete = axios.create({
    baseURL: constant.URL,
    headers: {
        'method':'delete',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
    }
});

export default  axios.create({
    baseURL: constant.URL,
    headers: {
        'method':'put',
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
    }
});