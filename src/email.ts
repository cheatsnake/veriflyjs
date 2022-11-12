import { INVALID_EMAIL_DOMAIN } from "./messages";
import { emailPresset } from "./pressets";
import { invalidResult, Result, validResult } from "./result";
import { checkString, StringOptions } from "./string";

export interface EmailOptions extends StringOptions {
    domains?: string[];
}

export const checkEmail = (email: string, opt: EmailOptions): Result => {
    if (!opt.pressets) opt.pressets = [];
    if (!opt.domains) opt.domains = [];

    opt.pressets.push(emailPresset());

    let result = checkString(email, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        pressets: opt.pressets,
    });

    if (!result.isValid) return result;

    if (opt.domains.length > 0) {
        let isValid = false;
        for (const domain of opt.domains) {
            if (email.includes(`@${domain}`)) {
                isValid = true;
                break;
            }
        }

        if (!isValid) return invalidResult(INVALID_EMAIL_DOMAIN(opt.domains));
    }

    return validResult;
};
