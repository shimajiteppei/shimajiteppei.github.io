# 自作ファミコンエミュレータ

ファミコンエミュレータを趣味で作ってます。ソースコードは[GitHub](https://github.com/tomoesaturn/aries)で公開しています。

このページでは、Shiruさんが開発した[Alter Ego](https://shiru.untergrund.net/software.shtml)というソフトをプレイできます。(PCのみ)


<div style="text-align: center; padding-top: 24px;">

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

<canvas id="canvas" width="256" height="240" style="width: 100%"></canvas>
<script type="module">
import init, { start_nes } from "../../javascripts/nes/nes_wasm.js";
try {
  await init();
  const res = await fetch("../../javascripts/nes/roms/Alter_Ego.nes");
  const buf = await res.arrayBuffer();
  start_nes("canvas", new Uint8Array(buf));
} catch {}
</script>
</div>
