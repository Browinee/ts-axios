import {AxiosRequestConfig, AxiosRequestConfigKeys} from "../types";
import {deepMerge, isObject} from "../helpers/util";

const DEFAULT_TO_USER_CONFIG = [
    "baseURL",
    "transformRequest",
    "transformResponse",
    "paramsSerializer",
    "timeout",
    "withCredentials",
    "adapter",
    "responseType",
    "xsrfCookieName",
    "xsrfHeaderName",
    "onUploadProgress",
    "onDownloadProgress",
    "maxContentLength",
    "validateStatus",
    "maxRedirects",
    "httpAgent",
    "httpsAgent",
    "cancelToken",
    "socketPath"
];
const VALUE_FROM_USER_CONFIG = ["url", "method", "params", "data"];
const MERGE_DEEP_PROPERTIES = ["headers", "auth", "proxy"];
export default function mergeConfig (defaultConfig: AxiosRequestConfig, userConfig?: AxiosRequestConfig): AxiosRequestConfig {
    if(!userConfig) {
        return defaultConfig;
    }
    const config = Object.create(null);
    DEFAULT_TO_USER_CONFIG.forEach((prop ) => {
        const reAssignPropType = prop as AxiosRequestConfigKeys;
        if(userConfig[reAssignPropType]) {
            config[reAssignPropType] = userConfig[reAssignPropType];
        } else if(defaultConfig[reAssignPropType]) {
            config[reAssignPropType] = defaultConfig[reAssignPropType];
        }
    });

    VALUE_FROM_USER_CONFIG.forEach(prop => {
        const reAssignPropType = prop as AxiosRequestConfigKeys;
        if (userConfig[reAssignPropType]) {
            config[prop] = userConfig[reAssignPropType];
        }
    })

    MERGE_DEEP_PROPERTIES.forEach(prop => {
        const reAssignPropType = prop as AxiosRequestConfigKeys;
        if (isObject(userConfig[reAssignPropType])) {
            config[prop] = deepMerge(defaultConfig[reAssignPropType], userConfig[reAssignPropType]);
        } else if (userConfig[reAssignPropType]) {
            config[prop] = userConfig[reAssignPropType];
        } else if (isObject(defaultConfig[reAssignPropType])) {
            config[prop] = deepMerge(defaultConfig[reAssignPropType]);
        } else if (defaultConfig[reAssignPropType]) {
            config[prop] = defaultConfig[reAssignPropType];
        }
    });
    return config;
}