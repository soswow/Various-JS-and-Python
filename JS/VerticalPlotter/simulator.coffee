pow2 = (num) -> Math.pow(num, 2)
sqrt = Math.sqrt
PI = Math.PI

hypRealToVirtual = (hypReal, radius) ->
  sqrt pow2(hypReal) + pow2(radius)

triangleHeight = (a, b, c) ->
  sqrt((a + b - c) * (a - b + c) * (-a + b + c) * (a + b + c)) / (c * 2)

positionForHyps = (h1, h2, d) ->
  y = triangleHeight(h1, h2, d)
  x1 = sqrt pow2(h1) - pow2(y)
  x2 = sqrt pow2(h2) - pow2(y)
  [y, x1, x2]

realHypStartPositions = (hr1, hr2, d, radius) ->
  hv1 = hypRealToVirtual hr1, radius
  hv2 = hypRealToVirtual hr2, radius
  [y, x1, x2] = positionForHyps hv1, hv2, d

  rollerPosition = (hr, hv, x) ->
    alpha = Math.asin(hr/hv) + Math.asin(x/hv) - (Math.PI/2)
    x: Math.cos(alpha) * radius
    y: Math.sin(alpha) * radius

  left:
    roller: rollerPosition(hr1, hv1, x1)
    x: x1
  right:
    roller: rollerPosition(hr2, hv2, x2)
    x: x2
  height: y

lineToStringLengths = (start, end, roller) ->
  a = distance(start, roller)
  b = distance(end, roller)
  c = distance(start, end)
  alpha = Math.acos (pow2(b) + pow2(c) - pow2(a)) / (2 * b * c)
  beta = Math.acos (pow2(a) + pow2(c) - pow2(b)) / (2 * a * c)
  height = triangleHeight(a,b,c)
  if alpha > PI/2 or beta > PI / 2
    [a, height, b]
  else
    [a, b]

distance = ({x: x1, y: y1}, {x: x2, y: y2}) ->
  Math.sqrt pow2(x1 - x2) + pow2(y1 - y2)

$left = document.getElementById("left")
$right = document.getElementById("right")
$angles =
  l: document.getElementById("leftAngle")
  r: document.getElementById("rightAngle")


#updateState = ->
#  plotter.state.l = +$left.value
#  plotter.state.r = +$right.value
#  requestAnimationFrame ->
#    plotter.moveGandola()
#    plotter.render()

#$left.addEventListener 'keyup', updateState
#$right.addEventListener 'keyup', updateState
#$left.addEventListener 'change', updateState
#$right.addEventListener 'change', updateState

class Plotter
  stringLen: 500
  roller:
    d: 500 # Distance between
    x: 30-0.5
    y: 30-0.5
    r: 20
    steps: 200 #per Revolution

  state:
    l: 300
    r: 300
    angles:
      l: 0
      r: 0
    x: null
    y: null
    rollers: null

  path: []

  relativePlan: []

  interactive: false

  constructor: (@ctx, properties=null) ->
    @prop = properties if properties
    @updatePosition()
    console.log @state

  clear: ->
    canvas.width = w

  renderRolleres: ->
    @ctx.lineWidth = 0.3
    @ctx.beginPath()
    drawForX = (x, side) =>
      @ctx.moveTo x + @roller.r, @roller.y
      @ctx.arc x, @roller.y, @roller.r, 0, Math.PI * 2
      @ctx.moveTo x + Math.cos(@state.angles[side]) * @roller.r, @roller.y + Math.sin(@state.angles[side]) * @roller.r
      @ctx.lineTo x + Math.cos(@state.angles[side] + PI) * @roller.r, @roller.y + Math.sin(@state.angles[side] + PI) * @roller.r
#      @ctx.moveTo x + Math.cos(@state.angles[side] - PI/2) * @roller.r, @roller.y + Math.sin(@state.angles[side] - PI/2) * @roller.r
#      @ctx.lineTo x + Math.cos(@state.angles[side] + PI/2) * @roller.r, @roller.y + Math.sin(@state.angles[side] + PI/2) * @roller.r

    drawForX @roller.x, 'l'
    drawForX @roller.d + @roller.x, 'r'

    @ctx.closePath()
    @ctx.stroke()

  renderCounterweights: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1

    x = @roller.x - @roller.r
    @ctx.moveTo x, @roller.y
    @ctx.lineTo x, @roller.y + @stringLen - @state.l

    x = @roller.d + @roller.x + @roller.r
    @ctx.moveTo x, @roller.y
    @ctx.lineTo x, @roller.y + @stringLen - @state.r

    @ctx.closePath()
    @ctx.stroke()

  updatePosition: ->
    data = realHypStartPositions(@state.l, @state.r, @roller.d, @roller.r)
    @state.x = data.left.x
    @state.y = data.height
    @state.rollers = left: data.left.roller, right: data.right.roller
    @path.push [@state.x, @state.y]

  renderGandola: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1
    @ctx.strokeStyle = 'black'

    @ctx.moveTo @roller.x + @state.rollers.left.x, @roller.y - @state.rollers.left.y
    @ctx.lineTo @roller.x + @state.x, @roller.y + @state.y

    @ctx.moveTo @roller.x + @roller.d - @state.rollers.right.x, @roller.y - @state.rollers.right.y
    @ctx.lineTo @roller.x + @state.x, @roller.y + @state.y

    @ctx.stroke()
    @ctx.closePath()

  renderPath: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1
    @ctx.strokeStyle = '#ccc'
    for [x, y] in @path
      @ctx.lineTo @roller.x + x, @roller.y + y
    @ctx.stroke()
    @ctx.closePath()

  render: ->
    @clear()
    @renderRolleres()
    @renderCounterweights()
    @renderPath()
    @renderGandola() #with strings

  stepWheel: (side, direction=1) ->
    c = 2 * PI * @roller.r
    lenPerStep = c / @roller.steps
    anglePerStep = (2 * PI) / @roller.steps
    @state[side] += direction * lenPerStep
    direction *= -1 if side is 'r'
    @state.angles[side] += direction * anglePerStep
    $angles[side].innerText = (@state.angles[side] * (180/PI)).toFixed(2)

  start: ->
    @moveByRelativePlan =>
      @render()

  generateInstructions: ->
    @frames = []
    for [dx, dy] in @relativePlan
      @generateTurnFrames @state.x + dx, @state.y + dy

#      @moveBy dx, dy

#    return cb() unless @relativePlan.length
#    [x, y] = .shift()
#    @moveBy x, y, => @moveByRelativePlan(cb)

  moveByRelativePlan: (cb) ->
    return cb() unless @relativePlan.length
    [x, y] = @relativePlan.shift()
    @moveBy x, y, => @moveByRelativePlan(cb)

  moveBy: (dx, dy, cb) ->
    @goToPosition @state.x + dx, @state.y + dy, cb

  generateTurnFrames: (x, y) ->
    d = distance @state, {x:x, y:y}
#    console.log 'distance', d
#    console.log 'from', @state.x, @state.y
#    console.log 'to', x, y
    c = 2 * PI * @roller.r
    lenPerStep = c / @roller.steps

#    console.log 'lenPerStep', lenPerStep
    parts = Math.ceil(d) * 2
    startX = @state.x
    startY = @state.y
    wheelTurns = []
    for i in [0..parts]
      portion =
        if i < parts
          i / parts
        else
          1
      sx = startX + (x - startX) * portion
      sy = startY + (y - startY) * portion

      turn = ''

      currentLD = distance {x:0, y:0}, @state
      newLD = distance {x:0, y:0}, {x:sx, y:sy}
      if Math.abs(currentLD - newLD) >= lenPerStep
        bigger = newLD - currentLD > 0
        turn += if bigger then 'L' else 'l'
        direction = if bigger then 1 else -1
        @state.l += direction * lenPerStep

      currentRD = distance {x:@roller.d, y:0}, @state
      newRD = distance {x:@roller.d, y:0}, {x:sx, y:sy}
      if Math.abs(currentRD - newRD) >= lenPerStep
#        turn += if newRD - currentRD > 0 then 'R' else 'r'
        bigger = newRD - currentRD
        turn += if bigger then 'R' else 'r'
        direction = if bigger then 1 else -1
        @state.r += direction * lenPerStep

      wheelTurns.push turn

    return wheelTurns

#      @moveGandola()


#  goToState: (newState) ->
#    if newState.l isnt @state.l or newState.r isnt @state.r
#      requestAnimationFrame =>
#        if newState.l > @state.l
#          @stepWheel 'l'
#        else if newState.l < @state.l
#          @stepWheel 'l', -1
#        if newState.r > @state.r
#          @stepWheel 'r'
#        else if newState.r < @state.r
#          @stepWheel 'r', -1
#        $left.value = @state.l
#        $right.value = @state.r
#        @render()
#        @goToState(newState)

[w, h] = [700, 600]
canvas = document.getElementsByTagName('canvas').item(0)
canvas.width = w
canvas.height = h
ctx = canvas.getContext('2d')
plotter = new Plotter(ctx)
plotter.render()

#plotter.relativePlan = [
#  [0, -100]
#  [100, 0]
#  [0, 100]
#  [-100, 0]
#]

#Draw circles

#x = plotter.state.x
#y = plotter.state.y
#r = 50
#oldx = x + Math.cos(0) * r
#oldy = y + Math.sin(0) * r
#plotter.relativePlan.push [100, -100]
#sides = 10
#for i in [0..sides]
#  angle = PI*2*(i/sides)
#  newx = x + Math.cos(angle) * r
#  newy = y + Math.sin(angle) * r
#  dx = newx - oldx
#  dy = newy - oldy
#  plotter.relativePlan.push [dx, dy]
#  oldx = newx
#  oldy = newy

x = plotter.state.x
y = plotter.state.y
times = 25
angle = PI/4
len = 10
plotter.relativePlan.push [10, 10]
for i in [1..times]
  dx = Math.cos(angle) * len
  dy = Math.sin(angle) * len
  len += 10
  angle += PI/2

  plotter.relativePlan.push [dx, dy]

#console.log plotter.relativePlan
plotter.interactive = false
plotter.start()

#plotter.goToState(l:100, r:500)

