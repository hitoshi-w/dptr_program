module.exports = {
  env: {
    es6: true, //es6から導入されたletやconstを使えるようにする
    browser: true, //browserのグローバル変数, window,alertなど参照可能にする
  },
  parser: "@typescript-eslint/parser", //eslintにtypescriptの構文チェックを可能にする
  extends: [
    "eslint:recommended", //react typescriptの推奨設定に必要
    "plugin:react/recommended", //reactに対するeslintの推奨設定
    "plugin:@typescript-eslint/recommended",//typescriptに対するeslintの推奨設定
    "prettier/@typescript-eslint",//prettierで整形
    "plugin:prettier/recommended", //eslintとprettierの連携における推奨設定
  ],
  rules: {
    "prettier/prettier": "error", //prettier
    '@typescript-eslint/explicit-function-return-type': 'off', //関数の戻り値型off
    'react/prop-types': 'off', //propsの検証、tsの場合コンパイラーが自動的に検証してくれるのでoff
    'react/prefer-stateless-function': 'off', //purecomponent以外も許可
    'react/jsx-filename-extension': 'off', //tsxも許可する
  },
  plugins: [
    '@typescript-eslint', //typescript-eslint
    'react', //eslint-plugin-react
    'prettier', //prettier
  ],
};
//https://aleksandrhovhannisyan.github.io/blog/dev/how-to-set-up-react-typescript-ant-design-less-css-modules-and-eslint/
//https://ginpen.com/2019/08/06/eslint-for-react-in-typescript/

//eslint 構文チェック。ルールに違反したこコードを検知して警告するツール。
//eslintの整形機能は使わず、prettierに任せる。

//eslintとprettierの連携
//eslint-plugin-prettier:eslintでprettierを動かす
//eslint-config-prettier:eslintとprettierの競合を防ぐ

//create-react-appで作られたプロジェクトにはeslintがすでに含まれているため、eslintを再度インストールする必要はない
