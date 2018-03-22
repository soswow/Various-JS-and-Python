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

EsOptimizer = (() => {
  // --- Module start
  const z = new Ziggurat();

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

  return EsOptimizer;
  // --- Module end
})();