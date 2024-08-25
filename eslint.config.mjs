// xx @ts-check

import eslint from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import hooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      '@stylistic/ts': stylisticTs,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@stylistic/ts/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/ts/member-delimiter-style': ['error'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', {allowNumber: true}],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@stylistic/ts/quotes': ['error', 'single', {allowTemplateLiterals: true}],
      'no-param-reassign': 'error',
      "react-hooks/rules-of-hooks":"error",
      'react-hooks/exhaustive-deps': 'error',
    },
  }
];

// module.exports = {
//   root: true,
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:@typescript-eslint/recommended-requiring-type-checking',
//     'plugin:@typescript-eslint/strict',
//     'plugin:react-hooks/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     tsconfigRootDir: __dirname,
//     project: [
//       './tsconfig.json',
//       './src/stories/tsconfig.json',
//     ],
//   },
//   plugins: [
//     '@typescript-eslint',
//   ],
//   rules: {
//     '@typescript-eslint/ban-ts-comment': ['off'],
//     '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
//     '@typescript-eslint/member-delimiter-style': ['error'],
//     '@typescript-eslint/no-explicit-any': 'error',
//     '@typescript-eslint/no-non-null-assertion': 'off',
//     '@typescript-eslint/no-unnecessary-condition': 'error',
//     '@typescript-eslint/no-unused-vars': 'error',
//     '@typescript-eslint/prefer-nullish-coalescing': 'error',
//     '@typescript-eslint/quotes': ['error', 'single', {allowTemplateLiterals: true}],
//     'no-param-reassign': 'error',
//     'react-hooks/exhaustive-deps': 'error',
//   },
// };
