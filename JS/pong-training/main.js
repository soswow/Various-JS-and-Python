const W = 84;
const H = 84;
const infoDiv = document.getElementById('info');
const doViz = document.getElementById('do-viz');
let screens = [];
let VIZ_GAME = doViz.checked;
doViz.addEventListener('change', (e) => {
    VIZ_GAME = e.currentTarget.checked;
})

const x1 = new convnetjs.Vol(84, 84, 4);
const x2 = new convnetjs.Vol(84, 84, 4);
const play = () => {
    const screen = pong.generateData();
    if (VIZ_GAME) {
        pong.applyData(screen);
    }
    if (screens.unshift(screen) > 4) {
        screens.pop();

        const data1 = new Int8Array(84 * 84 * 4);
        const data2 = new Int8Array(84 * 84 * 4);
        for (let y = 0; y < 84; y++) {
            for (let x = 0; x < 84; x++) {
                for (let s = 0; s < 4; s++) {
                    const i1 = y * 84 + x;
                    const i2 = y * 84 + (83-x);
                    data1[s * 84 * 84 + i1] = screens[s][i1];
                    data2[s * 84 * 84 + i1] = screens[s][i2];
                }
            }
        }
        x1.w = data1;
        x2.w = data2;
        const [upProp1, downProp1] = net1.forward(x1).w;
        const [upProp2, downProp2] = net1.forward(x2).w;
        
        pong.move(pong.PLAYER1, upProp1 > downProp1 ? pong.UP : pong.DOWN);
        pong.move(pong.PLAYER2, upProp2 > downProp2 ? pong.UP : pong.DOWN);
    }
    pong.tick();
    if (VIZ_GAME) {
        requestAnimationFrame(play);
    } else {
        // play();
        setTimeout(play, 0);
    }
}

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
let timeStamp = Date.now();
pong.onScoreChange((score, episodes) => {
    if (!VIZ_GAME) {
        const diff = Date.now() - timeStamp;
        infoDiv.innerHTML += `${score[pong.PLAYER1]}:${score[pong.PLAYER2]} for ${episodes} ticks in ${diff} ms - ${(diff/episodes).toFixed(3)} ms/tick<br/>`;
        timeStamp = Date.now();
    }
});

play();