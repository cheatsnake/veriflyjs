# Verifly

## Installation

```sh
npm install verifly
```

## Usage

The Verifly module provides access to functions such as `checkNumber`, `checkString`, `checkPassword`, `checkEmail`.

For example, see how you can easily validate an email address:

```js
const verifly = require("verifly");

const result = verifly.checkEmail("test@gmail_com");
```

```js
{
   isValid: false,
   message: 'The string is not a valid email address.'
}
```

Another example with passwords:

```js
const verifly = require("verifly");

const result = verifly.checkPassword("someRandomPassword", {
    minLength: 8,
    maxLength: 24,
    capitalLetters: 1,
    numbers: 1,
    specialSymbols: 1,
});
```

```js
{
  isValid: false,
  message: 'The string must have at less 1 number(s).'
}
```

You can extend the functionality of the checks by adding special presets (your own or built-in `verifly.presets`)

```js
const result = verifly.checkString("someRandomString", {
    minLength: 6,
    maxLength: 20,
    presets: [{ patterns: ["hello"], minAmount: 1 }],
});
```

```js
{
  isValid: false,
  message: 'The string must contain the substring "hello" at least 1 time(s).'
}
```
