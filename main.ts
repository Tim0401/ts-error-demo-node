import { ResError, ReqError } from "./errors.ts";

// Output Object
type CustomErr = {
    name: string;
    msg: string;
    cause?: CustomErr; 
    [key: string]: unknown;
}

// ES2022 error cause
const printErr = (e: Error): CustomErr => {
    const {name, message, cause, ...rest} = e;
    if (!cause) return {...rest, name: e.name, msg: e.message};
    return {name: name, msg: message, cause: printErr(cause)};
}

// throw error
try {
    throw new ResError("a", {cause: new ReqError("b")});
} catch(e) {
    if (e instanceof ResError) {
        console.log(JSON.stringify(printErr(e)));
    }
}

// 型の異なるエラーを返却できる
const dirtyRetErr = (): ReqError => {
    return new ResError("c")
}

// 謎の挙動となる
if (dirtyRetErr() instanceof ResError) {
    console.log("ReqError == ResError");
}