(function() {
  var Canvas, Game, TWOPI, game, socket, xy;

  TWOPI = Math.PI * 2;

  game = null;

  socket = io.connect();

  xy = utils.xy;

  $(function() {
    var joinObj, nameObj, quiteObj;
    game = new Game();
    joinObj = $("#join");
    quiteObj = $("#quite");
    nameObj = $("#name");
    joinObj.bind("click", function() {
      var name,
        _this = this;
      name = prompt("Specify your name or leave blank to not participate.");
      if (name) {
        socket.emit('addNewUser', name, function(_arg) {
          var name, side;
          name = _arg.name, side = _arg.side;
          nameObj.text("" + name + " side=" + side);
          game.name = name;
          return game.side = side;
        });
        game.canvas.el.bind("mousemove", function(e) {
          var pos;
          pos = e.offsetX || (e.pageX - utils.findPos(game.canvas.el[0]).x);
          return socket.emit('userMoves', pos);
        });
      }
      $(this).attr('disabled', 'disable');
      return quiteObj.removeAttr('disabled');
    });
    return quiteObj.bind('click', function() {
      socket.emit('user disconnect');
      $(this).attr('disabled', 'disable');
      joinObj.removeAttr('disabled');
      return nameObj.text("");
    });
  });

  Game = (function() {

    function Game() {
      var _this = this;
      this.side = 0;
      socket.on('connect', function() {
        socket.on('constants', function(_const) {
          var key, value, _ref;
          _this["const"] = _const;
          _ref = _this["const"];
          for (key in _ref) {
            value = _ref[key];
            Game[key] = value;
          }
          return _this.canvas = new Canvas(_this);
        });
        socket.on('stateUpdate', function(state) {
          _this.state = state;
          if (_this.canvas) return _this.canvas.repaint();
        });
        return _this.initSounds();
      });
    }

    Game.prototype.initSounds = function() {
      var kickAudioObj, len, playSound, playingAudio, soundsObj, wallSounds;
      playingAudio = 0;
      soundsObj = $("#sounds");
      kickAudioObj = $("#kickSounds audio");
      wallSounds = $("#wallSounds audio");
      len = kickAudioObj.length;
      playSound = function(event) {
        var obj;
        if (soundsObj.attr("checked")) {
          if (playingAudio + 1 > len) playingAudio = 0;
          obj = event === 'kick!' ? kickAudioObj : wallSounds;
          console.log(event);
          obj.get(playingAudio).play();
          return playingAudio += 1;
        }
      };
      socket.on('kick!', function() {
        return playSound('kick!');
      });
      return socket.on('wall!', function() {
        return playSound('wall!');
      });
    };

    return Game;

  })();

  Canvas = (function() {

    function Canvas(game) {
      var done;
      this.game = game;
      this.prepare();
      this.prevIsFinished = true;
      done = false;
    }

    Canvas.prototype.rotate = function(point) {
      var angle, centerPoint, ownSide, radius, segmentAngle, totalSides;
      ownSide = this.game.side;
      totalSides = this.game.state.players.length;
      radius = Game.DIAMETER / 2;
      centerPoint = xy(radius, radius);
      segmentAngle = 360 / totalSides;
      angle = -1 * ownSide * segmentAngle;
      return utils.radialOriginMove(centerPoint, point, angle, this.done);
    };

    Canvas.prototype.prepare = function() {
      var _ref;
      this.el = $('#canvas');
      this.el.attr('width', Game.DIAMETER);
      this.el.attr('height', Game.DIAMETER);
      return this.context = (_ref = this.el[0]) != null ? typeof _ref.getContext === "function" ? _ref.getContext('2d') : void 0 : void 0;
    };

    Canvas.prototype.repaint = function() {
      var _this = this;
      if (this.prevIsFinished) {
        this.prevIsFinished = false;
        return requestAnimFrame(function() {
          _this.state = _this.game.state;
          _this.clearAll();
          _this.drawState();
          return _this.prevIsFinished = true;
        });
      }
    };

    Canvas.prototype.clearAll = function() {
      return this.el.attr('width', Game.DIAMETER);
    };

    Canvas.prototype.drawState = function() {
      this.drawArena();
      return this.drawBall();
    };

    Canvas.prototype.drawArena = function() {
      var end, i, start, _len, _ref, _ref2;
      _ref = this.state.arena.solidWalls;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        _ref2 = _ref[i], start = _ref2[0], end = _ref2[1];
        start = this.rotate(start);
        end = this.rotate(end);
        this.context.lineWidth = Game.WALL_THICK;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.closePath();
        this.context.stroke();
      }
      this.done = true;
      return this.context.lineWidth = 1;
    };

    Canvas.prototype.drawBall = function() {
      var pos, x, y, _ref;
      this.context.fillStyle = 'red';
      this.context.beginPath();
      pos = this.rotate(this.state.ball.pos);
      _ref = [pos.x, pos.y], x = _ref[0], y = _ref[1];
      this.context.moveTo(x, y);
      this.context.arc(x, y, Game.BALL_SIZE, 0, TWOPI, true);
      this.context.closePath();
      this.context.fill();
      return this.context.fillStyle = 'black';
    };

    return Canvas;

  })();

}).call(this);
