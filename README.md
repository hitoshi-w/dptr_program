
# Taska
タスク管理システム<br>
誰が担当しているか、進捗状況はどうなっているかを管理し、可視化できるWebアプリケーションです

## Configuration
__1. Firebase__<br>
- [Firebase コンソール](https://console.firebase.google.com/?hl=JA)でプロジェクトを作成する<br>
- [Google ログイン](https://firebase.google.com/docs/auth/web/google-signin?hl=ja)を利用して認証を行うための設定をする

__2. git clone__<br>
```
$ git clone git@github.com:hitoshi-w/dptr_program.git
$ cd dptr_program
```
__3. Create .env file__<br>
　作成したプロジェクトのAPIキーなど、必要な情報を .env に記述する
```
$ cp .env.sample .env
```

__4. npm install__<br>
```
$ npm install
```

__5. Start local server__<br>
```
$ npm start
```

## Features
- Googleアカウントでログインができる
- ユーザーはタスクを登録できる
- ユーザーはタスクに担当者が付けれる
- ユーザーはタスクの優先度を高、低で付けれる
- ユーザーはタスクの進捗状況を着手、途中、完了のカテゴリーに分類できる
- タスク内容、担当者で検索ができる

## ER Diagram
![ER diagram](https://user-images.githubusercontent.com/48339549/76759730-9d1c7300-67cf-11ea-8d84-5c2675abb358.png)



