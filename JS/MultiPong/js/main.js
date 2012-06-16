(function() {
  var Canvas, Game, TWOPI, game, socket;

  TWOPI = Math.PI * 2;

  game = null;

  socket = io.connect('http://localhost:8080');

  $(function() {
    return game = new Game();
  });

  Game = (function() {

    function Game() {
      var _this = this;
      socket.on('connect', function() {
        console.log('connection event');
        socket.on('constants', function(_const) {
          var key, name, value, _ref;
          _this["const"] = _const;
          console.log('constants event');
          _ref = _this["const"];
          for (key in _ref) {
            value = _ref[key];
            Game[key] = value;
          }
          _this.canvas = new Canvas(_this);
          name = prompt("Specify your name or leave blank to not participate.");
          if (name) {
            socket.emit('addNewUser', name, function(name) {
              return $("#name").text(name);
            });
            return _this.canvas.el.bind("mousemove", function(e) {
              return socket.emit('userMoves', e.offsetX);
            });
          }
        });
        return socket.on('stateUpdate', function(state) {
          _this.state = state;
          if (_this.canvas) return _this.canvas.repaint();
        });
      });
    }

    return Game;

  })();

  Canvas = (function() {

    function Canvas(game) {
      this.game = game;
      this.prepare();
    }

    Canvas.prototype.prepare = function() {
      var _ref;
      this.el = $('#canvas');
      this.el.attr('width', Game.DIAMETER);
      this.el.attr('height', Game.DIAMETER);
      return this.context = (_ref = this.el[0]) != null ? typeof _ref.getContext === "function" ? _ref.getContext('2d') : void 0 : void 0;
    };

    Canvas.prototype.repaint = function() {
      var _this = this;
      return requestAnimFrame(function() {
        _this.state = _this.game.state;
        _this.clearAll();
        return _this.drawState();
      });
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
        this.context.lineWidth = Game.WALL_THICK;
        this.context.beginPath();
        this.context.moveTo(start.x, start.y);
        this.context.lineTo(end.x, end.y);
        this.context.closePath();
        this.context.stroke();
      }
      return this.context.lineWidth = 1;
    };

    Canvas.prototype.drawBall = function() {
      var x, y, _ref;
      this.context.fillStyle = 'red';
      this.context.beginPath();
      _ref = [this.state.ball.pos.x, this.state.ball.pos.y], x = _ref[0], y = _ref[1];
      this.context.moveTo(x, y);
      this.context.arc(x, y, Game.BALL_SIZE, 0, TWOPI, true);
      this.context.closePath();
      this.context.fill();
      return this.context.fillStyle = 'black';
    };

    return Canvas;

  })();

}).call(this);
