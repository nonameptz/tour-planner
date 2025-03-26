module.exports = {
  parser: 'vue-eslint-parser',  // Parses .vue files
  parserOptions: {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser for TypeScript
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-essential', // or 'plugin:vue/vue3-recommended'
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Add any custom rules if necessary
  },
  overrides: [
    {
      files: ['*.vue'],
      processor: 'vue/.vue'
    }
  ]
};
