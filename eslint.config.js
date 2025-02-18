import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Keep browser globals if you need them
        ...globals.node,    // Add Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
];
