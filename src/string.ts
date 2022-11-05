import { INVALID_STRING_LENGTH } from "./constants";
import { INVALID_SUBSTRING_AMOUNT } from "./constants";
import { invalidResult, Result, validResult } from "./result";

export interface PressetOptions {
    patterns: string[] | RegExp[];
    minAmount?: number;
    maxAmount?: number;
    // TODO: add an option for custom error messages
}

export interface StringOptions {
    minLength?: number;
    maxLength?: number;
    pressets?: PressetOptions[];
}

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

export const checkPresset = (value: string, opt: PressetOptions): Result => {
    for (const substr of opt.patterns) {
        const amount = value.split(substr).length - 1;

        if (
            (opt.minAmount && amount < opt.minAmount) ||
            (opt.maxAmount && amount > opt.maxAmount)
        ) {
            return invalidResult(INVALID_SUBSTRING_AMOUNT(substr, opt.minAmount, opt.maxAmount));
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
