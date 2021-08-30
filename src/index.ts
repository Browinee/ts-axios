import {AxiosRequestConfig} from "../types";
import xhr from './xhr'
import {bulidURL} from "./helpers/url";
import {transformRequest} from "./helpers/data";


function transformUrl (config: AxiosRequestConfig): AxiosRequestConfig {
    const {url, params} = config
    return {
        ...config,
        url: bulidURL(url, params),
    }
}

function transformReqeustData (config: AxiosRequestConfig): AxiosRequestConfig {
    const {data} = config
    return transformRequest(data)
}

function axios (config: AxiosRequestConfig) {
    const transformedUrlConfig = [transformUrl, transformReqeustData].reduce((config, transformFn) => {
        transformFn(config);
        return config
    }, config);
    xhr(transformedUrlConfig)
}

export default axios