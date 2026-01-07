import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  js.configs.recommended,

  ...astro.configs.recommended,

  ...svelte.configs['flat/recommended'],

  {
    files: ['**/*.{js,ts,astro,svelte}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Keep things chill for frontend work
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
