import {
    INVALID_CAPITAL_LETTERS_AMOUNT,
    INVALID_NUMBERS_AMOUNT,
    INVALID_SPECIAL_SYMBOLS_AMOUNT,
} from "./messages";
import { PressetOptions } from "./string";

export const caplLetterPresset: PressetOptions = {
    patterns: [/[A-Z]/g],
    minAmount: 1,
    errorMsg: INVALID_CAPITAL_LETTERS_AMOUNT,
};

export const numberPresset: PressetOptions = {
    patterns: [/\d/g],
    minAmount: 1,
    errorMsg: INVALID_NUMBERS_AMOUNT,
};

export const specSymbolPresset: PressetOptions = {
    patterns: [/\W/g],
    minAmount: 1,
    errorMsg: INVALID_SPECIAL_SYMBOLS_AMOUNT,
};
