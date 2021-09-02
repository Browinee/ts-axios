import axios from "../../src/axios";


const requestInterceptor1 = axios.interceptors.request.use(config => {
    config.headers.test += "request interceptors 1---";
    return config;
})
axios.interceptors.request.use(config => {
    config.headers.test += "request interceptors 2---";
    return config;
});
axios.interceptors.request.use(config => {
    config.headers.test += "request Interceptors 3---";
    return config;
});

axios.interceptors.response.use(response => {
    response.data.test += "response interceptors 1";
    return response;
});

let responseInterceptor2 = axios.interceptors.response.use(response => {
    response.data.test += "response interceptors 2";
    return response;
});

axios.interceptors.response.use(response => {
    response.data.test += "response interceptors 3";
    return response;
});

axios.interceptors.request.eject(requestInterceptor1);
axios.interceptors.response.eject(responseInterceptor2);

axios.get("/api/user", { headers: { test: "default---" } }).then(res => {
    console.log(res);
});