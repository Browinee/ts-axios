import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import {parseHeaders} from "./helpers/header";

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data = null, url, method = 'get', headers = {}, responseType, timeout} = config;
        // Step 1: create XMLHttpRequest object
        const request = new XMLHttpRequest();
        // Step 2: config
        request.open(method.toUpperCase(), url, true);

        Object.keys(headers).forEach(name => {
            // if data is null, no need for Content-Type
            if(data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            }
            request.setRequestHeader(name, headers[name])
        })

        if(responseType) {
            request.responseType = responseType;
        }



        // Step 3: send request
        request.send(JSON.stringify(data));

        // Step 4: register event
        request.onreadystatechange = function handleLoad () {
            if(request.readyState !== 4) {
                return;
            }
            // network error and timeout error
            if (request.status === 0) {
                return;
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
            const responseData = (responseType && responseType !== "text") ? request.response : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request,
            };
            handleResponse(response);
        }

        // 4.1 network error
        request.onerror = function() {
            reject(new Error("Network Error"));
        }
        // 4.2timeout error
        if (timeout) {
            request.timeout = timeout;
        }
        request.ontimeout = function() {
            reject(new Error(`Timeout of ${timeout} ms exceeded`));
        };
        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            } else {
                reject(new Error(`Request failed with status code ${response.status}`));
            }
        }
    })
}