#Ask for those constants from the server
INNER_SIDE = 500
WALL_THICK = 5
SIDE = INNER_SIDE + WALL_THICK * 2
INIT_PLAYER_SIZE = 0.1 * INNER_SIDE
HALF_WALL_THICK = WALL_THICK / 2

$ ->
  console.log "ready"
  game = new Game()
  $("#button").bind 'click', -> game.initMainLoop()

class Game
  constructor: ->
    console.log "constructor"
    @state = new State()
    @canvas = new Canvas(this)
    @state.addPlayer(new Player())
    @initHandlers()
    @canvas.repaint()

  initHandlers: ->
    @canvas.el.bind "mousemove", (e) =>
      @updateAndRepaint 0, e.offsetX

  updateAndRepaint: (timeLeft, clientX) ->
    @state.update timeLeft, clientX
    @canvas.repaint()

  initMainLoop: ->
    console.log "initMainLoop"
    shouldStop = false
    requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or
                            window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
    prevTimestamp = null
    step = (timestamp) =>
      prevTimestamp ?= timestamp
      unless shouldStop
        @updateAndRepaint timestamp - prevTimestamp
        requestAnimationFrame step
      prevTimestamp = timestamp
    requestAnimationFrame step


class Canvas
  constructor: (game) ->
    @state = game.state
    @prepare()

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', SIDE
    @el.attr 'height', SIDE
    @context = @el[0]?.getContext? '2d'
    console.log @context

  repaint: ->
    @clearAll()
    @drawWalls()
    @drawBall()

  clearAll: ->
    @el.attr 'width', SIDE

  drawWalls: ->
    for [from, to] in @state.walls()
      console.log from+"", to+""
      @context.lineWidth = WALL_THICK
      @context.beginPath()
      @context.moveTo from.x, from.y
      @context.lineTo to.x, to.y
      @context.closePath()
      @context.stroke()
      @context.lineWidth = 1

  drawBall: ->
    #TODO


class Ball
  constructor: (@pos, @angle, @speed) ->
    unless @pos and @angle and @speed
      @randomInit()

  randomInit: ->
    @pos = xy SIDE/2, SIDE/2
    @angle = randomInRange 0, 360
    @speed = randomInRange 5, 10

  move: (walls) ->
    #TODO

class State
  @playerIndexSideMap: ['bottom', 'top', 'right', 'left']

  constructor: ->
    @ball = new Ball()
    @players = (null for a in [1..4])

  walls: ->
    #Return all walls from current state:
    # - active Player platforms
    # - walls on place of inactive players
    #TODO Identify what is wall and what is player
    console.log "walls"
    for side, i in State.playerIndexSideMap
      [wallStart, wallEnd] =
        if @players[i]
          @players[i].getWallPosition()
        else
          switch side
            when 'bottom' then [xy(0, SIDE-HALF_WALL_THICK), xy(SIDE, SIDE-HALF_WALL_THICK)]
            when 'top'    then [xy(0, HALF_WALL_THICK), xy(SIDE, HALF_WALL_THICK)]
            when 'right'  then [xy(SIDE-HALF_WALL_THICK, 0), xy(SIDE-HALF_WALL_THICK, SIDE)]
            when 'left'   then [xy(HALF_WALL_THICK, 0), xy(HALF_WALL_THICK, SIDE)]
            else [xy(0,0), xy(0,0)]

  addPlayer: (newPlayer) ->
    #Find slot in array and put into first free
    #Assign it's side accordint to slot
    for player, i in @players
      unless player
        newPlayer.side = State.playerIndexSideMap[i]
        return @players[i] = newPlayer

  update: (timeleft, clientX) ->
#    console.log timeleft
    if clientX
      @players[0].move clientX

class Player
  constructor: (@name) ->
    @side = State.playerIndexSideMap[0]
    @size = INIT_PLAYER_SIZE
    @pos = 0.5 #center point position in percents

  getWallPosition: ->
    #Return pair of points: start & end of the wall
    wallCenter = (INNER_SIDE - @size) * @pos
    [from, to] = [wallCenter+WALL_THICK, wallCenter + @size + WALL_THICK]
    console.log this, wallCenter, from, to
    switch @side
      when 'bottom' then [xy(from, SIDE-HALF_WALL_THICK), xy(to, SIDE-HALF_WALL_THICK)]
      when 'top'    then [xy(from, HALF_WALL_THICK), xy(to, HALF_WALL_THICK)]
      when 'right'  then [xy(SIDE-HALF_WALL_THICK, from), xy(SIDE-HALF_WALL_THICK, to)]
      when 'left'   then [xy(HALF_WALL_THICK, from), xy(HALF_WALL_THICK, to)]

  move: (clientX) ->
    clientX -= @size / 2
    @pos = clientX / (INNER_SIDE - @size)
    @pos = 1 if @pos > 1
    @pos = 0 if @pos < 0


randomInRange = (from, to) -> Math.random() * (to - from) + from;
degToRad = (deg) -> deg * (Math.PI / 180)

xy = (x, y) -> new Point(x, y)
class Point
  constructor: (@x, @y) ->
#  shifted: ->
#    new Point(@x + W)
  toString: -> "(#{@x}, #{@y})"