# [工事中]ノート

ためになったこととかをまとめていきます

## よかった資料

- セキュリティ

  - [OWASP の XSS 対策チートシート](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

- 低レイヤ―

  - [琴葉姉妹と学ぶハッキング　 WEB サーバ(nginx)で任意コード実行](https://www.nicovideo.jp/watch/sm35488006?ref=search_key_video&playlist=eyJpZCI6InZpZGVvX3dhdGNoX3BsYXlsaXN0X3NlYXJjaCIsInNlYXJjaFF1ZXJ5Ijp7InR5cGUiOiJrZXl3b3JkIiwicXVlcnkiOiJDVEYg55C06JGJ5aeJ5aa5IiwicGFnZSI6MSwicGVyUGFnZSI6MzIsInNvcnQiOiIraCJ9fQ&ss_pos=2&ss_id=b2ff7423-9723-4524-bb12-e4c2d9b3e538)
  - [BASIC Buffer Overflow | Ryan's CTF 13 Everyday I'm Bufferin](https://www.youtube.com/watch?v=YVlTDPhTA9U)
  - [#1: FizzBuzz をアセンブリ言語で書きたい！](https://www.youtube.com/watch?v=HFzk0fKDm_w)

- アルゴリズム

  - [(AVL 木) ゆっくりが解説する木構造アルゴリズム](https://www.nicovideo.jp/watch/sm17699419?playlist=eyJpZCI6InZpZGVvX3dhdGNoX3BsYXlsaXN0X3VwbG9hZGVkIiwidXNlcklkIjoxMjUzMzEsInNvcnQiOiJmIiwib3JkZXIiOiJkIn0&ref=pc_userpage_video)

- 正規表現

  - [正規表現: Java11: Oracle の Javadoc](https://docs.oracle.com/javase/jp/11/docs/api/java.base/java/util/regex/Pattern.html)
  - [正規表現: JS: MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)

- Git

  - [システム開発プロジェクト応用第一 第 1,2 回 情報収集](https://www.youtube.com/watch?v=zKD09CaRihg)
  - [マンガでわかる Git(<-かわいい)](https://www.r-staffing.co.jp/engineer/entry/20190621_1)
  - [Git Book](https://git-scm.com/book/en/v2)

- C/C++

  - [uchan C++ 講習会：第 0 回 開発環境の紹介と最初のプログラム](https://www.youtube.com/watch?v=pLuZOUusBYI)

- Java

  - [デシリアライズ速度の比較 ByteBuffer vs DirectBuffer vs Unsafe vs C](http://frsyuki.hatenablog.com/entry/2014/03/12/155231)
  - [OpenJDK をソースからビルドする](https://qiita.com/k0kubun/items/c27c2cb6242dc9e6e8e7)
  - [オレ流の OpenJDK の開発環境（JJUG CCC 2019 Fall 講演資料](https://www.slideshare.net/nttdata-tech/openjdk-mystyle-development-build-environment-nttdata-suenaga)
  - [OpenJDK ソースコードリーディング](https://qiita.com/k0kubun/items/0b64048120abf41c0f3d)
  - [徹底解剖「G1GC」実装編](http://www.narihiro.info/g1gc-impl-book/)
  - [OpenJDK の設計と実装に関する備忘録](http://hsmemo.github.io/index.html)

- Android

  - [Ktor on Android](https://qiita.com/oxsoft/items/aec71882b1b21930c953)
  - [MediaProjection API を使ってミラーリングしてみた](https://qiita.com/TakenokoTech/items/b4d6df59244a95c010d1)

- フロントエンド

  - [vue.js + typescript = vue.ts ことはじめ](https://qiita.com/nrslib/items/be90cc19fa3122266fd7)
  - [【Gatsby.js】「ここだけ押さえれば普通に使える」って知識をまとめてみた](https://qiita.com/d0ne1s/items/c3a41236168ede833b85)

- 本
  - [Web サーバを作りながら学ぶ 基礎からの Web アプリケーション開発入門](http://kmaebashi.com/webserver/index.html)
  - [Hacking：美しき策謀 第 2 版 脆弱性攻撃の理論と実際](https://www.oreilly.co.jp/books/9784873115146/)
  - [安全な Web アプリケーションの作り方 第 2 版](https://wasbook.org/)
  - [ゼロからの OS 自作入門](https://zero.osdev.jp/)
  - [はじめて学ぶバイナリ解析　不正なコードからコンピュータを守るサイバーセキュリティ技術](https://tatsu-zine.com/books/binary-analysis)
  - [Optimizing Java](https://www.oreilly.com/library/view/optimizing-java/9781492039259/)

## よかったコマンド

- 特定のディレクトリ下のファイル全部からgrep

```bash
find {{root_path}} -type f -name '*' | xargs grep -n -i '{{string}}'
```

- ランダムな (バイト列 | BASE64文字列) を (Nバイト | N文字) 詰めたファイルが欲しい

```bash
head -c {{N}} /dev/urandom > {{file}}
cat /dev/urandom | base64 | head -c {{N}} > {{file}}
```

- 簡単なPythonコードの結果をワンライナーで標準出力に出す

```bash
python -c 'print("無駄"*1000)'
```

- (for Mac) 出力結果をクリップボードにコピー

```bash
{{hoge}} | pbcopy
```
