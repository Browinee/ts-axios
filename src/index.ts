import {AxiosRequestConfig} from "../types";
import xhr from './xhr'
import {bulidURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";
import {processHeaders} from "./helpers/header";


function transformUrl (config: AxiosRequestConfig): void{
    const {url, params} = config
    config.url = bulidURL(url, params)
}

function transformRequestData (config: AxiosRequestConfig): void {
    const {data} = config
    config.data = transformRequest(data);
}

function transformHeaders (config: AxiosRequestConfig): void {
    const {headers = {}, data} = config;
    config.headers = processHeaders(headers, data);
}

function axios (config: AxiosRequestConfig) {
    const transformedUrlConfig = [transformUrl, transformRequestData, transformHeaders].reduce((cfg, transformFn) => {
        transformFn(cfg);
        return cfg
    }, config);
    return xhr(transformedUrlConfig);
}

export default axios