import verifly from "../src/index";
import {
    INVALID_EMAIL,
    INVALID_EMAIL_DOMAIN,
    INVALID_EMAIL_WITH_BLOCKED_DOMAIN,
} from "../src/messages";
import { invalidResult, validResult } from "../src/result";

describe("checkEmail()", () => {
    test("valid email", () => {
        const result = verifly.checkEmail("test@gmail.com");
        expect(result).toStrictEqual(validResult);
    });

    test("valid email (with allowed domains)", () => {
        const allowedDomains = ["live.com", "gmail.com"];
        const result = verifly.checkEmail("test@gmail.com", { allowedDomains });
        expect(result).toStrictEqual(validResult);
    });

    test("invalid email (without domain)", () => {
        const result = verifly.checkEmail("testgmail");
        expect(result).toStrictEqual(invalidResult(INVALID_EMAIL()));
    });

    test("invalid email (with wrong domain)", () => {
        const result = verifly.checkEmail("test@gmail");
        expect(result).toStrictEqual(invalidResult(INVALID_EMAIL()));
    });

    test("invalid email (with not allowed domain)", () => {
        const allowedDomains = ["live.com", "test.net", "aka.ms"];
        const result = verifly.checkEmail("test@gmail.com", { allowedDomains });
        expect(result).toStrictEqual(invalidResult(INVALID_EMAIL_DOMAIN(allowedDomains)));
    });

    test("invalid email (with blocked domain)", () => {
        const blockedDomains = ["live.com", "test.net", "aka.ms"];
        const result = verifly.checkEmail("test@live.com", { blockedDomains });
        expect(result).toStrictEqual(
            invalidResult(INVALID_EMAIL_WITH_BLOCKED_DOMAIN(blockedDomains))
        );
    });
});
