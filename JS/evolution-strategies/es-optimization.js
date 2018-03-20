const W = 500;
const H = 500;
const canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
const context = canvas.getContext('2d');
context.width = W;
context.height = H;

const settings = {
  learningRate: 15,
  numberOfSamples: 20,
  areaImportance: 0.5
};

const z = new Ziggurat();

const randomDelta = (size) => z.nextGaussian() * size;

const isPointInsidePolygon = (point, vs) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  // Taken from https://github.com/substack/point-in-polygon

  const x = point.x, y = point.y;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i].x, yi = vs[i].y;
    const xj = vs[j].x, yj = vs[j].y;

    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
};

const calcPolygonArea = (polygon) => {
  let total = 0;

  for (let i = 0, l = polygon.length; i < l; i++) {
    const addX = polygon[i].x;
    const addY = polygon[i === polygon.length - 1 ? 0 : i + 1].y;
    const subX = polygon[i === polygon.length - 1 ? 0 : i + 1].x;
    const subY = polygon[i].y;

    total += (addX * addY * 0.5);
    total -= (subX * subY * 0.5);
  }

  return Math.abs(total);
};

class Point {
  constructor(x, y, size=2) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}

class RandomizedPoint {
  constructor(x, y, size=2, amplitude=10) {
    this.x = x + z.nextGaussian() * amplitude;
    this.y = y + z.nextGaussian() * amplitude;
    this.size = size
  }
}

const drawPoints = (points, fillStyle = "rgba(0,0,0,0.5)") => points.forEach(({x, y, size}) => {
  context.beginPath();
  context.fillStyle = fillStyle;
  context.arc(x, y, size, 0, 2 * Math.PI, false);
  context.fill();
});

const drawRect = (points, strokeStyle='rgba(255, 100, 0, 0.5)', lineWidth=1) => {
  if (points.length === 0) {
    return;
  }
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = 1;
  context.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.lineTo(points[0].x, points[0].y);
  context.stroke();
};

const clearContext = () => {
  context.clearRect(0, 0, W, H);
};

let currentPos;
canvas.addEventListener('mousemove', (e) => {
  currentPos = new Point(e.offsetX, e.offsetY, 5);
});

let truePolygon = [];
let dataPoints = [];
let condidatePolygon = [];

const generatePolygon = () => [
  new RandomizedPoint(100, 100, 6, 30), new RandomizedPoint(W-100, 100, 6, 30),
  new RandomizedPoint(W-100, H - 100, 6, 30), new RandomizedPoint(100, H - 100, 6, 30)
];

const samplePointInPolygon = (polygon, numberOfPoints=10, randomChance=0.05) => {
  let i = 0;
  const points = [];
  while (i < numberOfPoints) {

    const point = new Point(
      Math.round(Math.random() * W),
      Math.round(Math.random() * H),
      Math.round(Math.random() * 10)
    );
    const isRandomChance = Math.random() > (1-randomChance);
    if (isPointInsidePolygon(point, polygon) || isRandomChance) {
      points.push(point);
      i += 1;
    }
  }
  return points;
};

for (let i = 0; i < 25; i++) {
  const point = new Point(W/2 + randomDelta(100), H/2 + randomDelta(100), Math.abs(randomDelta(10)) + 1);
}

canvas.addEventListener('click', (e) => {
  const point = new Point(currentPos.x, currentPos.y, Math.abs(randomDelta(10)) + 1);
  dataPoints.push(point);
});

let frameCounter = 0;
const renderFrame = () => {
  clearContext();
  drawPoints(truePolygon, "rgba(0,0,200,0.5)");
  drawRect(truePolygon, "rgba(0,0,220,0.5");
  drawPoints(dataPoints);

  if (isOptimizing) {
    frameCounter += 1;
    if (frameCounter % 15 === 0 && settings.learningRate > 5) {
      settings.learningRate -= 1;
      gui.__controllers[1].updateDisplay();
    }
    condidatePolygon = refineCandidatePolygon(condidatePolygon);
    // isOptimizing = false;
  }
  jitteredPolygons.forEach((polygon) => drawRect(polygon, "rgba(200,0,0,0.1)"));

  drawPoints(condidatePolygon, "rgba(200,0,0,0.5)");
  drawRect(condidatePolygon, "rgba(220,0,0,0.7)", 2);

  context.beginPath();
  context.strokeStyle = "rgba(0,220,0,0.7)";
  context.lineWidth = 1;
  condidatePolygon.forEach((point, index) => {
    context.moveTo(point.x, point.y);
    context.lineTo(truePolygon[index].x, truePolygon[index].y);
  });
  context.stroke();

  const min = totallFitnessResults.reduce(((minValue, a) => a < minValue ? a : minValue), Number.MAX_VALUE);
  const max = totallFitnessResults.reduce(((maxValue, a) => a > maxValue ? a : maxValue), -Number.MAX_VALUE);
  context.beginPath();
  context.strokeStyle = "rgba(0,0,0,0.3)";
  context.lineWidth = 1;
  const rightY = (value) => (H * (value-min)) / (max - min);
  // H : max - min
  // y : v
  // y = H * v / (max-min);
  context.moveTo(0, rightY(totallFitnessResults[0]));
  for(let i=1; i<totallFitnessResults.length;i++){
    const y = rightY(totallFitnessResults[i]);
    context.lineTo(i, y);
  }
  context.stroke();
};

const fitnessFunction = (polygon) => {
  const pointsInside = dataPoints.filter((point) => isPointInsidePolygon(point, polygon));
  const totalSizeSum = pointsInside.reduce( ((sum, point) => point.size + sum), 0);
  const area = calcPolygonArea(polygon);
  return totalSizeSum / Math.sqrt(area);
};
const distanceBetweenPoints = (p1, p2) => Math.hypot(p2.x-p1.x, p2.y-p1.y);

const cheatingFitnessFunction = (polygon) => {
  return 1 / polygon.reduce(((sum, point, index) => distanceBetweenPoints(point, truePolygon[index]) + sum), 0);
};


const isValidPolygon = (polygon) => {
// (n-2) * 180 - sum on angles
};

let totallFitnessResults = [];
const pushFitnessResult = (result) => {
  totallFitnessResults.push(result);
  if (totallFitnessResults.length > W) {
    totallFitnessResults.shift();
  }
};

// TODO Automatic detection of convergence

let jitteredPolygons = [];
const refineCandidatePolygon = (basePolygon) => {
  // Find jittered polygon samples
  // Apply fitness function for each

  // Find wighted average for each coordinate of each point
  // n
  // ∑(rect[i][0].x * fitnessFn(rect[i]))
  // i=0
  // -------------------------------------- = newReact[0].x
  //              n
  //              ∑(fitnessFn(rect[i]))
  //              i=0
  // const learningRate = 10;

  jitteredPolygons = [];
  for (let si=0; si<settings.numberOfSamples; si++) {
    const newPolygon = [];
  for (let pi=0; pi < basePolygon.length; pi++) {
      newPolygon.push(new RandomizedPoint(basePolygon[pi].x, basePolygon[pi].y, basePolygon[pi].size, settings.learningRate));
    }
      jitteredPolygons.push(newPolygon);
    }

  let valuedJitteredPolygons = jitteredPolygons.map((polygon) => {
    return {
      value: fitnessFunction(polygon),
      polygon
    };
  });
  valuedJitteredPolygons.sort((a, b) => b.value - a.value);
  valuedJitteredPolygons = valuedJitteredPolygons.slice(0, 5);
  const totalFitness = valuedJitteredPolygons.reduce(((sum, current) => current.value + sum), 0);
  const averageFitness = totalFitness / valuedJitteredPolygons.length;
  pushFitnessResult(averageFitness);

  const resultingPolygon = [];
  for (let pi=0; pi < basePolygon.length; pi++) {
    let topPartX = 0;
    let topPartY = 0;
    for (let si=0; si<valuedJitteredPolygons.length; si++) {
      topPartX += valuedJitteredPolygons[si].polygon[pi].x * valuedJitteredPolygons[si].value;
      topPartY += valuedJitteredPolygons[si].polygon[pi].y * valuedJitteredPolygons[si].value;
    }
    resultingPolygon.push(new Point(topPartX/totalFitness, topPartY/totalFitness, basePolygon.size));
  }
  return resultingPolygon;
};

let isOptimizing = false;
const loop = () => {
  renderFrame();
  requestAnimationFrame(loop);
};
loop();

document.getElementById('optimizeButton').addEventListener('click', () => {
  isOptimizing = !isOptimizing;
  if (isOptimizing) {
    frameCounter = 0;
    settings.learningRate = 15;
    gui.__controllers[1].updateDisplay();
  }
});

const setupInputData = () => {
  truePolygon = generatePolygon();
  dataPoints = samplePointInPolygon(truePolygon, 100);
  condidatePolygon = [
    new Point(0, 0, 6), new Point(W, 0, 6),
    new Point(W, H, 6), new Point(0, H , 6)
  ];
  totallFitnessResults = [];
  jitteredPolygons = [];
};
document.getElementById('regenerateTruePolygon').addEventListener('click', setupInputData);
setupInputData();

const gui = new dat.GUI();
gui.add(settings, 'numberOfSamples', 2, 40).step(1);
gui.add(settings, 'learningRate', 1, 30).step(1);
gui.add(settings, 'areaImportance', 0.1, 3).step(0.1);
