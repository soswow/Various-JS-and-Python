(function() {
  var Game, GameCanvas;

  $.ready(function() {
    var game;
    return game = new Game();
  });

  GameCanvas = (function() {

    function GameCanvas() {
      this.canvas = $("#canvas");
    }

    return GameCanvas;

  })();

  Game = (function() {

    function Game() {
      console.log("init");
    }

    Game.prototype.redraw = function() {};

    return Game;

  })();

}).call(this);
