import {AxiosRequestConfig} from "../types";

export default function xhr(config: AxiosRequestConfig):void {
    const {data = null, url, method = 'get', headers = {}}  = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);

    Object.keys(headers).forEach(name => {
        // if data is null, no need for Content-Type
        if (data === null && name.toLowerCase() === 'content-type') {
            delete headers[name]
        }
        request.setRequestHeader(name, headers[name])
    })
    request.send(JSON.stringify(data));
}