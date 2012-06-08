W = 500
H = 500

#canvasSize =
#  width: 500
#  height: 500

$.ready ->
  console.log "ready"
  game = new Game()

class Canvas
  constructor: (game) ->
    @state = game.state
    @prepare()

  prepare: ->
    canvasHtml = $('#canvas')
    canvasHtml.attr 'width', W
    canvasHtml.attr 'height', H
    @context = canvasHtml?.getContext? '2d'

  repaint: ->
    #TODO


class State
  constructor: ->
    @initBall()
    @initPlayers()

  initBall: ->
    vectorXRnd = (Math.random() * 50) - 25;
    vectorYRnd = (Math.random() * 50) - 25;
    @ball = pos: xy(W/2, H/2), vector: xy(W / 2 + vectorXRnd, H / 2 + vectorYRnd)

  initPlayers: ->

  update: ->


class Game
  constructor: ->
    @state = new State(this)
    @canvas = new Canvas(this)
    @initHandlers()

  initHandlers: ->
    $('body').on "mousemove", (e) =>
      @state.update xy e.clientX, e.clientY

  refresh: ->

xy = (x,y) -> x:x, y:y