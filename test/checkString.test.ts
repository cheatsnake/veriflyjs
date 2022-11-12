import verifly from "../src/index";
import { FAILED_PATTERN_VALIDATION, INVALID_STRING_LENGTH } from "../src/messages";
import { invalidResult, validResult } from "../src/result";

describe("checkString()", () => {
    test("valid string length", () => {
        const result = verifly.checkString("test", { minLength: 3, maxLength: 5 });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string length (low border)", () => {
        const result = verifly.checkString("test", { minLength: 4, maxLength: 6 });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string length (high border)", () => {
        const result = verifly.checkString("test", { minLength: 2, maxLength: 4 });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string length (min length restrict only)", () => {
        const result = verifly.checkString("test", { minLength: 2 });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string length (max length restrict only)", () => {
        const result = verifly.checkString("test", { maxLength: 6 });
        expect(result).toStrictEqual(validResult);
    });

    test("too short string", () => {
        const result = verifly.checkString("test", { minLength: 6, maxLength: 9 });
        expect(result).toStrictEqual(invalidResult(INVALID_STRING_LENGTH(6, 9)));
    });

    test("too long string", () => {
        const result = verifly.checkString("longtest", { minLength: 2, maxLength: 4 });
        expect(result).toStrictEqual(invalidResult(INVALID_STRING_LENGTH(2, 4)));
    });

    test("valid string with specified string-pattern", () => {
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: ["test"], minAmount: 1, maxAmount: 2 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string with specified string-pattern (max amount = 0)", () => {
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: ["hello"], maxAmount: 0 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string with specified string-patterns", () => {
        const result = verifly.checkString("hellotestworld", {
            pressets: [{ patterns: ["test", "hello", "world"], minAmount: 1, maxAmount: 2 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string with specified regex-pattern", () => {
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: [/test/g], minAmount: 1, maxAmount: 2 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string with specified regex-pattern (max amount = 0)", () => {
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: [/hello/g], maxAmount: 0 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("valid string with specified regex-patterns", () => {
        const result = verifly.checkString("worldhellotest", {
            pressets: [{ patterns: [/test/g, /hello/g, /world/g], minAmount: 1, maxAmount: 2 }],
        });
        expect(result).toStrictEqual(validResult);
    });

    test("invalid string with specified string-pattern", () => {
        const pattern = "hello";
        const minAmount = 1;
        const maxAmount = 2;
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: [pattern], minAmount, maxAmount }],
        });

        expect(result).toStrictEqual(
            invalidResult(FAILED_PATTERN_VALIDATION({ pattern, minAmount, maxAmount }))
        );
    });

    test("invalid string with specified regex-pattern", () => {
        const pattern = /hello/g;
        const minAmount = 1;
        const maxAmount = 2;
        const result = verifly.checkString("testing", {
            pressets: [{ patterns: [pattern], minAmount, maxAmount }],
        });

        expect(result).toStrictEqual(
            invalidResult(FAILED_PATTERN_VALIDATION({ pattern, minAmount, maxAmount }))
        );
    });

    test("invalid string with specified pattern (custom error message)", () => {
        const customMsg = "something went wrong...";
        const result = verifly.checkString("testing", {
            pressets: [
                { patterns: ["hello"], minAmount: 1, maxAmount: 2, errorMsg: () => customMsg },
            ],
        });

        expect(result).toStrictEqual(invalidResult(customMsg));
    });
});
