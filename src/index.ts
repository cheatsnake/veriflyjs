import { checkEmail } from "./email";
import { checkNumber } from "./number";
import { checkPassword } from "./password";
import { capitalLetterPreset, emailPreset, numberPreset, specialSymbolPreset } from "./presets";
import { checkString } from "./string";

export = {
    checkNumber,
    checkString,
    checkPassword,
    checkEmail,

    presets: {
        capitalLetterPreset,
        numberPreset,
        specialSymbolPreset,
        emailPreset,
    },
};
