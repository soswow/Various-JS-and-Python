const W = 500;
const H = 500;
const canvas = document.getElementById('canvas');
canvas.width = W;
canvas.height = H;
const context = canvas.getContext('2d');
context.width = W;
context.height = H;

// --- Module start
const z = new Ziggurat();

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

const p = (x, y) => ({x, y});
const randomP = (x, y, amplitude) => ({
  x: x + z.nextGaussian() * amplitude,
  y: y + z.nextGaussian() * amplitude
});

class EsOptimizer {
  constructor(settings, points) {
    this.settings = settings;
    this.points = points;
  }

  fitRect() {
    let learningRate = this.settings.learningRate;
    const learningRateDropRate = 15;
    const stopLearningRate = 5;
    const numberOfIterations = learningRateDropRate * (learningRate - stopLearningRate + 2);
    let candidatePolygon = [
      p(0, 0), p(this.settings.width, 0),
      p(this.settings.width, this.settings.height), p(0, this.settings.height)
    ];
    let allCandidates = [];
    return new Promise((resolve) => {
      for (let i = 0; i < numberOfIterations; i++) {
        if (i % learningRateDropRate === 0 && learningRate > stopLearningRate) {
          learningRate -= 1;
        }
        candidatePolygon = this.refineCandidatePolygon(candidatePolygon, learningRate);
        if (this.settings.debug) {
          allCandidates.push(candidatePolygon);
        }
      }
      if (this.settings.debug) {
        resolve({main: candidatePolygon, all: allCandidates});
      } else {
        resolve(candidatePolygon);
      }
    });
  }

  fitnessFunction(polygon) {
    const pointsInside = dataPoints.filter((point) => isPointInsidePolygon(point, polygon));
    const totalSizeSum = pointsInside.reduce( ((sum, point) => point.size + sum), 0);
    const area = calcPolygonArea(polygon);
    return totalSizeSum / Math.sqrt(area);
  }

  refineCandidatePolygon(basePolygon, learningRate) {
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

    const jitteredPolygons = [];
    for (let si=0; si<this.settings.numberOfSamples; si++) {
      const newPolygon = [];
      for (let pi=0; pi < basePolygon.length; pi++) {
        newPolygon.push(randomP(basePolygon[pi].x, basePolygon[pi].y, learningRate));
      }
      jitteredPolygons.push(newPolygon);
    }

    let valuedJitteredPolygons = jitteredPolygons.map((polygon) => {
      return {
        value: this.fitnessFunction(polygon),
        polygon
      };
    });
    valuedJitteredPolygons.sort((a, b) => b.value - a.value);
    valuedJitteredPolygons = valuedJitteredPolygons.slice(0, 5);
    const totalFitness = valuedJitteredPolygons.reduce(((sum, current) => current.value + sum), 0);
    // totalFitness / valuedJitteredPolygons.length;

    const resultingPolygon = [];
    for (let pi=0; pi < basePolygon.length; pi++) {
      let topPartX = 0;
      let topPartY = 0;
      for (let si=0; si < valuedJitteredPolygons.length; si++) {
        topPartX += valuedJitteredPolygons[si].polygon[pi].x * valuedJitteredPolygons[si].value;
        topPartY += valuedJitteredPolygons[si].polygon[pi].y * valuedJitteredPolygons[si].value;
      }
      resultingPolygon.push(p(topPartX/totalFitness, topPartY/totalFitness, basePolygon.size));
    }
    return resultingPolygon;
  }

}

// --- Module end

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
