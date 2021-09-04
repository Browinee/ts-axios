import { AxiosTransformer } from "../types";


export default function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]) {
    if(!fns) {
        return data;
    }
    let fnsArr: AxiosTransformer[] = [];

    fnsArr = !Array.isArray((fns)) ? [fns] : [...fns];
    fnsArr.forEach(fn => {
        data = (fn)(data, headers);
    })
    return data
}
