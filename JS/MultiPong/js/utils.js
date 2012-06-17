(function() {
  var Point, TWOPI, Utils, cos, exp, log, pi, pow, random, sin, sqrt,
    __slice = Array.prototype.slice;

  if (typeof _ === "undefined" || _ === null) _ = require('underscore')._;

  random = Math.random;

  pow = Math.pow;

  sqrt = Math.sqrt;

  log = Math.log;

  pi = Math.PI;

  TWOPI = pi * 2;

  exp = Math.exp;

  cos = Math.cos;

  sin = Math.sin;

  Point = (function() {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ")";
    };

    Point.prototype.round = function() {
      this.x = Math.round(this.x * 100) / 100;
      this.y = Math.round(this.y * 100) / 100;
      return this;
    };

    return Point;

  })();

  Utils = (function() {

    function Utils() {}

    Utils.prototype.randomGauss = function(mu, sigma) {
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

    Utils.prototype.gauss = function(mu, sigma, x) {
      return exp(-(pow(mu - x, 2) / pow(sigma, 2) / 2.0) / sqrt(TWOPI * pow(sigma, 2)));
    };

    Utils.prototype.distance = function(from, to) {
      return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
    };

    Utils.prototype.unfoldPoints = function() {
      var p, points;
      points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _.flatten((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          p = points[_i];
          _results.push([p.x, p.y]);
        }
        return _results;
      })());
    };

    Utils.prototype.angleBetweenLines = function(p1, p2, p3, p4) {
      var angle1, angle2, x1, x2, x3, x4, y1, y2, y3, y4, _ref;
      _ref = this.unfoldPoints(p1, p2, p3, p4), x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3], x3 = _ref[4], y3 = _ref[5], x4 = _ref[6], y4 = _ref[7];
      angle1 = Math.atan2(y1 - y2, x1 - x2);
      angle2 = Math.atan2(y3 - y4, x3 - x4);
      return angle1 - angle2;
    };

    Utils.prototype.lineIntersections = function(p1, p2, p3, p4) {
      var ua, ub, x1, x2, x3, x4, y1, y2, y3, y4, _ref;
      _ref = this.unfoldPoints(p1, p2, p3, p4), x1 = _ref[0], y1 = _ref[1], x2 = _ref[2], y2 = _ref[3], x3 = _ref[4], y3 = _ref[5], x4 = _ref[6], y4 = _ref[7];
      ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
      ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
      if ((0 <= ua && ua <= 1) && (0 <= ub && ub <= 1)) {
        return this.xy(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
      }
    };

    Utils.prototype.randomInRange = function(from, to) {
      return Math.random() * (to - from) + from;
    };

    Utils.prototype.degToRad = function(deg) {
      return deg * (Math.PI / 180);
    };

    Utils.prototype.radToDeg = function(rad) {
      return rad * (180 / Math.PI);
    };

    Utils.prototype.xy = function(x, y) {
      return new Point(x, y);
    };

    Utils.prototype.radialOriginMove = function(origin, point, deltaAngle, print) {
      var alpha, beta, r, xAxis;
      xAxis = origin;
      alpha = this.radToDeg(this.angleBetweenLines(point, origin, origin, xAxis));
      alpha = 360 - alpha;
      r = this.distance(origin, point);
      beta = alpha + deltaAngle;
      if (!print) console.log(deltaAngle, alpha, beta);
      return this.radialMove(origin, r, beta);
    };

    Utils.prototype.radialMove = function(start, distance, angle) {
      var deltaX, deltaY, radians;
      radians = this.degToRad(angle);
      deltaY = Math.sin(radians) * distance;
      deltaX = Math.cos(radians) * distance;
      return this.xy(start.x + deltaX, start.y - deltaY);
    };

    Utils.prototype.mod = function(a, b) {
      return a % b + (a < 0 ? b : 0);
    };

    return Utils;

  })();

  if (typeof exports === "undefined" || exports === null) {
    exports = typeof window !== "undefined" && window !== null ? window : {};
  }

  exports.utils = new Utils();

}).call(this);
