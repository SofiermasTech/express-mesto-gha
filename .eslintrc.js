module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": {
      "airbnb-base":
    [
        "eslint:recommended",
        "plugin:react/recommended"
    ]},
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "no-underscore-dangle": [
        "error",
        {
          "allow": [
            "_id"
          ]
        }
      ]
    }
}
