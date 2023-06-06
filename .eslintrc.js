{
  "root": true,
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    "prettier/prettier": [
      "error",
      { "endOfline": "semicolon" },
      { "usePrettierrc": true }
    ]
  }
}


        
 