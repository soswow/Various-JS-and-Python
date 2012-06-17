io = require  'socket.io'
express = require  'express'

_ = require('underscore')._
utils = require('./utils').utils
xy = utils.xy

#Ask for those constants from the server
DIAMETER = 500
RADIUS = DIAMETER / 2
WALL_THICK = 5
INIT_PLAYER_SIZE_PORTION = 0.3 #percent
HALF_WALL_THICK = WALL_THICK / 2
BALL_SIZE = 10 #diameter
SPEED_RANGE = [200, 400]
FPS = 60
SIDES = 6

TWOPI = Math.PI * 2


class Game
  constructor: ->
    @state = state = new State()

    @startMainLoop()

    io.sockets.on  'connection', (socket) ->
      ID = Math.round  Math.random() * 10000000

      console.log  "Connection recieved. ID: #{ID}"

      socket.emit  'constants',
        DIAMETER: DIAMETER
        RADIUS: RADIUS
        WALL_THICK: WALL_THICK
        BALL_SIZE: BALL_SIZE

      socket.on  'addNewUser', (name, cb) ->
        console.log  "User with ID:#{ID} got name -> #{name}"
        player = new Player(name, ID, state)
        socket.set  'name', name, -> cb name:"#{name} (#{ID})", side:player.side

      socket.on  'userMoves', (clientX) =>
        state.update 0, clientX, ID

      disconnectUser = ->
        socket.get  'name', (err, name) ->
          state.removePlayer ID
          console.log "#{name} (#{ID}) disconnected"
      socket.on  'disconnect', disconnectUser
      socket.on  'user disconnect', disconnectUser

  updateAndSend: (timeLeft, clientX) ->
    @state.update timeLeft / 1000, clientX
    io.sockets.volatile.emit  'stateUpdate', @state.serialize()

  startMainLoop: ->
    @reqInterval = setInterval  (=> @updateAndSend(1000 / FPS)), 1000 / FPS

#  stopMainLoop: ->
#    clearRequestInterval @reqInterval


class State
  constructor: ->
    @ball = new Ball(this)
    @players = (null for i in [1..SIDES])
    @playersIdMap = {}
    @arena = new Arena(RADIUS, this)

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
    @playersIdMap[newPlayer.id] = i
    @arena.updateSolidWalls()

    return newPlayer

  removePlayer: (id) ->
    i = @playersIdMap[id]
    @players[i] = null
    delete @playersIdMap[id]
    @arena.updateSolidWalls()

  update: (timeleft, clientX, ID) ->
    player = @players[@playersIdMap[ID]]
    if clientX and player
      player.move  clientX
      @arena.updateSolidWalls()

    if timeleft
      unless @ball.move  timeleft
        game.state.ball.randomInit()

  serialize: (perspectivePlayerId) ->
    ball: @ball?.serialize()
    arena: @arena?.serialize()
    players: _.map(@players, (p) -> p?.serialize())


class Ball
  constructor: (@state, @pos, @angle, @speed) ->
    unless @pos and @angle and @speed
      @randomInit()

  randomInit: ->
    @pos = xy  DIAMETER/2, DIAMETER/2
    @angle = utils.randomInRange  0, 360
    @acceleration = 2 #pixels per sec ** 2

    @normalSpeed = utils.randomInRange  SPEED_RANGE...
    @speed = @normalSpeed
    @kickSpeed = @normalSpeed * 0.4
    @maxSpeed = @normalSpeed * 4

  move: (time) ->
    if @speed >= @maxSpeed
      @acceleration = -2

    if @speed < @normalSpeed and @acceleration < 0
      @acceleration = -0.05

    @speed += @acceleration * (time * 1000)
    newPos = @findNextPoint  time

    oldAngle = @angle
    [intPoint, @angle] = @findIntersectionPoint newPos

    unless intPoint
      @pos = newPos
    else
      io.sockets.volatile.emit  'kick!'
      @speed += utils.randomGauss  @kickSpeed, 30
      @acceleration = -1

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

  isPointInside: (point=@pos) ->
    pointOnTheLeftOfLine = (line) ->
      [x0,y0,x1,y1,x,y] = utils.unfoldPoints  line[0], line[1], point
      (y - y0) * (x1 - x0) - (x - x0) * (y1 - y0) <= 0

    _.all(
      pointOnTheLeftOfLine(wall) for wall in @state.arena.areaWalls
      , _.identity)

  findIntersectionPoint: (nextPoint) ->
    intPoint = null
    newAngle = @angle
    for wall in @state.arena.solidWalls
      intPoint = utils.lineIntersections  @pos, nextPoint, wall...
      if intPoint
        anglBet = utils.radToDeg  utils.angleBetweenLines  @pos, nextPoint, wall...
        newAngle += anglBet * 2

        randomness = utils.randomGauss  0, anglBet * 0.1
        newAngle += randomness

        break
    return [intPoint, newAngle]

  findNextPoint: (time, angle=@angle, pos=@pos) ->
    utils.radialMove pos, @speed * time, angle

  serialize: ->
    pos: @pos
    speed: @speed
    angle: @angle


class Player
  constructor: (@name, @id, @state) ->
    @side = 0
    @sideLength = @state.arena.getFullWallLength()
    @size = INIT_PLAYER_SIZE_PORTION * @sideLength
    @centerPos = 0.5 #center point position in percents
    @updateSegment()
    @state.addPlayer  this

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
    segmentEnd = (centerPx + @size) / @sideLength
    @segment = seg  segmentStart, segmentEnd

  serialize: ->
    id: @id
    name: @name
    size: @size
    side: @side


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

  serialize: ->
    solidWalls: @solidWalls
    areaWalls: @areaWalls



#TODO Better name is range
class Segment
  constructor: (@start, @end) ->


seg = (vars...) -> new Segment(vars...)



app = express.createServer()
io = io.listen  app

dir = __dirname.replace /\/js$/, ''

app.get  '/', (req, res) ->
  console.log dir + '/index.html'
  res.sendfile  dir + '/index.html'

app.configure  ->
  app.use  "/node_modules", express.static  dir + '/node_modules'
  app.use  "/js", express.static  dir + '/js'
  app.use  "/libs", express.static  dir + '/libs'
  app.use  "/sounds", express.static  dir + '/sounds'

app.listen  8080

game = new Game()


