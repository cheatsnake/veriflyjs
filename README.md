# Verifly

Installation:

```sh
npm install verifly
```

Usage

```js
const verifly = require("verifly");

const result = verifly.checkEmail("test@gmail_com");

// {
//    isValid: false,
//    message: 'The string is not a valid email address.'
// }
```

```js
const result = verifly.checkPassword("someRandomPassword", {
    minLength: 8,
    maxLength: 24,
    capitalLetters: 1,
    numbers: 1,
    specialSymbols: 1,
});

// {
//   isValid: false,
//   message: 'The string must have at less 1 number(s).'
// }
```

```js
const result = verifly.checkString("someRandomString", {
    minLength: 6,
    maxLength: 20,
    pressets: [{ patterns: ["hello"], minAmount: 1 }],
});

// {
//   isValid: false,
//   message: 'The string must contain the substring "hello" at least 1 time(s).'
// }
```
