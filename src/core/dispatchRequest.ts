import {AxiosRequestConfig, AxiosResponse} from "../types";
import xhr from './xhr'
import {bulidURL, combineURLs, isAbsoluteURL} from "../helpers/url";
import {flattenHeaders} from "../helpers/header";
import transform from "./transform";


export function transformUrl (config: AxiosRequestConfig): string {
    const {url = "", params, baseURL, paramsSerializer} = config;
    const combinedUrl = baseURL && !isAbsoluteURL(url!) ? combineURLs(baseURL, url) : url;
    return bulidURL(combinedUrl, params, paramsSerializer);
}

function transformResponseData (res: AxiosResponse): AxiosResponse {
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}

function flattenHeader (config: AxiosRequestConfig): any {
    return flattenHeaders(config.headers, config.method!)
}

function throwIfCancellationRequested (config: AxiosRequestConfig) {
    if(config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}

function dispatchRequest (config: AxiosRequestConfig) {
    throwIfCancellationRequested(config);
    config.url = transformUrl(config);
    config.data = transform(config.data, config.headers, config.transformRequest);
    config.headers = flattenHeader(config);

    return xhr(config).then(transformResponseData);
}

export default dispatchRequest
