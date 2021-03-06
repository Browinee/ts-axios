import CancelToken from "../cancel/cancelToken";
import Cancel from "../cancel/Cancel";

export type Method = 'get' | 'GET'
    | 'delete' | 'Delete'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'

export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];

    [propName: string]: any;

    withCredentials?: boolean;

    cancelToken?: CancelTokenProps;
    baseURL?: string;
    paramsSerializer?: (params: any) => string;
    auth?: AxiosBasicCredentials;
    onDownloadProgress?: (e: ProgressEvent) => void;
    onUploadProgress?: (e: ProgressEvent) => void;
    xsrfCookieName?: string;
    xsrfHeaderName?: string

}
export interface AxiosBasicCredentials {
    username: string;
    password: string;
}
export type AxiosRequestConfigKeys = keyof AxiosRequestConfig;

export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code: string | null | number;
    request?: any;
    response?: AxiosResponse;

}


export interface Axios {
    defaults: AxiosRequestConfig;

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    request<T = any> (config: AxiosRequestConfig): AxiosPromise<T>;

    get<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    delete<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    head<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    options<T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>

    post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    put<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

    getUri: (config?: AxiosRequestConfig) => string;
}

export interface AxiosInstance extends Axios {
    <T = any> (config: AxiosRequestConfig): AxiosPromise<T>;

    <T = any> (url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosStatic extends AxiosInstance {
    create (config?: AxiosRequestConfig): AxiosInstance;

    CancelToken: CancelTokenStatic;
    Cancel: CancelStatic;
    isCancel: (value: any) => boolean;
    all<T> (promises: Array<T | Promise<T>>): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (arr: T[]) => R;
}

export interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>;
}

export interface RejectedFn {
    (error: any): any;
}

export interface AxiosInterceptorManager<T> {
    use (resolved: ResolvedFn<T>, rejected?: RejectedFn): number;

    eject (id: number): void;
}

export interface CancelTokenProps {
    promise: Promise<string>
    reason?: Cancel;
    throwIfRequested: () => void;
}

export interface CancelExecutor {
    (cancel: Canceler): void;
}

export interface Canceler {
    (message?: string): void
}

export interface CancelTokenStatic {
    new (executor: CancelExecutor): CancelToken

    source (): CancelTokenSource;
}

export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}

export interface CancelStatic {
    new (message?: string): Cancel
}