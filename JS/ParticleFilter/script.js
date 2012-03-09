(function() {
  var Robot, Simulation, TWOPI, animateStep, canvasHtml, canvasSize, context, cos, distance, exp, gauss, log, max, mod, pi, pow, prepareCanvas, random, randomGauss, root, shouldStop, simulation, sin, sqrt, sum;

  context = canvasHtml = simulation = null;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  random = Math.random;

  pow = Math.pow;

  sqrt = Math.sqrt;

  log = Math.log;

  pi = Math.PI;

  TWOPI = pi * 2;

  exp = Math.exp;

  cos = Math.cos;

  sin = Math.sin;

  canvasSize = {
    width: 500,
    height: 400
  };

  shouldStop = false;

  root.reset = function() {
    var N, landmarks;
    canvasHtml.width = canvasHtml.width;
    shouldStop = true;
    landmarks = [
      {
        x: 100,
        y: 100
      }, {
        x: 200,
        y: 350
      }, {
        x: 400,
        y: 370
      }, {
        x: 270,
        y: 90
      }, {
        x: 350,
        y: 200
      }
    ];
    N = 100;
    return simulation = new Simulation(N, landmarks, null, 1, 0).initiateParticles().draw(false);
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
      animateStep();
      if (!shouldStop) return requestAnimationFrame(step);
    };
    return requestAnimationFrame(step);
  };

  animateStep = function() {
    canvasHtml.width = canvasHtml.width;
    return simulation.step(randomGauss(0, pi / 20)).draw();
  };

  prepareCanvas = function() {
    canvasHtml = document.getElementById('canvas');
    canvasHtml.width = canvasSize.width;
    canvasHtml.height = canvasSize.height;
    return context = canvasHtml != null ? typeof canvasHtml.getContext === "function" ? canvasHtml.getContext('2d') : void 0 : void 0;
  };

  Simulation = (function() {

    function Simulation(particlesNum, landmarks, noiseConfig, initMoveBy, initMakeTurn) {
      if (initMoveBy == null) initMoveBy = 1;
      if (initMakeTurn == null) initMakeTurn = 0;
      this.N = particlesNum;
      this.landmarks = landmarks;
      this.myrobot = new Robot().setColor('red');
      if (noiseConfig) this.myrobot.set_noise(noiseConfig);
      this.particles = [];
      this.moveBy = initMoveBy;
      this.makeTurn = initMakeTurn;
    }

    Simulation.prototype.initiateParticles = function(noiseConfig, color) {
      var i;
      if (color == null) color = 'gray';
      noiseConfig || (noiseConfig = {
        forward_noise: 0.05,
        turn_noise: pi / 20,
        sense_noise: 5
      });
      this.particles = (function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.N; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
          _results.push(new Robot().setColor(color).set_noise(noiseConfig));
        }
        return _results;
      }).call(this);
      return this;
    };

    Simulation.prototype.draw = function(isRobotFirst) {
      var i, particle, _len, _ref;
      if (isRobotFirst == null) isRobotFirst = true;
      if (isRobotFirst) this.myrobot.draw(10);
      this.drawLandmarks();
      _ref = this.particles;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        particle = _ref[i];
        particle.draw(5);
      }
      if (!isRobotFirst) this.myrobot.draw(10);
      return this;
    };

    Simulation.prototype.drawLandmarks = function(withLabels) {
      var i, landmark, size, x, y, _len, _ref;
      if (withLabels == null) withLabels = false;
      size = 10 / 2;
      context.strokeStyle = "black";
      _ref = this.landmarks;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        landmark = _ref[i];
        context.beginPath();
        x = landmark.x + 0.5;
        y = landmark.y + 0.5;
        context.moveTo(x, y - size);
        context.lineTo(x, y + size);
        context.moveTo(x - size, y);
        context.lineTo(x + size, y);
        if (withLabels) {
          context.font = 'normal 8px';
          context.strokeStyle = 'black';
          context.fillText(i, x + 8.5, y + 3.5);
        }
        context.closePath();
        context.stroke();
      }
      return this;
    };

    Simulation.prototype.step = function(makeTurn, moveBy) {
      var Z, beta, i, index, mw, p, particles, resampledParticles, weights, _len, _ref;
      if (makeTurn == null) makeTurn = this.makeTurn;
      if (moveBy == null) moveBy = this.moveBy;
      this.myrobot = this.myrobot.move(makeTurn, moveBy, true);
      Z = this.myrobot.sense(this.landmarks);
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
      weights = [];
      for (i = 0, _len = particles.length; i < _len; i++) {
        p = particles[i];
        weights.push(p.measurement_prob(Z, this.landmarks));
      }
      resampledParticles = [];
      index = Math.round(random() * this.N);
      beta = 0;
      mw = max(weights);
      for (i = 0, _ref = this.N; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        beta += random() * 2.0 * mw;
        while (beta > weights[index]) {
          beta -= weights[index];
          index = (index + 1) % this.N;
        }
        resampledParticles.push(particles[index]);
      }
      this.particles = resampledParticles;
      return this.draw(false);
    };

    return Simulation;

  })();

  Robot = (function() {

    function Robot() {
      this.x = Math.round(random() * canvasSize.width) + 0.5;
      this.y = Math.round(random() * canvasSize.height) + 0.5;
      this.orientation = random() * TWOPI;
      this.forward_noise = 0;
      this.turn_noise = 0;
      this.sense_noise = 0;
      this.color = 'black';
    }

    Robot.prototype.set = function(new_x, new_y, new_orientation, color) {
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
      if (color) this.color = color;
      return this;
    };

    Robot.prototype.setColor = function(color) {
      this.color = color;
      return this;
    };

    Robot.prototype.set_noise = function(noiseConfig) {
      this.forward_noise = noiseConfig.forward_noise;
      this.turn_noise = noiseConfig.turn_noise;
      this.sense_noise = noiseConfig.sense_noise;
      return this;
    };

    Robot.prototype.sense = function(landmarks) {
      var lendmark, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = landmarks.length; _i < _len; _i++) {
        lendmark = landmarks[_i];
        _results.push(distance(this, lendmark) + randomGauss(0, this.sense_noise));
      }
      return _results;
    };

    Robot.prototype.move = function(turn, forward, makeNew) {
      var dist, orientation, robot, x, y;
      if (makeNew == null) makeNew = false;
      if (forward < 0) throw 'Robot cant move backwards';
      orientation = this.orientation + turn + randomGauss(0.0, this.turn_noise);
      orientation = mod(orientation, TWOPI);
      dist = forward + randomGauss(0.0, this.forward_noise);
      x = this.x + cos(orientation) * dist;
      y = this.y + sin(orientation) * dist;
      x = mod(x, canvasSize.width);
      y = mod(y, canvasSize.height);
      if (makeNew) {
        robot = makeNew ? new Robot().set_noise({
          forward_noise: this.forward_noise,
          turn_noise: this.turn_noise,
          sense_noise: this.sense_noise
        }) : void 0;
      } else {
        robot = this;
      }
      return robot.set(x, y, orientation, this.color);
    };

    Robot.prototype.measurement_prob = function(measurement, landmarks) {
      var dist, i, landmark, pp, prob, probs, _len;
      probs = 1.0;
      for (i = 0, _len = landmarks.length; i < _len; i++) {
        landmark = landmarks[i];
        dist = distance(this, landmark);
        prob = gauss(dist, this.sense_noise, measurement[i]);
        probs *= prob;
      }
      pp = Math.round(probs * 1000000) / 1000000;
      return probs;
    };

    Robot.prototype.toString = function() {
      return "[x=" + this.x + " y=" + this.y + " orient=" + this.orientation + "]";
    };

    Robot.prototype.draw = function(R, color) {
      if (R == null) R = 10;
      if (color == null) color = this.color;
      context.beginPath();
      context.strokeStyle = color;
      context.arc(this.x, this.y, R, 0, TWOPI, true);
      context.moveTo(this.x, this.y);
      context.lineTo(this.x + R * cos(this.orientation), this.y + R * sin(this.orientation));
      context.closePath();
      return context.stroke();
    };

    Robot.prototype.drawText = function(text) {
      context.font = 'normal 8px';
      context.strokeStyle = 'black';
      return context.fillText(text, this.x + 8.5, this.y + 3.5);
    };

    return Robot;

  })();

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
