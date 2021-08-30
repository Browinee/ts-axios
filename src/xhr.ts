import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {data = null, url, method = 'get', headers = {}, responseType} = config;
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
            const responseHeaders = request.getAllResponseHeaders();
            const responseData = (responseType && responseType !== "text") ? request.response : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request,
            };
            resolve(response);
        }
    })
}