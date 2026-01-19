---
description: 自作のリバーシで遊べます
---

# リバーシ

<link rel="stylesheet" href="/static/stylesheets/xp.css">

<div class="xp-css" style="width: 100%; display: flex; flex-direction: column;">
  <div class="window">
    <div class="title-bar" style="padding: 16px;">
      <div class="title-bar-text">
      </div>
      <div class="title-bar-controls">
        <button
          aria-label="Maximize"
          disabled
        >
        </button>
      </div>
    </div>
    <div id="game-window" class="window-body" style="margin: 16px; font-size: 16px;">
      <div style="display: flex; justify-content: center;">
        CPUの強さ：<div id="mode"></div>
        <div style="padding-left: 16px;">
            <button id="new-game-easy" type="button">EASYで開始</button>
        </div>
        <div style="padding-left: 16px;">
            <button id="new-game-hard" type="button">HARDで開始</button>
        </div>
      </div>
      <canvas id="canvas" style="width: 100%"></canvas>
      <div style="display: flex; justify-content: center;">
        <div id="status"></div>
      </div>
      <script type="module" src="/static/javascripts/reversi/index.js"></script>
    </div>
  </div>
</div>

リバーシで遊べます。勝てるかな？

ソースコードは[GitHub](https://github.com/shimajiteppei/gemini)で公開しています。
