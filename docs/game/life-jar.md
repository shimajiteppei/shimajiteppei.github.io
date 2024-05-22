# ライフゲーム（高校時代版）

<div class="xp-css" style="width: 100%; display: flex; flex-direction: column;">
  <div class="window">
    <div class="title-bar" style="padding: 16px">
      <div class="title-bar-text">
      </div>
      <div class="title-bar-controls">
        <button
          aria-label="Maximize"
          onclick="document.getElementById('life-jar_content').requestFullscreen()"
        >
        </button>
      </div>
    </div>
    <div class="window-body" style="margin: 16px;">
      <iframe
        id="life-jar_content"
        src="/javascripts/life-jar/index.html"
        width="100%"
        height="600"
        loading="lazy"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</div>

2012年、高校2年生のときにJava 7のSwingで作ったライフゲームです。

いまではブラウザでJavaを動かせなくなってしまいましたが、このページでは[CheerpJ](https://leaningtech.com/cheerpj/)というJavaのGUI環境を提供するWasmライブラリを使って表示しています。jarを[こちら](/javascripts/life-jar/Life.jar)からダウンロードしてデスクトップアプリとしても実行できます。

## 昔話

私がプログラミングに出会ったきっかけは高校の物理同好会でした。Perlをやってる先輩がいて、なんかすごそう（小並感）と思って自分もやってみようと思ったのがきっかけです。

最初はどんな言語があるとかも全く知らず、伊勢市立図書館で「プログラミング」と蔵書検索してJava 1.4の古い入門書を借りました。本に付属していたCDからJDK,JREを家族共用のPCに入れて、環境変数を変更してパスを通し、メモ帳を立ち上げてHeloWorldを書いたのが人生最初のプログラミング経験でした。設定やエラーを試行錯誤して、HelloWorldを出力するのに2週間くらいかかったのはいい思い出です。

それから徐々にググって調べるということを覚えていって、地元の書店でJava 5の本を買ったり、[JavaDrive](https://www.javadrive.jp/)や[とほほのJava入門](https://www.tohoho-web.com/java/)を見ながら独学でJavaを書いてました。プログラミング初心者によくあることではありますが、GUIのような目に見えるものが自分の手で作れることに感動して、Swingでいろいろデスクトップアプリを作りました。そのうちの1つがこのライフゲームです。私は当時から慢性中二病を患っており、図書館でカオス理論のブルーバックスを読んでライフゲームを知りました。単純なルールから複雑な動きを作り出せるのが面白く、自分でも作りたくなってこのアプリを作りました。

大学は理学部に進み、[S2S](https://s2s.undefin.net/)という自主ゼミサークルに入って数学や物理の勉強をしてました。当時S2Sはアウトリーチ活動の一環として、11月の学祭で部員たちが書いた雑誌の販売に加え、数学や物理に関する展示・解説をしていました。何のきっかけだったか忘れましたがこのライフゲームを展示品の1つとして使うことになって、吉田南の総人棟地下一階の講義室でプロジェクターに映して来場者の方々に遊んでもらってました。

開発者の自分としてはこんなセル・オートマトンの、古臭いUIで操作性も悪いゲームはあんまりウケないんじゃないかと思ってました。しかし学祭が始まってみると意外と好評で、特に子供さんが熱心に遊んでくれました。もともとは自分の興味のために作ったGUIアプリなのに、こんなにも多くの人の心を動かせるのかと驚きました。

なんだかんだでそのとき感じた気持ちが、ソフトウェアエンジニアとして働いていく原動力となっている気がします。
