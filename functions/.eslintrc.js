module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
    "prettier", // Must be last!
  ],
  rules: {
    "no-unused-vars": "off", // Correct!
    "@typescript-eslint/no-unused-vars": ["warn"], // Let the TS rule handle it
    "no-restricted-globals": ["error", "name", "length"],
    "@typescript-eslint/no-var-requires": "off",
    "prefer-arrow-callback": "error",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
