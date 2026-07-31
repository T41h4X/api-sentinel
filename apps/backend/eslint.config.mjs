import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/** Lint rules shared by application and test TypeScript sources. */
export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  ignores: ['dist/**', 'node_modules/**'],
  rules: { '@typescript-eslint/no-explicit-any': 'error' },
});
