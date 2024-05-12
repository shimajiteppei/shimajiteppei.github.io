# ファミコンエミュレータ

<div class="xp-css" style="width: 100%; display: flex; flex-direction: column;">
<div class="window">
<div class="title-bar" style="padding: 16px;">
<div class="title-bar-text">
</div>
<div class="title-bar-controls">
<button
  aria-label="Maximize"
  onclick="document.getElementById('canvas').requestFullscreen()"
>
</button>
</div>
</div>
<div class="window-body" style="margin: 16px;">
<canvas id="canvas" width="256" height="240" style="width: 100%"></canvas>
</div>
</div>
</div>

<div style="text-align: center; padding-top: 24px;">
キーボード入力の操作法

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
<div>Aボタン = Q</div>
<div>Bボタン = W</div>
<div>STARTボタン = E</div>
<div>SELECTボタン = R</div>
</div>
<script type="module" src="../../javascripts/nes/index.js"></script>
</div>

ファミコンエミュレータを趣味で作ってます。ソースコードは[GitHub](https://github.com/shimajiteppei/aries)で公開しています。

このページでは、Shiruさんが開発した[Alter Ego](https://shiru.untergrund.net/software.shtml)というソフトをプレイできます。キーボードとゲームパッドの両方に対応しています。
