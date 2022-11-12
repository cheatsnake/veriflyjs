import verifly from "../src/index";
import {
    INVALID_CAPITAL_LETTERS_AMOUNT,
    INVALID_NUMBERS_AMOUNT,
    INVALID_SPECIAL_SYMBOLS_AMOUNT,
    INVALID_STRING_LENGTH,
} from "../src/messages";
import { invalidResult, validResult } from "../src/result";

describe("checkPassword()", () => {
    test("valid password with specified params", () => {
        const result = verifly.checkPassword("Test*1", {
            minLength: 4,
            maxLength: 8,
            capitalLetters: 1,
            numbers: 1,
            specialSymbols: 1,
        });
        expect(result).toStrictEqual(validResult);
    });

    test("invalid password length (too short)", () => {
        const minLength = 8;
        const maxLength = 20;
        const result = verifly.checkPassword("Test*1", {
            minLength,
            maxLength,
            capitalLetters: 1,
            numbers: 1,
            specialSymbols: 1,
        });
        expect(result).toStrictEqual(invalidResult(INVALID_STRING_LENGTH(minLength, maxLength)));
    });

    test("invalid password length (too big)", () => {
        const minLength = 2;
        const maxLength = 4;
        const result = verifly.checkPassword("Test*1", {
            minLength,
            maxLength,
            capitalLetters: 1,
            numbers: 1,
            specialSymbols: 1,
        });
        expect(result).toStrictEqual(invalidResult(INVALID_STRING_LENGTH(minLength, maxLength)));
    });

    test("invalid password (capital letters amount)", () => {
        const capitalLetters = 2;
        const result = verifly.checkPassword("Test*1", {
            minLength: 4,
            maxLength: 8,
            capitalLetters,
            numbers: 1,
            specialSymbols: 1,
        });
        expect(result).toStrictEqual(
            invalidResult(INVALID_CAPITAL_LETTERS_AMOUNT({ minAmount: capitalLetters }))
        );
    });

    test("invalid password (numbers amount)", () => {
        const numbers = 2;
        const result = verifly.checkPassword("Test*1", {
            minLength: 4,
            maxLength: 8,
            capitalLetters: 1,
            numbers,
            specialSymbols: 1,
        });
        expect(result).toStrictEqual(invalidResult(INVALID_NUMBERS_AMOUNT({ minAmount: numbers })));
    });

    test("invalid password (special symbols amount)", () => {
        const specialSymbols = 2;
        const result = verifly.checkPassword("Test*1", {
            minLength: 4,
            maxLength: 8,
            capitalLetters: 1,
            numbers: 1,
            specialSymbols,
        });
        expect(result).toStrictEqual(
            invalidResult(INVALID_SPECIAL_SYMBOLS_AMOUNT({ minAmount: specialSymbols }))
        );
    });
});
