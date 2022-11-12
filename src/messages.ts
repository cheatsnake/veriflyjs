export interface MessageArguments {
    pattern?: string | RegExp;
    minAmount?: number;
    maxAmount?: number;
}

export const FAILED_PATTERN_VALIDATION = (args: MessageArguments) => {
    if (args.maxAmount === 0) {
        return typeof args.pattern == "string"
            ? `The string must not contain the substring "${args.pattern}".`
            : `The string must not contain a substring that satisfies the regular expression "${args.pattern}".`;
    }
    if (!args.minAmount && args.maxAmount) {
        return typeof args.pattern == "string"
            ? `The string must contain the substring "${args.pattern}" no more than ${args.maxAmount} time(s).`
            : `The string must contain a substring that satisfies the regular expression "${args.pattern}" no more than ${args.maxAmount} time(s).`;
    }
    if (args.minAmount && !args.maxAmount) {
        return typeof args.pattern == "string"
            ? `The string must contain the substring "${args.pattern}" at least ${args.minAmount} time(s).`
            : `The string must contain a substring that satisfies the regular expression "${args.pattern}" at least ${args.minAmount} time(s).`;
    }

    return typeof args.pattern == "string"
        ? `The string must contain the substring "${args.pattern}" at least ${args.minAmount} time(s) and no more than ${args.maxAmount} time(s).`
        : `The string must contain a substring that satisfies the regular expression "${args.pattern}" at least ${args.minAmount} time(s) and no more than ${args.maxAmount} time(s).`;
};

export const INVALID_CAPITAL_LETTERS_AMOUNT = (args: MessageArguments): string => {
    if (args.minAmount && typeof args.maxAmount != "number") {
        return `The string must have at less ${args.minAmount} capital letter(s).`;
    }
    if (args.maxAmount && typeof args.minAmount != "number") {
        return `The string must have no more than ${args.maxAmount} capital letter(s).`;
    }

    return `The string must have at less ${args.minAmount} and no more than ${args.maxAmount} capital letter(s).`;
};

export const INVALID_NUMBERS_AMOUNT = (args: MessageArguments): string => {
    if (args.minAmount && typeof args.maxAmount != "number") {
        return `The string must have at less ${args.minAmount} number(s).`;
    }
    if (args.maxAmount && typeof args.minAmount != "number") {
        return `The string must have no more than ${args.maxAmount} number(s).`;
    }

    return `The string must have at less ${args.minAmount} and no more than ${args.maxAmount} number(s).`;
};

export const INVALID_SPECIAL_SYMBOLS_AMOUNT = (args: MessageArguments): string => {
    if (args.minAmount && typeof args.maxAmount != "number") {
        return `The string must have at less ${args.minAmount} special symbol(s).`;
    }
    if (args.maxAmount && typeof args.minAmount != "number") {
        return `The string must have no more than ${args.maxAmount} special symbol(s).`;
    }

    return `The string must have at less ${args.minAmount} and no more than ${args.maxAmount} special symbol(s).`;
};

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

export const INVALID_EMAIL = () => {
    return `The string is not a valid email address.`;
};

export const INVALID_EMAIL_DOMAIN = (domains: string[]) => {
    return `The email address must contain one of the allowed domain names: ${domains.join(", ")}.`;
};
