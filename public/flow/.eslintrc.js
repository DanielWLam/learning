module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-param-reassign": [0]
    },
    "env": {
        "browser": true,
        "node": true
    },
    "global": {
        "document": false
    }
};