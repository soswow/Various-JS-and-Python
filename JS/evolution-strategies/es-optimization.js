const W = 500;
const H = 500;
const canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
const context = canvas.getContext('2d');
context.width = W;
context.height = H;

const z = new Ziggurat();

const initialLearningRate = 15;
const settings = {
  learningRate: initialLearningRate,
  numberOfSamples: 20,
  areaImportance: 1,
  showTruePolygon: true,
  debugCandidates: true
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

const drawPoints = (points, fillStyle = "rgba(0,0,0,0.5)") => points.forEach(({x, y, size=3}) => {
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
let candidatePolygon;
let allCondidatePolygons;

const generateSamplePolygon = () => [
  new RandomizedPoint(100, 100, 6, 30), new RandomizedPoint(W-100, 100, 6, 30),
  new RandomizedPoint(W-100, H - 100, 6, 30), new RandomizedPoint(100, H - 100, 6, 30)
];

const generateSamplePointsInPolygon = (polygon, numberOfPoints=10, randomChance=0.05) => {
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

const renderFrame = () => {
  clearContext();
  if (settings.showTruePolygon) {
    drawPoints(truePolygon, "rgba(0,0,200,0.5)");
    drawRect(truePolygon, "rgba(0,0,220,0.5");
  }
  drawPoints(dataPoints);


  if (allCondidatePolygons && settings.debugCandidates) {
    allCondidatePolygons.forEach((polygon) => drawRect(polygon, "rgba(200,0,0,0.1)"));
    drawPoints(candidatePolygon, "rgba(0,0,0,0.5)");
    drawRect(candidatePolygon, "rgba(0,0,0,0.7)", 2);
  } else if (candidatePolygon) {
    drawPoints(candidatePolygon, "rgba(200,0,0,0.5)");
    drawRect(candidatePolygon, "rgba(220,0,0,0.7)", 2);
  }
};

const loop = () => {
  renderFrame();
  requestAnimationFrame(loop);
};
loop();

document.getElementById('optimizeButton').addEventListener('click', () => {
  const optimizer = new EsOptimizer({
    learningRate: settings.learningRate,
    numberOfSamples: settings.numberOfSamples,
    width: W,
    height: H,
    debug: settings.debugCandidates
  }, dataPoints);
  console.time("fitting rect");
  optimizer.fitRect().then(({main, all}) => {
    console.timeEnd("fitting rect");
    candidatePolygon = main;
    allCondidatePolygons = all;
  });
});

const setupInputData = () => {
  truePolygon = generateSamplePolygon();
  dataPoints = generateSamplePointsInPolygon(truePolygon, 100);
  candidatePolygon = null;
  allCondidatePolygons = null;
};
document.getElementById('regenerateTruePolygon').addEventListener('click', setupInputData);
setupInputData();

const gui = new dat.GUI();
gui.add(settings, 'numberOfSamples', 2, 40).step(1);
gui.add(settings, 'learningRate', 1, 50).step(1);
gui.add(settings, 'areaImportance', 0.1, 3).step(0.1);
gui.add(settings, 'showTruePolygon');
gui.add(settings, 'debugCandidates');
