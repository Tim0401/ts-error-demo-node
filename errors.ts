export class OldCustomError extends Error {
    oldCause: Error | undefined;
    constructor(message: string, cause?: Error) {
        super(message);
        this.oldCause = cause;
    }
}

export class ReqError extends Error {
    // readonly className = "ReqError";
 }
export class ResError extends Error { 
    // readonly className = "ResError";
}