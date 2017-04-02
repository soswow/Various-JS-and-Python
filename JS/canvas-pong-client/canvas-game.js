const W = 84; // Original Atari Size
const H = 84; //
const UP = 'UP';
const DOWN = 'DOWN';

const magnify = 3;

const initCanvas = (id, width, height) => {
    const canvas = document.getElementById('main');
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${W * magnify}px`;
    const context = canvas.getContext('2d');
    context.width = W;
    context.height = H;
    return context;
}

const context = initCanvas('main', W, H);
const pong = makePongGame(W, H, context);

let keysPressed = {};
const PLAYER1_ARROWUP_KEY_CODE = 87;
const PLAYER1_ARROWDOWN_KEY_CODE = 83;
const PLAYER2_ARROWUP_KEY_CODE = 38;
const PLAYER2_ARROWDOWN_KEY_CODE = 40;

const timeAverage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const timeElement = document.getElementById('time');

const redraw = () => {
    if (keysPressed[PLAYER1_ARROWUP_KEY_CODE]) {
        pong.move(pong.PLAYER1, UP);
    }
    if (keysPressed[PLAYER1_ARROWDOWN_KEY_CODE]) {
        pong.move(pong.PLAYER1, DOWN);
    }
    if (keysPressed[PLAYER2_ARROWUP_KEY_CODE]) {
        pong.move(pong.PLAYER2, UP);
    }
    if (keysPressed[PLAYER2_ARROWDOWN_KEY_CODE]) {
        pong.move(pong.PLAYER2, DOWN);
    }

    const start = Date.now();
    pong.tick();
    const data = pong.generateData();
    const time = Date.now() - start;
    pong.applyData(data);
    
    timeAverage.push(time);
    timeAverage.shift();
    const avgTime = timeAverage.reduce((memo, el) => el + memo, 0) / timeAverage.length;
    timeElement.innerHTML = avgTime.toFixed(3);

    requestAnimationFrame(redraw);
}

document.addEventListener('keydown', (e) => {
    keysPressed[e.keyCode || e.which] = true;
});
document.addEventListener('keyup', (e) => {
    keysPressed[e.keyCode || e.which] = false;
});

redraw();
