module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: ['react-app', 'airbnb', 'prettier', 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'arrow-body-style': ['off'],
        'max-len': ['warn', 120],
        'comma-dangle': ['error', 'never'],
        'no-unused-vars': ['warn'],
        'no-underscore-dangle': ['off'],
        'react/prefer-stateless-function': ['off'],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/jsx-filename-extension': ['off'],
        'jsx-a11y/label-has-associated-control': ['off'],
        'func-names': ['off'],
        // 'react/prop-types': ['off'],
        'react/destructuring-assignment': ['off'],
        'import/prefer-default-export': ['off']
    }
};
