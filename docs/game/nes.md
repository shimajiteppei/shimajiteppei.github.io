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
    import init, { WindowContext } from "https://cdn.jsdelivr.net/gh/tomoesaturn/aries@release/nes_wasm/pkg/nes_wasm.js";
    try {
      await init();
      const res = await fetch("../../javascripts/nes/Alter_Ego.nes");
      const buf = await res.arrayBuffer();
      const ctx = new WindowContext("canvas", new Uint8Array(buf));
      window.addEventListener('keydown', (event) => {
        switch (event.key) {
          case "w":
            ctx.keydown_A();
            return;
          case "q":
            ctx.keydown_B();
            return;
          case "e":
            ctx.keydown_SELECT();
            return;
          case "r":
            ctx.keydown_START();
            return;
          case "l":
            ctx.keydown_RIGHT();
            return;
          case "j":
            ctx.keydown_LEFT();
            return;
          case "k":
            ctx.keydown_DOWN();
            return;
          case "i":
            ctx.keydown_UP();
            return;
        }
      });
      window.addEventListener('keyup', (event) => {
        switch (event.key) {
          case "w":
            ctx.keyup_A();
            return;
          case "q":
            ctx.keyup_B();
            return;
          case "e":
            ctx.keyup_SELECT();
            return;
          case "r":
            ctx.keyup_START();
            return;
          case "l":
            ctx.keyup_RIGHT();
            return;
          case "j":
            ctx.keyup_LEFT();
            return;
          case "k":
            ctx.keyup_DOWN();
            return;
          case "i":
            ctx.keyup_UP();
            return;
        }
      });
    } catch { }
  </script>
</div>
