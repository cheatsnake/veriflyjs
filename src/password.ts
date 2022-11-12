import { MessageArguments } from "./messages";
import { capitalLetterPresset, numberPresset, specialSymbolPresset } from "./pressets";
import { Result, validResult } from "./result";
import { checkString, StringOptions } from "./string";

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
        opt.pressets.push(capitalLetterPresset(opt.capitalLetters));
    }

    if (opt.numbers) {
        opt.pressets.push(numberPresset(opt.numbers));
    }

    if (opt.specialSymbols) {
        opt.pressets.push(specialSymbolPresset(opt.specialSymbols));
    }

    let result = checkString(value, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        pressets: opt.pressets,
    });

    if (!result.isValid) return result;

    return validResult;
};
