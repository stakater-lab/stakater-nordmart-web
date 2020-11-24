module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: [],
  rules: {
    "prettier/prettier": ["error"],
    "jsx-quotes": ["error", "prefer-double"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*", "**/jest.helpers.tsx"],
      parserOptions: {
        project: {
          extends: "./tsconfig.spec.json",
        },
      },
      extends: ["plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "import/no-unresolved": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      files: ["testcafe/**/*.ts", "**/*.cafe.ts", "**/*.po.ts"],
      parserOptions: {
        project: {
          extends: "./testcafe/tsconfig.e2e.json",
        },
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
    {
      files: ["./src/**/*.{ts,tsx}"],
      parserOptions: {
        project: {
          extends: "./tsconfig.app.json",
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      extends: ["plugin:react/recommended"],
      rules: {
        "react/prop-types": 0,
        "react/display-name": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-inferrable-types": "off",
      },
    },
  ],
};
