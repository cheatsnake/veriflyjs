import { checkEmail } from "./email";
import { checkNumber } from "./number";
import { checkPassword } from "./password";
import {
    capitalLetterPresset,
    emailPresset,
    numberPresset,
    specialSymbolPresset,
} from "./pressets";
import { checkString } from "./string";

export = {
    checkNumber,
    checkString,
    checkPassword,
    checkEmail,

    pressets: {
        capitalLetterPresset,
        numberPresset,
        specialSymbolPresset,
        emailPresset,
    },
};
