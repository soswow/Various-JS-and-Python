$ ->
  class Utils
    @distance = (from, to) -> Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
    @getAngle = (x, y) -> @mod (Math.atan2 y, x), @TWOPI
    @degToRad = (deg) -> deg * (Math.PI / 180)
    @radToDeg = (rad) -> rad * (180 / Math.PI)
    @mod = (a, b) -> a % b + (if a < 0 then b else 0)
    @TWOPI = Math.PI * 2

  state =
    x: -1
    y: -1
    sx: 0
    sy: 0

  cons =
    maxSpeed: 1
    acceleration: 0.001
    friction: 0.98

  keyStatus =
    left: false
    right: false
    up: false
    down: false
    horizontal: ->
      if this.left is this.right
        return 0
      else if this.left
        return -1
      else
        return 1
    vertical: ->
      if this.up is this.down
        return 0
      else if this.up
        return -1
      else
        return 1

  $(document).on 'keyup keydown', (e) ->
    if e.keyCode is 37
      keyStatus.left = e.type is 'keydown'
    else if e.keyCode is 39
      keyStatus.right = e.type is 'keydown'
    else if e.keyCode is 38
      keyStatus.up = e.type is 'keydown'
    else if e.keyCode is 40
      keyStatus.down = e.type is 'keydown'

  object = $("#object")
  container = $("#container")
  log1 = $("#log1")
  containerWidth = container.width()
  objectWidth = object.width()
  containerHeight = container.height()
  objectHeight = object.width()

  tickOneAxis = (speedKey, stateKey, direction, dt, objectSize, arendSize) ->
    state[speedKey] += cons.acceleration * keyStatus[direction]() * dt
    if state[speedKey] > cons.maxSpeed
      state[speedKey] = cons.maxSpeed

    state[speedKey] *= cons.friction
    if Math.abs(state[speedKey]) < 0.009
      state[speedKey] = 0

    newState = state[stateKey] + dt * state[speedKey]
    if newState < -1
      newState = arendSize - 1

    if newState > arendSize - objectSize and state[speedKey] > 0
      newState = -1

    state[stateKey] = newState

  stateLoop = (dt) ->
    tickOneAxis "sx", "x", "horizontal", dt, objectWidth, containerWidth
    tickOneAxis "sy", "y", "vertical", dt, objectHeight, containerHeight

  uiLoop = ->
    angle = Utils.radToDeg Utils.getAngle state.sx, state.sy
    object.css
      'left': state.x
      'top': state.y
      '-webkit-transform': "rotate(#{angle}deg)"

  prevT = Date.now()
  makeLooper = (loopFunc) ->
    looper = (frameTime) ->
      t = frameTime - prevT
      #      log1.html prevT
      loopFunc t
      prevT = frameTime
      requestAnimFrame looper

  stateLooper = makeLooper stateLoop
  uiLooper = makeLooper uiLoop

  stateLooper prevT
  uiLooper prevT