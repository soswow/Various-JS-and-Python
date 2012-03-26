(function() {
  var PI, TWOPI, World, canvases, ctx, distance, distanceToLine, findMax, findMaxIndex, findMin, findMinIndex, height, nodeRadius, pointAt, root, width, world;

  ctx = {};

  canvases = {};

  width = 800;

  height = 500;

  world = null;

  $(function() {
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
    $('#canvasContainer').mousemove(function(e) {
      var isOverNode;
      isOverNode = world.hover(e.offsetX, e.offsetY);
      return $(this).toggleClass("hovered", isOverNode);
    }).mousedown(function(e) {
      var isNodeSelected;
      isNodeSelected = world.selectNodeAt(e.offsetX, e.offsetY);
      return world.moveNode = isNodeSelected;
    }).mouseup(function(e) {
      if (!world.moveNode) world.addPoint(e.offsetX, e.offsetY);
      return world.moveNode = false;
    });
    $(document).keydown(function(e) {
      if (e.keyCode === 46) return world.deleteSelectedNode();
    });
    return world = new World(width, height).draw();
  });

  nodeRadius = 8;

  World = (function() {

    function World(w, h) {
      this.w = w;
      this.h = h;
      this.points = [];
      this.hoveredNodeIndex = -1;
      this.selectedNodeIndex = -1;
      this.moveNode = false;
    }

    World.prototype.addPoint = function(x, y) {
      var indexToInsert, p;
      if (this.findNodeNear(x, y) == null) {
        p = pointAt(x, y);
        indexToInsert = this.getClosestIndexToInsert(p);
        this.points.splice(indexToInsert, 0, p);
        this.draw();
        return this;
      }
    };

    World.prototype.getClosestIndexToInsert = function(p) {
      var a, ab, alpha, angles, ap, b, beta, bp, dToFirst, dToLast, gamma, i, inBetween, putAtIndex;
      inBetween = false;
      angles = (function() {
        var _ref, _results;
        if (this.points.length === 0) {
          return [];
        } else {
          _results = [];
          for (i = 0, _ref = this.points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            a = i > 0 ? this.points[i - 1] : this.points[this.points.length - 1];
            b = this.points[i];
            ap = distance(a, p);
            bp = distance(b, p);
            ab = distance(b, a);
            alpha = Math.acos((root(ap) + root(bp) - root(ab)) / (2 * ap * bp));
            beta = Math.acos((root(ab) + root(bp) - root(ap)) / (2 * ab * bp));
            gamma = Math.acos((root(ab) + root(ap) - root(bp)) / (2 * ab * ap));
            if (beta < PI / 2 && gamma < PI / 2) inBetween = true;
            _results.push(alpha * 180 / PI);
          }
          return _results;
        }
      }).call(this);
      if (inBetween) {
        putAtIndex = findMaxIndex(angles);
        if (putAtIndex < 0) {
          return 0;
        } else {
          return putAtIndex;
        }
      } else {
        if (this.points.length >= 2) {
          dToFirst = distance(p, this.points[0]);
          dToLast = distance(p, this.points[this.points.length - 1]);
          if (dToFirst < dToLast) {
            return 0;
          } else {
            return this.points.length;
          }
        } else {
          return this.points.length;
        }
      }
    };

    World.prototype.hover = function(x, y) {
      var oldHoveredPointIndex, pointIndex;
      if (this.moveNode && this.selectedNodeIndex >= 0) {
        this.points[this.selectedNodeIndex] = pointAt(x, y);
        this.draw();
        return true;
      } else {
        pointIndex = this.findNodeNear(x, y);
        oldHoveredPointIndex = this.hoveredNodeIndex;
        this.hoveredNodeIndex = pointIndex != null ? pointIndex : -1;
        if (this.hoveredNodeIndex !== oldHoveredPointIndex) this.draw();
        return this.hoveredNodeIndex >= 0;
      }
    };

    World.prototype.selectNodeAt = function(x, y) {
      var oldSelectedNodeIndex, pointIndex;
      pointIndex = this.findNodeNear(x, y);
      oldSelectedNodeIndex = this.selectedNodeIndex;
      this.selectedNodeIndex = pointIndex != null ? pointIndex : -1;
      if (this.selectedNodeIndex !== oldSelectedNodeIndex) this.draw();
      return this.selectedNodeIndex >= 0;
    };

    World.prototype.findNodeNear = function(x, y) {
      var i, p, _len, _ref;
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        if (distance(p, pointAt(x, y)) <= nodeRadius) return i;
      }
      return null;
    };

    World.prototype.deleteSelectedNode = function() {
      if (this.selectedNodeIndex >= 0) {
        this.points.splice(this.selectedNodeIndex, 1);
        this.selectedNodeIndex = -1;
        return this.draw();
      }
    };

    World.prototype.clear = function(ctxId) {
      if (ctxId) return canvases[ctxId].width = width;
    };

    World.prototype.drawStraightLines = function() {
      var c, i, p, prevPoint, _len, _ref;
      c = ctx.simpleLines;
      c.beginPath();
      prevPoint = null;
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
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

    World.prototype.drawNodes = function() {
      var c, i, p, _len, _ref, _results;
      c = ctx.simpleLines;
      _ref = this.points;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        c.beginPath();
        c.moveTo(p.x + nodeRadius, p.y);
        c.arc(p.x, p.y, nodeRadius, 0, TWOPI, true);
        c.closePath();
        c.fillStyle = i === this.selectedNodeIndex ? "rgb(200,255,200)" : i === this.hoveredNodeIndex ? "rgb(200,200,255)" : "white";
        c.fill();
        _results.push(c.stroke());
      }
      return _results;
    };

    World.prototype.draw = function() {
      this.clear('simpleLines');
      this.drawStraightLines();
      this.drawNodes();
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
