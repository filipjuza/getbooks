module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ['airbnb-base', 'plugin:node/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
        'max-len': ['warn', 140],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'comma-dangle': ['error', 'never'],
        'no-unused-vars': ['warn'],
        'no-console': 'off'
    }
};
