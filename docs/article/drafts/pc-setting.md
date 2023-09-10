---
title: PC設定
summary: マイPC(kali linux)のインストール備忘録
authors:
  - tomoesaturn
date: 2020-09-12
---

# PC設定

## PCのスペック
`sudo dmidecode`

- CPU Intel(R) Core(TM) i5-8400 CPU @ 2.80GHz
    + [https://ark.intel.com/content/www/jp/ja/ark/products/126687/intel-core-i5-8400-processor-9m-cache-up-to-4-00-ghz.html](https://ark.intel.com/content/www/jp/ja/ark/products/126687/intel-core-i5-8400-processor-9m-cache-up-to-4-00-ghz.html)
- メモリ2 slot, max 32GB
    + 初期装備Kingston CBD26D4S9S8ME-8 / 8GB SO-DIMM DDR4-2400 CL17
    + 換装後Crucial 16GB*2 SO-DIMM DDR4-2666 CL19
- チップセットintel H310
- SSD 480GB M.2 SATA3 6Gb/s
- HDMI出力
- VGA出力
- マイク入力・出力
- USB typeC * 1
- USB typeA 3.0*2(黒色端子) 3.1*1(水色端子)
- SDカード
- 有線ポート (Giga Lan)
- スピーカー
- 無線IEEE802.11 ac/a/b/g/n (`iwconfig`)
- bluetooth 5.0
- カメラ(100万画素)

## クリーンインストール

1. anydeskを使ってファイルをバックアップしておく。一度に10GBくらいまで転送できる。(暫定対応)
1. linuxデスクトップを使ってインストールメディア作成(winならrufusを使う)
    + usbを挿すがマウントしない。`lsblk`で確認。
    + `dd` でusbの中身を上書きする。結構時間がかかった。
    + 参考 : [https://wiki.archlinux.org/title/USB_flash_installation_medium#In_GNU/Linux](https://wiki.archlinux.org/title/USB_flash_installation_medium#In_GNU/Linux)
1.  kaliをWindowsノートにインストールする
    + BIOS画面でsecure boot無効化、bootの優先順位変更しusbのイメージで起動する
    + kaliをクリーンインストール(entire disk)
    + kali-linux-largeもインストールするように設定。
    + インストール時はインターネットに接続する必要があるので、有線LANで接続しておくと良さそう。
    + GUI環境としてxfceを選択
    + locale、言語は日本を選択(wine環境に対応させるため)
    + 参考 : [https://www.kali.org/docs/installation/hard-disk-install/](https://www.kali.org/docs/installation/hard-disk-install/)
1. 一応やっとく
    ```bash
    sudo apt update && sudo apt upgrade
    ```
1. ターミナルのフォント設定
    + Hackフォントを設定
1. バックアップしたファイルを戻す
    + anydeskのインストール。公式サイトからダウンロードしたdebファイルで
    ```bash
    sudo apt install /path/to/anydesk-install-file.deb
    ```
    + anydeskは常駐するので、削除したければ
    ```bash
    sudo apt remove --purge anydesk
    ```
1. 日本語キーボード対応
    +  iBus mozcを使う。インストール後再起動。
    ```bash
    sudo apt install ibus-mozc
    ```
    + kaliスタートメニューからiBus設定を呼び出せて、入力が日本語mozcになっていればOK

    + Windowsで圧縮されたzipファイルを解凍するときに、デフォの`unzip`だと文字コードが検出してくれない。ので、解凍専用に`unar`を入れる。zip以外の解凍にも使えるみたい。[https://theunarchiver.com/](https://theunarchiver.com/)

1. ハイバネーション設定
    + スワップ領域の設定をしてなかったので、スワップファイルを8GB作成。[https://wiki.archlinux.jp/index.php/%E3%82%B9%E3%83%AF%E3%83%83%E3%83%97#.E3.82.B9.E3.83.AF.E3.83.83.E3.83.97.E3.83.95.E3.82.A1.E3.82.A4.E3.83.AB](https://wiki.archlinux.jp/index.php/%E3%82%B9%E3%83%AF%E3%83%83%E3%83%97#.E3.82.B9.E3.83.AF.E3.83.83.E3.83.97.E3.83.95.E3.82.A1.E3.82.A4.E3.83.AB)
    ```bash
    fallocate -l 8192M /swap.extended
    chmod 600 /swap.extended
    mkswap /swap.extended
    swapon /swap.extended
    ```
    + `/etc/fstab`にスワップファイルを追記してスワップの設定を永続化。すでに別のスワップ領域がある場合は優先度を指定する。
    ```
    # extended swap file
    /swap.extended none swap defaults,pri=100 0 0
    ```
    + ブートローダの設定変更。`/etc/default/grub`の`GRUB_CMDLINE_LINUX_DEFAULT`を以下で書き換えて、`sudo update-grub`で設定を反映させる。`/swap.extended`のUUIDは`sudo blkid /swap.extended`でわかる。`/swap.extended`の物理先頭アドレスは`sudo filefrag -v /swap.extended`でわかる。
    ```
    // /etc/default/grub
    GRUB_CMDLINE_LINUX_DEFAULT="quiet splash resume=UUID=febb1e82-1793-46d5-ae51-3057e9c4a389 resume_offset=34815"
    ```
    + initramfsの設定変更。`/etc/initramfs-tools/conf.d/resume`の`RESUME`を以下で書き換えて、`sudo update-initramfs -u -k all `で設定を反映させる。//TODO:なんかwarningでる
    ```
    // /etc/initramfs-tools/conf.d/resume
    RESUME=UUID=febb1e82-1793-46d5-ae51-3057e9c4a389  resume_offset=34815
    ```
    + //TODO: ハイバーネートできてない。
1. bluetooth
    `sudo systemctl enable --now bluetooth`
1. パスワードなしで自動ログイン
    `cat /etc/X11/default-display-manager`でディスプレイマネージャを調べる。xfce版kaliならlightdmのはず。ディスプレイマネージャの設定ファイル`/etc/lightdm/lightdm.conf`の自動ログイン設定を書き換える。
    ```bash
    autologin-user=hotaru
    ```

## WineでPCゲーム起動

1. wine日本語環境セットアップ
    + wineをインストール。[https://wiki.winehq.org/Debian](https://wiki.winehq.org/Debian)
    + winetricksをインストール。[https://wiki.winehq.org/Winetricks#Installing_winetricks](https://wiki.winehq.org/Winetricks#Installing_winetricks)
    + Windows media player11
    ```bash
    winetricks -q wmp11
    ```
    + 日本語の豆腐文字化け対応
    ```bash
    winetricks allfonts fakejapanese_ipamona
    ```
     + 参考 : [https://kakurasan.tk/winenotes/fontsettings/](https://kakurasan.tk/winenotes/fontsettings/)
1. wine管理下の仮想Cディレクトリの場所は`~/.wine/drive_c`。ここやゲームのインストール場所にシンボリックリンクを貼っておくと便利。
    ```bash
    ln -s ~/.wine/drive_c/wineGames
    ```
1. `wine hoge.exe`でexeを起動できる。初回起動時にGUIからwine Mono, Geckoのインストールを要求される。

# 環境構築

1. VSCode(Code-OSS)
    + インストール済み
    + terminalのフォントをkaliのターミナルと合わせておく
    + GitGraph入れる
    + Hackフォントを設定
1. snap有効化
    + snap, apparmor有効化
    ```bash
    sudo apt install snapd
    sudo systemctl enable --now snapd
    sudo snap install core
    sudo systemctl enable --now apparmor.service
    ```
    + `/snap/bin`にパスを通す。sudoでも使えるように、`sudo visudo`で`/etc/sudoers`のsecure pathにも追加する
    + 参考 : [https://snapcraft.io/docs/installing-snap-on-debian](https://snapcraft.io/docs/installing-snap-on-debian), [https://wiki.archlinux.jp/index.php/Snap](https://wiki.archlinux.jp/index.php/Snap)
1. intellij, android studio
    + snapでintellijをインストール。[https://pleiades.io/help/idea/installation-guide.html#snap](https://pleiades.io/help/idea/installation-guide.html#snap)
    + memory indicatorを表示して、vm optionでxms,xmxを2GiBに設定する
    + intellijでandroid projectを開始するなどして、intellijにandroid studioをインストールさせる。
    + `/usr/share/applications/intellij-idea-community.desktop`を作成してスタートメニューに表示させる。
    ```
    [Desktop Entry]
    Name=Intellij Idea Community
    Exec=/snap/bin/intellij-idea-community
    Icon=/snap/intellij-idea-community/current/bin/idea.png
    Type=Application
    StartupNotify=false
    StartupWMClass=Intellij Idea Community
    Categories=Development;IDE;
    Keywords=intellij;idea;
    ```
    + Hackフォントを設定
1. Python
    + デフォルトだと2系なので、`sudo apt install python-is-pyhton3` で3系にパスを通す。
    + `sudo apt install python3-venv`でvenvを使えるようにする。個人プロジェクトに使うPythonはvenvで仮想環境を作って管理する。例えば、プロジェクトのルート直下にvenvフォルダを作成してそこに仮想環境を導入する。`python -m venv venv`。その後、ルートのenvrcに`source ./venv/bin/activate`を書けば、pyenvと同じように、ディレクトリ移動でPython環境を切り替えられる。
1. node
    + デフォルトで`apt install nodejs`されているが、バージョンが古いのでそのままではまともに動かない。
    + node, npmをインストールして、nodeのパッケージマネージャnをインストール
    ```bash
    sudo apt install nodejs npm
    sudo npm install n
    ```
    + nで最新版のnode,npmを入れて、元々あったnpmを取り除く
    ```bash
    sudo n stable
    sudo apt purge --remove nodejs npm
    npm install -g npm
    ```
    + node,npmのバージョンがnで入れたstable versionになっていればok
    + vscodeが動かなくなったのでaptのnodejsだけ入れ直した。//TODO: なんかやばいかも
    ```bash
    sudo apt install nodejs
    ```
    + node_modulesが膨大になりがちで、`System limit for number of file watchers reached`エラーが出やすい。`inotify`で監視できるファイル数の上限値を上げておく。
    ```bash
    echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
    ```
1. gdb-peda
    + [https://github.com/longld/peda#installation](https://github.com/longld/peda#installation)
1. firejail
    + `sudo apt install firejail`
    + 参考 : [https://github.com/netblue30/firejail](https://github.com/netblue30/firejail), [https://wiki.archlinux.jp/index.php/Firejail](https://wiki.archlinux.jp/index.php/Firejail)
1. docker
    + snapではなくaptでインストール。[https://www.kali.org/docs/containers/installing-docker-on-kali/](https://www.kali.org/docs/containers/installing-docker-on-kali/)
    ```bash
    sudo apt install docker.io docker-compose
    sudo systemctl enable --now docker
    sudo usermod -aG docker $USER
    ```
1. virtual box
    + `sudo apt install virtualbox`
    + Linux Mintのisoイメージをダウンロードし、仮想環境を新規作成。OSインストールに10GBくらい必要らしいので、20GBくらいの仮想領域を割り当てる。
    + インストール後、`sudo apt update && sudo apt upgrade`
    + 共有フォルダをマウントするために、guest additionsをインストールする。ゲスト側ウィンドウの "デバイス"->"Guest Additions CDイメージの挿入"を選択。vbox GAのisoイメージがマウントされたが、自動インストールが走らなかったので、`sudo ./VBoxLinuxAdditions.run`でCUIからインストール
    + GAインストール後再起動。共有フォルダ用のグループが作成されていることを確認し、ログインユーザをグループに追加し、再ログイン。
    ```bash
    cat /etc/group | grep vboxsf
    sudo gpasswd -a $USER vboxsf
    ```
    + ホスト側のvirtualbox GUIから、共有フォルダを自動マウントするように設定。これで共有できるはずで、`/media/sf_$(folder_name)`にマウントされる。
    + 参考 : [https://sicklylife.hatenablog.com/entry/2020/05/05/234128](https://sicklylife.hatenablog.com/entry/2020/05/05/234128)
    + (公式マニュアルは正直わからん...) [https://www.virtualbox.org/manual/UserManual.html#sharedfolders](https://www.virtualbox.org/manual/UserManual.html#sharedfolders)
1. Rust
    + `$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh`
    + zshrcにパス設定
    + vscodeのRustプラグインをインストール
    + `rustup component add rls rust-analysis rust-src`でコード補完機能を効かせる。[https://github.com/rust-lang/rls](https://github.com/rust-lang/rls)
1. Golang
    + `sudo apt install golang`
1. direnv
    + ディレクトリごとに.envrcを作成でき、シェルから自動で読み込める。Python推奨のvenv使うときに便利。[https://docs.python.org/ja/3/library/venv.html](https://docs.python.org/ja/3/library/venv.html)
    + `sudo apt install direnv`
    + zshrcに
    ```
    export EDITOR=vim
    eval "$(direnv hook zsh)"
    ```
    を追加
    + `direnv init /path`でenvrcを作成できる。
    + zshrcでシェルに入ったとき、direnvを有効化する。
    ```bash
    export EDITOR=vim
    eval "$(direnv hook zsh)"
    direnv allow
    ```
    を追加。
    + `direnv: PS1 cannot be exported. `みたいなエラーが出る。PS1とはシェルのプロンプトストリングのこと。zshrcで制御されてるのでdirenvによる書き換えに失敗してエラーが出てると思われる。実害はなさそう。
1. pandoc, latex
    + `sudo apt install pandoc texlive-full`
1. lxd
    + `sudo snap install lxd`
    + lxdグループが作成されるので(`cat /etc/group`)自分を追加する。追加しないとsudoでしか使えない。
    ```
    sudo gpasswd -a ${USER} lxd
    ```
