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
  a = Math.sqrt(pow2(start.x - roller.x) + pow2(start.y - roller.y))
  b = Math.sqrt(pow2(end.x - roller.x) + pow2(end.y - roller.y))
  c = Math.sqrt(pow2(start.x - end.x) + pow2(start.y - end.y))
  alpha = Math.acos (pow2(b) + pow2(c) - pow2(a)) / (2 * b * c)
  beta = Math.acos (pow2(a) + pow2(c) - pow2(b)) / (2 * a * c)
  height = triangleHeight(a,b,c)
  if alpha > PI/2 or beta > PI / 2
    [a, height, b]
  else
    [a, b]


$left = document.getElementById("left")
$right = document.getElementById("right")

updateState = ->
  plotter.state.l = +$left.value
  plotter.state.r = +$right.value
  requestAnimationFrame ->
    plotter.render()

$left.addEventListener 'keyup', updateState
$right.addEventListener 'keyup', updateState
$left.addEventListener 'change', updateState
$right.addEventListener 'change', updateState

class Plotter
  stringLen: 500
  roller:
    d: 500 # Distance between
    x: 30-0.5
    y: 30-0.5
    r: 20
    steps: 200 #per Revolution

  state:
    l: 400
    r: 300
    angles:
      l: 0
      r: 0
    x: null
    y: null
    rollers: null

  path: []

  constructor: (@ctx, properties=null) ->
    @prop = properties if properties

  clear: ->
    canvas.width = w

  renderRolleres: ->
    @ctx.lineWidth = 0.3
    @ctx.beginPath()
    drawForX = (x) =>
      @ctx.moveTo x + @roller.r, @roller.y
      @ctx.arc x, @roller.y, @roller.r, 0, Math.PI * 2

    drawForX @roller.x
    drawForX @roller.d + @roller.x

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

  moveGandola: ->
    data = realHypStartPositions(@state.l, @state.r, @roller.d, @roller.r)
    @state.x = @roller.x + data.left.x
    @state.y = @roller.y + data.height
    @state.rollers = left: data.left.roller, right: data.right.roller
    @path.push [@state.x, @state.y]

  renderGandola: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1
    @ctx.strokeStyle = 'black'

    @ctx.moveTo @roller.x + @state.rollers.left.x, @roller.y - @state.rollers.left.y
    @ctx.lineTo @state.x, @state.y

    @ctx.moveTo @roller.x + @roller.d - @state.rollers.right.x, @roller.y - @state.rollers.right.y
    @ctx.lineTo @state.x, @state.y

    @ctx.stroke()
    @ctx.closePath()

  renderPath: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1
    @ctx.strokeStyle = '#ccc'
    for [x, y], i in @path
#      if i is 0
#        @ctx.moveTo x, y
#      else
      @ctx.lineTo x, y
    @ctx.stroke()
    @ctx.closePath()


  render: ->
    @clear()
    @renderRolleres()
    @renderCounterweights()
    @moveGandola()
    @renderPath()
    @renderGandola() #with strings

  stepWheel: (side, direction=1) ->
    c = 2 * PI * @roller.r
    lenPerStep = c / @roller.steps
    anglePerStep = (2 * PI) / @roller.steps
    @state[side] += direction * lenPerStep
    @state.angles[side] += direction * anglePerStep

  goToState: (newState) ->
    if newState.l isnt @state.l or newState.r isnt @state.r
      requestAnimationFrame =>
        if newState.l > @state.l
          @stepWheel 'l'
        else if newState.l < @state.l
          @stepWheel 'l', -1
        if newState.r > @state.r
          @stepWheel 'r'
        else if newState.r < @state.r
          @stepWheel 'r', -1
        $left.value = @state.l
        $right.value = @state.r
        @render()
        @goToState(newState)

[w, h] = [700, 600]
canvas = document.getElementsByTagName('canvas').item(0)
canvas.width = w
canvas.height = h
ctx = canvas.getContext('2d')
plotter = new Plotter(ctx)
plotter.render()

plotter.goToState(l:100, r:500)

