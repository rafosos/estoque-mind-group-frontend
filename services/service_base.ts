import * as SecureStore from "expo-secure-store";
import axios, { AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import { useToast } from "react-native-toast-notifications";

const API_URL = Platform.OS == "web" ? "http://localhost:3000" : 'http://192.168.0.18:3000'; //casa

export const axiosInstance = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        indexes: null
    }
});

axiosInstance.interceptors.request.use(async function (config){
    let token = '';
    if(Platform.OS === 'web')
        token = localStorage.getItem('session') || '';
    else
        token = await SecureStore.getItemAsync("session") || "";
    
    config.headers['Authorization'] = "Bearer " + token;
    return config;
});

// axiosInstance.interceptors.response.use((config) => config, (error) => {
//     const toast = useToast();
//     toast.show(error, {type: "error"});
//     return Promise.reject(error)
// })

const get = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.get<T>(endpoint, {params});

const post = <T extends unknown>(endpoint: string, params: any = {}, config: AxiosRequestConfig<any> = {}) => 
    axiosInstance.post<T>(API_URL + endpoint, params, config);

const put = <T extends unknown>(endpoint: string, params: any = {}, config: AxiosRequestConfig<any> = {}) => 
    axiosInstance.put<T>(API_URL + endpoint, params, config);

const deletar = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.delete<T>(API_URL + endpoint, {params});

const patch = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.patch<T>(API_URL + endpoint, params);


const errorHandler = (error: any) => {
    const toast = useToast();
    toast.show(error.message, {type: "error"});
    console.log(error)
}


export {get, post, put, deletar, errorHandler, patch}