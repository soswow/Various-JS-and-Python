(function() {
  var BALL_SIZE, Ball, Canvas, FPS, Game, HALF_WALL_THICK, INIT_PLAYER_SIZE, INNER_SIDE, Player, Point, SIDE, SPEED_RANGE, State, TWOPI, WALL_THICK, angleBetweenLines, degToRad, distance, game, lineIntersections, radToDeg, randomInRange, xy;

  INNER_SIDE = 500;

  WALL_THICK = 5;

  SIDE = INNER_SIDE + WALL_THICK * 2;

  INIT_PLAYER_SIZE = 0.1 * INNER_SIDE;

  HALF_WALL_THICK = WALL_THICK / 2;

  BALL_SIZE = 10;

  SPEED_RANGE = [400, 600];

  FPS = 60;

  TWOPI = Math.PI * 2;

  game = null;

  $(function() {
    console.log("ready");
    game = new Game();
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
      console.log("constructor");
      this.state = new State();
      this.canvas = new Canvas(this);
      this.state.addPlayer(new Player());
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

  Canvas = (function() {

    function Canvas(game) {
      this.state = game.state;
      this.prepare();
    }

    Canvas.prototype.prepare = function() {
      var _ref;
      this.el = $('#canvas');
      this.el.attr('width', SIDE);
      this.el.attr('height', SIDE);
      this.context = (_ref = this.el[0]) != null ? typeof _ref.getContext === "function" ? _ref.getContext('2d') : void 0 : void 0;
      return console.log(this.context);
    };

    Canvas.prototype.repaint = function() {
      this.clearAll();
      this.drawWalls();
      this.drawBall();
      return this.drawPrevBalls();
    };

    Canvas.prototype.clearAll = function() {
      return this.el.attr('width', SIDE);
    };

    Canvas.prototype.drawWalls = function() {
      var from, to, _i, _len, _ref, _ref2, _results;
      _ref = this.state.walls();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref2 = _ref[_i], from = _ref2[0], to = _ref2[1];
        this.context.lineWidth = WALL_THICK;
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.closePath();
        this.context.stroke();
        _results.push(this.context.lineWidth = 1);
      }
      return _results;
    };

    Canvas.prototype.drawBall = function() {
      var x, y, _ref;
      _ref = [this.state.ball.pos.x, this.state.ball.pos.y], x = _ref[0], y = _ref[1];
      this.context.fillStyle = 'red';
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.arc(x, y, BALL_SIZE, 0, TWOPI, true);
      this.context.closePath();
      this.context.fill();
      return this.context.fillStyle = 'black';
    };

    Canvas.prototype.drawPrevBalls = function() {
      var ball, i, portion, size, x, y, _len, _ref, _ref2, _results;
      _ref = this.state.prevBalls;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        ball = _ref[i];
        _ref2 = [ball.pos.x, ball.pos.y], x = _ref2[0], y = _ref2[1];
        portion = i / this.state.prevBalls.length;
        this.context.fillStyle = "rgba(255,0,0," + portion + ")";
        size = BALL_SIZE * portion;
        this.context.beginPath();
        this.context.moveTo(x + size, y);
        this.context.arc(x, y, size, 0, TWOPI, true);
        this.context.closePath();
        this.context.fill();
        _results.push(this.context.fillStyle = 'black');
      }
      return _results;
    };

    return Canvas;

  })();

  Ball = (function() {

    function Ball(pos, angle, speed) {
      this.pos = pos;
      this.angle = angle;
      this.speed = speed;
      if (!(this.pos && this.angle && this.speed)) this.randomInit();
    }

    Ball.prototype.randomInit = function() {
      this.pos = xy(SIDE / 2, SIDE / 2);
      this.angle = randomInRange(0, 360);
      this.speed = randomInRange(SPEED_RANGE[0], SPEED_RANGE[1]);
      return console.log('Ball setup', this.pos, this.angle, this.speed);
    };

    Ball.prototype.getBoundingBox = function() {};

    Ball.prototype.move = function(time, walls) {
      var anglBet, intPoint, newPos, wall, _i, _len;
      newPos = this.findNextPoint(time);
      intPoint = null;
      for (_i = 0, _len = walls.length; _i < _len; _i++) {
        wall = walls[_i];
        if (!intPoint) {
          intPoint = lineIntersections(this.pos, newPos, wall[0], wall[1]);
          if (intPoint) {
            anglBet = radToDeg(angleBetweenLines(this.pos, newPos, wall[0], wall[1]));
            this.angle += anglBet * 2;
          }
        }
      }
      if (!intPoint) return this.pos = newPos;
    };

    Ball.prototype.findNextPoint = function(time) {
      var deltaX, deltaY, distance, radians, x, y;
      distance = this.speed * time;
      radians = degToRad(this.angle);
      deltaY = Math.sin(radians) * distance;
      deltaX = Math.cos(radians) * distance;
      x = this.pos.x + deltaX;
      y = this.pos.y - deltaY;
      return xy(x, y);
    };

    return Ball;

  })();

  State = (function() {

    State.playerIndexSideMap = ['bottom', 'top', 'right', 'left'];

    function State() {
      var a;
      this.ball = new Ball();
      this.prevBalls = [];
      this.players = (function() {
        var _results;
        _results = [];
        for (a = 1; a <= 4; a++) {
          _results.push(null);
        }
        return _results;
      })();
    }

    State.prototype.walls = function() {
      var i, side, wallEnd, wallStart, _len, _ref, _ref2, _results;
      _ref = State.playerIndexSideMap;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        side = _ref[i];
        _results.push((_ref2 = (function() {
          if (this.players[i]) {
            return this.players[i].getWallPosition();
          } else {
            switch (side) {
              case 'bottom':
                return [xy(0, SIDE - HALF_WALL_THICK), xy(SIDE, SIDE - HALF_WALL_THICK)];
              case 'top':
                return [xy(0, HALF_WALL_THICK), xy(SIDE, HALF_WALL_THICK)];
              case 'right':
                return [xy(SIDE - HALF_WALL_THICK, 0), xy(SIDE - HALF_WALL_THICK, SIDE)];
              case 'left':
                return [xy(HALF_WALL_THICK, 0), xy(HALF_WALL_THICK, SIDE)];
              default:
                return [xy(0, 0), xy(0, 0)];
            }
          }
        }).call(this), wallStart = _ref2[0], wallEnd = _ref2[1], _ref2));
      }
      return _results;
    };

    State.prototype.addPlayer = function(newPlayer) {
      var i, player, _len, _ref;
      _ref = this.players;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        player = _ref[i];
        if (!player) {
          newPlayer.side = State.playerIndexSideMap[i];
          return this.players[i] = newPlayer;
        }
      }
    };

    State.prototype.update = function(timeleft, clientX) {
      if (clientX) this.players[0].move(clientX);
      if (timeleft) {
        this.prevBalls.push(new Ball(this.ball.pos, this.ball.angle, this.ball.speed));
        if (this.prevBalls.length > 15) this.prevBalls.shift();
        return this.ball.move(timeleft, this.walls());
      }
    };

    return State;

  })();

  Player = (function() {

    function Player(name) {
      this.name = name;
      this.side = State.playerIndexSideMap[0];
      this.size = INIT_PLAYER_SIZE;
      this.pos = 0.5;
    }

    Player.prototype.getWallPosition = function() {
      var from, to, wallCenter, _ref;
      wallCenter = (INNER_SIDE - this.size) * this.pos;
      _ref = [wallCenter + WALL_THICK, wallCenter + this.size + WALL_THICK], from = _ref[0], to = _ref[1];
      switch (this.side) {
        case 'bottom':
          return [xy(from, SIDE - HALF_WALL_THICK), xy(to, SIDE - HALF_WALL_THICK)];
        case 'top':
          return [xy(from, HALF_WALL_THICK), xy(to, HALF_WALL_THICK)];
        case 'right':
          return [xy(SIDE - HALF_WALL_THICK, from), xy(SIDE - HALF_WALL_THICK, to)];
        case 'left':
          return [xy(HALF_WALL_THICK, from), xy(HALF_WALL_THICK, to)];
      }
    };

    Player.prototype.move = function(clientX) {
      clientX -= this.size / 2;
      this.pos = clientX / (INNER_SIDE - this.size);
      if (this.pos > 1) this.pos = 1;
      if (this.pos < 0) return this.pos = 0;
    };

    return Player;

  })();

  randomInRange = function(from, to) {
    return Math.random() * (to - from) + from;
  };

  degToRad = function(deg) {
    return deg * (Math.PI / 180);
  };

  radToDeg = function(rad) {
    return rad * (180 / Math.PI);
  };

  xy = function(x, y) {
    return new Point(x, y);
  };

  Point = (function() {

    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    Point.prototype.toString = function() {
      return "(" + this.x + ", " + this.y + ")";
    };

    return Point;

  })();

  distance = function(from, to) {
    return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
  };

  angleBetweenLines = function(p1, p2, p3, p4) {
    var angle1, angle2, x1, x2, x3, x4, y1, y2, y3, y4, _ref, _ref2;
    _ref = [p1.x, p2.x, p3.x, p4.x], x1 = _ref[0], x2 = _ref[1], x3 = _ref[2], x4 = _ref[3];
    _ref2 = [p1.y, p2.y, p3.y, p4.y], y1 = _ref2[0], y2 = _ref2[1], y3 = _ref2[2], y4 = _ref2[3];
    angle1 = Math.atan2(y1 - y2, x1 - x2);
    angle2 = Math.atan2(y3 - y4, x3 - x4);
    return angle1 - angle2;
  };

  lineIntersections = function(p1, p2, p3, p4) {
    var ua, ub, x1, x2, x3, x4, y1, y2, y3, y4, _ref, _ref2;
    _ref = [p1.x, p2.x, p3.x, p4.x], x1 = _ref[0], x2 = _ref[1], x3 = _ref[2], x4 = _ref[3];
    _ref2 = [p1.y, p2.y, p3.y, p4.y], y1 = _ref2[0], y2 = _ref2[1], y3 = _ref2[2], y4 = _ref2[3];
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    if ((0 <= ua && ua <= 1) && (0 <= ub && ub <= 1)) {
      return xy(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
    }
  };

}).call(this);
