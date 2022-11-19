import { MessageArguments } from "./messages";
import { capitalLetterPreset, numberPreset, specialSymbolPreset } from "./presets";
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
    if (!opt.presets) opt.presets = [];

    if (opt.capitalLetters) {
        opt.presets.push(capitalLetterPreset(opt.capitalLetters));
    }

    if (opt.numbers) {
        opt.presets.push(numberPreset(opt.numbers));
    }

    if (opt.specialSymbols) {
        opt.presets.push(specialSymbolPreset(opt.specialSymbols));
    }

    let result = checkString(value, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        presets: opt.presets,
    });

    if (!result.isValid) return result;

    return validResult;
};
