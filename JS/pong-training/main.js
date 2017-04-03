var layer_defs = [];

// Input is 84x84x4 (width, height, depth)
layer_defs.push({ type: 'input', out_sx: 84, out_sy: 84, out_depth: 4 });
// Conv 16 8x8 kernels, stride 4
layer_defs.push({ type: 'conv', sx: 8, filters: 16, stride: 4, activation: 'relu' });
// rectifier nonlinearity

// Conv 32 4x4  kernels, stride 2
layer_defs.push({ type: 'conv', sx: 4, filters: 32, stride: 2, activation: 'relu' });

// FC with 256 rectifier unit
layer_defs.push({ type: 'fc', num_neurons: 256, activation: 'relu' });

// FC liners with N number of outputs. for N actions
layer_defs.push({ type: 'softmax', num_classes: 2 });

// create a net out of it
var net1 = new convnetjs.Net();
net1.makeLayers(layer_defs);

var net2 = new convnetjs.Net();
net2.makeLayers(layer_defs);

let screens = [];

const redraw = () => {
    const screen = pong.generateData();
    pong.applyData(screen);
    if (screens.unshift(screen) > 4) {
        screens.pop();

        const data = [];
        for (let i = 0; i < 84 * 84; i++) {
            for (let s = 0; s < 4; s++) {
                data.push(screens[s][i]);
            }
        }
        var x = new convnetjs.Vol(84, 84, 4);
        x.w = data;
        const [upProp1, downProp1] = net1.forward(x).w;
        const [upProp2, downProp2] = net2.forward(x).w;
        
        pong.move(pong.PLAYER1, upProp1 > downProp1 ? pong.UP : pong.DOWN);
        pong.move(pong.PLAYER2, upProp2 > downProp2 ? pong.UP : pong.DOWN);
    }
    pong.tick();
    requestAnimationFrame(redraw);
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

const W = 84;
const H = 84;
const context = initCanvas('main', W, H);
const pong = makePongGame(W, H, context);

redraw();