(function() {
  var PI, TWOPI, World, canvases, ctx, distance, distanceToLine, findMax, findMaxIndex, findMin, findMinIndex, height, pointAt, root, width, world;

  ctx = {};

  canvases = {};

  width = 800;

  height = 500;

  world = null;

  $(function() {
    var gridMouseDown;
    $('#canvasContainer canvas').each(function() {
      var ctx_id, gridDiv, that;
      that = $(this);
      gridDiv = $('#grid');
      this.width = width;
      this.height = height;
      that.css('width', width);
      that.css('height', height);
      gridDiv.css('width', width);
      gridDiv.css('height', height);
      ctx_id = that.attr('id').split("_")[1];
      canvases[ctx_id] = this;
      ctx[ctx_id] = typeof this.getContext === "function" ? this.getContext('2d') : void 0;
      return ctx[ctx_id].clearRect(0, 0, width, height);
    });
    gridMouseDown = false;
    $('#canvasContainer').click(function(e) {
      return world.addPoint(e.offsetX, e.offsetY);
    });
    return world = new World(width, height).draw();
  });

  World = (function() {

    function World(w, h) {
      this.w = w;
      this.h = h;
      this.points = [];
    }

    World.prototype.addPoint = function(x, y) {
      var a, ab, alpha, angles, ap, b, beta, bp, dToFirst, dToLast, gamma, i, inBetween, p, putAtIndex;
      p = pointAt(x, y);
      inBetween = false;
      angles = (function() {
        var _len, _ref, _results;
        _ref = this.points.slice(1, this.points.length + 1 || 9e9);
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          b = _ref[i];
          a = this.points[i];
          ap = distance(a, p);
          bp = distance(b, p);
          ab = distance(b, a);
          alpha = Math.acos((root(ap) + root(bp) - root(ab)) / (2 * ap * bp));
          beta = Math.acos((root(ab) + root(bp) - root(ap)) / (2 * ab * bp));
          gamma = Math.acos((root(ab) + root(ap) - root(bp)) / (2 * ab * ap));
          if (beta < PI / 2 && gamma < PI / 2) {
            console.log("inBetween");
            inBetween = true;
          }
          _results.push(alpha * 180 / PI);
        }
        return _results;
      }).call(this);
      console.log(angles);
      if (inBetween) {
        putAtIndex = findMaxIndex(angles);
        if (putAtIndex < 0) putAtIndex = 0;
        console.log(putAtIndex);
        this.points.splice(putAtIndex + 1, 0, p);
      } else {
        if (this.points.length >= 2) {
          dToFirst = distance(p, this.points[0]);
          dToLast = distance(p, this.points[this.points.length - 1]);
          if (dToFirst < dToLast) {
            console.log("First");
            this.points.unshift(p);
          } else {
            console.log("Last");
            this.points.push(p);
          }
        } else {
          this.points.push(p);
        }
      }
      this.draw();
      return this;
    };

    World.prototype.removePoint = function(x, y) {};

    World.prototype.clear = function(ctxId) {
      if (ctxId) return canvases[ctxId].width = width;
    };

    World.prototype.drawPointsAndLines = function() {
      var c, i, p, prevPoint, _len, _ref;
      this.clear('simpleLines');
      c = ctx.simpleLines;
      c.beginPath();
      prevPoint = null;
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        c.moveTo(p.x + 10, p.y);
        c.arc(p.x, p.y, 10, 0, TWOPI, true);
        if (prevPoint) {
          c.moveTo(p.x, p.y);
          c.lineTo(prevPoint.x, prevPoint.y);
        }
        prevPoint = p;
      }
      if (this.points.length > 2) {
        c.moveTo(prevPoint.x, prevPoint.y);
        c.lineTo(this.points[0].x, this.points[0].y);
      }
      c.closePath();
      return c.stroke();
    };

    World.prototype.draw = function() {
      this.drawPointsAndLines();
      return this;
    };

    return World;

  })();

  PI = Math.PI;

  TWOPI = Math.PI * 2;

  findMin = function(arr, withIndex) {
    var min;
    if (withIndex == null) withIndex = false;
    min = Math.min.apply(null, arr);
    if (withIndex) {
      return [min, arr.indexOf(min)];
    } else {
      return min;
    }
  };

  findMinIndex = function(arr) {
    var index, _, _ref;
    _ref = findMin(arr, true), _ = _ref[0], index = _ref[1];
    return index;
  };

  findMax = function(arr, withIndex) {
    var max;
    if (withIndex == null) withIndex = false;
    max = Math.max.apply(null, arr);
    if (withIndex) {
      return [max, arr.indexOf(max)];
    } else {
      return max;
    }
  };

  findMaxIndex = function(arr) {
    var index, _, _ref;
    _ref = findMax(arr, true), _ = _ref[0], index = _ref[1];
    return index;
  };

  pointAt = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  root = function(a) {
    return Math.pow(a, 2);
  };

  distance = function(a, b) {
    return Math.sqrt(root(b.x - a.x) + root(b.y - a.y));
  };

  distanceToLine = function(a, b, p) {
    return Math.abs((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / distance(a, b);
  };

}).call(this);
