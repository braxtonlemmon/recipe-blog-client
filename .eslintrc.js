module.exports = {
  env: {
    node: true,
    commonjs: true,
  },
  parser: "@babel/eslint-parser",
  rules: {
    strict: 0,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
}
