import {
    INVALID_CAPITAL_LETTERS_AMOUNT,
    INVALID_NUMBERS_AMOUNT,
    INVALID_SPECIAL_SYMBOLS_AMOUNT,
} from "./messages";
import { PressetOptions } from "./string";

export const capitalLetterPresset = (minAmount = 1, maxAmount?: number): PressetOptions => {
    return {
        patterns: [/[A-Z]/g],
        minAmount,
        maxAmount,
        errorMsg: () => INVALID_CAPITAL_LETTERS_AMOUNT({ minAmount, maxAmount }),
    };
};

export const numberPresset = (minAmount = 1, maxAmount?: number): PressetOptions => {
    return {
        patterns: [/\d/g],
        minAmount,
        errorMsg: () => INVALID_NUMBERS_AMOUNT({ minAmount, maxAmount }),
    };
};

export const specialSymbolPresset = (minAmount = 1, maxAmount?: number): PressetOptions => {
    return {
        patterns: [/\W/g],
        minAmount,
        errorMsg: () => INVALID_SPECIAL_SYMBOLS_AMOUNT({ minAmount, maxAmount }),
    };
};
