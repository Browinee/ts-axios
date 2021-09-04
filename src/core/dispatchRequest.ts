import {AxiosRequestConfig, AxiosResponse} from "../types";
import xhr from './xhr'
import {bulidURL} from "../helpers/url";
import {transformRequest, transformResponse} from "../helpers/data";
import {flattenHeaders, processHeaders} from "../helpers/header";
import transform from "./transform";


export function transformUrl (config: AxiosRequestConfig): string {
    const {url = "", params} = config;
    return bulidURL(url, params);
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

function flattenHeader (config: AxiosRequestConfig): any {
    return flattenHeaders(config.headers, config.method!)
}

function dispatchRequest (config: AxiosRequestConfig) {
    config.url = transformUrl(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeader(config);

    return xhr(config).then(transformResponseData);
}

export default dispatchRequest
