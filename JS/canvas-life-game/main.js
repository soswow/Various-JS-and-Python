const $ = (arg) => document.querySelector(arg);

const el = $("#canvas");
const ctx = el.getContext("2d");
const max = {
  w: el.width,
  h: el.height
};
const range = (from, to) => new Array(to - from).fill().map((_, i) => from + i);
const $log = document.getElementById("span");
const buffer = [];
let k = 0;
const hRange = range(0, max.h);
const wRange = range(0, max.w);
let state = hRange.map((j) => wRange.map((i) => Math.round(Math.random())))
let stateTmp = hRange.map((j) => wRange.map((i) => Math.round(Math.random())))

const drawNewImage = () => {
  const imageData = ctx.createImageData(max.w, max.h);
  let j = 0;
  const inRow = max.w * 4;
  while (j < max.h * max.w * 4) {
    if ((j + 1) % 4 === 0) {
      const row = Math.ceil((j + 1) / inRow) - 1;
      const col = ((j - 3) % inRow) / 4;
      imageData.data[j] = (state[row][col] > 0) && 255 || 0;
    }
    j++;
  }

  ctx.putImageData(imageData, 0, 0, 0, 0, max.w, max.h);
}

const neighbour = (row, col) => row >= 0 && col >= 0 && state[row] && state[row][col] || 0;

const countNeighbours = (row, col) =>
  neighbour(row - 1, col - 1) +
  neighbour(row - 1, col) +
  neighbour(row - 1, col + 1) +
  neighbour(row, col - 1) +
  neighbour(row, col + 1) +
  neighbour(row + 1, col - 1) +
  neighbour(row + 1, col) +
  neighbour(row + 1, col + 1);

const updateState = () => {
  //   #  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  //   #  Any live cell with two or three live neighbours lives on to the next generation.
  //   #  Any live cell with more than three live neighbours dies, as if by overcrowding.
  //   #  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  hRange.forEach((row) =>
    wRange.forEach((col) => {
      const neighboursNum = countNeighbours(row, col);
      if (state[row][col] === 1) {
        if (neighboursNum < 2 || neighboursNum > 3) {
          stateTmp[row][col] = 0;
        } else {
          stateTmp[row][col] = 1;
        }
      } else {
        if (neighboursNum === 3) {
          stateTmp[row][col] = 1;
        } else {
          stateTmp[row][col] = 0;
        }
      }
    })
  );
  tmp = state
  state = stateTmp
  stateTmp = tmp
}

let stop = false;
const step = () => {
  drawNewImage();
  updateState();
  if (!stop) {
    requestAnimationFrame(step);
  }
}

$("#start").addEventListener("click", () => {
  stop = false;
  step();
});

$("#stop").addEventListener("click", () => {
  stop = true;
})