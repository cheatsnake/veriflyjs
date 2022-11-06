import { caplLetterPresset, numberPresset, specSymbolPresset } from "./pressets";
import { Result, validResult } from "./result";
import { checkPattern, checkString, StringOptions, PressetOptions } from "./string";

export interface PasswordOptions extends StringOptions {
    // Amount of capital letters that password must have
    capitalLetters?: number;
    // Amount of numbers that password must have
    numbers?: number;
    // Amount of special symbols that password must have
    specialSymbols?: number;
}

export const checkPassword = (value: string, opt: PasswordOptions): Result => {
    if (!opt.pressets) opt.pressets = [];

    if (opt.capitalLetters) {
        const presset: PressetOptions = {
            ...caplLetterPresset,
            minAmount: opt.capitalLetters,
        };
        opt.pressets.push(presset);
    }

    if (opt.numbers) {
        const presset: PressetOptions = {
            ...numberPresset,
            minAmount: opt.numbers,
        };
        opt.pressets.push(presset);
    }

    if (opt.specialSymbols) {
        const presset: PressetOptions = {
            ...specSymbolPresset,
            minAmount: opt.specialSymbols,
        };
        opt.pressets.push(presset);
    }

    let result = checkString(value, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        pressets: opt.pressets,
    });

    if (!result.isValid) return result;

    return validResult;
};
