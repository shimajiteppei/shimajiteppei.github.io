import init, {
    WindowContext,
} from "https://cdn.jsdelivr.net/gh/shimajiteppei/aries@release/nes_wasm/pkg/nes_wasm.js";

const ABtnKey = "q";
const BBtnKey = "w";
const STARTBtnKey = "e";
const SELECTBtnKey = "r";
const UPBtnKey = "ArrowUp";
const DOWNBtnKey = "ArrowDown";
const LEFTBtnKey = "ArrowLeft";
const RIGHTBtnKey = "ArrowRight";

// start nes
await init();
const res = await fetch("../../javascripts/nes/Alter_Ego.nes");
const buf = await res.arrayBuffer();
const ctx = new WindowContext("canvas", new Uint8Array(buf));

// keyboard event
// https://w3c.github.io/uievents/#dom-keyboardevent-key
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case ABtnKey:
            ctx.keydown_A();
            event.preventDefault();
            break;
        case BBtnKey:
            ctx.keydown_B();
            event.preventDefault();
            break;
        case SELECTBtnKey:
            ctx.keydown_SELECT();
            event.preventDefault();
            break;
        case STARTBtnKey:
            ctx.keydown_START();
            event.preventDefault();
            break;
        case UPBtnKey:
            ctx.keydown_UP();
            event.preventDefault();
            break;
        case DOWNBtnKey:
            ctx.keydown_DOWN();
            event.preventDefault();
            break;
        case LEFTBtnKey:
            ctx.keydown_LEFT();
            event.preventDefault();
            break;
        case RIGHTBtnKey:
            ctx.keydown_RIGHT();
            event.preventDefault();
            break;
    }
});
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case ABtnKey:
            ctx.keyup_A();
            event.preventDefault();
            break;
        case BBtnKey:
            ctx.keyup_B();
            event.preventDefault();
            break;
        case SELECTBtnKey:
            ctx.keyup_SELECT();
            event.preventDefault();
            break;
        case STARTBtnKey:
            ctx.keyup_START();
            event.preventDefault();
            break;
        case UPBtnKey:
            ctx.keyup_UP();
            event.preventDefault();
            break;
        case DOWNBtnKey:
            ctx.keyup_DOWN();
            event.preventDefault();
            break;
        case LEFTBtnKey:
            ctx.keyup_LEFT();
            event.preventDefault();
            break;
        case RIGHTBtnKey:
            ctx.keyup_RIGHT();
            event.preventDefault();
            break;
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
