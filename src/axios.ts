import {AxiosInstance, AxiosRequestConfig} from "./types";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";
import defaults from "./defaults";

function getAxios (config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config);
    const axios = Axios.prototype.request.bind(context)

    extend(axios, context);
    return axios as AxiosInstance;
}

const axios = getAxios(defaults);
export default axios;