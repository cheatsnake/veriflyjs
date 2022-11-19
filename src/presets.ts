import {
    INVALID_CAPITAL_LETTERS_AMOUNT,
    INVALID_EMAIL,
    INVALID_NUMBERS_AMOUNT,
    INVALID_SPECIAL_SYMBOLS_AMOUNT,
} from "./messages";
import { PresetOptions } from "./string";

export const capitalLetterPreset = (minAmount = 1, maxAmount?: number): PresetOptions => {
    return {
        patterns: [/[A-Z]/g],
        minAmount,
        maxAmount,
        errorMsg: () => INVALID_CAPITAL_LETTERS_AMOUNT({ minAmount, maxAmount }),
    };
};

export const numberPreset = (minAmount = 1, maxAmount?: number): PresetOptions => {
    return {
        patterns: [/\d/g],
        minAmount,
        errorMsg: () => INVALID_NUMBERS_AMOUNT({ minAmount, maxAmount }),
    };
};

export const specialSymbolPreset = (minAmount = 1, maxAmount?: number): PresetOptions => {
    return {
        patterns: [/\W/g],
        minAmount,
        errorMsg: () => INVALID_SPECIAL_SYMBOLS_AMOUNT({ minAmount, maxAmount }),
    };
};

export const emailPreset = (): PresetOptions => {
    return {
        patterns: [
            /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm,
        ],
        minAmount: 1,
        maxAmount: 1,
        errorMsg: INVALID_EMAIL,
    };
};
