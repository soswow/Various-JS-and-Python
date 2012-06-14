#Ask for those constants from the server
DIAMETER = 500
RADIUS = DIAMETER / 2

WALL_THICK = 5
INIT_PLAYER_SIZE_PORTION = 0.2 #percent
HALF_WALL_THICK = WALL_THICK / 2
BALL_SIZE = 10 #diameter
SPEED_RANGE = [400, 600]
FPS = 60
SIDES = 6

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
    @state.addPlayer  new Player("somename", @state)
    @initHandlers()
    @canvas.repaint()

  initHandlers: ->
    @canvas.el.bind "mousemove", (e) =>
      @updateAndRepaint 0, e.offsetX

  updateAndRepaint: (timeLeft, clientX) ->
    @state.update timeLeft / 1000, clientX
    @canvas.repaint()

  startMainLoop: ->
    @reqInterval = requestInterval (=> @updateAndRepaint(1000 / FPS)), 1000 / FPS

  stopMainLoop: ->
    clearRequestInterval @reqInterval


class Canvas
  constructor: (game) ->
    @state = game.state
    @prepare()

  prepare: ->
    @el = $('#canvas')
    @el.attr 'width', DIAMETER
    @el.attr 'height', DIAMETER
    context = @context = @el[0]?.getContext? '2d'

    thickness = WALL_THICK
    State::draw = ->
      @arena.draw()
      @ball.draw()

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


class Ball
  constructor: (@state, @pos, @angle, @speed) ->
    unless @pos and @angle and @speed
      @randomInit()

  randomInit: ->
    @pos = xy  DIAMETER/2, DIAMETER/2
    @angle = utils.randomInRange  0, 360
    @speed = utils.randomInRange  SPEED_RANGE...
#    console.log 'Ball setup', @pos, @angle, @speed

  move: (time) ->
    newPos = @findNextPoint  time

    oldAngle = @angle
    intPoint = null
    for wall in @state.arena.solidWalls
      intPoint = utils.lineIntersections  @pos, newPos, wall...
      if intPoint
        anglBet = utils.radToDeg  utils.angleBetweenLines  @pos, newPos, wall...
        @angle += anglBet * 2
        @angle %= 360
        break

    unless intPoint
      @pos = newPos
#      console.log "No problem, new pos: #{@pos.x} - #{@pos.y}"
    else
      @pos = intPoint
      @pos = @findNextPoint  time
#      console.log "Intersection. New point pos: #{@pos.x} - #{@pos.y} angles #{oldAngle} -> #{@angle}"
#      @move  time

    isInside = _.all(
      for wall in @state.arena.areaWalls
        [x0,y0,x1,y1,x,y] = utils.unfoldPoints  wall[0], wall[1], @pos
        (y - y0) * (x1 - x0) - (x - x0) * (y1 - y0) < 0
      , _.identity)
    return intPoint or isInside

  findNextPoint: (time) ->
    distance = @speed * time
    radians = utils.degToRad(@angle)
    deltaY = Math.sin(radians) * distance
    deltaX = Math.cos(radians) * distance
    x = @pos.x + deltaX
    y = @pos.y - deltaY
    return xy x, y


class State
  constructor: ->
    @ball = new Ball(this)
    @players = (null for i in [1..SIDES])
    @arena = new Arena(RADIUS, this)
#    @prevBalls = []

  addPlayer: (newPlayer) ->
    #Find slot in array and put into first free
    #Assign it's side accordint to slot
    newIndex = @players.length #push new one if not found slot
    for player, i in @players
      unless player
        newIndex = i
        break

    newPlayer.side = newIndex
    @players[i] = newPlayer
    @arena.updateSolidWalls()

    return newPlayer

  update: (timeleft, clientX) ->
    if clientX
      @players[0].move  clientX
      @arena.updateSolidWalls()
    if timeleft
#      @prevBalls.push  new Ball(@ball.pos, @ball.angle, @ball.speed)
#      if @prevBalls.length > 15
#        @prevBalls.shift()
      unless @ball.move  timeleft
        game.state.ball.randomInit()


class Player
  constructor: (@name, @state) ->
    @side = 0
    @sideLength = @state.arena.getFullWallLength()
    @size = INIT_PLAYER_SIZE_PORTION * @sideLength
    @centerPos = 0.5 #center point position in percents
    @updateSegment()

  move: (clientX) ->
    @updateCenterPosition  clientX
    @updateSegment()

  updateCenterPosition: (clientX) ->
    clientX -= @state.arena.areaWalls[0][0].x + @size / 2
    @centerPos = clientX / (@sideLength - @size)
    @centerPos = 1 if @centerPos > 1
    @centerPos = 0 if @centerPos < 0

  updateSegment: ->
    centerPx = @centerPos * (@sideLength - @size)
    segmentStart = centerPx / @sideLength
    segmentEnd = (centerPx+@size) / @sideLength
    @segment = seg  segmentStart, segmentEnd


class Arena
  constructor: (@radius, @state) ->
    @players = @state.players
    @solidWalls = @areaWalls = @updateAreaWalls()

  updateSolidWalls: ->
    unless @players.length is @portions.length
      @updateAreaWalls()
    else
      @updatePortions()

    @solidWalls =
      for [start, end], i in @areaWalls
        {start: startPortion, end: endPortion} = @portions[i]
        xd = end.x - start.x
        yd = end.y - start.y
        start = xy  start.x + xd * startPortion, start.y + yd * startPortion
        end = xy  end.x - xd * (1-endPortion), end.y - yd * (1-endPortion)
        [start, end]

  updateAreaWalls: ->
    @updatePortions()
    @updateCorners()
    @areaWalls = ([@corners[i-1..i-1][0], corner] for corner, i in @corners)

  updatePortions: ->
    @portions = _.map  @players, (p) -> if p then p.segment else seg(0, 1)

  getFullWallLength: -> utils.distance  @areaWalls[0]...

  updateCorners: ->
    sidesNum = @portions.length
    center = xy  @radius, @radius
    sectorAngle = 360 / sidesNum
    angle = 270 - sectorAngle / 2
    @corners =
      for sideIndex in [0..sidesNum-1]
        angle += sectorAngle
        utils.radialMove  center, @radius, angle


#TODO Better name is range
class Segment
  constructor: (@start, @end) ->


xy = utils.xy
seg = (vars...) -> new Segment(vars...)