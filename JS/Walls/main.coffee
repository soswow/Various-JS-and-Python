DIAMETER = 500
RADIUS = DIAMETER / 2
WALL_THICK = 5
BALL_SIZE = 10 #diameter
SIDES = 4
FPS = 60
SPEED_RANGE = [400, 600]
TWOPI = Math.PI * 2

xy = utils.xy

$ ->
  game = new Game()

  $("#sides").bind  'change', ->
    SIDES = parseInt  @value, 10
    game.state.arena.updateAreaWalls()

  $("#button").bind 'click', ->
    if @innerHTML is 'Start'
      game.startMainLoop()
      @innerHTML = 'Stop'
    else
      game.stopMainLoop()
      @innerHTML = 'Start'


class Game
  constructor: ->
    @state = new State()
    @canvas = new Canvas(this)
    @canvas.repaint()

  updateAndRepaint: (timeLeft) ->
    @state.update timeLeft / 1000
    @canvas.repaint()

  startMainLoop: ->
    @reqInterval = requestInterval (=> @updateAndRepaint(1000 / FPS)), 1000 / FPS

  stopMainLoop: ->
    clearRequestInterval @reqInterval


class State
  constructor: ->
    @ball = new Ball(this)
    @arena = new Arena(RADIUS, this)

  update: (timeleft) ->
    if timeleft
      unless @ball.move  timeleft
        game.state.ball.randomInit()


class Ball
  constructor: (@state, @pos, @angle, @speed) ->
    unless @pos and @angle and @speed
      @randomInit()

  randomInit: ->
    @pos = xy  DIAMETER/2, DIAMETER/2
    @angle = utils.randomInRange  0, 360
    @speed = utils.randomInRange  SPEED_RANGE...

  move: (time) ->
    newPos = @findNextPoint  time

    oldAngle = @angle
    [intPoint, @angle] = @findIntersectionPoint newPos

    unless intPoint
      @pos = newPos
    else
      @pos = @findNextPoint  time
      isInside = @isPointInside()

      k = 0
      loop
        break if isInside or k++ > 100
        @pos = intPoint
        @angle = utils.randomInRange  0, 360
        @pos = @findNextPoint  time
        isInside = @isPointInside()

    return @isPointInside()

  isPointInside: (point = @pos) ->
    pointIsOnTheLeftOfLine = (line) ->
      [x0,y0,x1,y1,x,y] = utils.unfoldPoints  line[0], line[1], point
      (y - y0) * (x1 - x0) - (x - x0) * (y1 - y0) <= 0

    _.all(
      pointIsOnTheLeftOfLine(wall) for wall in @state.arena.areaWalls
      , _.identity)

  findIntersectionPoint: (nextPoint) ->
    intPoint = null
    newAngle = @angle
    for wall in @state.arena.solidWalls
      intPoint = utils.lineIntersections  @pos, nextPoint, wall...
      if intPoint
        anglBet = utils.radToDeg  utils.angleBetweenLines  @pos, nextPoint, wall...
        newAngle += anglBet * 2
        break
    return [intPoint, newAngle]

  findNextPoint: (time, angle = @angle, pos = @pos) ->
    utils.radialMove pos, @speed * time, angle


class Arena
  constructor: (@radius, @state) ->
    @solidWalls = @areaWalls = @updateAreaWalls()

  updateAreaWalls: ->
    @updateCorners()
    @solidWalls = @areaWalls = ([@corners[i-1..i-1][0], corner] for corner, i in @corners)

  updateCorners: ->
    sidesNum = SIDES
    center = xy  @radius, @radius
    sectorAngle = 360 / sidesNum
    angle = 270 - sectorAngle / 2
    @corners =
      for sideIndex in [0..sidesNum-1]
        angle += sectorAngle
        utils.radialMove  center, @radius, angle


class Canvas
  constructor: (game) ->
    @state = game.state
    @prepare()

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', DIAMETER
    @el.attr 'height', DIAMETER
    context = @context = @el.get(0)?.getContext? '2d'

    thickness = WALL_THICK

    State::draw = ->
      @ball.draw()
      @arena.draw()

    Arena::draw = ->
      for [start, end], i in @solidWalls
        context.lineWidth = thickness
        context.beginPath()
        context.moveTo start.x, start.y
        context.lineTo end.x, end.y
        context.closePath()
        context.stroke()
      context.lineWidth = 1

    Ball::draw = ->
      context.fillStyle = 'red'
      context.beginPath()
      [x,y] = [@pos.x, @pos.y]
      context.moveTo x, y
      context.arc x, y, BALL_SIZE, 0, TWOPI, true
      context.closePath()
      context.fill()
      context.fillStyle = 'black'

  repaint: ->
    @clearAll()
    @state.draw()

  clearAll: ->
    @el.attr 'width', DIAMETER

