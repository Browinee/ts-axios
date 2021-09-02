import {AxiosInstance} from "./types";
import Axios from "./core/Axios";
import {extend} from "./helpers/util";

function getAxios (): AxiosInstance {
    const context = new Axios();
    const axios = Axios.prototype.request.bind(context)

    extend(axios, context);
    return axios as AxiosInstance;
}

const axios = getAxios();
export default axios;