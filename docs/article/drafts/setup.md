---
tags:
  - HTML5
  - JavaScript
  - CSS
---

# Ubuntuを快適に使うためのTips集

Ubuntu、使ってますか〜〜？

最近のUbuntuはちょっと設定を凝るだけでMacと遜色ない使い心地になります。私自身デスクトップLinuxを使い始めて3年ほどになり知見も溜まってきましたので、自分なりのTips集を残します。

まあ、こんなページを見るくらいの人間は開発者しかいないでしょう。間違ってたこと書いてたらゴメンしてちょ。

---

**動作環境: Ubuntu22.04**

## 日本語環境

### 言語設定

- システム言語: 英語(US)
- フォーマット(日時・通貨等): 日本
- 

### 入力設定


### Ubuntu日本語版

[Ubuntu Japanese Team](https://www.ubuntulinux.jp/home)が作っている日本語環境もあるらしいですが、使ったことないのでなんとも言えないです。日本語の文字コード周りのツールがプリインストールされているようなので、Windowsと連携するならこっちのほうがいいかもですね。

## デスクトップ環境

### Wayland無効化

Waylandをディスプレイサーバとして使うとGoogle MeetやMicrosoft Teamsなどで画面共有ができません。このためWaylandは無効化してXを使います。

`/etc/gdm3/custom.conf`で`WaylandEnable=false`と設定して、Xで

### 3本指ジェスチャー

Waylandは3本指ジェスチャーの機能もデフォルトで備えているため、無効化した場合は3本指ジェスチャーを自力で設定する必要があります。

### Gnome Tweaks, Gnome Extension Manager

デスクトップやウィンドウのタイトルバーの挙動を変えたいときは、Gnome TweaksやGnome Extension Managerを使うと変更できます。

## Googleアカウントとの連携

### Googleドライブ

設定画面からGoogleアカウントと連携すると、Googleドライブをマウントして標準のファイルエクスプローラからGoogleドライブを操作できるようになります。

### Evolution

GNOME EvolutionをGoogleアカウントと連携させると、GMailやGoogleカレンダーをデスクトップアプリとして統合できます。

## ターミナル

MacのiTermのホットキー機能のような感じでターミナルを呼び出せる[Guake Terminal](http://guake-project.org/)を使ってます。

## IDE

- VSCodeは公式debパッケージからインストールする。aptリポジトリの設定はインストール時に勝手にやってくれるのでアップデートは気にしなくていい。snap版は日本語入力が出来ない。
- JetBrains系IDEはJetBrains ToolBoxで管理する。

![gazou](../../images/1686051360000.jpg)

## ゲーム

directxのエミュレータを有効化するとwindows用のゲームも遊べる。
