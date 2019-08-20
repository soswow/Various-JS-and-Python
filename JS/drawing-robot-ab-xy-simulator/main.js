const W = 900;
const H = 600;

const setupCanvas = (canvasId, canvasWith, canvasHeight) => {
  const canvasEl = document.getElementById(canvasId);
  const dpr = window.devicePixelRatio || 1;
  const ctx = canvasEl.getContext('2d');
  canvasEl.width = W * 2;
  canvasEl.height = canvasHeight * 2;
  canvasEl.style.width = `${W}px`;
  canvasEl.style.height = `${canvasHeight}px`;
  ctx.scale(dpr, dpr);
  return ctx;
};

const ctx = setupCanvas('canvas', W, H);

const state = {
  acc: 0.2,
  maxSpeed: 7,
  speed: 0,
  x: 0,
  speedLog: [],
  distanceLog: []
};

const scale = (inputFrom, inputTo, outputFrom, outputTo, val) =>
  (((val - inputFrom) * (outputTo - outputFrom)) / (inputTo - inputFrom)) + outputFrom;

const drawLogging = () => {
  const { speedLog, distanceLog } = state;
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  const maxSpeed = Math.max(...speedLog);
  const minSpeed = Math.min(...speedLog);

  let prevSpeedSign;
  let prevY;
  speedLog.forEach((speed, i) => {
    const y = H - scale(minSpeed, maxSpeed, 0, 200, speed) - 1;

    const speedSign = Math.sign(speed);
    if (prevSpeedSign !== speedSign) {
      ctx.stroke();
      if (speedSign < 0) {
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = 'blue';
      }
      ctx.beginPath();
      prevSpeedSign = speedSign;
      if (i > 0) {
        ctx.moveTo(i - 1, prevY);
      }
    }

    if (i === 0) {
      ctx.moveTo(0, y);
    } else {
      ctx.lineTo(i, y);
    }
    prevY = y;
  });
  ctx.stroke();

  ctx.strokeStyle = 'green';
  ctx.beginPath();
  const maxDistance = Math.max(...distanceLog);
  const minDistance = Math.min(...distanceLog);
  distanceLog.forEach((distance, i) => {
    const y = H - scale(minDistance, maxDistance, 0, 200, distance) - 1;
    if (i === 0) {
      ctx.moveTo(0, y);
    } else {
      ctx.lineTo(i, y);
    }
  });
  ctx.stroke();

  ctx.fillStyle = 'green';
  ctx.fillText(`Distance: ${minDistance.toFixed(2)} - ${maxDistance.toFixed(2)}`, 0, H - 210);
  ctx.fillStyle = 'blue';
  ctx.fillText(`Speed: ${minSpeed.toFixed(2)} - ${maxSpeed.toFixed(2)}`, 0, H - 225);
};

const clear = () => {
  ctx.clearRect(0, 0, W, H);
};

const draw = () => {
  const { x } = state;
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x + 20, 50);
  ctx.arc(x, 50, 20, 0, Math.PI * 2);
  ctx.fill();
};

let maxSpeedX = null;
const nextStep = () => {
  const { maxSpeed } = state;
  if (maxSpeedX) {
    const isApproachingEnd = state.acc > 0 && (W - state.x) <= maxSpeedX;
    const isApproachingStart = state.acc < 0 && state.x < maxSpeedX;
    if (isApproachingEnd || isApproachingStart) {
      state.acc *= -1;
    }
  }

  state.speed += state.acc;
  if (Math.abs(state.speed) > maxSpeed) {
    if (!maxSpeedX) {
      maxSpeedX = state.x;
    }
    state.speed = maxSpeed * Math.sign(state.speed);
  }

  state.x += state.speed;
  state.speedLog.push(state.speed);
  if (state.speedLog.length > W) {
    state.speedLog.splice(0, 1);
  }
  state.distanceLog.push(state.x);
  if (state.distanceLog.length > W) {
    state.distanceLog.splice(0, 1);
  }

  clear();
  draw();
  drawLogging();
  requestAnimationFrame(nextStep);
};

nextStep();
