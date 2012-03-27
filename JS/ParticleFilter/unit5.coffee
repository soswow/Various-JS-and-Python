ctx = {}
canvases = {}
width = 800
height = 500

world = null
$ ->
  $('#canvasContainer canvas').each ->
    that = $(@)
    gridDiv = $('#grid')
    @width = width
    @height = height
    that.css 'width', width
    that.css 'height', height
    gridDiv.css 'width', width
    gridDiv.css 'height', height

    ctx_id = that.attr('id').split("_")[1]
    canvases[ctx_id] = @
    ctx[ctx_id] = @getContext? '2d'
    ctx[ctx_id].clearRect 0, 0, width, height

  $('#canvasContainer')
  .mousemove (e) ->
    isOverNode = world.hover e.offsetX, e.offsetY
    $(@).toggleClass "hovered", isOverNode
  .mousedown (e) ->
    isNodeSelected = world.selectNodeAt e.offsetX, e.offsetY
    world.moveNode = isNodeSelected
  .mouseup (e) ->
    unless world.moveNode
      world.addPoint e.offsetX, e.offsetY
    world.moveNode = false

  $(document).keydown (e) ->
    if e.keyCode is 46
      world.deleteSelectedNode()

  world = new World(width, height).draw()
  world.addPoint 200, 100
  world.addPoint 400, 100
  world.addPoint 220, 300

  robot = new Robot()
  robot.set world.points[1].x+50, world.points[1].y, TWOPI
  robot.setSteeringDrift 10 / 180.0 * pi
  robot.draw()
  runner = new Runner(robot, world)

  PID = [0.3020698159940172, 4.058570137849624, 0.003109729253799231]
  animateStep = ->
    runner.step PID[0],PID[1],PID[2]

  shouldStop = true
  start = ->
    shouldStop = false
    requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or
                            window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
    step = ->
      unless shouldStop
        animateStep()
        requestAnimationFrame step

    requestAnimationFrame step

  slideUpdate = (key, value) ->
    obj = {}
    obj[key] = value
    world.setSmoothingParams obj
    $("##{key}_id").val value

  $("#slider_weight_data").slider
    min: 0
    max: 3
    step: 0.01
    value: 0.5
    slide: (e, ui) ->
      slideUpdate "weight_data", ui.value

  $("#slider_weight_data").slider
    min: 0
    max: 0.2
    step: 0.005
    value: 0.01
    slide: (e, ui) ->
      slideUpdate "weight_data", ui.value

  $("#slider_weight_smooth").slider
    min: 0
    max: 1
    step: 0.01
    value: 0.24
    slide: (e, ui) ->
      slideUpdate "weight_smooth", ui.value

  $("#slider_detalization").slider
    min: 5
    max: 30
    step: 1
    value: 10
    slide: (e, ui) ->
      world.setDetalization ui.value
      $("#detalization_id").val ui.value

  $("#slider_p_pid").slider
    min: 0
    max: 1
    step: 0.001
    value: 0.3
    slide: (e, ui) ->
      PID[0] = ui.value
      $("#p_pid_id").val ui.value

  $("#slider_d_pid").slider
    min: 0.5
    max: 20
    step: 0.1
    value: 12
    slide: (e, ui) ->
      PID[1] = ui.value
      $("#d_pid_id").val ui.value

  $("#slider_i_pid").slider
    min: 0
    max: 0.01
    step: 0.0001
    value: 0.003
    slide: (e, ui) ->
      PID[2] = ui.value
      $("#i_pid_id").val ui.value

  $("#slider_drift").slider
    min: -30
    max: 30
    step: 1
    value: 10
    slide: (e, ui) ->
      robot.setSteeringDrift ui.value / 180.0 * pi
      $("#drift_id").val ui.value

  $("#start_robot_id").click ->
    shouldStop = false
    start()

  $("#stop_robot_id").click ->
    shouldStop = true

  $("#twiddle_id").click ->
    robot = new Robot()
    robot.set world.points[1].x+50, world.points[1].y, TWOPI
    robot.setSteeringDrift 10 / 180.0 * pi
    runner = new Runner(robot, world)
    console.log runner.twiddle()


#TODO
# 7. ... Car simulation PID etc.

nodeRadius = 8

class World
  constructor: (@w, @h) ->
    @points = []
    @hoveredNodeIndex = -1
    @selectedNodeIndex = -1
    @moveNode = false
    @smoothingParams = weight_data: 0.01, weight_smooth: 0.24
    @detalization = 10

  addPoint: (x, y) ->
    #Searching where to put
    unless @findNodeNear(x, y)?
      p = pointAt x, y
      indexToInsert = @getClosestIndexToInsert p
      @points.splice indexToInsert, 0, p
      @updateSmoothLine()
      @draw()
      @

  getClosestIndexToInsert: (p) ->
    inBetween = false
    angles =
      if @points.length == 0
        []
      else
        for i in [0..@points.length - 1]
          a = if i > 0
            @points[i - 1]
          else
            @points[@points.length - 1]
          b = @points[i]

          ap = distance a, p
          bp = distance b, p
          ab = distance b, a
          alpha = Math.acos (root(ap) + root(bp) - root(ab)) / (2 * ap * bp)
          beta = Math.acos (root(ab) + root(bp) - root(ap)) / (2 * ab * bp)
          gamma = Math.acos (root(ab) + root(ap) - root(bp)) / (2 * ab * ap)
          if beta < PI / 2 and gamma < PI / 2
            inBetween = true
          alpha * 180 / PI

    if inBetween
      putAtIndex = findMaxIndex angles
      if putAtIndex < 0
        0
      else
        putAtIndex
    else
      if @points.length >= 2
        dToFirst = distance p, @points[0]
        dToLast = distance p, @points[@points.length - 1]
        if dToFirst < dToLast
          0
        else
          @points.length
      else
        @points.length

  hover: (x, y) ->
    if @moveNode and @selectedNodeIndex >= 0
      @points[@selectedNodeIndex] = pointAt x, y
      @updateSmoothLine()
      @draw()
      true
    else
      pointIndex = @findNodeNear x, y
      oldHoveredPointIndex = @hoveredNodeIndex
      @hoveredNodeIndex = if pointIndex? then pointIndex else -1
      unless @hoveredNodeIndex is oldHoveredPointIndex
        @draw()

      @hoveredNodeIndex >= 0

  selectNodeAt: (x, y) ->
    pointIndex = @findNodeNear x, y
    oldSelectedNodeIndex = @selectedNodeIndex
    @selectedNodeIndex = if pointIndex? then pointIndex else -1
    unless @selectedNodeIndex is oldSelectedNodeIndex
      @draw()

    @selectedNodeIndex >= 0

  findNodeNear: (x, y) ->
    for p, i in @points
      if distance(p, pointAt(x, y)) <= nodeRadius
        return i
    null

  deleteSelectedNode: ->
    if @selectedNodeIndex >= 0
      @points.splice @selectedNodeIndex, 1
      @selectedNodeIndex = -1
      @draw()
      @updateSmoothLine()

  setSmoothingParams: (params) ->
    for key, value of params
      @smoothingParams[key] = value
      if @points.length > 2
        @updateSmoothLine()

  setDetalization: (@detalization) ->
    if @points.length > 2
      @updateSmoothLine()

  updateSmoothLine: ->
    @smoother = new Smoother(@points)
    @smoother.segmentatePath @detalization
    @smoother.smooth @smoothingParams.weight_data, @smoothingParams.weight_smooth
    @smoother.draw()

  drawStraightLines: ->
    c = ctx.base
    c.beginPath()
    prevPoint = null
    c.strokeStyle = "rgba(0,0,0,0.3)"
    for p, i in @points
      if prevPoint
        c.moveTo p.x, p.y
        c.lineTo prevPoint.x, prevPoint.y
      prevPoint = p

    if @points.length > 2
      c.moveTo prevPoint.x, prevPoint.y
      c.lineTo @points[0].x, @points[0].y
    c.closePath()
    c.stroke()

  drawNodes: ->
    c = ctx.base
    for p, i in @points
      c.beginPath()
      c.moveTo p.x + nodeRadius, p.y
      c.arc p.x, p.y, nodeRadius, 0, TWOPI, true
      c.closePath()
      c.fillStyle =
        if i == @selectedNodeIndex
          "rgb(200,255,200)"
        else if i == @hoveredNodeIndex
          "rgb(200,200,255)"
        else
          "white"
      c.fill()
      c.stroke()

  draw: ->
    clear 'base'
    @drawStraightLines()
    @drawNodes()
    @

class Smoother
  constructor: (@initPath) ->
    @resetAugmentedPath()

  resetAugmentedPath: ->
    @path = copyPath @initPath

  segmentatePath: (segmentLength) ->
#    for i in [1..factor]
    doit = true
    while doit
      doit = false
      @newAugmentedPath = []
      for p, i in @path
        nextPoint = if i < @path.length-1 then @path[i+1] else @path[0]
        @newAugmentedPath.push p
        if distance(p, nextPoint) > segmentLength
          doit = true
          newPoint = pointAt Math.min(p.x, nextPoint.x) + Math.abs(p.x - nextPoint.x) / 2,
              Math.min(p.y, nextPoint.y) + Math.abs(p.y - nextPoint.y) / 2
          @newAugmentedPath.push newPoint
      if doit
        @path = @newAugmentedPath

  augmentNodesByFactorOf: (factor) ->
    for i in [1..factor]
      @newAugmentedPath = []
      for p, i in @path
        nextPoint = if i < @path.length-1 then @path[i+1] else @path[0]
        newPoint = pointAt (p.x + nextPoint.x) / 2, (p.y + nextPoint.y) / 2
        @newAugmentedPath.push p
        @newAugmentedPath.push newPoint
      @path = @newAugmentedPath

  smooth: (weight_data = 0.5, weight_smooth = 0.1) ->
    newpath = copyPath @path
    for p in [1..600]
      for k in ['x','y']
        for i in [0..@path.length-1]
          nextI = if i == @path.length-1 then 0 else i + 1
          prevI = if i == 0 then @path.length-1 else i - 1
          newpath[i][k] = newpath[i][k] + weight_data * (@path[i][k] - newpath[i][k])
          newpath[i][k] = newpath[i][k] + weight_smooth * (newpath[nextI][k] + newpath[prevI][k] - 2 * newpath[i][k])
    @path = newpath

  drawSmoothLines: ->
    c = ctx.smooth
    c.beginPath()
    prevPoint = null
    c.strokeStyle = "rgba(255,50,50,0.7)"
    for p, i in @path
      if prevPoint
        c.moveTo p.x, p.y
        c.lineTo prevPoint.x, prevPoint.y
      prevPoint = p

    if @path.length > 2
      c.moveTo prevPoint.x, prevPoint.y
      c.lineTo @path[0].x, @path[0].y
    c.closePath()
    c.stroke()

  draw: ->
    clear 'smooth'
    @drawSmoothLines()

class Robot
  constructor: (@len=30.0) ->
    @x = 0
    @y = 0
    @orientation = 0
    @steering_noise = 0
    @distance_noise = 0
    @steering_drift = 0
    @trace=[]
    @maxTraceLength = 300

  set: (@x, @y, new_orientation) ->
    @orientation = new_orientation % TWOPI

  setNoise: (@steering_noise, @distance_noise) ->

  setSteeringDrift: (@steering_drift) ->

  # --------
  # move:
  #    steering = front wheel steering angle, limited by max_steering_angle
  #    dist = total dist driven, most be non-negative

  move: (steering, dist, tolerance = 0.001, max_steering_angle = PI / 4.0) ->
    if steering > max_steering_angle
      steering = max_steering_angle
    if steering < -max_steering_angle
      steering = -max_steering_angle
    if dist < 0
      dist = 0

    # apply noise
    steering2 = randomGauss steering, @steering_noise
    distance2 = randomGauss dist, @distance_noise

    # apply steering drift
    steering2 += @steering_drift
    @steering = steering2
    # Execute motion
    turn = Math.tan(steering2) * distance2 / @len

    if Math.abs(turn) < tolerance
      # approximate by straight line motion
      new_x = @x + (distance2 * cos @orientation)
      new_y = @y + (distance2 * sin @orientation)
      new_orientation = mod @orientation + turn, TWOPI
    else
      # approximate bicycle model for motion
      radius = distance2 / turn
      cx = @x - (sin(@orientation) * radius)
      cy = @y + (cos(@orientation) * radius)
      new_orientation = mod @orientation + turn, TWOPI
      new_x = cx + (sin(new_orientation) * radius)
      new_y = cy - (cos(new_orientation) * radius)
    @x = new_x
    @y = new_y
    @trace.push pointAt new_x, new_y
    if @trace.length > @maxTraceLength
      @trace.shift()
    @orientation = new_orientation
    @

  drawTrace: ->
    c = ctx.robot
    len = @trace.length
    if len > 1
      prevP = @trace[0]
      for p, i in @trace[1..@trace.length - 1]
        c.strokeStyle = "rgba(30,30,255,#{i/len})"
        c.beginPath()
        c.moveTo prevP.x, prevP.y
        c.lineTo p.x, p.y
        c.closePath()
        c.stroke()
        prevP = p


  draw: ->
    clear 'robot'
    c = ctx.robot
    @drawTrace()
    c.strokeStyle = "black"
#    c.beginPath()

    [x, y] = [@x + 5 * cos(@orientation), @y + 5 * sin(@orientation)]
#    c.lineTo x, y
    [x, y] = [x + 10 * cos(@orientation - PI/2), y + 10 * sin(@orientation - PI/2)]
    c.moveTo x, y
#    c.lineTo x, y

    [x, y] = [x + 20 * cos(@orientation + PI/2), y + 20 * sin(@orientation + PI/2)]
    c.lineTo x, y

    [x, y] = [x + @len * cos(@orientation + PI), y + @len * sin(@orientation + PI)]
    c.lineTo x, y

    [x, y] = [x + 20 * cos(@orientation - PI/2), y + 20 * sin(@orientation - PI/2)]
    c.lineTo x, y

    [x, y] = [x + @len * cos(@orientation), y + @len * sin(@orientation)]
    c.lineTo x, y

    c.stroke()


class Runner
  constructor: (@robot, world, @speed = 1.0) ->
    # motion distance is equal to speed (we assume time = 1)
    @old_cte = @countCrossTrackError()
    @err_sum = @old_cte

  isLeft: (a, b, c) ->
    ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0

  countCrossTrackError: ->
    @path = world.smoother.path
    [res, index] = findMin((distance(p, @robot) for p in @path), true)
    if index is @path.length-1
      nextIndex = 0
    else
      nextIndex = index + 1
    isLeft = @isLeft(@path[index], @path[nextIndex], @robot)
    res *= if isLeft then 1 else -1
    res

  twiddle: (tol = 0.0000000001) ->
    p=[0.3, 4, 0.001]
    dp=[0.001, 0.05, 0.001]
    best_err = @dryRun p
    while sum(dp) > tol
      for i in [0..2]
        p[i] += dp[i]
        err = @dryRun p
        if err < best_err
          best_err = err
          dp[i] *= 1.005
        else
          p[i] -= 2 * dp[i]
          if err < best_err
            best_err = err
            dp[i] *= 1.005
          else
            p[i] += dp[i]
            dp[i] *= 0.99

    console.log sum(dp)
    p

  dryRun: (params, N=100) ->
    err = 0
    for i in [1..N*2]
      cte = @step params[0], params[1], params[2], false
      if i >= N
        err += pow(cte, 2)
    err / N

  step: (@tau_p, @tau_d, @tau_i, draw=true) ->
    cte = @countCrossTrackError()
    diff = cte - @old_cte
    angle = -@tau_p * cte - @tau_d * diff - @tau_i * @err_sum
    @robot.move angle, @speed
    @err_sum += cte
    @old_cte = cte
    if draw
      @robot.draw()
    cte

#Units
PI = Math.PI
TWOPI = Math.PI * 2

findMin = (arr, withIndex = false) ->
  min = Math.min.apply null, arr
  if withIndex then [min, arr.indexOf min] else min

findMinIndex = (arr) ->
  [_, index] = findMin arr, true
  return index

findMax = (arr, withIndex = false) ->
  max = Math.max.apply null, arr
  if withIndex then [max, arr.indexOf max] else max

findMaxIndex = (arr) ->
  [_, index] = findMax arr, true
  return index

clear = (ctxId) ->
  if ctxId
    canvases[ctxId].width = width

pointAt = (x, y) -> x: x, y: y
printNodes = (nodes) ->
  console.log ("(x:#{p.x}, y:#{p.y})" for p in nodes).join(", ")

root = (a) -> Math.pow a, 2
distance = (a, b) -> Math.sqrt root(b.x - a.x) + root(b.y - a.y)
distanceToLine = (a, b, p) ->
  Math.abs((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / distance a, b

copyPath = (path) ->
  for p in path
    pointAt p.x, p.y

#Math function extraction
random = Math.random
pow = Math.pow
sqrt = Math.sqrt
log = Math.log
pi = Math.PI
TWOPI = pi * 2
exp = Math.exp
cos = Math.cos
sin = Math.sin

max = (arr) ->
  result = -Number.MAX_VALUE
  for el in arr
    if el > result
      result = el
  result

sum = (arr) ->
  _sum = 0
  for el in arr
    _sum+=el
  _sum

randomGauss = (mu, sigma) ->
  #Box–Muller transform implemtation. 2nd variant
  #http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
  loop
    x = 2 * random() - 1 # Random value from -1 to 1
    y = 2 * random() - 1
    s = pow(x,2) + pow(y, 2)
    break unless s >= 1 || s == 0

  z = x * sqrt(-2 * log(s) / s)
  #  console.log "Gauss (#{mu}, #{sigma}) -> #{res}"
  mu + sigma * z


gauss = (mu, sigma, x) ->
  # calculates the probability of x for 1-dim Gaussian with mean mu and var. sigma
  exp(-(pow((mu - x), 2) / pow(sigma, 2) / 2.0) / sqrt TWOPI * pow(sigma, 2))

#Modulo function which gives mod(-3, 10) == 7 (not -3 as in pure JS)
mod = (a, b) -> a % b + (if a < 0 then b else 0)