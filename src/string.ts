import { INVALID_STRING_LENGTH, MessageArguments } from "./messages";
import { FAILED_PATTERN_VALIDATION } from "./messages";
import { invalidResult, Result, validResult } from "./result";

export interface PressetOptions {
    patterns: string[] | RegExp[];
    minAmount?: number;
    maxAmount?: number;
    errorMsg?: (args: MessageArguments) => string;
}

export interface StringOptions {
    minLength?: number;
    maxLength?: number;
    pressets?: PressetOptions[];
}

export const checkPresset = (value: string, opt: PressetOptions): Result => {
    for (const pattern of opt.patterns) {
        const amount = value.split(pattern).length - 1;
        const errMsg = opt.errorMsg
            ? opt.errorMsg({ pattern, minAmount: opt.minAmount, maxAmount: opt.maxAmount })
            : FAILED_PATTERN_VALIDATION({
                  pattern,
                  minAmount: opt.minAmount,
                  maxAmount: opt.maxAmount,
              });

        if (
            (typeof opt.maxAmount == "number" && amount > opt.maxAmount) ||
            (typeof opt.minAmount == "number" && amount < opt.minAmount)
        ) {
            return invalidResult(errMsg);
        }
    }

    return validResult;
};

export const checkString = (value: string, opt: StringOptions): Result => {
    if (
        (opt.minLength && value.length < opt.minLength) ||
        (opt.maxLength && value.length > opt.maxLength)
    ) {
        return invalidResult(INVALID_STRING_LENGTH(opt.minLength, opt.maxLength));
    }

    if (opt.pressets) {
        for (const container of opt.pressets) {
            const result = checkPresset(value, container);
            if (!result.isValid) return result;
        }
    }

    return validResult;
};

export const checkPattern = (
    value: string,
    pattern: string | RegExp,
    minAmount: number | undefined,
    errMsg: string
): Result => {
    if (minAmount) {
        const amount = value.split(pattern).length - 1;

        if (amount < minAmount) {
            return invalidResult(errMsg);
        }
    }

    return validResult;
};
