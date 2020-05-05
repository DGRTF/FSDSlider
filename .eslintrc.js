module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        'airbnb-typescript/base',
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        project: './tsconfig.json',
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        // "indent": ["error", 4],
        "linebreak-style": 0,

    }
};