// Generated by CoffeeScript 1.6.3
(function() {
  var $angles, $left, $right, PI, Plotter, angle, canvas, ctx, distance, dx, dy, h, hypRealToVirtual, i, len, lineToStringLengths, plotter, positionForHyps, pow2, realHypStartPositions, sqrt, times, triangleHeight, w, x, y, _i, _ref;

  pow2 = function(num) {
    return Math.pow(num, 2);
  };

  sqrt = Math.sqrt;

  PI = Math.PI;

  hypRealToVirtual = function(hypReal, radius) {
    return sqrt(pow2(hypReal) + pow2(radius));
  };

  triangleHeight = function(a, b, c) {
    return sqrt((a + b - c) * (a - b + c) * (-a + b + c) * (a + b + c)) / (c * 2);
  };

  positionForHyps = function(h1, h2, d) {
    var x1, x2, y;
    y = triangleHeight(h1, h2, d);
    x1 = sqrt(pow2(h1) - pow2(y));
    x2 = sqrt(pow2(h2) - pow2(y));
    return [y, x1, x2];
  };

  realHypStartPositions = function(hr1, hr2, d, radius) {
    var hv1, hv2, rollerPosition, x1, x2, y, _ref;
    hv1 = hypRealToVirtual(hr1, radius);
    hv2 = hypRealToVirtual(hr2, radius);
    _ref = positionForHyps(hv1, hv2, d), y = _ref[0], x1 = _ref[1], x2 = _ref[2];
    rollerPosition = function(hr, hv, x) {
      var alpha;
      alpha = Math.asin(hr / hv) + Math.asin(x / hv) - (Math.PI / 2);
      return {
        x: Math.cos(alpha) * radius,
        y: Math.sin(alpha) * radius
      };
    };
    return {
      left: {
        roller: rollerPosition(hr1, hv1, x1),
        x: x1
      },
      right: {
        roller: rollerPosition(hr2, hv2, x2),
        x: x2
      },
      height: y
    };
  };

  lineToStringLengths = function(start, end, roller) {
    var a, alpha, b, beta, c, height;
    a = distance(start, roller);
    b = distance(end, roller);
    c = distance(start, end);
    alpha = Math.acos((pow2(b) + pow2(c) - pow2(a)) / (2 * b * c));
    beta = Math.acos((pow2(a) + pow2(c) - pow2(b)) / (2 * a * c));
    height = triangleHeight(a, b, c);
    if (alpha > PI / 2 || beta > PI / 2) {
      return [a, height, b];
    } else {
      return [a, b];
    }
  };

  distance = function(_arg, _arg1) {
    var x1, x2, y1, y2;
    x1 = _arg.x, y1 = _arg.y;
    x2 = _arg1.x, y2 = _arg1.y;
    return Math.sqrt(pow2(x1 - x2) + pow2(y1 - y2));
  };

  $left = document.getElementById("left");

  $right = document.getElementById("right");

  $angles = {
    l: document.getElementById("leftAngle"),
    r: document.getElementById("rightAngle")
  };

  Plotter = (function() {
    Plotter.prototype.stringLen = 500;

    Plotter.prototype.roller = {
      d: 500,
      x: 30 - 0.5,
      y: 30 - 0.5,
      r: 20,
      steps: 200
    };

    Plotter.prototype.state = {
      l: 300,
      r: 300,
      angles: {
        l: 0,
        r: 0
      },
      x: null,
      y: null,
      rollers: null
    };

    Plotter.prototype.path = [];

    Plotter.prototype.relativePlan = [];

    Plotter.prototype.interactive = false;

    function Plotter(ctx, properties) {
      this.ctx = ctx;
      if (properties == null) {
        properties = null;
      }
      if (properties) {
        this.prop = properties;
      }
      this.updatePosition();
      console.log(this.state);
    }

    Plotter.prototype.clear = function() {
      return canvas.width = w;
    };

    Plotter.prototype.renderRolleres = function() {
      var drawForX,
        _this = this;
      this.ctx.lineWidth = 0.3;
      this.ctx.beginPath();
      drawForX = function(x, side) {
        _this.ctx.moveTo(x + _this.roller.r, _this.roller.y);
        _this.ctx.arc(x, _this.roller.y, _this.roller.r, 0, Math.PI * 2);
        _this.ctx.moveTo(x + Math.cos(_this.state.angles[side]) * _this.roller.r, _this.roller.y + Math.sin(_this.state.angles[side]) * _this.roller.r);
        return _this.ctx.lineTo(x + Math.cos(_this.state.angles[side] + PI) * _this.roller.r, _this.roller.y + Math.sin(_this.state.angles[side] + PI) * _this.roller.r);
      };
      drawForX(this.roller.x, 'l');
      drawForX(this.roller.d + this.roller.x, 'r');
      this.ctx.closePath();
      return this.ctx.stroke();
    };

    Plotter.prototype.renderCounterweights = function() {
      var x;
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      x = this.roller.x - this.roller.r;
      this.ctx.moveTo(x, this.roller.y);
      this.ctx.lineTo(x, this.roller.y + this.stringLen - this.state.l);
      x = this.roller.d + this.roller.x + this.roller.r;
      this.ctx.moveTo(x, this.roller.y);
      this.ctx.lineTo(x, this.roller.y + this.stringLen - this.state.r);
      this.ctx.closePath();
      return this.ctx.stroke();
    };

    Plotter.prototype.updatePosition = function() {
      var data;
      data = realHypStartPositions(this.state.l, this.state.r, this.roller.d, this.roller.r);
      this.state.x = data.left.x;
      this.state.y = data.height;
      this.state.rollers = {
        left: data.left.roller,
        right: data.right.roller
      };
      return this.path.push([this.state.x, this.state.y]);
    };

    Plotter.prototype.renderGandola = function() {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'black';
      this.ctx.moveTo(this.roller.x + this.state.rollers.left.x, this.roller.y - this.state.rollers.left.y);
      this.ctx.lineTo(this.roller.x + this.state.x, this.roller.y + this.state.y);
      this.ctx.moveTo(this.roller.x + this.roller.d - this.state.rollers.right.x, this.roller.y - this.state.rollers.right.y);
      this.ctx.lineTo(this.roller.x + this.state.x, this.roller.y + this.state.y);
      this.ctx.stroke();
      return this.ctx.closePath();
    };

    Plotter.prototype.renderPath = function() {
      var x, y, _i, _len, _ref, _ref1;
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#ccc';
      _ref = this.path;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], x = _ref1[0], y = _ref1[1];
        this.ctx.lineTo(this.roller.x + x, this.roller.y + y);
      }
      this.ctx.stroke();
      return this.ctx.closePath();
    };

    Plotter.prototype.render = function() {
      this.clear();
      this.renderRolleres();
      this.renderCounterweights();
      this.renderPath();
      return this.renderGandola();
    };

    Plotter.prototype.stepWheel = function(side, direction) {
      var anglePerStep, c, lenPerStep;
      if (direction == null) {
        direction = 1;
      }
      c = 2 * PI * this.roller.r;
      lenPerStep = c / this.roller.steps;
      anglePerStep = (2 * PI) / this.roller.steps;
      this.state[side] += direction * lenPerStep;
      if (side === 'r') {
        direction *= -1;
      }
      this.state.angles[side] += direction * anglePerStep;
      return $angles[side].innerText = (this.state.angles[side] * (180 / PI)).toFixed(2);
    };

    Plotter.prototype.start = function() {
      var _this = this;
      return this.moveByRelativePlan(function() {
        return _this.render();
      });
    };

    Plotter.prototype.generateInstructions = function() {
      var dx, dy, _i, _len, _ref, _ref1, _results;
      this.frames = [];
      _ref = this.relativePlan;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], dx = _ref1[0], dy = _ref1[1];
        _results.push(this.generateTurnFrames(this.state.x + dx, this.state.y + dy));
      }
      return _results;
    };

    Plotter.prototype.moveByRelativePlan = function(cb) {
      var x, y, _ref,
        _this = this;
      if (!this.relativePlan.length) {
        return cb();
      }
      _ref = this.relativePlan.shift(), x = _ref[0], y = _ref[1];
      return this.moveBy(x, y, function() {
        return _this.moveByRelativePlan(cb);
      });
    };

    Plotter.prototype.moveBy = function(dx, dy, cb) {
      return this.goToPosition(this.state.x + dx, this.state.y + dy, cb);
    };

    Plotter.prototype.generateTurnFrames = function(x, y) {
      var c, currentLD, currentRD, d, i, lenPerStep, newLD, newRD, parts, portion, startX, startY, sx, sy, turn, wheelTurns, _i;
      d = distance(this.state, {
        x: x,
        y: y
      });
      c = 2 * PI * this.roller.r;
      lenPerStep = c / this.roller.steps;
      parts = Math.ceil(d) * 2;
      startX = this.state.x;
      startY = this.state.y;
      wheelTurns = [];
      for (i = _i = 0; 0 <= parts ? _i <= parts : _i >= parts; i = 0 <= parts ? ++_i : --_i) {
        portion = i < parts ? i / parts : 1;
        sx = startX + (x - startX) * portion;
        sy = startY + (y - startY) * portion;
        turn = '';
        currentLD = distance({
          x: 0,
          y: 0
        }, this.state);
        newLD = distance({
          x: 0,
          y: 0
        }, {
          x: sx,
          y: sy
        });
        if (Math.abs(currentLD - newLD) >= lenPerStep) {
          turn += newLD - currentLD > 0 ? 'L' : 'l';
        }
        currentRD = distance({
          x: this.roller.d,
          y: 0
        }, this.state);
        newRD = distance({
          x: this.roller.d,
          y: 0
        }, {
          x: sx,
          y: sy
        });
        if (Math.abs(currentRD - newRD) >= lenPerStep) {
          turn += newRD - currentRD > 0 ? 'R' : 'r';
        }
        wheelTurns.push(turn);
      }
      return wheelTurns;
    };

    return Plotter;

  })();

  _ref = [700, 600], w = _ref[0], h = _ref[1];

  canvas = document.getElementsByTagName('canvas').item(0);

  canvas.width = w;

  canvas.height = h;

  ctx = canvas.getContext('2d');

  plotter = new Plotter(ctx);

  plotter.render();

  x = plotter.state.x;

  y = plotter.state.y;

  times = 25;

  angle = PI / 4;

  len = 10;

  plotter.relativePlan.push([10, 10]);

  for (i = _i = 1; 1 <= times ? _i <= times : _i >= times; i = 1 <= times ? ++_i : --_i) {
    dx = Math.cos(angle) * len;
    dy = Math.sin(angle) * len;
    len += 10;
    angle += PI / 2;
    plotter.relativePlan.push([dx, dy]);
  }

  plotter.interactive = false;

  plotter.start();

}).call(this);
