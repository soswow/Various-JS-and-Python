ctx = {}
canvases = {}
width = 800
height = 270

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

  lanes = [ [100,100,100,200,300],
            [50,50,50,50,50],
            [1,1,1,1,1]]

  world = new RoadWorld(lanes)

class RoadWorld
  constructor: (@lanes) ->
    @h = @lanes.length
    @w = @lanes[0].length
    @draw()

  draw: ->
    clear 'base'
    c = ctx.base
    cell_w = width / @w
    cell_h = height / @h
    min = Number.MAX_VALUE
    max = -1 * Number.MAX_VALUE
    for lane in @lanes
      for speed in lane
        if speed > max
          max = speed
        if speed < min
          min = speed
    max = max - min + 1
    for xi in [0..@w-1]
      for yi in [0..@h-1]
        c.beginPath()
        [x,y,w,h] = [gp(cell_w * xi), gp(cell_h * yi), cell_w, cell_h]
        c.strokeRect x,y,w,h

        speed = @lanes[yi][xi]
        hue = Math.floor((speed-min) * 180 / max)
        [r,g,b] = hsv_to_rgb(hue, 0.4, 1)
        c.fillStyle = "rgb(#{r},#{g},#{b})"
        c.fillRect x,y,w,h

        c.fillStyle = 'black'
        c.font = '20px sans-serif'
        c.fillText(speed,x+cell_w/2-20, y+20)

        c.closePath()
    c.stroke()

gp = (any) -> Math.ceil(any) + 0.5
hsv_to_rgb = (h,s,v) ->

  c = s * v
  _h = h / 60
  x = c * (1 - abs((_h % 2) - 1))
  [r1, g1, b1] = [0, 0, 0]
  if 0 <= _h < 1
    [r1, g1] = [c, x]
  if 1 <= _h < 2
    [r1, g1] = [x, c]
  if 2 <= _h < 3
    [g1, b1] = [c, x]
  if 3 <= _h < 4
    [g1, b1] = [x, c]
  if 4 <= _h < 5
    [r1, b1] = [x, c]
  if 5 <= _h < 6
    [r1, b1] = [c, x]
  m = v - c
  [Math.round((r1+m) * 255), Math.round((g1+m) * 255), Math.round((b1+m) * 255)]

abs = Math.abs
clear = (ctxId) ->
  if ctxId
    canvases[ctxId].width = width
