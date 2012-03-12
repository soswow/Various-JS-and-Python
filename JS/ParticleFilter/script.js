(function() {
  var DistanceSensor, LandmarksField, Robot, Simulation, TWOPI, animateStep, canvasHtml, canvasSize, clearCanvas, context, cos, currentTurn, distance, exp, gauss, getFormData, landmarkColor, landmarkSize, log, max, mod, particleSize, pi, pow, prepareCanvas, random, randomGauss, robotColor, robotSize, root, shouldStop, simulation, sin, sqrt, stearing, stepNum, sum, turnAfterSteps,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  context = canvasHtml = simulation = null;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  canvasSize = {
    width: 700,
    height: 400
  };

  particleSize = 5;

  robotSize = 10;

  landmarkSize = 10;

  robotColor = 'red';

  landmarkColor = 'red';

  shouldStop = false;

  getFormData = function() {
    var getVal;
    getVal = function(id) {
      return eval(document.getElementById(id).value);
    };
    return {
      particlesN: getVal('particlesN'),
      landmarksN: getVal('landmarksN'),
      goByOneStep: getVal('goByOneStep'),
      particleForwardNoise: getVal('particleForwardNoise'),
      particleTurnNoise: getVal('particleTurnNoise'),
      particleSenseNoise: getVal('particleSenseNoise'),
      robotForwardNoise: getVal('robotForwardNoise'),
      robotTurnNoise: getVal('robotTurnNoise'),
      robotSenseNoise: getVal('robotSenseNoise'),
      fogOfWar: getVal('fogOfWar')
    };
  };

  simulation = null;

  root.reset = function() {
    var fd, landmarksFieldEnv, sensorCreator;
    shouldStop = true;
    fd = getFormData();
    landmarksFieldEnv = new LandmarksField(canvasSize.width, canvasSize.height).generateRandom(fd.landmarksN);
    sensorCreator = function(robot) {
      var noise;
      noise = robot.isParticle != null ? fd.robotSenseNoise : fd.particleSenseNoise;
      return new DistanceSensor(robot, fd.fogOfWar, noise);
    };
    return simulation = new Simulation({
      particlesNum: fd.particlesN,
      environment: landmarksFieldEnv,
      sensorCreator: sensorCreator,
      noiseConfig: null,
      initMoveBy: fd.goByOneStep,
      initMakeTurn: 0
    }).initiateParticles({
      forward_noise: fd.particleForwardNoise,
      turn_noise: fd.particleTurnNoise,
      sense_noise: fd.particleSenseNoise
    }).draw();
  };

  root.init = function() {
    prepareCanvas();
    return root.reset();
  };

  root.pause = function() {
    return shouldStop = true;
  };

  root.step = function() {
    return animateStep();
  };

  root.start = function() {
    var requestAnimationFrame, step;
    shouldStop = false;
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    step = function(timestamp) {
      if (!shouldStop) {
        animateStep();
        return requestAnimationFrame(step);
      }
    };
    return requestAnimationFrame(step);
  };

  root.toggleLandmark = function(e) {
    simulation.environment.toggleLandmark(e.offsetX, e.offsetY);
    return simulation.draw();
  };

  root.trackLandmark = function(e) {
    var x, y;
    x = e.offsetX;
    y = e.offsetY;
    if (simulation.environment.findLandmarkIndexAtLocation(x, y) != null) {
      return e.target.style.cursor = 'pointer';
    } else {
      return e.target.style.cursor = 'crosshair';
    }
  };

  stepNum = 0;

  currentTurn = 0;

  turnAfterSteps = 20;

  stearing = function() {
    if (stepNum % turnAfterSteps === 0) {
      if (currentTurn === 0) {
        currentTurn = randomGauss(0, pi / 40);
      } else {
        currentTurn = 0;
      }
      turnAfterSteps = Math.round(randomGauss(40 - Math.abs(currentTurn * 400), 10));
      turnAfterSteps || (turnAfterSteps = 1);
    }
    return stepNum += 1;
  };

  animateStep = function() {
    canvasHtml.width = canvasHtml.width;
    stearing();
    return simulation.step(currentTurn).draw();
  };

  prepareCanvas = function() {
    canvasHtml = document.getElementById('canvas');
    canvasHtml.width = canvasSize.width;
    canvasHtml.height = canvasSize.height;
    return context = canvasHtml != null ? typeof canvasHtml.getContext === "function" ? canvasHtml.getContext('2d') : void 0 : void 0;
  };

  DistanceSensor = (function() {

    function DistanceSensor(robot, maxRange, sense_noise) {
      this.robot = robot;
      this.maxRange = maxRange;
      this.sense_noise = sense_noise;
    }

    DistanceSensor.prototype.sense = function() {
      var dist, landmark, measurement, _i, _len, _ref;
      measurement = [];
      _ref = this.robot.environment.landmarks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        landmark = _ref[_i];
        dist = distance(this.robot, landmark) + randomGauss(0, this.sense_noise);
        if (dist < this.maxRange) measurement.push(dist);
      }
      return measurement.sort(function(a, b) {
        return a - b;
      });
    };

    DistanceSensor.prototype.measurementProbability = function(otherRobotMeasurements) {
      var i, myMeasurement, myMeasurements, prob, probs, _len;
      probs = 1.0;
      myMeasurements = this.sense();
      if (myMeasurements.length !== otherRobotMeasurements.length) return 0;
      for (i = 0, _len = myMeasurements.length; i < _len; i++) {
        myMeasurement = myMeasurements[i];
        prob = gauss(myMeasurement, this.sense_noise, otherRobotMeasurements[i]);
        probs *= prob;
      }
      return probs;
    };

    DistanceSensor.prototype.draw = function() {
      var x, y;
      x = this.robot.x;
      y = this.robot.y;
      context.beginPath();
      context.strokeStyle = robotColor;
      context.moveTo(x + this.maxRange, y);
      context.arc(x, y, this.maxRange, 0, TWOPI, true);
      context.closePath();
      return context.stroke();
    };

    return DistanceSensor;

  })();

  LandmarksField = (function() {

    function LandmarksField(fieldWidth, fieldHeight) {
      this.fieldWidth = fieldWidth;
      this.fieldHeight = fieldHeight;
      this.halfSize = landmarkSize / 2;
      this.landmarks = [];
    }

    LandmarksField.prototype.generateRandom = function(n) {
      var i, rand;
      rand = function(mult) {
        return Math.round(random() * mult);
      };
      this.landmarks = (function() {
        var _results;
        _results = [];
        for (i = 1; 1 <= n ? i <= n : i >= n; 1 <= n ? i++ : i--) {
          _results.push({
            x: rand(this.fieldWidth),
            y: rand(this.fieldHeight)
          });
        }
        return _results;
      }).call(this);
      return this;
    };

    LandmarksField.prototype.findLandmarkIndexAtLocation = function(x, y) {
      var i, landmark, lx, ly, _len, _ref;
      _ref = this.landmarks;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        landmark = _ref[i];
        lx = landmark.x;
        ly = landmark.y;
        if (x > lx - this.halfSize && x < lx + this.halfSize && y > ly - this.halfSize && y < ly + this.halfSize) {
          return i;
        }
      }
    };

    LandmarksField.prototype.toggleLandmark = function(x, y) {
      var landmarkIndex;
      landmarkIndex = this.findLandmarkIndexAtLocation(x, y);
      if (landmarkIndex != null) {
        this.landmarks.splice(landmarkIndex, 1);
      } else {
        this.landmarks.push({
          x: x,
          y: y
        });
      }
      return this;
    };

    LandmarksField.prototype.draw = function() {
      var i, landmark, x, y, _len, _ref;
      context.strokeStyle = landmarkColor;
      _ref = this.landmarks;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        landmark = _ref[i];
        context.beginPath();
        x = landmark.x + 0.5;
        y = landmark.y + 0.5;
        context.moveTo(x, y - this.halfSize);
        context.lineTo(x, y + this.halfSize);
        context.moveTo(x - this.halfSize, y);
        context.lineTo(x + this.halfSize, y);
        context.closePath();
        context.stroke();
      }
      return this;
    };

    return LandmarksField;

  })();

  Simulation = (function() {

    function Simulation(config) {
      this.N = config.particlesNum;
      this.environment = config.environment;
      this.sensorCreator = config.sensorCreator;
      this.myrobot = new Robot(this.environment, this.sensorCreator);
      if (config.noiseConfig) this.myrobot.set_noise(config.noiseConfig);
      this.particles = [];
      this.moveBy = config.initMoveBy || 1;
      this.makeTurn = config.initMakeTurn || 0;
    }

    Simulation.prototype.initiateParticles = function(noiseConfig) {
      var i;
      if (noiseConfig == null) noiseConfig = this.noiseConfig;
      noiseConfig || (noiseConfig = {
        forward_noise: 0.05,
        turn_noise: pi / 20
      });
      this.noiseConfig = noiseConfig;
      this.particles = (function() {
        var _ref, _results;
        _results = [];
        for (i = 1, _ref = this.N; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
          _results.push(new Robot(this.environment, this.sensorCreator, true).set_noise(noiseConfig));
        }
        return _results;
      }).call(this);
      return this;
    };

    Simulation.prototype.drawParticles = function() {
      var color, i, k, key, maxDensity, obj, particle, particleDensity, tag, value, weight, _len, _ref, _results;
      particleDensity = {};
      _ref = this.particles;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        particle = _ref[i];
        tag = "" + (Math.round(particle.x)) + "-" + (Math.round(particle.y));
        if (__indexOf.call(Object.keys(particleDensity), tag) >= 0) {
          particleDensity[tag].density += 1;
        } else {
          particleDensity[tag] = {
            density: 1,
            particle: particle
          };
        }
      }
      maxDensity = max((function() {
        var _results;
        _results = [];
        for (k in particleDensity) {
          obj = particleDensity[k];
          _results.push(obj.density);
        }
        return _results;
      })());
      _results = [];
      for (key in particleDensity) {
        value = particleDensity[key];
        weight = value.density / maxDensity;
        color = "rgba(0,0,0," + weight + ")";
        _results.push(value.particle.draw(particleSize, color));
      }
      return _results;
    };

    Simulation.prototype.draw = function() {
      clearCanvas();
      this.environment.draw();
      this.drawParticles();
      this.myrobot.draw(robotSize, robotColor);
      return this;
    };

    Simulation.prototype.step = function(makeTurn, moveBy) {
      var beta, i, index, mainRobotMeasurements, mw, p, particles, resampledParticles, weights, _ref;
      if (makeTurn == null) makeTurn = this.makeTurn;
      if (moveBy == null) moveBy = this.moveBy;
      this.myrobot = this.myrobot.move(makeTurn, moveBy, true);
      mainRobotMeasurements = this.myrobot.sense();
      particles = (function() {
        var _i, _len, _ref, _results;
        _ref = this.particles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(p.move(makeTurn, moveBy, true));
        }
        return _results;
      }).call(this);
      weights = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = particles.length; _i < _len; _i++) {
          p = particles[_i];
          _results.push(p.sensor.measurementProbability(mainRobotMeasurements));
        }
        return _results;
      })();
      resampledParticles = [];
      index = Math.round(random() * this.N);
      beta = 0;
      mw = max(weights);
      if (mw > 0) {
        for (i = 0, _ref = this.N; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          beta += random() * 2.0 * mw;
          while (beta > weights[index]) {
            beta -= weights[index];
            index = (index + 1) % this.N;
          }
          resampledParticles.push(particles[index]);
        }
        this.particles = resampledParticles;
      } else {
        this.initiateParticles();
      }
      return this.draw();
    };

    return Simulation;

  })();

  Robot = (function() {

    function Robot(environment, sensorCreator, isParticle) {
      this.environment = environment;
      this.sensorCreator = sensorCreator;
      this.isParticle = isParticle != null ? isParticle : false;
      this.x = Math.round(random() * canvasSize.width) + 0.5;
      this.y = Math.round(random() * canvasSize.height) + 0.5;
      this.orientation = random() * TWOPI;
      this.forward_noise = 0;
      this.turn_noise = 0;
      this.sensor = this.sensorCreator(this);
    }

    Robot.prototype.set = function(new_x, new_y, new_orientation) {
      if (new_x < 0 || new_x >= canvasSize.width) {
        throw 'X coordinate out of bound';
      }
      if (new_y < 0 || new_y >= canvasSize.height) {
        throw 'Y coordinate out of bound';
      }
      if (new_orientation < 0 || new_orientation >= TWOPI) {
        throw 'Orientation must be in [0..2pi]';
      }
      this.x = new_x;
      this.y = new_y;
      this.orientation = new_orientation;
      return this;
    };

    Robot.prototype.set_noise = function(noiseConfig) {
      this.forward_noise = noiseConfig.forward_noise;
      this.turn_noise = noiseConfig.turn_noise;
      return this;
    };

    Robot.prototype.sense = function() {
      return this.sensor.sense();
    };

    Robot.prototype.move = function(turn, forward, makeNew) {
      var dist, orientation, robot, x, y;
      if (makeNew == null) makeNew = false;
      if (forward < 0) throw 'Robot cant move backwards';
      orientation = this.orientation + turn + randomGauss(0, this.turn_noise);
      orientation = mod(orientation, TWOPI);
      dist = forward + randomGauss(0, this.forward_noise);
      x = this.x + cos(orientation) * dist;
      y = this.y + sin(orientation) * dist;
      x = mod(x, canvasSize.width);
      y = mod(y, canvasSize.height);
      if (makeNew) {
        robot = makeNew ? new Robot(this.environment, this.sensorCreator, this.isParticle).set_noise({
          forward_noise: this.forward_noise,
          turn_noise: this.turn_noise,
          sense_noise: this.sense_noise
        }) : void 0;
      } else {
        robot = this;
      }
      return robot.set(x, y, orientation);
    };

    Robot.prototype.toString = function() {
      return "[x=" + this.x + " y=" + this.y + " orient=" + this.orientation + "]";
    };

    Robot.prototype.draw = function(R, color) {
      context.beginPath();
      context.strokeStyle = color;
      context.arc(this.x, this.y, R, 0, TWOPI, true);
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + R * cos(this.orientation), this.y + R * sin(this.orientation));
      context.closePath();
      context.stroke();
      if (!this.isParticle) return this.sensor.draw();
    };

    Robot.prototype.drawText = function(text) {
      context.font = 'normal 8px';
      context.strokeStyle = 'black';
      return context.fillText(text, this.x + 8.5, this.y + 3.5);
    };

    return Robot;

  })();

  clearCanvas = function() {
    return canvasHtml.width = canvasHtml.width;
  };

  random = Math.random;

  pow = Math.pow;

  sqrt = Math.sqrt;

  log = Math.log;

  pi = Math.PI;

  TWOPI = pi * 2;

  exp = Math.exp;

  cos = Math.cos;

  sin = Math.sin;

  max = function(arr) {
    var el, result, _i, _len;
    result = -Number.MAX_VALUE;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      el = arr[_i];
      if (el > result) result = el;
    }
    return result;
  };

  sum = function(arr) {
    var el, _i, _len, _sum;
    _sum = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      el = arr[_i];
      _sum += el;
    }
    return _sum;
  };

  randomGauss = function(mu, sigma) {
    var s, x, y, z;
    while (true) {
      x = 2 * random() - 1;
      y = 2 * random() - 1;
      s = pow(x, 2) + pow(y, 2);
      if (!(s >= 1 || s === 0)) break;
    }
    z = x * sqrt(-2 * log(s) / s);
    return mu + sigma * z;
  };

  gauss = function(mu, sigma, x) {
    return exp(-(pow(mu - x, 2) / pow(sigma, 2) / 2.0) / sqrt(TWOPI * pow(sigma, 2)));
  };

  mod = function(a, b) {
    return a % b + (a < 0 ? b : 0);
  };

  distance = function(from, to) {
    return sqrt(pow(from.x - to.x, 2) + pow(from.y - to.y, 2));
  };

}).call(this);
