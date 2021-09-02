import {AxiosRequestConfig, AxiosResponse} from "../types";
import xhr from './xhr'
import {bulidURL} from "../helpers/url";
import {transformRequest, transformResponse} from "../helpers/data";
import {processHeaders} from "../helpers/header";


export function transformUrl (config: AxiosRequestConfig): void{
    const {url = "", params} = config
    console.log("config", config)
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
function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data);
    return res;
}

function dispatchRequest (config: AxiosRequestConfig) {
    const transformedUrlConfig = [transformUrl,transformHeaders, transformRequestData].reduce((cfg, transformFn) => {
        transformFn(cfg);
        return cfg
    }, config);
    return xhr(transformedUrlConfig).then(transformResponseData);
}

export default dispatchRequest
