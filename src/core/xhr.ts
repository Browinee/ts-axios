import {AxiosPromise, AxiosRequestConfig, AxiosResponse} from "../types";
import {parseHeaders} from "../helpers/header";
import {createError} from "../helpers/error";

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            auth,
            data = null,
            url,
            method = 'get',
            headers = {},
            responseType,
            timeout,
            cancelToken,
            withCredentials,
            validateStatus,
        } = config;
        // Step 1: create XMLHttpRequest object
        const request = new XMLHttpRequest();
        // Step 2: config
        request.open(method.toUpperCase(), url || "", true);
        if(auth) {
            const username = auth.username || ""
            const password = auth.password || ""
            headers["Authorization"] = "Basic " + window.btoa(username + ":" + password);
        }
        console.log("headers", headers);
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

        if(withCredentials) {
            request.withCredentials = true
        }

        // Step 3: send request
        request.send(JSON.stringify(data));

        if(cancelToken) {
            cancelToken.promise.then(reason => {
                request.abort();
                reject(reason)
            })
        }


        // Step 4: register event
        request.onreadystatechange = function handleLoad () {
            if(request.readyState !== 4) {
                return;
            }
            // network error and timeout error
            if(request.status === 0) {
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
        request.onerror = function () {
            reject(createError(
                "Network Error",
                config,
                null,
                request
            ));
        }
        // 4.2timeout error
        if(timeout) {
            request.timeout = timeout;
        }
        request.ontimeout = function () {
            reject(
                createError(
                    `Timeout of ${timeout} ms exceeded`,
                    config,
                    "TIMEOUT",
                    request
                )
            );
        };

        function handleResponse (response: AxiosResponse): void {
            if(!validateStatus || validateStatus(response.status)) {
                resolve(response);
            } else {
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request.status,
                    response
                ));
            }
        }
    })
}
