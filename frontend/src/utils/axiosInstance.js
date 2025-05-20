import axios from 'axios';
import {BASE_URL} from '../utils/apiPaths.js';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});


//Request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accesToken = localStorage.getItem("token");
        if(accesToken){
            config.headers.Authorization = `Bearer ${accesToken}`;            
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // common error - handle globally
        if(error.response){
            if(error.response.status===401){
                // unauthorized redirect to login page
                window.location.href="/login"
            } else if(error.response.status===500){
                console.log("Server error! Please try again!");
            } else if(error.code === "ECONNABORTED"){
                console.log("Request timmed out please try again.");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;