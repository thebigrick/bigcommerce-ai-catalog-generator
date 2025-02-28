import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {ignores: ['**/*.js']},
    {
        rules: {
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
    {
        plugins: ['prettier'],
        extends: ['plugin:prettier/recommended'],
        rules: {
            'prettier/prettier': [
                'error',
                {
                    tabWidth: 2,
                    singleQuote: true,
                },
            ],
        },
    },
];
