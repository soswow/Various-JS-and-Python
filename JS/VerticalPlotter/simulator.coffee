pow2 = (num) -> Math.pow(num, 2)
sqrt = Math.sqrt

hypRealToVirtual = (hypReal, radius) ->
  sqrt pow2(hypReal) + pow2(radius)

positionForHyps = (h1, h2, d) ->
  y = sqrt((h1 + h2 - d) * (h1 - h2 + d) * (-h1 + h2 + d) * (h1 + h2 + d)) / (d * 2)
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

class Plotter
  stringLen: 500
  roller:
    d: 500 # Distance between
    x: 20-0.5
    y: 20-0.5
    r: 7

  state:
    l: 400
    r: 300

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

  renderGandola: ->
    @ctx.beginPath()
    @ctx.lineWidth = 1

    data = realHypStartPositions(@state.l, @state.r, @roller.d, @roller.r)
    @ctx.moveTo @roller.x + data.left.roller.x, @roller.y - data.left.roller.y
    @ctx.lineTo @roller.x + data.left.x, @roller.y + data.height

    @ctx.moveTo @roller.x + @roller.d - data.right.roller.x, @roller.y - data.right.roller.y
    @ctx.lineTo @roller.x + @roller.d - data.right.x, @roller.y + data.height

    @ctx.closePath()
    @ctx.stroke()

  render: ->
    @clear()
    @renderRolleres()
    @renderCounterweights()
    @renderGandola() #with strings


[w, h] = [700, 600]
canvas = document.getElementsByTagName('canvas').item(0)
canvas.width = w
canvas.height = h
ctx = canvas.getContext('2d')
plotter = new Plotter(ctx)
plotter.render()

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
