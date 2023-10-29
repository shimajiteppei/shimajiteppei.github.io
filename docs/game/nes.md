# ファミコンエミュレータ

ファミコンエミュレータを趣味で作ってます。ソースコードは[GitHub](https://github.com/shimajiteppei/aries)で公開しています。

このページでは、Shiruさんが開発した[Alter Ego](https://shiru.untergrund.net/software.shtml)というソフトをプレイできます。キーボードとゲームパッドの両方に対応しています。


<div style="text-align: center; padding-top: 24px;">
キーボード入力の操作法

<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;">
<div>Bボタン = Q</div>
<div>Aボタン = W</div>
<div>SELECTボタン = E</div>
<div>STARTボタン = R</div>
<div>←ボタン = J</div>
<div>→ボタン = L</div>
<div>↑ボタン = I</div>
<div>↓ボタン = K</div>
</div>

<div style="width: 100%; display: flex; flex-direction: column;">
<canvas id="canvas" width="256" height="240" style="width: 100%"></canvas>
<button
  type="button"
  onclick="document.getElementById('canvas').requestFullscreen()"
  style="justify-content: end; border: solid 1px; cursor: pointer;"
  onMouseOver="this.style.background='lightgray';"
  onMouseOut="this.style.background='white';">フルスクリーン表示
</button>
</div>

<script type="module" src="../../javascripts/nes/index.js"></script>
</div>
