if (window.require) {
    const math = require('mathjs');
}
const math2 = math.create({
    matrix: 'Array'
});

const maxSigma = 8;
const settings = {
    hillsNum: 3,
    holesNum: 3,
    sampleSize: 50,
    samplesArea: 60,
    learningRate: 0.1,
    learningRateDecay: 4,
    numberOfRuns: 30,
    animation: false,
    showOptimumLocation: false,
    addMorePaths: () => {
        for (let i = 0; i < 10; i++) {
            addTrajectory();
        }
    },
    regenerate: () => {
        main();
    },
    recalculate: () => recalculate(),

};

const W = 800;
const H = 600;
const canvas = document.getElementById('data');
canvas.width = W;
canvas.height = H;
const context = canvas.getContext('2d');
context.width = W;
context.height = H;

const canvas2 = document.getElementById('main');
canvas2.width = W;
canvas2.height = H;
const context2 = canvas2.getContext('2d');
context2.width = W;
context2.height = H;


const initRandomMatrix = (h, w) =>
    math.map(math.zeros(h, w), () => math.random());

const setPixelInImageData = (imageData, x, y, r, g, b, a) => {
    const i = y * imageData.width * 4 + x * 4;
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = a;
}

const pickNRandomPoints = (n, min, max) =>
    math2.range(0, n).map(
        () => [
            math.randomInt(W + 1),
            math.randomInt(H + 1),
            math.random() * (max - min) + min])

const illustratePoints = (points) =>
    points.forEach(([x, y, value], i) => {
        context.beginPath();
        if (value > 0) {
            context.fillStyle = 'rgba(0, 255, 0, 0.1)';
        } else {
            context.fillStyle = 'rgba(0, 0, 255, 0.1)';
        }
        context.arc(x, y, Math.abs(value) * 10, 0, Math.PI * 2, false);
        context.fill();
    });


const renderMatrix = (matrix) => {
    const imageData = context2.createImageData(W, H);
    const totalMax = Math.max(math.max(matrix), Math.abs(math.min(matrix)));
    math.forEach(matrix, (el, [y, x]) => {
        const r = 0;
        let g = b = 0;
        if (el > 0) {
            g = 255;
        } else {
            b = 255;
        }
        setPixelInImageData(imageData, x, y, r, g, b, Math.abs(el) / totalMax * 255);
    });
    context2.putImageData(imageData, 0, 0);

    if (settings.showOptimumLocation) {
        _matrixDebugLog.forEach(({ mux, muy, sigma, sign }) => {
            context2.beginPath();
            context2.strokeStyle = sign > 0 ? '#00741e' : '#0c0074';
            context2.arc(W / 2 * mux + W / 2, H / 2 * muy + H / 2, (maxSigma - sigma) * 60, 0, 2 * Math.PI);
            context2.stroke();
        });
    }
}

const linspace = (start, end, size) => {
    const interval = (end - start) / (size - 1);
    return math2.range(0, size).map((el) => start + el * interval);
}

const _linSpace = linspace(-1, 1, W);
const _X = math.multiply(math.ones(W, 1), [_linSpace]);
const _Y = math.multiply(math.reshape(_linSpace, [W, 1]), math.ones(1, W))
const gpu = new GPU();

console.log({
    'GPU is in-fact supported': GPU.isGPUSupported,
    'kernel maps are supported': GPU.isKernelMapSupported,
    'offscreen canvas is supported': GPU.isOffscreenCanvasSupported,
    'WebGL v1 is supported': GPU.isWebGLSupported,
    'WebGL v2 is supported': GPU.isWebGL2Supported,
    'headlessgl is supported': GPU.isHeadlessGLSupported,
    'canvas is supported': GPU.isCanvasSupported,
    'the platform supports HTMLImageArray': GPU.isGPUHTMLImageArraySupported,
    'the system supports single precision float 32 values': GPU.isSinglePrecisionSupported,
});

const myFunc = gpu.createKernel(function (A, k, mux, muy) {
    const m = Math.pow(A[this.thread.x] - mux, 2) + Math.pow(A[this.thread.y] - muy, 2);
    return Math.exp(m * k);
}).setOutput([W, H]);

let _matrixDebugLog = [];
const makeG = (mux, muy, sigma) => {
    _matrixDebugLog.push({ mux, muy, sigma });
    const k = -1 / 2 * math.pow(sigma, 2);
    const data = myFunc(_linSpace, k, mux, muy);
    return math.matrix(Array.prototype.map.call(data, (row) => Array.prototype.slice.call(row)));
}

const drawPoints = (points, fillStyle = "rgba(0,0,0,0.5)", size = 3) => points.forEach(([x, y]) => {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.arc(x, y, size, 0, 2 * Math.PI, false);
    context.fill();
});

const drawArrow = (pFrom, pTo) => {
    context.beginPath();
    context.strokeStyle = 'rgba(255, 100, 0, 0.4)';
    context.lineWidth = 1;
    context.moveTo(pFrom[0], pFrom[1]);
    context.lineTo(pTo[0], pTo[1]);
    context.stroke();
}

const clearContext = () => {
    context.clearRect(0, 0, W, H);
}

const randomG = () => {
    const x = math.random(-1, 1);
    const y = math.random(-1, 1);
    const sigma = math.random(1, maxSigma);
    return makeG(x, y, sigma);
}

const clipValue = (val, min, max) => {
    if (val > max) {
        return max;
    } else if (val < min) {
        return min;
    } else {
        return val;
    }
}

const constructMultiGaussianDistributionMatrix = ({ addNumber, substractNumber }) => {
    let G = null;
    for (let i = 0; i < addNumber; i++) {
        if (G === null) {
            G = randomG();
        } else {
            G = math.add(G, randomG());
        }
        _matrixDebugLog[_matrixDebugLog.length - 1].sign = 1;
    }
    for (let i = 0; i < substractNumber; i++) {
        G = math.subtract(G, randomG());
        _matrixDebugLog[_matrixDebugLog.length - 1].sign = -1;
    }
    return G;
}



let trajectories = [];

const addTrajectory = () => {
    const sigma = settings.samplesArea;

    let w = [math.randomInt(W), math.randomInt(H)];
    const originalW = [...w];

    const points = [];
    const samplePoints = [];
    let minimumFound = false;
    let iterations = 0;
    while (!minimumFound) {
        const alpha = settings.learningRateDecay / math2.sqrt(iterations+1) * settings.learningRate;
        const noise = math.add(math.multiply(initRandomMatrix(settings.sampleSize, 2), 4), -2);
        const wp = math.add(math.dotMultiply(sigma, noise), math.multiply(math.ones(settings.sampleSize, 1), [w]));

        samplePoints.push(wp.toArray());

        if (isNaN(wp._data[0][0])) {
            console.log(`broke`)
            break;
        }
        let R = wp.toArray().map(([x, y]) =>
            G.get(
                [
                    Math.round(clipValue(y, 0, H - 1)),
                    Math.round(clipValue(x, 0, W - 1))
                ])
        );
        const R2 = math.subtract(R, math.mean(R));
        const R3 = math.dotDivide(R2, math.std(R2));
        if (R3[0] === Infinity || R3[0] === -Infinity) {
            console.log(`broke`)
            break;
        }
        g = math.multiply([R3], noise)
        const u = math.dotMultiply(g, alpha).toArray()[0];
        points.push(w);
        w = math.add(w, u);
        if (points.length > 5){
            const gap = math.distance(points[points.length - 1], points[points.length - 6]);
            // console.log(iterations, alpha, gap);
            if(gap < 2){
                minimumFound = true;
            }
        }
        iterations += 1;
    }

    trajectories.push(points);
}

let G;

const main = () => {
    trajectories = [];
    _matrixDebugLog = [];
    G = constructMultiGaussianDistributionMatrix({
        addNumber: settings.hillsNum,
        substractNumber: settings.holesNum,
    });

    // const samplePointsCollection = [];

    for (let i = 0; i < settings.numberOfRuns; i++) {
        addTrajectory();
    }
}

main();

const recalculate = () => {
    trajectories = [];
    for (let i = 0; i < settings.numberOfRuns; i++) {
        addTrajectory();
    }
}


let frameIndex = 0;
const loop = () => {
    clearContext();
    renderMatrix(G);
    if (settings.animation) {
        // const frame = () => {
        // const samplePoints = samplePointsCollection[trajectoryIndex];
        const maxPointsLength = math2.max(...trajectories.map(t => t.length))
        for (const points of trajectories) {
            for (let i = 1; i < frameIndex; i++) {
                if (points.length > i) {
                    drawArrow(points[i - 1], points[i]);
                }
            }
        }
        for (const points of trajectories) {
            if (points.length > frameIndex) {
                drawPoints([points[frameIndex]], fillStyle = "red", size = 2)
            }
        }
        frameIndex += 1;
        if (frameIndex >= maxPointsLength) {
            frameIndex = 0;
        }
    } else {
        for (const trajectory of trajectories) {
            for (let i = 1; i < trajectory.length; i++) {
                drawArrow(trajectory[i - 1], trajectory[i]);
            }
        }
    }


    requestAnimationFrame(loop);
}
loop();

const gui = new dat.GUI();

gui.add(settings, 'hillsNum', 0, 10).step(1);
gui.add(settings, 'holesNum', 0, 10).step(1);
gui.add(settings, 'sampleSize', 10, 100).step(1);
gui.add(settings, 'samplesArea', 10, 150).step(1);
gui.add(settings, 'learningRate', 0.01, 0.9);
gui.add(settings, 'learningRateDecay', 0.2, 10);
gui.add(settings, 'numberOfRuns', 10, 200).step(1);
gui.add(settings, 'animation').onChange(() => {
    frameIndex = 0;
});
gui.add(settings, 'showOptimumLocation');
gui.add(settings, 'addMorePaths');
gui.add(settings, 'recalculate');
gui.add(settings, 'regenerate');