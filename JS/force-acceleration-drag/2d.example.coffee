$ ->
  class Utils
    @distance = (from, to) -> Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
    @getAngle = (x, y) -> @mod (Math.atan2 y, x), @TWOPI
    @getComponent = (angle, length) -> [Math.cos(angle) * length, Math.sin(angle) * length]
    @degToRad = (deg) -> deg * (Math.PI / 180)
    @radToDeg = (rad) -> rad * (180 / Math.PI)
    @mod = (a, b) -> a % b + (if a < 0 then b else 0)
    @TWOPI = Math.PI * 2

  state =
    x: -1
    y: -1
    sx: 0
    sy: 0
    speed: 0
    angle: Utils.degToRad 0
    controlType: 'type1'

  cons =
    maxSpeed: 1
    acceleration: 0.001
    rotationSpeed: 0.3
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

  $("input[name=control]").click ->
    state.controlType = $(this).val()

  object = $("#object")
  container = $("#container")
  log1 = $("#log1")
  sizes =
    area:
      x: container.width()
      y: container.height()
    object:
      x: object.width()
      y: object.height()

  tickOneAxis = (speedKey, stateKey, direction, dt) ->
    objectSize = sizes.object[stateKey]
    arendSize = sizes.area[stateKey]

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

  tickOneAxis2 = (dt) ->
    rotationDeltaDeg = cons.rotationSpeed * keyStatus.horizontal() * dt
    state.angle = Utils.degToRad  Utils.radToDeg(state.angle) + rotationDeltaDeg

    state.speed += cons.acceleration * keyStatus.vertical() * dt
    if state.speed > cons.maxSpeed
      state.speed = cons.maxSpeed

    state.speed *= cons.friction
    if Math.abs(state.speed) < 0.009
      state.speed = 0

    [xd, yd] = Utils.getComponent state.angle, state.speed

    for [axis, delta] in [["x", xd], ["y", yd]]
      newState = state[axis] - dt * delta
      if newState < -1
        newState = sizes.area[axis] - 1

      if newState > sizes.area[axis] - sizes.object[axis] and delta < 0
        newState = -1

      state[axis] = newState

  stateLoop = (dt) ->
    if state.controlType is "type1"
      tickOneAxis "sx", "x", "horizontal", dt
      tickOneAxis "sy", "y", "vertical", dt
      state.angle = Utils.getAngle state.sx, state.sy
    else
      tickOneAxis2 dt

  uiLoop = ->
    object.css
      'left': state.x
      'top': state.y
      '-webkit-transform': "rotate(#{Utils.radToDeg state.angle}deg)"

  prevT = Date.now()
  makeLooper = (loopFunc) ->
    looper = (frameTime) ->
      t = frameTime - prevT
      loopFunc t
      prevT = frameTime
      requestAnimFrame looper

  stateLooper = makeLooper stateLoop
  uiLooper = makeLooper uiLoop

  stateLooper prevT
  uiLooper prevT