pow2 = (num) -> Math.pow(num, 2)

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

    X = @roller.d - @roller.r * 2
    x2 = (pow2(@state.r) - pow2(@state.l) + pow2(X)) / (2 * X)
    x1 = X - x2
    y = Math.sqrt pow2(@state.l) - pow2(x1)

    @ctx.moveTo @roller.x + @roller.r, @roller.y
    @ctx.lineTo @roller.x + @roller.r + x1, @roller.y + y

    @ctx.moveTo @roller.x + @roller.d - @roller.r, @roller.y
    @ctx.lineTo @roller.x + @roller.d - @roller.r - x2, @roller.y + y

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