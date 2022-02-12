
const W = 800*4;
const H = 800*4;
const canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
const ctx = canvas.getContext('2d');

const range = (from, to) => new Array(to - from).fill(0);
const hRange = range(0, H);
const wRange = range(0, W);

function scaleCanvas(canvas, context, width, height) {
    // assume the device pixel ratio is 1 if the browser doesn't specify it
    const devicePixelRatio = window.devicePixelRatio || 1;
  
    // determine the 'backing store ratio' of the canvas context
    const backingStoreRatio = (
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1
    );
  
    // determine the actual ratio we want to draw at
    const ratio = devicePixelRatio / backingStoreRatio;
  
    if (devicePixelRatio !== backingStoreRatio) {
      // set the 'real' canvas size to the higher width/height
      canvas.width = width * ratio;
      canvas.height = height * ratio;
  
      // ...then scale it back down with CSS
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
    }
    else {
      // this is a normal 1:1 device; just scale it simply
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = '';
      canvas.style.height = '';
    }
  
    // scale the drawing context so everything will work at the higher ratio
    context.scale(ratio, ratio);
  }

const drawNewImage = () => {
    const imageData = ctx.createImageData(W, H);
    let j = 0;
    const inRow = W * 4;
    while (j < H * W * 4) {
      if ((j + 1) % 4 === 0) {
        const row = Math.ceil((j + 1) / inRow) - 1;
        const col = ((j - 3) % inRow) / 4;
        imageData.data[j] = (state[row][col] > 0) && 255 || 0;
      }
      j++;
    }
  
    ctx.putImageData(imageData, 0, 0, 0, 0, W, H);
  }

const applyRule = (x, y) => {
    if(y == 0) {
        if(x === Math.round(W/2)) {
            return 1;
        }
        return 0;
    }
    const [a,b,c] = state[y-1].slice(x-1, x+2);
    if(a === 1 && b === 1 && c === 1){
        return 0;
    }else if(a === 1 && b === 1 && c === 0){
        return 0;
    }else if(a === 1 && b === 0 && c === 1){
        return 0;
    }else if(a === 1 && b === 0 && c === 0){
        return 1;
    }else if(a === 0 && b === 1 && c === 1){
        return 1;
    }else if(a === 0 && b === 1 && c === 0){
        return 1;
    }else if(a === 0 && b === 0 && c === 1){
        return 1;
    }else if(a === 0 && b === 0 && c === 0){
        return 0;
    }
    return 0;
}

let state = hRange.map((j) => range(0, W).map(() => 0));

for(let y=0; y<H; y++){
    for(let x=0; x<W; x++){
        state[y][x] = applyRule(x, y);
    }
}

scaleCanvas(canvas, ctx, W, H);

drawNewImage();