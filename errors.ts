// ES2021まで
export class OldCustomError extends Error {
    oldCause: Error | undefined;
    constructor(message: string, cause?: Error) {
        super(message);
        this.oldCause = cause;
    }
}

export class CustomError extends Error {
    obj: Record<string, unknown>
    constructor(message: string, options?: {cause?: Error,
             obj?: Record<string, unknown>} | undefined) {
        super(message, {cause: options?.cause});
        this.obj = options?.obj ?? {};
    }
}

export class ReqError extends CustomError {
    readonly #className = "ReqError";
    print() {
        console.log(this.#className)
    }
 }
export class ResError extends CustomError { 
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