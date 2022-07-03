// ES2021まで
export class OldCustomError extends Error {
    oldCause: Error | undefined;
    constructor(message: string, cause?: Error) {
        super(message);
        this.oldCause = cause;
    }
}

export class ReqError extends Error {
    readonly #className = "ReqError";
    print() {
        console.log(this.#className)
    }
 }
export class ResError extends Error { 
    readonly #className = "ResError";
    print() {
        console.log(this.#className)
    }
}
export class Res2Error extends ResError { 
    readonly #className = "Res2Error";
    print() {
        super.print();
        console.log(this.#className)
    }
}