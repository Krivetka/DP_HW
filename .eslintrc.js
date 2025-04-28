module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint'],
    env: {
        node: true,
        jest: true,
    },
    rules: {
        'import/extensions': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-plusplus': 'off',
        'no-continue': 'off',
        'no-useless-constructor': 'off',
        'max-classes-per-file': 'off',
        'no-empty-function': 'off',
        'no-restricted-syntax': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.js']
            }
        }
    }
};
