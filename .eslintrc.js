module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: "off",
    "no-console": "off",
    "implicit-arrow-linebreak": "off",
    "linebreak-style": "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "no-else-return": "off",
    "func-names": "off",
    "no-alert": "off",
    "guard-for-in": "off",
    "no-restricted-syntax": "off",
    "prefer-destructuring": "off",
    "no-loop-func": "off"
  }
};
