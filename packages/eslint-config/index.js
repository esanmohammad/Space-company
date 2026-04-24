/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react-hooks", "jsx-a11y"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "Literal[value=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/]",
        message:
          "Hard-coded hex color detected. Import and use a token from the theme module instead.",
      },
      {
        selector: "Literal[value=/^-?\\d+(\\.\\d+)?px$/]",
        message:
          "Hard-coded px value detected. Use a spacing or typography token instead.",
      },
      {
        selector: "Literal[value=/^-?\\d+(\\.\\d+)?rem$/]",
        message:
          "Hard-coded rem value detected. Use a typography token instead.",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: [
        "**/theme/tokens.ts",
        "**/theme/tokens.js",
        "**/theme/spacetheme.ts",
        "**/theme/spacetheme.js",
      ],
      rules: {
        "no-restricted-syntax": "off",
      },
    },
  ],
};
