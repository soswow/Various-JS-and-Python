$.ready ->
  game = new Game()

class GameCanvas
  constructor: ->
    @canvas = $("#canvas")

class Game
  constructor: ->
    console.log "init"

  redraw: ->

