import {Canceler, CancelExecutor, CancelTokenProps, CancelTokenSource} from "../types";
import Cancel from "./Cancel";


interface ResolvePromise {
    (reason?: Cancel): void;
}

export default class CancelToken implements CancelTokenProps {
    promise: Promise<string>;
    reason?: Cancel;

    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise;
        this.promise = new Promise<string>(resolve => {
            resolvePromise = resolve as ResolvePromise ;
        });
        executor(message => {
            if (this.reason) {
                return;
            }
            this.reason = new Cancel(message);
            resolvePromise(this.reason)
        })
    }
    static source():CancelTokenSource{
        let cancel:Canceler;
        let token = new CancelToken(c => {
            cancel = c
        })
        return {
        /* @ts-ignore */
            cancel,
            token
        }

    }
}

