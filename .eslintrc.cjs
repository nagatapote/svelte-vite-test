module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    'svelte3',
    "@typescript-eslint"
  ],
  ignorePatterns: [
    'public/build/'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  rules: {
    'no-var': 'error'
  },
  settings: {
    'svelte3/typescript': require('typescript'),
  }
}
