# [工事中]sambaでAD DC作成

## これは何

samba4.14でActiveDirectory Domain Controllerを作成するという、誰得なことを書く。素直にWindowsServer2022を入れろ。

実際Linuxマシンでドメインコントローラを作成している企業はあるのだろうか。

LPIC level3とかの問題にも出るらしい、知らんけど。

Samba Wikiの [Setting up Samba as an Active Directory Domain Controller](https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller)
を参考にする。

## Samba, SMB, ActiveDirectory, LDAP, Kerberos

- Samba : Linux上でWindowsの色々なネットワーク機能を実現するソフトウェア。3.x系からLDAP,Kerberosサーバを内蔵するようになった。
- SMB : Windowsのファイル共有プロトコル。FTPみたいなもん。
- LDAP : ディレクトリサービス。組織のグループや人の情報をまとめて管理できる。
- Kerberos : 2者間認証プロトコル。ActiveDirectoryのシングルサインオン機能に使われる。

ActiveDirectoryって何?

- Windows Server : Windows系サーバ用OS。企業の社内システムで使われることが多い。
- ActiveDirectory DomainService
- ActiveDirectory DomainController :
- Azure ActiveDirectory : ActiveDirectoryの機能をAzure上に移行したもの。認証がAzureに変わっている。

## 環境の選定

ActiveDirectoryはDNSを巧妙に利用するので、ネットワーク絡みの問題が発生しやすい(素直にWindowsServer2022を入れろ)。このため、まずは仮想環境で試すのがいい。

また、UbuntuではSambaをaptでインストールしてそのまま使えば良いが、CentOSだと自前でビルドする必要が出る([Distribution-specific Package Installation](https://wiki.samba.org/index.php/Distribution-specific_Package_Installation))。

なので、Ubuntuを使おう。Ubuntu21からActiveDirectoryにネイティブ対応したし、相性は良いだろう([Ubuntu 21.04を公開](https://jp.ubuntu.com/blog/ubuntu-21-04%E3%82%92%E5%85%AC%E9%96%8B))。

## 構築方法

詳しいことはSamba Wikiを見よう。

Vagrantfileと、プロビジョニングのためのシェルファイルを以下のように書けば、構築できる。

## 参考文献

- [Windows Server 2022 Evaluation version](https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022)
- [(Samba Wiki) Setting up Samba as an Active Directory Domain Controller](https://wiki.samba.org/index.php/Setting_up_Samba_as_an_Active_Directory_Domain_Controller)
- [Ubuntu 21.04を公開](https://jp.ubuntu.com/blog/ubuntu-21-04%E3%82%92%E5%85%AC%E9%96%8B)
