
import {isObject} from './util'

export function transformRequest (data: any): any {
    console.log("data", {data, b: isObject(data), c: JSON.stringify(data)})
    if (isObject(data)) {
        return JSON.stringify(data)
    }
    return data
}