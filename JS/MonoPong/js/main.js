(function() {
  var Arena, BALL_SIZE, Ball, Canvas, DIAMETER, FPS, Game, INIT_PLAYER_SIZE_PORTION, Player, RADIUS, SIDES, SPEED_RANGE, Segment, State, TWOPI, WALL_THICK, game, seg, xy,
    __slice = Array.prototype.slice;

  DIAMETER = 500;

  RADIUS = DIAMETER / 2;

  WALL_THICK = 5;

  BALL_SIZE = 10;

  SIDES = 4;

  FPS = 60;

  SPEED_RANGE = [400, 600];

  TWOPI = Math.PI * 2;

  INIT_PLAYER_SIZE_PORTION = 0.4;

  xy = utils.xy;

  game = null;

  $(function() {
    game = new Game();
    $("#sides").bind('change', function() {
      SIDES = parseInt(this.value, 10);
      return game.state.arena.updateAreaWalls();
    });
    return $("#button").bind('click', function() {
      if (this.innerHTML === 'Start') {
        game.startMainLoop();
        return this.innerHTML = 'Stop';
      } else {
        game.stopMainLoop();
        return this.innerHTML = 'Start';
      }
    });
  });

  Game = (function() {

    function Game() {
      this.state = new State();
      this.canvas = new Canvas(this);
      this.state.addPlayer(new Player("somename", this.state));
      this.initHandlers();
      this.canvas.repaint();
    }

    Game.prototype.initHandlers = function() {
      var _this = this;
      return this.canvas.el.bind("mousemove", function(e) {
        return _this.updateAndRepaint(0, e.offsetX);
      });
    };

    Game.prototype.updateAndRepaint = function(timeLeft, clientX) {
      this.state.update(timeLeft / 1000, clientX);
      return this.canvas.repaint();
    };

    Game.prototype.startMainLoop = function() {
      var _this = this;
      return this.reqInterval = requestInterval((function() {
        return _this.updateAndRepaint(1000 / FPS);
      }), 1000 / FPS);
    };

    Game.prototype.stopMainLoop = function() {
      return clearRequestInterval(this.reqInterval);
    };

    return Game;

  })();

  State = (function() {

    function State() {
      this.ball = new Ball(this);
      this.player = null;
      this.arena = new Arena(RADIUS, this);
    }

    State.prototype.addPlayer = function(newPlayer) {
      this.player = newPlayer;
      this.arena.player = newPlayer;
      this.arena.updateSolidWalls();
      return newPlayer;
    };

    State.prototype.update = function(timeleft, clientX) {
      if (clientX && this.player) {
        this.player.move(clientX);
        this.arena.updateSolidWalls();
      }
      if (timeleft) {
        if (!this.ball.move(timeleft)) return game.state.ball.randomInit();
      }
    };

    return State;

  })();

  Ball = (function() {

    function Ball(state, pos, angle, speed) {
      this.state = state;
      this.pos = pos;
      this.angle = angle;
      this.speed = speed;
      if (!(this.pos && this.angle && this.speed)) this.randomInit();
    }

    Ball.prototype.randomInit = function() {
      this.pos = xy(DIAMETER / 2, DIAMETER / 2);
      this.angle = utils.randomInRange(0, 360);
      this.acceleration = 1.5;
      this.normalSpeed = utils.randomInRange.apply(utils, SPEED_RANGE);
      this.speed = this.normalSpeed;
      this.kickSpeed = this.normalSpeed * 0.5;
      this.maxSpeed = this.normalSpeed * 1.5;
      return this.minSpeed = this.normalSpeed / 2;
    };

    Ball.prototype.move = function(time) {
      var intPoint, isInside, k, newPos, oldAngle, _ref;
      if (this.speed >= this.maxSpeed) this.acceleration = -2;
      if (this.speed < this.normalSpeed && this.acceleration < 0) {
        this.acceleration = -0.05;
      }
      if (this.speed < this.minSpeed) this.acceleration = 0;
      this.speed += this.acceleration * (time * 1000);
      newPos = this.findNextPoint(time);
      oldAngle = this.angle;
      _ref = this.findIntersectionPoint(newPos), intPoint = _ref[0], this.angle = _ref[1];
      if (!intPoint) {
        this.pos = newPos;
      } else {
        this.speed += utils.randomGauss(this.kickSpeed, 30);
        this.acceleration = -1.3;
        this.pos = this.findNextPoint(time);
        isInside = this.isPointInside();
        k = 0;
        while (true) {
          if (isInside || k++ > 100) break;
          this.pos = intPoint;
          this.angle = utils.randomInRange(0, 360);
          this.pos = this.findNextPoint(time);
          isInside = this.isPointInside();
        }
      }
      return this.isPointInside();
    };

    Ball.prototype.isPointInside = function(point) {
      var pointIsOnTheLeftOfLine, wall;
      if (point == null) point = this.pos;
      pointIsOnTheLeftOfLine = function(line) {
        var x, x0, x1, y, y0, y1, _ref;
        _ref = utils.unfoldPoints(line[0], line[1], point), x0 = _ref[0], y0 = _ref[1], x1 = _ref[2], y1 = _ref[3], x = _ref[4], y = _ref[5];
        return (y - y0) * (x1 - x0) - (x - x0) * (y1 - y0) <= 0;
      };
      return _.all((function() {
        var _i, _len, _ref, _results;
        _ref = this.state.arena.areaWalls;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          wall = _ref[_i];
          _results.push(pointIsOnTheLeftOfLine(wall));
        }
        return _results;
      }).call(this), _.identity);
    };

    Ball.prototype.findIntersectionPoint = function(nextPoint) {
      var anglBet, intPoint, newAngle, randomness, wall, _i, _len, _ref;
      intPoint = null;
      newAngle = this.angle;
      _ref = this.state.arena.solidWalls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        wall = _ref[_i];
        intPoint = utils.lineIntersections.apply(utils, [this.pos, nextPoint].concat(__slice.call(wall)));
        if (intPoint) {
          anglBet = utils.radToDeg(utils.angleBetweenLines.apply(utils, [this.pos, nextPoint].concat(__slice.call(wall))));
          newAngle += anglBet * 2;
          randomness = utils.randomGauss(0, anglBet * 0.1);
          newAngle += randomness;
          break;
        }
      }
      return [intPoint, newAngle];
    };

    Ball.prototype.findNextPoint = function(time, angle, pos) {
      if (angle == null) angle = this.angle;
      if (pos == null) pos = this.pos;
      return utils.radialMove(pos, this.speed * time, angle);
    };

    return Ball;

  })();

  Player = (function() {

    function Player(name, state) {
      this.name = name;
      this.state = state;
      this.sideLength = this.state.arena.getFullWallLength();
      this.size = INIT_PLAYER_SIZE_PORTION * this.sideLength;
      this.centerPos = 0.5;
      this.updateSegment();
    }

    Player.prototype.move = function(clientX) {
      this.updateCenterPosition(clientX);
      return this.updateSegment();
    };

    Player.prototype.updateCenterPosition = function(clientX) {
      clientX -= this.state.arena.areaWalls[0][0].x + this.size / 2;
      this.centerPos = clientX / (this.sideLength - this.size);
      if (this.centerPos > 1) this.centerPos = 1;
      if (this.centerPos < 0) return this.centerPos = 0;
    };

    Player.prototype.updateSegment = function() {
      var centerPx, segmentEnd, segmentStart;
      centerPx = this.centerPos * (this.sideLength - this.size);
      segmentStart = centerPx / this.sideLength;
      segmentEnd = (centerPx + this.size) / this.sideLength;
      return this.segment = seg(segmentStart, segmentEnd);
    };

    return Player;

  })();

  Arena = (function() {

    function Arena(radius, state) {
      this.radius = radius;
      this.state = state;
      this.player = this.state.player;
      this.solidWalls = this.areaWalls = this.updateAreaWalls();
    }

    Arena.prototype.updateSolidWalls = function() {
      var end, endPortion, i, start, startPortion, xd, yd;
      this.updateAreaWalls();
      return this.solidWalls = (function() {
        var _len, _ref, _ref2, _ref3, _results;
        _ref = this.areaWalls;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          _ref2 = _ref[i], start = _ref2[0], end = _ref2[1];
          _ref3 = this.portions[i], startPortion = _ref3.start, endPortion = _ref3.end;
          xd = end.x - start.x;
          yd = end.y - start.y;
          start = xy(start.x + xd * startPortion, start.y + yd * startPortion);
          end = xy(end.x - xd * (1 - endPortion), end.y - yd * (1 - endPortion));
          _results.push([start, end]);
        }
        return _results;
      }).call(this);
    };

    Arena.prototype.updateAreaWalls = function() {
      var corner, i;
      this.updatePortions();
      this.updateCorners();
      return this.areaWalls = (function() {
        var _len, _ref, _results;
        _ref = this.corners;
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          corner = _ref[i];
          _results.push([this.corners.slice(i - 1, (i - 1) + 1 || 9e9)[0], corner]);
        }
        return _results;
      }).call(this);
    };

    Arena.prototype.updatePortions = function() {
      var _i, _ref, _results,
        _this = this;
      return this.portions = _.map((function() {
        _results = [];
        for (var _i = 0, _ref = SIDES - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function(i) {
        if (i === 0 && (_this.player != null)) {
          return _this.player.segment;
        } else {
          return seg(0, 1);
        }
      });
    };

    Arena.prototype.getFullWallLength = function() {
      return utils.distance.apply(utils, this.areaWalls[0]);
    };

    Arena.prototype.updateCorners = function() {
      var angle, center, sectorAngle, sideIndex, sidesNum;
      sidesNum = SIDES;
      center = xy(this.radius, this.radius);
      sectorAngle = 360 / sidesNum;
      angle = 270 - sectorAngle / 2;
      return this.corners = (function() {
        var _ref, _results;
        _results = [];
        for (sideIndex = 0, _ref = sidesNum - 1; 0 <= _ref ? sideIndex <= _ref : sideIndex >= _ref; 0 <= _ref ? sideIndex++ : sideIndex--) {
          angle += sectorAngle;
          _results.push(utils.radialMove(center, this.radius, angle));
        }
        return _results;
      }).call(this);
    };

    return Arena;

  })();

  Canvas = (function() {

    function Canvas(game) {
      this.state = game.state;
      this.prepare();
    }

    Canvas.prototype.prepare = function() {
      var context, thickness, _ref;
      this.el = $('#canvas');
      this.el.attr('width', DIAMETER);
      this.el.attr('height', DIAMETER);
      context = this.context = (_ref = this.el.get(0)) != null ? typeof _ref.getContext === "function" ? _ref.getContext('2d') : void 0 : void 0;
      thickness = WALL_THICK;
      State.prototype.draw = function() {
        this.arena.draw();
        return this.ball.draw();
      };
      Arena.prototype.draw = function() {
        var end, i, start, _len, _ref2, _ref3;
        _ref2 = this.solidWalls;
        for (i = 0, _len = _ref2.length; i < _len; i++) {
          _ref3 = _ref2[i], start = _ref3[0], end = _ref3[1];
          context.lineWidth = thickness;
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(end.x, end.y);
          context.closePath();
          context.stroke();
        }
        return context.lineWidth = 1;
      };
      return Ball.prototype.draw = function() {
        var x, y, _ref2;
        context.fillStyle = 'red';
        context.beginPath();
        _ref2 = [this.pos.x, this.pos.y], x = _ref2[0], y = _ref2[1];
        context.moveTo(x, y);
        context.arc(x, y, BALL_SIZE, 0, TWOPI, true);
        context.closePath();
        context.fill();
        return context.fillStyle = 'black';
      };
    };

    Canvas.prototype.repaint = function() {
      this.clearAll();
      return this.state.draw();
    };

    Canvas.prototype.clearAll = function() {
      return this.el.attr('width', DIAMETER);
    };

    return Canvas;

  })();

  Segment = (function() {

    function Segment(start, end) {
      this.start = start;
      this.end = end;
    }

    return Segment;

  })();

  seg = function() {
    var vars;
    vars = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return typeof result === "object" ? result : child;
    })(Segment, vars, function() {});
  };

}).call(this);
