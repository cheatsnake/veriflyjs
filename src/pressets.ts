import { PressetOptions } from "./string";

export const caplLetterPresset: PressetOptions = {
    patterns: [/[A-Z]/g],
    minAmount: 1,
};

export const numberPresset: PressetOptions = {
    patterns: [/\d/g],
    minAmount: 1,
};

export const specSymbolPresset: PressetOptions = {
    patterns: [/\W/g],
    minAmount: 1,
};
