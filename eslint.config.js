import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

const sourceFiles = [
  '*.config.js',
  'apps/home/**/*.{js,mjs,ts}',
  'apps/blog/.vitepress/**/*.{js,mjs,ts,vue}',
  'scripts/**/*.{js,mjs}',
  'src/**/*.{js,mjs,ts}',
];

const nodeFiles = [
  '*.config.js',
  'apps/blog/.vitepress/config.ts',
  'apps/home/vite.config.ts',
  'scripts/**/*.{js,mjs}',
  'src/**/*.config.ts',
  'src/**/*.mjs',
];

const browserFiles = [
  'apps/home/src/**/*.{js,ts}',
  'apps/blog/.vitepress/components/**/*.vue',
  'apps/blog/.vitepress/theme/**/*.{js,ts,vue}',
];

const tsFiles = [
  'apps/home/**/*.ts',
  'apps/blog/.vitepress/**/*.ts',
  'src/**/*.ts',
];

const vueFiles = ['apps/blog/.vitepress/**/*.vue'];

const ignoredFiles = [
  '**/node_modules/**',
  '**/dist/**',
  '.obsidian/**',
  'posts/**',
  'apps/home/dist/**',
  'apps/blog/.vitepress/cache/**',
  'apps/blog/.vitepress/dist/**',
  'docs/.vitepress/cache/**',
  'docs/.vitepress/dist/**',
];

const tsRecommendedRules = tseslint.configs.recommended.reduce(
  (rules, config) => ({ ...rules, ...config.rules }),
  {},
);

const qualityRules = {
  'comma-spacing': ['error', { after: true, before: false }],
  complexity: ['error', 8],
  curly: ['error', 'all'],
  eqeqeq: ['error', 'always'],
  'max-depth': ['error', 3],
  'max-lines': [
    'error',
    { max: 240, skipBlankLines: true, skipComments: true },
  ],
  'max-lines-per-function': [
    'error',
    { max: 50, skipBlankLines: true, skipComments: true },
  ],
  'max-params': ['error', 4],
  'max-statements': ['error', 24],
  'no-console': 'error',
  'no-warning-comments': [
    'warn',
    { location: 'start', terms: ['todo', 'fixme'] },
  ],
  'object-curly-spacing': ['error', 'always'],
};

const importRules = {
  'no-duplicate-imports': 'error',
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': 'error',
  'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
  'vue/multi-word-component-names': [
    'error',
    { ignores: ['Comment', 'Layout'] },
  ],
};

export default [
  { ignores: ignoredFiles },
  ...vue.configs['flat/recommended'],
  {
    files: sourceFiles,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...qualityRules,
      ...importRules,
    },
  },
  {
    files: nodeFiles,
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: browserFiles,
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: tsFiles,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tsRecommendedRules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      'no-undef': 'off',
    },
  },
  {
    files: vueFiles,
    languageOptions: {
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tsRecommendedRules,
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      'no-undef': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}'],
    rules: {
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
];
