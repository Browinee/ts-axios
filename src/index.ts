import {AxiosRequestConfig} from "../types";
import xhr from './xhr'
import {bulidURL} from "./helpers/url";

function axios(config: AxiosRequestConfig) {
    const transformedUrlConfig = processUrl(config)
    xhr(transformedUrlConfig)
}
function processUrl(config: AxiosRequestConfig): AxiosRequestConfig {
    const {url, params} = config
    return {
        ...config,
        url: bulidURL(url, params),
    }
}


export default axios