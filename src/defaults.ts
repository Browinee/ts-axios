import { AxiosRequestConfig } from "./types";
import {transformRequest, transformResponse} from "./helpers/data";
import {processHeaders} from "./helpers/header";

const defaults: AxiosRequestConfig = {
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    timeout: 0,
    headers: {
        common: {
            Accept: "application/json, text/plain, */*"
        }
    },
    transformRequest: [
        function(data: any, headers: any): any {
            processHeaders(headers, data);
            return transformRequest(data);
        }
    ],
    transformResponse: [
        function(data: any) {
            return transformResponse(data);
        }
    ],
    validateStatus(status: Number): boolean {
        return status >= 200 && status < 300
    }
};


const methodsNoData = ["delete", "get", "head", "options"];

methodsNoData.forEach(method => {
    defaults.headers[method] = {};
});

const methodsWithData = ["post", "put", "patch"];


methodsWithData.forEach(method => {
    defaults.headers[method] = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
});
export default defaults;