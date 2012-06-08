(function() {
  var Canvas, Game, H, State, W, xy;

  W = 500;

  H = 500;

  $.ready(function() {
    var game;
    console.log("ready");
    return game = new Game();
  });

  Canvas = (function() {

    function Canvas(game) {
      this.state = game.state;
      this.prepare();
    }

    Canvas.prototype.prepare = function() {
      var canvasHtml;
      canvasHtml = $('#canvas');
      canvasHtml.attr('width', W);
      canvasHtml.attr('height', H);
      return this.context = canvasHtml != null ? typeof canvasHtml.getContext === "function" ? canvasHtml.getContext('2d') : void 0 : void 0;
    };

    Canvas.prototype.repaint = function() {};

    return Canvas;

  })();

  State = (function() {

    function State() {
      this.initBall();
      this.initPlayers();
    }

    State.prototype.initBall = function() {
      var vectorXRnd, vectorYRnd;
      vectorXRnd = (Math.random() * 50) - 25;
      vectorYRnd = (Math.random() * 50) - 25;
      return this.ball = {
        pos: xy(W / 2, H / 2),
        vector: xy(W / 2 + vectorXRnd, H / 2 + vectorYRnd)
      };
    };

    State.prototype.initPlayers = function() {};

    State.prototype.update = function() {};

    return State;

  })();

  Game = (function() {

    function Game() {
      this.state = new State(this);
      this.canvas = new Canvas(this);
      this.initHandlers();
    }

    Game.prototype.initHandlers = function() {
      var _this = this;
      return $('body').on("mousemove", function(e) {
        return _this.state.update(xy(e.clientX, e.clientY));
      });
    };

    Game.prototype.refresh = function() {};

    return Game;

  })();

  xy = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

}).call(this);
