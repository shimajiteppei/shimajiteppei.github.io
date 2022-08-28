# [工事中]Openjdkビルド

# TLDR

- openjdk ver Nをビルドするにはver NかN-1のjdk (= boot jdk)が必要なので、バージョンN-1のビルド済みjdkをダウンロードしておく
- jdkのメインリポジトリのmasterをcloneする。最新masterだとビルド時にエラーが出ることがあるので、`git tag`で一番新しいバージョンに移動しておく。
- configureコマンド
```bash
bash configure --enable-debug --with-native-debug-symbols=internal --with-jvm-variants=server --with-boot-jdk=/usr/local/src/jdk-16.0.1
```
- [https://openjdk.java.net/groups/build/doc/building.html](https://openjdk.java.net/groups/build/doc/building.html)
