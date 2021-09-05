import {AxiosInstance, AxiosRequestConfig, AxiosStatic} from "./types";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";
import defaults from "./defaults";
import mergeConfig from "./core/mergeConfig";
import CancelToken from "./cancel/CancelToken";

function getAxios (config: AxiosRequestConfig): AxiosStatic {
    const context = new Axios(config);
    const axios = Axios.prototype.request.bind(context)

    extend(axios, context);
    return axios as AxiosStatic;
}

const axios = getAxios(defaults);
axios.create = function(config: AxiosRequestConfig) {
    return getAxios(mergeConfig(defaults, config));
}
axios.CancelToken = CancelToken

export default axios;
