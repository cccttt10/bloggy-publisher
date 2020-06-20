module.exports = {
    'env': {
        'es6': true,
        'mocha': true,
        'node': true
    },
    'extends': [
        require.resolve('@umijs/fabric/dist/eslint'),
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'globals': {
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
        page: true,
        REACT_APP_ENV: true
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 9,
        'sourceType': 'module'
    },
    'plugins': ['simple-import-sort'],
    'rules': {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                'argsIgnorePattern': '^(req|res|next)$'
            }
        ],
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
        'camelcase': 'error',
        'eqeqeq': 'error',
        'max-lines': ['warn', 200],
        'no-console': 'warn',
        'no-else-return': 'off',
        'no-restricted-syntax': 'off',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'off',
        'no-unused-vars': [
            'error',
            {
                'argsIgnorePattern': '^(req|res|next)$'
            }
        ],
        'no-useless-escape': 'off',
        'no-var': 'error',
        'react/no-access-state-in-setstate': 'off',
        'require-await': 'error',
        'simple-import-sort/sort': 'error'
    }
};
