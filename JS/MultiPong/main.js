(function() {
  var BALL_SIZE, Ball, Canvas, DIAMETER, FPS, Game, HALF_WALL_THICK, INIT_PLAYER_SIZE, INNER_SIDE, Player, RADIUS, SIDE, SIDES, SPEED_RANGE, State, TWOPI, WALL_THICK, game, xy;

  DIAMETER = 500;

  RADIUS = DIAMETER / 2;

  INNER_SIDE = 500;

  WALL_THICK = 5;

  SIDE = INNER_SIDE + WALL_THICK * 2;

  INIT_PLAYER_SIZE = 0.2 * INNER_SIDE;

  HALF_WALL_THICK = WALL_THICK / 2;

  BALL_SIZE = 10;

  SPEED_RANGE = [400, 600];

  FPS = 60;

  SIDES = 6;

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
      this.el.attr('width', DIAMETER);
      this.el.attr('height', DIAMETER);
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
      return this.el.attr('width', DIAMETER);
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
        size = BALL_SIZE * portion;
        this.context.fillStyle = "rgba(255, 0, 0, " + (Math.pow(portion, 4)) + ")";
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
      this.pos = xy(DIAMETER / 2, DIAMETER / 2);
      this.angle = utils.randomInRange(0, 360);
      return this.speed = utils.randomInRange(SPEED_RANGE[0], SPEED_RANGE[1]);
    };

    Ball.prototype.move = function(time, solidWalls, areaWalls) {
      var anglBet, intPoint, newPos, wall, x, x0, x1, y, y0, y1, _i, _len;
      newPos = this.findNextPoint(time);
      intPoint = null;
      for (_i = 0, _len = solidWalls.length; _i < _len; _i++) {
        wall = solidWalls[_i];
        intPoint = utils.lineIntersections(this.pos, newPos, wall[0], wall[1]);
        if (intPoint) {
          anglBet = utils.radToDeg(utils.angleBetweenLines(this.pos, newPos, wall[0], wall[1]));
          this.angle += anglBet * 2;
          break;
        }
      }
      if (!intPoint) {
        this.pos = newPos;
      } else {
        this.pos = intPoint;
      }
      return _.all((function() {
        var _j, _len2, _ref, _results;
        _results = [];
        for (_j = 0, _len2 = areaWalls.length; _j < _len2; _j++) {
          wall = areaWalls[_j];
          _ref = this.unfoldPoints(wall[0], wall[1], this.pos), x0 = _ref[0], y0 = _ref[1], x1 = _ref[2], y1 = _ref[3], x = _ref[4], y = _ref[5];
          _results.push((y - y0)((x1 - x0) - (x - x0)((y1 - y0) < 0)));
        }
        return _results;
      }).call(this));
    };

    Ball.prototype.findNextPoint = function(time) {
      var deltaX, deltaY, distance, radians, x, y;
      distance = this.speed * time;
      radians = utils.degToRad(this.angle);
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
      this.arena = new Arena(RADIUS);
      this.players = (function() {
        var _results;
        _results = [];
        for (a = 1; a <= 4; a++) {
          _results.push(null);
        }
        return _results;
      })();
    }

    State.prototype.walls = function() {};

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
        if (!this.ball.move(timeleft, this.walls())) {
          return game.state.ball.randomInit();
        }
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

    Player.prototype.move = function(clientX) {
      clientX -= this.size / 2;
      this.pos = clientX / (INNER_SIDE - this.size);
      if (this.pos > 1) this.pos = 1;
      if (this.pos < 0) return this.pos = 0;
    };

    return Player;

  })();

  xy = utils.xy;

}).call(this);
