import { ResError, ReqError, Res2Error } from "./errors";
import pino from "pino"

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

const printPino = (e: Error) => {
    const logger = pino({
        formatters: {
            level: (label, _) => ({
              level: label,
            }),
          },
        browser: {
          asObject: true,
        },
      });
    // logger.error(e);
    logger.error({err: e});
}

// throw error
try {
    throw new ResError("a", {cause: new ReqError("b"), obj: {hoge: "huga"}});
} catch(e) {
    if (e instanceof ResError) {
        // console.log(JSON.stringify(printErr(e)));
        printPino(e);
    }
}

// 型の異なるエラーを返却できる
const dirtyRetErr = (): ResError => {
    return new Res2Error("c")
}

// 謎の挙動となる
if (dirtyRetErr() instanceof ResError) {
    console.log("ReqError == ResError");
    dirtyRetErr().print()
}