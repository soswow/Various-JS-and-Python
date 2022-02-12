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

const scale = (inputFrom, inputTo, outputFrom, outputTo, val) =>
  (((val - inputFrom) * (outputTo - outputFrom)) / (inputTo - inputFrom)) + outputFrom;

const drawLogging = (state) => {
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

const draw = (state) => {
  const { x } = state;
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(x + 20, 50);
  ctx.arc(x, 50, 20, 0, Math.PI * 2);
  ctx.fill();
};

const updateState = (oldState) => {
  const state = { ...oldState };
  const { maxSpeed, accDistance, breakingPoint, max_allowable_speed } = state;
  const deccelDistance = (accDistance > distance/2) ? breakingPoint : accDistance;
  const isApproachingEnd = state.acc > 0 && (distance - state.x) <= deccelDistance;
  const isApproachingStart = state.acc < 0 && state.x < deccelDistance;
  if (isApproachingEnd || isApproachingStart) {
    state.acc *= -1;
  }

  state.speed += state.acc;
  if (Math.abs(state.speed) > maxSpeed) {
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
  return state;
};

// Calculates the distance (not time) it takes to accelerate from initial_rate to target_rate using the
// given acceleration:
const estimateAccelerationDistance = (initial_rate, target_rate, acceleration) => {
  if (acceleration === 0) {
    return 0;
  }

  return ((target_rate * target_rate - initial_rate * initial_rate) / (2.0 * acceleration));
};

// This function gives you the point at which you must start braking (at the rate of -acceleration) if
// you started at speed initial_rate and accelerated until this point and want to end at the final_rate after
// a total travel of distance. This can be used to compute the intersection point between acceleration and
// deceleration in the cases where the trapezoid has no plateau (i.e. never reaches maximum speed)
const intersectionDistance = (initial_rate, final_rate, acceleration, distance) => {
  if (acceleration === 0) {
    return 0;
  }

  return ((2.0 * acceleration * distance - initial_rate * initial_rate + final_rate * final_rate) /
    (4.0 * acceleration));
};

// Calculates the maximum allowable speed at this point when you must be able to reach target_velocity using the
// acceleration within the allotted distance.
const max_allowable_speed = (acceleration, target_velocity, distance) =>
  Math.sqrt(target_velocity * target_velocity - 2 * acceleration * distance);

const nextStep = (state) => {
  const newState = updateState(state);
  clear();
  draw(state);
  drawLogging(state);
  requestAnimationFrame(nextStep.bind(this, newState));
};

const distance = W;
let maxSpeed = 11;
const acc = 0.3;
const maxAllowableSpeed = max_allowable_speed(-acc, 5, distance);
// maxSpeed = maxAllowableSpeed;
const accDistance = estimateAccelerationDistance(0, maxSpeed, acc);
const breakingPoint = intersectionDistance(0, 0, acc, distance);
console.log({ accDistance, breakingPoint, distance, maxAllowableSpeed });


nextStep({
  distance,
  acc,
  maxSpeed,
  accDistance,
  breakingPoint,
  speed: 0,
  x: 0,
  speedLog: [],
  distanceLog: []
});
