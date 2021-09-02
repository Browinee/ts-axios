import {AxiosInterceptorManager, RejectedFn, ResolvedFn} from "../types";

interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}


export default class InterceptorManager<T> implements AxiosInterceptorManager<T> {
    interceptors: Array<Interceptor<T> | null>;

    constructor () {
        this.interceptors = [];
    }

    use (resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1
    }

    eject (id: number): void {
        if(this.interceptors[id]) {
            // if we use slice,
            // it will make interceptors length change and
            // may cause  this.interceptors[id] wrong
            this.interceptors[id] = null;
        }
    }
}