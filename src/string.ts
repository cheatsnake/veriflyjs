import { INVALID_STRING_LENGTH, MessageArguments } from "./messages";
import { FAILED_PATTERN_VALIDATION } from "./messages";
import { invalidResult, Result, validResult } from "./result";

export interface PresetOptions {
    patterns: string[] | RegExp[];
    minAmount?: number;
    maxAmount?: number;
    errorMsg?: (args: MessageArguments) => string;
}

export interface StringOptions {
    minLength?: number;
    maxLength?: number;
    presets?: PresetOptions[];
}

export const checkPreset = (value: string, opt: PresetOptions): Result => {
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

    if (opt.presets) {
        for (const container of opt.presets) {
            const result = checkPreset(value, container);
            if (!result.isValid) return result;
        }
    }

    return validResult;
};
