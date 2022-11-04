import { INVALID_STRING_LENGTH } from "./constants";
import { ContainerOptions, matchContainer } from "./container";
import { invalidResult, Result, validResult } from "./result";

export interface StringOptions {
    minLength?: number;
    maxLength?: number;
    containers?: ContainerOptions[];
}

export const checkString = (value: string, opt: StringOptions): Result => {
    if (
        (opt.minLength && value.length < opt.minLength) ||
        (opt.maxLength && value.length > opt.maxLength)
    ) {
        return invalidResult(
            INVALID_STRING_LENGTH(opt.minLength, opt.maxLength)
        );
    }

    if (opt.containers) {
        for (const container of opt.containers) {
            const result = matchContainer(value, container);
            if (!result.isValid) return result;
        }
    }

    return validResult;
};
