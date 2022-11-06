import { INVALID_NUMBER } from "./messages";
import { invalidResult, Result, validResult } from "./result";

export interface NumberOptions {
    min?: number;
    max?: number;
}

export const checkNumber = (value: number, opt: NumberOptions): Result => {
    if ((opt.min && value < opt.min) || (opt.max && value > opt.max)) {
        return invalidResult(INVALID_NUMBER(opt.min, opt.max));
    }

    return validResult;
};
