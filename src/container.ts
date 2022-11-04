import { INVALID_SUBSTRING_AMOUNT } from "./constants";
import { invalidResult, Result, validResult } from "./result";

export interface ContainerOptions {
    substrings: string[] | RegExp[];
    minAmount?: number;
    maxAmount?: number;
}

export const matchContainer = (
    value: string,
    opt: ContainerOptions
): Result => {
    for (const substr of opt.substrings) {
        const amount = value.split(substr).length - 1;

        if (
            (opt.minAmount && amount < opt.minAmount) ||
            (opt.maxAmount && amount > opt.maxAmount)
        ) {
            return invalidResult(
                INVALID_SUBSTRING_AMOUNT(substr, opt.minAmount, opt.maxAmount)
            );
        }
    }

    return validResult;
};
