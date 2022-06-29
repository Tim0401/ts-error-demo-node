import { ResError, ReqError } from "./errors.ts";

type CustomErr = {
    name: string;
    msg: string;
    cause?: CustomErr;
    [key: string]: unknown;
}

const printErr = (e: Error): CustomErr => {
    const {name, message, cause, ...rest} = e;
    if (!cause) return {...rest, name: e.name, msg: e.message};
    return {name: name, msg: message, cause: printErr(cause)};
}

try {
    throw new ResError("a", {cause: new ReqError("b")});
} catch(e) {
    if (e instanceof ResError) {
        console.log(JSON.stringify(printErr(e)));
    }
}

const dirtyRetErr = (): ReqError => {
    return new ResError("c")
}

if (dirtyRetErr() instanceof ResError) {
    console.log("ReqError == ResError");
}