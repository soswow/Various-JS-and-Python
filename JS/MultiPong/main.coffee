#Ask for those constants from the server
INNER_SIDE = 500
WALL_THICK = 5
SIDE = INNER_SIDE + WALL_THICK * 2
INIT_PLAYER_SIZE = 0.2 * INNER_SIDE
HALF_WALL_THICK = WALL_THICK / 2
BALL_SIZE = 10 #diameter
SPEED_RANGE = [400, 600]
FPS = 60

TWOPI = Math.PI * 2

game = null

$ ->
  console.log "ready"
  game = new Game()
  $("#button").bind 'click', ->
    if @innerHTML is 'Start'
      game.startMainLoop()
      @innerHTML = 'Stop'
    else
      game.stopMainLoop()
      @innerHTML = 'Start'


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
    @state.update timeLeft / 1000, clientX
    @canvas.repaint()

  startMainLoop: ->
#    console.log "startMainLoop"
    @reqInterval = requestInterval (=> @updateAndRepaint(1000 / FPS)), 1000 / FPS

  stopMainLoop: ->
    clearRequestInterval @reqInterval


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
    @drawPrevBalls()

  clearAll: ->
    @el.attr 'width', SIDE

  drawWalls: ->
    for [from, to] in @state.walls()
#      console.log from+"", to+""
      @context.lineWidth = WALL_THICK
      @context.beginPath()
      @context.moveTo from.x, from.y
      @context.lineTo to.x, to.y
      @context.closePath()
      @context.stroke()
      @context.lineWidth = 1

  drawBall: ->
    [x,y] = [@state.ball.pos.x, @state.ball.pos.y]
    @context.fillStyle = 'red'
    @context.beginPath()
    @context.moveTo x, y
    @context.arc x, y, BALL_SIZE, 0, TWOPI, true
    @context.closePath()
    @context.fill()
    @context.fillStyle = 'black'

  drawPrevBalls: ->
    for ball, i in @state.prevBalls
      [x,y] = [ball.pos.x, ball.pos.y]
      portion = i / @state.prevBalls.length
      size = BALL_SIZE * portion
      @context.fillStyle = "rgba(255, 0, 0, #{Math.pow(portion, 4)})"
      @context.beginPath()
      @context.moveTo x + size, y
      @context.arc x, y, size, 0, TWOPI, true
      @context.closePath()
      @context.fill()
      @context.fillStyle = 'black'


class Ball
  constructor: (@pos, @angle, @speed) ->
    unless @pos and @angle and @speed
      @randomInit()

  randomInit: ->
    @pos = xy SIDE/2, SIDE/2
    @angle = utils.randomInRange 0, 360
    @speed = utils.randomInRange SPEED_RANGE[0], SPEED_RANGE[1]
#    console.log 'Ball setup', @pos, @angle, @speed

  move: (time, walls) ->
    newPos = @findNextPoint time
    intPoint = null
    for wall in walls
      unless intPoint
        intPoint = utils.lineIntersections(@pos, newPos, wall[0], wall[1])
        if intPoint
          anglBet = utils.radToDeg utils.angleBetweenLines @pos, newPos, wall[0], wall[1]
          @angle += anglBet * 2
    unless intPoint
      @pos = newPos

    return 0 < @pos.x < SIDE and 0 < @pos.y < SIDE

  findNextPoint: (time) ->
    distance = @speed * time
    radians = utils.degToRad(@angle)
    deltaY = Math.sin(radians) * distance
    deltaX = Math.cos(radians) * distance
    x = @pos.x + deltaX
    y = @pos.y - deltaY
    return xy x, y


class State
  @playerIndexSideMap: ['bottom', 'top', 'right', 'left']

  constructor: ->
    @ball = new Ball()
    @prevBalls = []
    @players = (null for a in [1..4])

  walls: ->
    #Return all walls from current state:
    # - active Player platforms
    # - walls on place of inactive players
    #TODO Identify what is wall and what is player
    #console.log "walls"

#    for side, i in State.playerIndexSideMap
#      [wallStart, wallEnd] =
#        if @players[i]
#          @players[i].getWallPosition()
#        else
#          switch side
#            when 'bottom' then [xy(0, SIDE-HALF_WALL_THICK), xy(SIDE, SIDE-HALF_WALL_THICK)]
#            when 'top'    then [xy(0, HALF_WALL_THICK), xy(SIDE, HALF_WALL_THICK)]
#            when 'right'  then [xy(SIDE-HALF_WALL_THICK, 0), xy(SIDE-HALF_WALL_THICK, SIDE)]
#            when 'left'   then [xy(HALF_WALL_THICK, 0), xy(HALF_WALL_THICK, SIDE)]

  addPlayer: (newPlayer) ->
    #Find slot in array and put into first free
    #Assign it's side accordint to slot
    for player, i in @players
      unless player
        newPlayer.side = State.playerIndexSideMap[i]
        return @players[i] = newPlayer

  update: (timeleft, clientX) ->
    if clientX
      @players[0].move clientX
    if timeleft
      @prevBalls.push new Ball(@ball.pos, @ball.angle, @ball.speed)
      if @prevBalls.length > 15
        @prevBalls.shift()
      unless @ball.move timeleft, @walls()
        game.state.ball.randomInit()


class Player
  constructor: (@name) ->
    @side = State.playerIndexSideMap[0]
    @size = INIT_PLAYER_SIZE
    @pos = 0.5 #center point position in percents

#  getWallPosition: ->
#    #Return pair of points: start & end of the wall
#    wallCenter = (INNER_SIDE - @size) * @pos
#    [from, to] = [wallCenter+WALL_THICK, wallCenter + @size + WALL_THICK]
#    #console.log this, wallCenter, from, to
#    switch @side
#      when 'bottom' then [xy(from, SIDE-HALF_WALL_THICK), xy(to, SIDE-HALF_WALL_THICK)]
#      when 'top'    then [xy(from, HALF_WALL_THICK), xy(to, HALF_WALL_THICK)]
#      when 'right'  then [xy(SIDE-HALF_WALL_THICK, from), xy(SIDE-HALF_WALL_THICK, to)]
#      when 'left'   then [xy(HALF_WALL_THICK, from), xy(HALF_WALL_THICK, to)]

  move: (clientX) ->
    clientX -= @size / 2
    @pos = clientX / (INNER_SIDE - @size)
    @pos = 1 if @pos > 1
    @pos = 0 if @pos < 0

xy = utils.xy