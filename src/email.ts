import { INVALID_EMAIL_DOMAIN, INVALID_EMAIL_WITH_BLOCKED_DOMAIN } from "./messages";
import { emailPreset } from "./presets";
import { invalidResult, Result, validResult } from "./result";
import { checkString, StringOptions } from "./string";

export interface EmailOptions extends StringOptions {
    /** 
        An array of domains that are allowed to be used in email addresses.
        If a list of domains is defined, each e-mail address must contain one of the allowed domains. 
        If an empty array is defined, all possible domains are allowed.
    */
    allowedDomains?: string[];
    /**
        An array of domains that are not allowed to be used in email addresses.
    */
    blockedDomains?: string[];
}

export const checkEmail = (email: string, opt?: EmailOptions): Result => {
    if (!opt) opt = {};
    if (!opt.presets) opt.presets = [];
    if (!opt.allowedDomains) opt.allowedDomains = [];
    if (!opt.blockedDomains) opt.blockedDomains = [];

    opt.presets.push(emailPreset());

    let result = checkString(email, {
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        presets: opt.presets,
    });

    if (!result.isValid) return result;

    if (opt.blockedDomains.length) {
        let isValid = true;
        for (const domain of opt.blockedDomains) {
            if (email.includes(`@${domain}`)) {
                isValid = false;
                break;
            }
        }

        if (!isValid) return invalidResult(INVALID_EMAIL_WITH_BLOCKED_DOMAIN(opt.blockedDomains));
    }

    if (opt.allowedDomains.length) {
        let isValid = false;
        for (const domain of opt.allowedDomains) {
            if (email.includes(`@${domain}`)) {
                isValid = true;
                break;
            }
        }

        if (!isValid) return invalidResult(INVALID_EMAIL_DOMAIN(opt.allowedDomains));
    }

    return validResult;
};
