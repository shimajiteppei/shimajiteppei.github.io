---
description: 高校生のときに自作したライフゲームを遊べます
---

# ライフゲーム

<link rel="stylesheet" href="/static/stylesheets/xp.css">

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
        src="/static/javascripts/life-jar/index.html"
        width="100%"
        height="600"
        loading="lazy"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</div>

2012年にJava 7のSwingで作ったライフゲームです。

いまではブラウザでJavaを動かせなくなってしまいましたが、このページでは[CheerpJ](https://leaningtech.com/cheerpj/)というJavaのGUI環境を提供するWasmライブラリを使って表示しています。jarを[こちら](/static/javascripts/life-jar/Life.jar)からダウンロードしてデスクトップアプリとしても実行できます。
