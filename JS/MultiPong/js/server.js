(function() {
  var Arena, BALL_SIZE, Ball, DIAMETER, FPS, Game, HALF_WALL_THICK, INIT_PLAYER_SIZE_PORTION, Player, RADIUS, SIDES, SPEED_RANGE, Segment, State, TWOPI, WALL_THICK, app, dir, express, game, io, seg, utils, xy, _,
    __slice = Array.prototype.slice;

  io = require('socket.io');

  express = require('express');

  _ = require('underscore')._;

  utils = require('./utils').utils;

  xy = utils.xy;

  DIAMETER = 500;

  RADIUS = DIAMETER / 2;

  WALL_THICK = 5;

  INIT_PLAYER_SIZE_PORTION = 0.3;

  HALF_WALL_THICK = WALL_THICK / 2;

  BALL_SIZE = 10;

  SPEED_RANGE = [200, 400];

  FPS = 60;

  SIDES = 6;

  TWOPI = Math.PI * 2;

  Game = (function() {

    function Game() {
      var state;
      this.state = state = new State();
      this.startMainLoop();
      io.sockets.on('connection', function(socket) {
        var ID, disconnectUser,
          _this = this;
        ID = Math.round(Math.random() * 10000000);
        console.log("Connection recieved. ID: " + ID);
        socket.emit('constants', {
          DIAMETER: DIAMETER,
          RADIUS: RADIUS,
          WALL_THICK: WALL_THICK,
          BALL_SIZE: BALL_SIZE
        });
        socket.on('addNewUser', function(name, cb) {
          var player;
          console.log("User with ID:" + ID + " got name -> " + name);
          player = new Player(name, ID, state);
          return socket.set('name', name, function() {
            return cb({
              name: "" + name + " (" + ID + ")",
              side: player.side
            });
          });
        });
        socket.on('userMoves', function(clientX) {
          return state.update(0, clientX, ID);
        });
        disconnectUser = function() {
          return socket.get('name', function(err, name) {
            state.removePlayer(ID);
            return console.log("" + name + " (" + ID + ") disconnected");
          });
        };
        socket.on('disconnect', disconnectUser);
        return socket.on('user disconnect', disconnectUser);
      });
    }

    Game.prototype.updateAndSend = function(timeLeft, clientX) {
      this.state.update(timeLeft / 1000, clientX);
      return io.sockets.volatile.emit('stateUpdate', this.state.serialize());
    };

    Game.prototype.startMainLoop = function() {
      var _this = this;
      return this.reqInterval = setInterval((function() {
        return _this.updateAndSend(1000 / FPS);
      }), 1000 / FPS);
    };

    return Game;

  })();

  State = (function() {

    function State() {
      var i;
      this.ball = new Ball(this);
      this.players = (function() {
        var _results;
        _results = [];
        for (i = 1; 1 <= SIDES ? i <= SIDES : i >= SIDES; 1 <= SIDES ? i++ : i--) {
          _results.push(null);
        }
        return _results;
      })();
      this.playersIdMap = {};
      this.arena = new Arena(RADIUS, this);
    }

    State.prototype.addPlayer = function(newPlayer) {
      var i, newIndex, player, _len, _ref;
      newIndex = this.players.length;
      _ref = this.players;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        player = _ref[i];
        if (!player) {
          newIndex = i;
          break;
        }
      }
      newPlayer.side = newIndex;
      this.players[i] = newPlayer;
      this.playersIdMap[newPlayer.id] = i;
      this.arena.updateSolidWalls();
      return newPlayer;
    };

    State.prototype.removePlayer = function(id) {
      var i;
      i = this.playersIdMap[id];
      this.players[i] = null;
      delete this.playersIdMap[id];
      return this.arena.updateSolidWalls();
    };

    State.prototype.update = function(timeleft, clientX, ID) {
      var player;
      player = this.players[this.playersIdMap[ID]];
      if (clientX && player) {
        player.move(clientX);
        this.arena.updateSolidWalls();
      }
      if (timeleft) {
        if (!this.ball.move(timeleft)) return game.state.ball.randomInit();
      }
    };

    State.prototype.serialize = function(perspectivePlayerId) {
      var _ref, _ref2;
      return {
        ball: (_ref = this.ball) != null ? _ref.serialize() : void 0,
        arena: (_ref2 = this.arena) != null ? _ref2.serialize() : void 0,
        players: _.map(this.players, function(p) {
          return p != null ? p.serialize() : void 0;
        })
      };
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
      this.acceleration = 2;
      this.normalSpeed = utils.randomInRange.apply(utils, SPEED_RANGE);
      this.speed = this.normalSpeed;
      this.kickSpeed = this.normalSpeed * 0.4;
      return this.maxSpeed = this.normalSpeed * 4;
    };

    Ball.prototype.move = function(time) {
      var intPoint, isInside, k, newPos, oldAngle, _ref;
      if (this.speed >= this.maxSpeed) this.acceleration = -2;
      if (this.speed < this.normalSpeed && this.acceleration < 0) {
        this.acceleration = -0.05;
      }
      this.speed += this.acceleration * (time * 1000);
      newPos = this.findNextPoint(time);
      oldAngle = this.angle;
      _ref = this.findIntersectionPoint(newPos), intPoint = _ref[0], this.angle = _ref[1];
      if (!intPoint) {
        this.pos = newPos;
      } else {
        io.sockets.volatile.emit('kick!');
        this.speed += utils.randomGauss(this.kickSpeed, 30);
        this.acceleration = -1;
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
      var pointOnTheLeftOfLine, wall;
      if (point == null) point = this.pos;
      pointOnTheLeftOfLine = function(line) {
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
          _results.push(pointOnTheLeftOfLine(wall));
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

    Ball.prototype.serialize = function() {
      return {
        pos: this.pos,
        speed: this.speed,
        angle: this.angle
      };
    };

    return Ball;

  })();

  Player = (function() {

    function Player(name, id, state) {
      this.name = name;
      this.id = id;
      this.state = state;
      this.side = 0;
      this.sideLength = this.state.arena.getFullWallLength();
      this.size = INIT_PLAYER_SIZE_PORTION * this.sideLength;
      this.centerPos = 0.5;
      this.updateSegment();
      this.state.addPlayer(this);
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

    Player.prototype.serialize = function() {
      return {
        id: this.id,
        name: this.name,
        size: this.size,
        side: this.side
      };
    };

    return Player;

  })();

  Arena = (function() {

    function Arena(radius, state) {
      this.radius = radius;
      this.state = state;
      this.players = this.state.players;
      this.solidWalls = this.areaWalls = this.updateAreaWalls();
    }

    Arena.prototype.updateSolidWalls = function() {
      var end, endPortion, i, start, startPortion, xd, yd;
      if (this.players.length !== this.portions.length) {
        this.updateAreaWalls();
      } else {
        this.updatePortions();
      }
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
      return this.portions = _.map(this.players, function(p) {
        if (p) {
          return p.segment;
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
      sidesNum = this.portions.length;
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

    Arena.prototype.serialize = function() {
      return {
        solidWalls: this.solidWalls,
        areaWalls: this.areaWalls
      };
    };

    return Arena;

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

  app = express.createServer();

  io = io.listen(app);

  dir = __dirname.replace(/\/js$/, '');

  app.get('/', function(req, res) {
    console.log(dir + '/index.html');
    return res.sendfile(dir + '/index.html');
  });

  app.configure(function() {
    app.use("/node_modules", express.static(dir + '/node_modules'));
    app.use("/js", express.static(dir + '/js'));
    app.use("/libs", express.static(dir + '/libs'));
    return app.use("/sounds", express.static(dir + '/sounds'));
  });

  app.listen(8080);

  game = new Game();

}).call(this);
