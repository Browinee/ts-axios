import {isDate, isObject} from './util';

const encode = (val: string): string => {
    const a = encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
    return a;
}
const hasHash = (url: string) => url.includes('#');

export function bulidURL (url: string, params?: any): string {
    if(!params) {
        return url;
    }

    if(hasHash(url)) {
        const markIndex = url.indexOf('#')
        url = url.slice(0, markIndex)
        return url
    }
    const parts: string[] = [];
    Object.keys(params).forEach((key) => {
        let val = params[key]
        // 如果有为null或undefined的值，不处理直接跳出循环
        if(val === null || typeof val === 'undefined') {
            return
        }
        let values: string[]
        // if val is array, assign to values directly.
        if(Array.isArray(val)) {
            values = val
            key += '[]'
        } else {
            // if not array, make it array, and we could
            // forEach below.
            values = [val]
        }
        values.forEach((val) => {
            if(isDate(val)) {
                val = val.toISOString()
            } else if(isObject(val)) {
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })

    const serializedParams = parts.join('&')

    if(serializedParams) {
        // check if url already contains "?"
        // if yes, add &
        // if no, add ?
        url += (url.includes('?') ? '&' : '?') + serializedParams
    }
    return url;
}

export const isAbsoluteURL = (url: string): boolean => {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export const  combineURLs = (
    baseURL: string,
    relativeURL?: string
): string  => {
    return relativeURL
        ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
        : baseURL;
}
