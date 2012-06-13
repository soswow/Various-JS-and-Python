(function() {
  var Arena, DIAMETER, RADIUS, SIDES, WALL_THICK, clearCanvas, xy;

  DIAMETER = 500;

  RADIUS = DIAMETER / 2;

  WALL_THICK = 4;

  SIDES = 6;

  xy = utils.xy;

  $(function() {
    var arena, context, el, portions, _ref;
    el = $('#canvas');
    el.attr('width', DIAMETER);
    el.attr('height', DIAMETER);
    context = (_ref = el[0]) != null ? typeof _ref.getContext === "function" ? _ref.getContext('2d') : void 0 : void 0;
    clearCanvas(el);
    portions = [
      {
        from: 0.1,
        to: 0.9
      }, {
        from: 0.2,
        to: 0.8
      }, {
        from: 0.3,
        to: 0.5
      }, {
        from: 0,
        to: 1
      }, {
        from: 0,
        to: 0.5
      }, {
        from: 0,
        to: 0.8
      }
    ];
    arena = new Arena(RADIUS);
    arena.updateSolidWalls(portions);
    return arena.draw(context, WALL_THICK);
  });

  clearCanvas = function(el) {
    return el.attr('width', DIAMETER);
  };

  Arena = (function() {

    function Arena(radius) {
      var defaultPortions, i;
      this.radius = radius;
      for (i = 1; i <= 4; i++) {
        defaultPortions = {
          from: 0,
          to: 1
        };
      }
      this.solidWalls = this.updateSolidWalls(defaultPortions);
    }

    Arena.prototype.areaWalls = function() {
      var corner, i, _len, _results;
      _results = [];
      for (i = 0, _len = corners.length; i < _len; i++) {
        corner = corners[i];
        _results.push([corners.slice(i - 1, (i - 1) + 1 || 9e9)[0], corner]);
      }
      return _results;
    };

    Arena.prototype.updateSolidWalls = function(portions) {
      var corner, corners, end, endPortion, i, start, startPortion, xd, yd;
      this.portions = portions;
      corners = this.findCorners();
      return this.solidWalls = (function() {
        var _len, _ref, _ref2, _results;
        _results = [];
        for (i = 0, _len = corners.length; i < _len; i++) {
          corner = corners[i];
          _ref = portions[i], startPortion = _ref.from, endPortion = _ref.to;
          _ref2 = [corners.slice(i - 1, (i - 1) + 1 || 9e9)[0], corner], start = _ref2[0], end = _ref2[1];
          xd = end.x - start.x;
          yd = end.y - start.y;
          start = xy(start.x + xd * startPortion, start.y + yd * startPortion);
          end = xy(end.x - xd * (1 - endPortion), end.y - yd * (1 - endPortion));
          _results.push([start, end]);
        }
        return _results;
      })();
    };

    Arena.prototype.findCorners = function() {
      var angle, center, sectorAngle, sideIndex, sidesNum, _ref, _results;
      sidesNum = this.portions.length;
      center = xy(this.radius, this.radius);
      sectorAngle = 360 / sidesNum;
      angle = 270 - sectorAngle / 2;
      _results = [];
      for (sideIndex = 0, _ref = sidesNum - 1; 0 <= _ref ? sideIndex <= _ref : sideIndex >= _ref; 0 <= _ref ? sideIndex++ : sideIndex--) {
        angle += sectorAngle;
        _results.push(utils.radialMove(center, this.radius, angle));
      }
      return _results;
    };

    Arena.prototype.draw = function(context, thickness) {
      var end, i, start, _len, _ref, _ref2;
      _ref = this.solidWalls;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ref2 = _ref[i], start = _ref2[0], end = _ref2[1];
        context.lineWidth = thickness;
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.stroke();
      }
      return context.lineWidth = 1;
    };

    return Arena;

  })();

}).call(this);
