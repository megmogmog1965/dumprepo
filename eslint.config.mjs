import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
  {
    files: ['src/**/*.{js,mjs,cjs,ts}'],
    rules: {
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
    },
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]