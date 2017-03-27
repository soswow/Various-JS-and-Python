if (window.require) {
    const math = require('mathjs');
}
const math2 = math.create({
    matrix: 'Array'
});

const W = 500;
const H = 500;
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
}

const linspace = (start, end, size) => {
    const interval = (end - start) / (size - 1);
    return math2.range(0, size).map((el) => start + el * interval);
}

const makeG = (mux, muy, sigma) => {
    const size = W;
    const linSpace = linspace(-1, 1, size);

    const X = math.multiply(math.ones(size, 1), [linSpace]);
    const Y = math.multiply(math.reshape(linSpace, [size, 1]), math.ones(1, size))

    const G = math.exp(
        math.dotMultiply(
            math.dotDivide(
                math.dotMultiply(
                    math.add(
                        math.dotPow(math.subtract(X, mux), 2),
                        math.dotPow(math.subtract(Y, muy), 2)
                    ), -1
                ), 2
            ),
            Math.pow(sigma, 2)
        )
    );
    return G;
}

const drawPoints = (points, fillStyle="rgba(0,0,0,120)", size=3) => points.forEach(([x, y]) => {
   context.beginPath();
   context.fillStyle = fillStyle;
   context.arc(x, y, size, 0, 2 * Math.PI, false);
   context.fill();
});

const drawArrow = (pFrom, pTo) => {
    context.beginPath();
    context.strokeStyle = 'rgb(255, 100, 0)';
    context.lineWidth = 3;
    context.moveTo(pFrom[0], pFrom[1]);
    context.lineTo(pTo[0], pTo[1]);
    context.stroke();
}

const clearContext = () => {
    context.clearRect(0,0,W,H);
}

const randomG = () => {
    const x = math.random() * 2 - 1;
    const y = math.random() * 2 - 1;
    const sigma = math.randomInt(3) + 1;
    return makeG(x,y,sigma);
}

const main = () => {
    let G = null;
    for (let i=0; i<3; i++) {
        if (G === null) { 
            G = randomG();
        } else {
            G = math.add(G, randomG());
        }
    }
    for (let i=0; i<3; i++) {
        G = math.subtract(G, randomG());
    }
    // const G1 = makeG(0.3, -0.3, 4);
    // const G2 = makeG(-0.3, 0.3, 2);
    // const G3 = makeG(0.6, 0.6, 2);
    // const G4 = makeG(-0.4, -0.2, 3);

    // const G = math.subtract(math.subtract(math.add(G1, G2), G3), G4);
    
    const nn = 40;
    const alpha = 0.03;
    const sigma = 15;
    let w = [math.randomInt(W-sigma*4)+sigma*2, math.randomInt(H-sigma*4)+sigma*2];
    console.log(w);

    const points = [];
    const samplePoints = [];

    math2.range(0, nn).forEach(() => {
        const noise = math.add(math.multiply(initRandomMatrix(200, 2), 4), -2);
        const wp = math.add(math.dotMultiply(sigma, noise), math.multiply(math.ones(200, 1), [w]));
        
        samplePoints.push(wp.toArray());

        let R = wp.toArray().map(([x,y]) => G.get([Math.round(y>0?y:0), Math.round(x>0?x:0)]));
        R = math.subtract(R, math.mean(R));
        R = math.dotDivide(R, math.std(R));
        g = math.multiply([R], noise)

        const u =math.dotMultiply(g, alpha).toArray()[0];
        points.push(w);
        w = math.add(w, u);
    });

    let frameIndex = 0;
    renderMatrix(G);
    const frame = () => {
        clearContext();
        drawPoints(samplePoints[frameIndex]);
        drawPoints([points[frameIndex]], fillStyle="red", size=3)
        for (let i=1; i<=frameIndex; i++) {
            drawArrow(points[i-1], points[i]);
        }
        frameIndex += 1;
        if (frameIndex == nn) {
            frameIndex = 0;
        }
        setTimeout(frame, 50);
        // requestAnimationFrame(frame);
    };
    frame();
}

main();
