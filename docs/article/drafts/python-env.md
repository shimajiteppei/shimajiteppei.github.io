---
title: 私のpython仮想環境
summary: マイPCでのpython仮想環境の作成方法
authors:
  - shimajiteppei
date: 2020-09-12
---

# 私の Python 仮想環境

## 仮想環境について

[PEP 405](https://www.python.org/dev/peps/pep-0405/) のアブストにあるように、Pythonでいう"仮想環境"とは、システム用のpythonとは分離されたpython実行環境のことを指す。

パッケージ管理もシステムのPythonとは別に行うことになるので、環境を汚さなくていいというのが利点。

## Python 管理ツールいろいろ

テックブログを検索すると山ほど出てくる。
どれがデファクトスタンダードだとかは無く、それぞれのツールで何ができるかを吟味して選定する、というのが現状だろう。

以下に有名どころを挙げてみた。

### バージョン切り替え、仮想環境

[venv](https://docs.python.org/ja/3/library/venv.html)
: 公式の仮想環境。

[virtualenv](https://virtualenv.pypa.io/en/latest/)
: venvみたいなやつ。

[pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)
: 複数のPythonバージョンを切り替えられる。

### パッケージ管理

[pipenv](https://github.com/pypa/pipenv)
: lockファイルを使ってパッケージ管理をする。lockがクソ遅いので使いたくない。

[poetry](https://github.com/python-poetry/poetry)
: tomlファイルを使ってパッケージ管理をする。pipenvよりは速いらしい。

[anaconda](https://repo.anaconda.com/)
: データサイエンス向けらしい。パッケージマネージャがpipではなくcondaになるので、pipのパッケージと挙動が違うとかあるらしい。

## 私の作成方法

**venv + direnv** で作成する。

TL;DR

```bash
python -m venv venv && echo "source ./venv/bin/activate" >> ./.envrc && direnv allow
```

個人開発だし、Pythonのバージョンを切り替えたいことはまあ無いので、venvだけ使う。切り替えが必要になればpyenvを使う。

venvは公式ツールなので、dockerやCIなどでそもそも仮想環境を作る必要がないときに余計なパッケージを入れなくていいという利点がある。

### install Python

kaliはデフォルトだと2系が使われているので3系にパスを通して、venvも有効化する。

```bash
sudo apt install python3 python-is-pyhton3 python3-venv
```

### venv

[公式](https://docs.python.org/ja/3/tutorial/venv.html) に沿って作成。

プロジェクトのルートフォルダ直下で `./venv` フォルダを作成する。

```bash
python -m venv venv
```

`source ./venv/bin/activate` を叩くと、仮想環境が有効化され、好きに汚していい環境になる。

```bash
pip install numpy
```

```bash
pip freeze > requirements.txt
```

```bash
pip install -r requirements.txt
```

あたりのコマンドを使って依存ライブラリを導入していく。

### direnv

venv有効化の `source ./venv/bin/activate` を叩くのが面倒なので、
プロジェクトのルートフォルダに移動したとき自動的に叩くようにする。
このために [direnv](https://github.com/direnv/direnv#direnv----unclutter-your-profile) を使う。

```bash
sudo apt install direnv
```

でインストールして、`.zshrc` に以下を追加する。

```bash
# direnv
eval "$(direnv hook zsh)"
```

あとはプロジェクトのルートフォルダ直下の `.envrc` ファイルに、フックしたいコマンドを書けばいい。

```bash
echo "source ./venv/bin/activate" >> ./.envrc
```

#### 注意

1. direnvでエイリアス登録はそのままだとできない。[Picking up aliases and functions](https://github.com/direnv/direnv/issues/73#issuecomment-152284914)
1. `direnv: PS1 cannot be exported. `みたいな警告が出る。PS1とはシェルのプロンプトストリングのこと。zshrcで制御されてるのでdirenvによる書き換えに失敗してエラーが出てると思われる。実害はなさそう。

## 参考文献

- [(公式) Python チュートリアル / 12. 仮想環境とパッケージ](https://docs.python.org/ja/3/tutorial/venv.html)
- [PEP 405 -- Python Virtual Environments](https://www.python.org/dev/peps/pep-0405/)
- [venv](https://docs.python.org/ja/3/library/venv.html)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)
- [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv)
- [pipenv](https://github.com/pypa/pipenv)
- [poetry](https://github.com/python-poetry/poetry)
- [anaconda](https://repo.anaconda.com/)
- [direnv -- unclutter your .profile](https://github.com/direnv/direnv#direnv----unclutter-your-profile)
- [Picking up aliases and functions](https://github.com/direnv/direnv/issues/73#issuecomment-152284914)
- [Pipenv をやめて venv を使いだした話](https://blog.uedder.com/2020_python_develop_envirionment.html)
- [python の環境構築戦争にイラストで終止符をどうやら打てない](https://qiita.com/ganyariya/items/1bf870275bad7b5ab506)
<!-- textlint-disable -->
- [pyenv が必要かどうかフローチャート](https://qiita.com/shibukawa/items/0daab479a2fd2cb8a0e7)
<!-- textlint-enable -->
- [2020 年の Python パッケージ管理ベストプラクティス](https://qiita.com/sk217/items/43c994640f4843a18dbe)
- [Numpy に使われる BLAS によって計算速度が変わるらしい【Python】](https://insilico-notebook.com/python-blas-performance/)
