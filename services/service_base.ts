import axios from "axios";

const API_URL = 'http://192.168.0.18:3000'; //casa

// const token = useSession().session;

export const axiosInstance = axios.create({
    baseURL: API_URL,
    paramsSerializer: {
        indexes: null
    }
});

const get = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.get<T>(endpoint, {params})

const post = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.post<T>(API_URL + endpoint, params)

const put = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.put<T>(API_URL + endpoint, params)

const deletar = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.delete<T>(API_URL + endpoint, {params})

const patch = <T extends unknown>(endpoint: string, params: any = {}) => 
    axiosInstance.patch<T>(API_URL + endpoint, params)


const errorHandlerDebug = (error: any) => {
    console.log("\n\nerror.toJson:  ################################################################################")
    console.log(error.toJSON())
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error.response:  #############################################################################")
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } 
    if (error.request) {
        console.log("error.request:   #########################################################################")
        console.log(error.request);
    }
    console.log('Error.message: ', error.message);
    console.log("error.config: ", error.config);
}


export {get, post, put, deletar, errorHandlerDebug, patch}