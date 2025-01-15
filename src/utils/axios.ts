import axios from "axios";

const axiosInterceptorInstance = axios.create();

//interceptor for http
axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
