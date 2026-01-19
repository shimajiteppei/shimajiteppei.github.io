import init, {
    App,
} from "https://cdn.jsdelivr.net/gh/shimajiteppei/gemini@main/gemini_wasm/pkg/gemini_wasm.js";

/*********************************************
 * コンテキスト定義
 *********************************************/

// Game Controller Elements
const statusEl = document.getElementById("status");
const modeEl = document.getElementById("mode");
const newGameEasyBtn = document.getElementById("new-game-easy");
const newGameHardBtn = document.getElementById("new-game-hard");
// Game Canvas Element
const container = document.getElementById("game-window");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Game Config
const AI_DELAY_MS = 300;
const COLOR_BACKGROUND = "#008000";
const COLOR_BORDER = "#000000";
const COLOR_BLACK = "#000000";
const COLOR_WHITE = "#f0f0f0";
const COLOR_HINT = "#e0e040";

// Init Game Ctx
await init();
let app;
let cellSize;
let isEasyMode;
let isHumanBlack;
let canHumanMove;
let canAIMove;
let queueRefresh;

/*********************************************
 * 描画ロジック
 *********************************************/

// Render Cell Utils
const render_cell_background = (x, y, cellSize) => {
    const left = x * cellSize;
    const top = y * cellSize;

    ctx.fillStyle = COLOR_BACKGROUND;
    ctx.fillRect(left, top, cellSize, cellSize);

    ctx.strokeStyle = COLOR_BORDER;
    ctx.strokeRect(left, top, cellSize, cellSize);
};

const render_cell_hint = (x, y, cellSize) => {
    const left = x * cellSize;
    const top = y * cellSize;

    const r = cellSize / 10;
    const cx = left + cellSize / 2;
    const cy = top + cellSize / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = COLOR_HINT;
    ctx.fill();
};

const render_cell_stone = (x, y, cellSize, isBlack) => {
    const left = x * cellSize;
    const top = y * cellSize;

    const r = cellSize * 0.4;
    const cx = left + cellSize / 2;
    const cy = top + cellSize / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = isBlack ? COLOR_BLACK : COLOR_WHITE;
    ctx.fill();
};

const resizeCanvas = (width = container.getBoundingClientRect().width) => {
    // update cached cell size
    cellSize = width / 8;

    // resize canvas element
    const canvasSize = cellSize * 8;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;
};

const calcCanvasCellXY = (pointerEvent) => {
    const { clientX, clientY } = pointerEvent;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const bx = Math.floor(x / cellSize);
    const by = Math.floor(y / cellSize);
    if (bx < 0 || bx >= 8 || by < 0 || by >= 8) {
        return null;
    } else {
        return { x: bx, y: by };
    }
};

/*********************************************
 * WASM 側から呼ばれる描画イベントの定義
 *********************************************/
window.render_begin = () => {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            render_cell_background(x, y, cellSize);
        }
    }
};

window.render_hint = (x, y) => {
    render_cell_hint(x, y, cellSize);
};

window.render_cell = (x, y, color) => {
    // Rust 側の定義: 0=Black, 1=White
    render_cell_stone(x, y, cellSize, color === 0);
};

window.render_end = () => {
    // no-op
};

/*********************************************
 * ゲーム管理ロジック
 *********************************************/
const startGame_EASY = () => {
    app = new App();
    isEasyMode = true;

    const seed = Math.floor(Math.random() * 100);
    if (Math.random() > 0.5) {
        app.set_black_human();
        app.set_white_random(BigInt(seed));

        isHumanBlack = true;
        canHumanMove = true;
        canAIMove = false;
    } else {
        app.set_black_random(BigInt(seed));
        app.set_white_human();

        isHumanBlack = false;
        canHumanMove = false;
        canAIMove = true;
    }
};

const startGame_HARD = () => {
    app = new App();
    isEasyMode = false;

    const depth = 20;
    if (Math.random() > 0.5) {
        app.set_black_human();
        app.set_white_alphabeta(depth);

        isHumanBlack = true;
        canHumanMove = true;
        canAIMove = false;
    } else {
        app.set_black_alphabeta(depth);
        app.set_white_human();

        isHumanBlack = false;
        canHumanMove = false;
        canAIMove = true;
    }
};

const statusText = () => {
    const black = app.count_black();
    const white = app.count_white();
    const status = app.status_code();

    if (status === 0) {
        // going
        return "";
    }
    if (status === 1) {
        // black win
        const winner = isHumanBlack ? "あなた" : "CPU";
        return `${winner}の勝ちです。 | 黒：${black} 白：${white}`;
    }
    if (status === 2) {
        // white win
        const winner = !isHumanBlack ? "あなた" : "CPU";
        return `${winner}の勝ちです。 | 黒：${black} 白：${white}`;
    }
    if (status === 3) {
        // draw
        return `引き分けです。 | 黒：${black} 白：${white}`;
    }
    // error
    return "";
};

const modeText = () => {
    return isEasyMode ? "EASY" : "HARD";
};

const refreshCanvas = async () => {
    app.render();
    statusEl.textContent = statusText();
    modeEl.textContent = modeText();
};

const tickAI = async () => {
    let tickApplied;
    do {
        await new Promise((resolve) => setTimeout(resolve, AI_DELAY_MS));
        queueRefresh = true;
    } while ((tickApplied = app.tick_ai() > 0));

    canHumanMove = true;
};

// MAIN LOOP
const frame = () => {
    if (canAIMove) {
        canAIMove = false;
        setTimeout(tickAI, 0);
    }

    if (queueRefresh) {
        queueRefresh = false;
        setTimeout(refreshCanvas, 0);
    }

    // do loop
    requestAnimationFrame(frame);
};

/*********************************************
 * HTMLイベントハンドラ
 *********************************************/
canvas.addEventListener("click", (e) => {
    if (canHumanMove) {
        canHumanMove = false;

        const xy = calcCanvasCellXY(e);
        if (xy === null) {
            canHumanMove = true;
            return;
        }

        const clickApplied = app.click(xy.x, xy.y);
        if (clickApplied) {
            queueRefresh = true;
            canAIMove = true;
        } else {
            canHumanMove = true;
        }
    }
});

newGameEasyBtn.addEventListener("click", () => {
    startGame_EASY();
    queueRefresh = true;
});

newGameHardBtn.addEventListener("click", () => {
    startGame_HARD();
    queueRefresh = true;
});

const debounce = (fn) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), 500);
    };
};

window.addEventListener("resize", () => {
    debounce(() => {
        resizeCanvas();
        queueRefresh = true;
    })();
});

//// TODO: 直す
// window.addEventListener("fullscreenchange", () => {
//     resizeCanvas(Math.min(window.innerWidth, window.innerHeight));
//     queueRefresh = true;
// });

/*********************************************
 * メインループ開始
 *********************************************/
startGame_EASY();
resizeCanvas();
queueRefresh = true;
requestAnimationFrame(frame);
