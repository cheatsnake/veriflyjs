export interface Result {
    isValid: boolean;
    message: string;
}

export const invalidResult = (message: string): Result => {
    return { isValid: false, message };
};

export const validResult = { isValid: true, message: "" };
