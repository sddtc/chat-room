import js from '@eslint/js'
import react from "eslint-plugin-react"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"

export default [
  {
    ignores: ["dist/**/*"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ignores: ["dist/**/*"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      //rules here
      'indent': ['error', 2],
      "semi": ["error", "never"],
    },
  },
]