module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ['airbnb-base', 'plugin:node/recommended', 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        'no-unused-vars': ['warn'],
        'no-console': 'off',
        'no-underscore-dangle': ['off']
    }
};
