import { INVALID_NUMBER } from "../src/constants";
import verifly from "../src/index";

describe("checkNumber()", () => {
    test("valid positive value", () => {
        const result = verifly.checkNumber(5, { min: 1, max: 10 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("too big positive value", () => {
        const result = verifly.checkNumber(20, { min: 1, max: 10 });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(INVALID_NUMBER(1, 10));
    });

    test("low border positive value", () => {
        const result = verifly.checkNumber(1, { min: 1, max: 10 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("high border positive value", () => {
        const result = verifly.checkNumber(10, { min: 1, max: 10 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("valid negative value", () => {
        const result = verifly.checkNumber(-5, { min: -10, max: -1 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("invalid negative value", () => {
        const result = verifly.checkNumber(-20, { min: -10, max: -1 });
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(INVALID_NUMBER(-10, -1));
    });

    test("low border negative value", () => {
        const result = verifly.checkNumber(-10, { min: -10, max: -1 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });

    test("high border negative value", () => {
        const result = verifly.checkNumber(-1, { min: -10, max: -1 });
        expect(result.isValid).toBe(true);
        expect(result.message).toBe("");
    });
});
