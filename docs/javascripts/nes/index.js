import init, {
    WindowContext,
} from "https://cdn.jsdelivr.net/gh/shimajiteppei/aries@release/nes_wasm/pkg/nes_wasm.js";

// start nes
await init();
const res = await fetch("../../javascripts/nes/Alter_Ego.nes");
const buf = await res.arrayBuffer();
const ctx = new WindowContext("canvas", new Uint8Array(buf));

// keyboard event
// https://w3c.github.io/uievents/#dom-keyboardevent-key
window.addEventListener("keydown", (event) => {
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
window.addEventListener("keyup", (event) => {
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

// gamepad event
// https://w3c.github.io/gamepad/#remapping
setInterval(() => {
    const gamepads = navigator.getGamepads
        ? navigator.getGamepads()
        : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads
          : [];
    if (!gamepads) {
        return;
    }
    const gp = gamepads[0];
    if (!gp) {
        return;
    }

    gp.buttons[1].pressed ? ctx.keydown_A() : ctx.keyup_A();
    gp.buttons[0].pressed ? ctx.keydown_B() : ctx.keyup_B();
    gp.buttons[8].pressed ? ctx.keydown_SELECT() : ctx.keyup_SELECT();
    gp.buttons[9].pressed ? ctx.keydown_START() : ctx.keyup_START();
    gp.buttons[15].pressed ? ctx.keydown_RIGHT() : ctx.keyup_RIGHT();
    gp.buttons[14].pressed ? ctx.keydown_LEFT() : ctx.keyup_LEFT();
    gp.buttons[13].pressed ? ctx.keydown_DOWN() : ctx.keyup_DOWN();
    gp.buttons[12].pressed ? ctx.keydown_UP() : ctx.keyup_UP();
}, 10);
