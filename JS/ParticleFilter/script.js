(function() {
  var Robot, TWOPI, canvasHtml, canvasSize, context, cos, distance, drawLandmarks, exp, gauss, landmarks, log, max, mod, pi, pow, prepare, random, randomGauss, root, run, shouldStop, sin, sqrt, sum;

  context = canvasHtml = null;

  canvasSize = {
    width: 500,
    height: 400
  };

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

  mod = function(a, b) {
    return a % b + (a < 0 ? b : 0);
  };

  prepare = function() {
    canvasHtml = document.getElementById('canvas');
    canvasHtml.width = canvasSize.width;
    canvasHtml.height = canvasSize.height;
    return context = canvasHtml != null ? typeof canvasHtml.getContext === "function" ? canvasHtml.getContext('2d') : void 0 : void 0;
  };

  distance = function(from, to) {
    return sqrt(pow(from.x - to.x, 2) + pow(from.y - to.y, 2));
  };

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

    Robot.prototype.set_noise = function(new_f_noise, new_t_noise, new_s_noise) {
      this.forward_noise = new_f_noise;
      this.turn_noise = new_t_noise;
      this.sense_noise = new_s_noise;
      return this;
    };

    Robot.prototype.sense = function() {
      var lendmark, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = landmarks.length; _i < _len; _i++) {
        lendmark = landmarks[_i];
        _results.push(distance(this, lendmark) + randomGauss(0, this.sense_noise));
      }
      return _results;
    };

    Robot.prototype.move = function(turn, forward) {
      var dist, orientation, res, x, y;
      if (forward < 0) throw 'Robot cant move backwards';
      orientation = this.orientation + turn + randomGauss(0.0, this.turn_noise);
      orientation = mod(orientation, TWOPI);
      dist = forward + randomGauss(0.0, this.forward_noise);
      x = this.x + cos(orientation) * dist;
      y = this.y + sin(orientation) * dist;
      x = mod(x, canvasSize.width);
      y = mod(y, canvasSize.height);
      res = new Robot();
      res.set(x, y, orientation, this.color);
      res.set_noise(this.forward_noise, this.turn_noise, this.sense_noise);
      return res;
    };

    Robot.prototype.measurement_prob = function(measurement) {
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

  drawLandmarks = function() {
    var i, landmark, size, x, y, _len, _results;
    size = 10 / 2;
    context.strokeStyle = "black";
    _results = [];
    for (i = 0, _len = landmarks.length; i < _len; i++) {
      landmark = landmarks[i];
      context.beginPath();
      x = landmark.x + 0.5;
      y = landmark.y + 0.5;
      context.moveTo(x, y - size);
      context.lineTo(x, y + size);
      context.moveTo(x - size, y);
      context.lineTo(x + size, y);
      context.font = 'normal 8px';
      context.strokeStyle = 'black';
      context.fillText(i, x + 8.5, y + 3.5);
      context.closePath();
      _results.push(context.stroke());
    }
    return _results;
  };

  run = function() {
    var N, T, i, makeTurn, moveBy, myrobot, particle, particles, _len;
    myrobot = new Robot().setColor('red');
    moveBy = 1;
    makeTurn = 0;
    T = 25000;
    N = 200;
    particles = (function() {
      var _results;
      _results = [];
      for (i = 0; 0 <= N ? i <= N : i >= N; 0 <= N ? i++ : i--) {
        _results.push(new Robot().setColor('gray').set_noise(0.05, pi / 20, 5));
      }
      return _results;
    })();
    myrobot.draw(10);
    drawLandmarks();
    for (i = 0, _len = particles.length; i < _len; i++) {
      particle = particles[i];
      particle.draw(5);
    }
    return root.moveItNow = function() {
      var Z, beta, i, index, mw, p, particle, resampledParticles, w, weights, weightsNormalized, weightsSum, _len2, _len3;
      makeTurn = randomGauss(0, pi / 20);
      drawLandmarks();
      myrobot = myrobot.move(makeTurn, moveBy);
      Z = myrobot.sense();
      particles = (function() {
        var _i, _len2, _results;
        _results = [];
        for (_i = 0, _len2 = particles.length; _i < _len2; _i++) {
          p = particles[_i];
          _results.push(p.move(makeTurn, moveBy));
        }
        return _results;
      })();
      weights = [];
      for (i = 0, _len2 = particles.length; i < _len2; i++) {
        p = particles[i];
        weights.push(p.measurement_prob(Z));
      }
      weightsSum = sum(weights);
      weightsNormalized = (function() {
        var _i, _len3, _results;
        _results = [];
        for (_i = 0, _len3 = weights.length; _i < _len3; _i++) {
          w = weights[_i];
          _results.push(w / weightsSum);
        }
        return _results;
      })();
      resampledParticles = [];
      index = Math.round(random() * N);
      beta = 0;
      mw = max(weights);
      for (i = 0; 0 <= N ? i <= N : i >= N; 0 <= N ? i++ : i--) {
        beta += random() * 2.0 * mw;
        while (beta > weights[index]) {
          beta -= weights[index];
          index = (index + 1) % N;
        }
        resampledParticles.push(particles[index]);
      }
      particles = resampledParticles;
      for (i = 0, _len3 = particles.length; i < _len3; i++) {
        particle = particles[i];
        particle.draw(5);
      }
      return myrobot.draw(10);
    };
  };

  shouldStop = false;

  root.stop = function() {
    return shouldStop = true;
  };

  root.init = function() {
    prepare();
    return run();
  };

  root.start = function() {
    var cycle, i, requestAnimationFrame, start, step;
    i = 0;
    cycle = function() {
      canvasHtml.width = canvasSize.width;
      return root.moveItNow();
    };
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    start = Date.now();
    step = function(timestamp) {
      var progress;
      progress = timestamp - start;
      cycle();
      if (!shouldStop) return requestAnimationFrame(step);
    };
    return requestAnimationFrame(step);
  };

}).call(this);
