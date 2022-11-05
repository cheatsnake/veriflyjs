import {
    INVALID_CAPITAL_LETTERS_AMOUNT,
    INVALID_NUMBERS_AMOUNT,
    INVALID_SPECIAL_SYMBOLS_AMOUNT,
} from "./constants";
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
    let result = checkString(value, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        pressets: opt.pressets,
    });

    if (!result.isValid) return result;

    result = checkPattern(
        value,
        caplLetterPresset.patterns[0],
        opt.capitalLetters,
        INVALID_CAPITAL_LETTERS_AMOUNT(Number(opt.capitalLetters))
    );

    if (!result.isValid) return result;

    result = checkPattern(
        value,
        numberPresset.patterns[0],
        opt.numbers,
        INVALID_NUMBERS_AMOUNT(Number(opt.numbers))
    );

    if (!result.isValid) return result;

    result = checkPattern(
        value,
        specSymbolPresset.patterns[0],
        opt.specialSymbols,
        INVALID_SPECIAL_SYMBOLS_AMOUNT(Number(opt.specialSymbols))
    );

    if (!result.isValid) return result;

    return validResult;
};

console.log(checkPassword("wgigjweijg", { pressets: [caplLetterPresset] }));
