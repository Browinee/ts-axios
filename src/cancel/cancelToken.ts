import {CancelExecutor, CancelTokenProps} from "../types";

class Cancel {
}

interface ResolvePromise {
    (reason?: Cancel): void;
}

export default class CancelToken implements CancelTokenProps {
    promise: Promise<string>;
    reason?: string;

    constructor(executor: CancelExecutor) {
        let resolvePromise: ResolvePromise;
        this.promise = new Promise<string>(resolve => {
            resolvePromise = resolve as ResolvePromise ;
        });
        executor(message => {
            if (this.reason) {
                return;
            }
            this.reason = message
            resolvePromise(this.reason)
        })
    }
}
