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
// Если есть min и max - выводим ошибку паттерн должен быть не менее Min раз и не более Max раз
// Eckb есть min и нету max - паттерн должен быть не менее Min Раз
// Если есть max и нету min - паттерн может отсутствовать или встречаться не более Max раз
// Если есть max = 0 - паттерн не должне встрачаться
export const checkPresset = (value: string, opt: PressetOptions): Result => {
    for (const pattern of opt.patterns) {
        const amount = value.split(pattern).length - 1;
        const errMsg = opt.errorMsg
            ? opt.errorMsg({ pattern, min: opt.minAmount, max: opt.maxAmount })
            : FAILED_PATTERN_VALIDATION({ pattern, min: opt.minAmount, max: opt.maxAmount });

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
