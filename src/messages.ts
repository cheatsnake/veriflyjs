export interface MessageArguments {
    pattern: string | RegExp;
    min?: number;
    max?: number;
}

export const FAILED_PATTERN_VALIDATION = (args: MessageArguments) => {
    if (args.max === 0) {
        return typeof args.pattern == "string"
            ? `The string must not contain the substring "${args.pattern}".`
            : `The string must not contain a substring that satisfies the regular expression "${args.pattern}".`;
    }
    if (!args.min && args.max) {
        return typeof args.pattern == "string"
            ? `The string must contain the substring "${args.pattern}" no more than ${args.max} time(s).`
            : `The string must contain a substring that satisfies the regular expression "${args.pattern}" no more than ${args.max} time(s).`;
    }
    if (args.min && !args.max) {
        return typeof args.pattern == "string"
            ? `The string must contain the substring "${args.pattern}" at least ${args.min} time(s).`
            : `The string must contain a substring that satisfies the regular expression "${args.pattern}" at least ${args.min} time(s).`;
    }

    return typeof args.pattern == "string"
        ? `The string must contain the substring "${args.pattern}" at least ${args.min} time(s) and no more than ${args.max} time(s).`
        : `The string must contain a substring that satisfies the regular expression "${args.pattern}" at least ${args.min} time(s) and no more than ${args.max} time(s).`;
};

export const INVALID_CAPITAL_LETTERS_AMOUNT = (args: MessageArguments): string =>
    `The string must have at less ${args.min} capital letter(s).`;

export const INVALID_NUMBERS_AMOUNT = (args: MessageArguments): string =>
    `The string must have at less ${args.min} number(s).`;

export const INVALID_SPECIAL_SYMBOLS_AMOUNT = (args: MessageArguments): string =>
    `The string must have at less ${args.min} special symbol(s).`;

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
