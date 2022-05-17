module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'airbnb',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'import', 'prettier'],
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json'
            }
        }
    },
    rules: {
        'react/jsx-filename-extension': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/function-component-definition': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'import/extensions': ['error', 'never', { json: 'always', css: 'always' }],
        'import/prefer-default-export': 'off',
        'import/first': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: ['**/*.test.ts', '**/*.test.js', 'vite.config.ts']
            }
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }
        ],
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all' }],
        'no-unused-vars': 'off',
        'linebreak-style': ['error', 'unix'],
        'comma-dangle': ['error', 'never'],
        'class-methods-use-this': 'off',
        semi: ['error', 'always']
    }
};
