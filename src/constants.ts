export const INVALID_NUMBER = (min?: number, max?: number) => {
    if (!min && max) {
        return `The number must be no more than ${max}.`;
    }
    if (min && !max) {
        return `The number must be no less than ${min}.`;
    }

    return `The number must be no less than ${min} and no more than ${max}.`;
};

export const INVALID_STRING_LENGTH = (min?: number, max?: number) => {
    if (!min && max) {
        return `The length of the string must be no more than ${max}.`;
    }
    if (min && !max) {
        return `The length of the string must be no less than ${min}.`;
    }

    return `The length of the string must be no less than ${min} and no more than ${max}.`;
};

export const INVALID_SUBSTRING_AMOUNT = (substr: string | RegExp, min?: number, max?: number) => {
    if (!min && max) {
        return `The string must contain the substring "${substr}" no more than ${max} time(s).`;
    }
    if (min && !max) {
        return `The string must contain the substring "${substr}" at least ${min} time(s).`;
    }

    return `The string must contain the substring "${substr}" at least ${min} time(s) and no more than ${max} time(s).`;
};

export const INVALID_CAPITAL_LETTERS_AMOUNT = (amount: number): string =>
    `The password must have at less ${amount} capital letter(s).`;

export const INVALID_NUMBERS_AMOUNT = (amount: number): string =>
    `The password must have at less ${amount} number(s).`;

export const INVALID_SPECIAL_SYMBOLS_AMOUNT = (amount: number): string =>
    `The password must have at less ${amount} special symbol(s).`;
