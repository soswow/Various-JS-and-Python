#unless String.prototype.trim
#  String.prototype.trim = ->
#    @replace /^\s+|\s+$/g,''
abs = Math.abs

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

  cost = parseFloat $("#shiftCost").val()
  world = new RoadWorld(getCleanLanes($("#dataBox").val()), cost)

  init_img = new Image();
  init_img.src = 'arrow_up_32x32.png'
  $(init_img).load ->
    world.init_img = init_img
    world.draw()
  goal_img = new Image();
  goal_img.src = 'arrow_down_32x32.png'
  $(goal_img).load ->
    world.goal_img = goal_img
    world.draw()

  $(canvases.initgoal).click (e) ->
    world.bottomClick e.offsetX

  $("#dataBox").keyup (e) ->
    world.setLanes getCleanLanes $(this).val()
    world.draw()

  $("#predefinedRoads").change ->
    predefined =["""
    100 100 100 100 100 100 100 100
    10  10  10  10  10  10  10  10
    1   1   1   1   1   1   1   1""",
    """
    80 80 80 80 80 80 80 80 80 80 80 80 80 80
    60 60 60 60 60 60 60 60 60 60 60 60 60 60
    40 40 40 40 40 40 40 40 40 40 40 40 40 40
    20 20 20 20 20 20 20 20 20 20 20 20 20 20
    """,
    """
   [50, 50, 50, 50, 50, 40, 0, 40, 50, 50, 50, 50, 50, 50, 50]
   [40, 40, 40, 40, 40, 30, 20, 30, 40, 40, 40, 40, 40, 40, 40],
   [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    """,
    """
   [50, 50, 50, 50, 50, 40,  0, 40, 50, 50,  0, 50, 50, 50, 50],
   [40, 40, 40, 40,  0, 30, 20, 30,  0, 40, 40, 40, 40, 40, 40],
   [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    """]
    costs = [1.0 / 1000.0, 1.0 / 100.0, 1.0 / 500.0, 1.0 / 65.0]
    sel = $(this).val()
    if sel
      raw = predefined[sel]
      $("#dataBox").val raw
      $("#shiftCost").val costs[sel]
      world.lane_change_cost = costs[sel]
      world.setLanes(getCleanLanes(raw), true)
      world.draw()



class RoadWorld
  constructor: (lanes, @lane_change_cost) ->
    @setLanes lanes, true
    @goal_img
    @init_img
    @draw()

  setLanes: (@lanes, forceResetInitGoal=false) ->
    @h = @lanes.length
    @w = @lanes[0].length
    unless @goal and @goal <= @w - 1
      @goal = @w-1
    if forceResetInitGoal
      @init = 0
      @goal = @w-1
    @cell_w = width / @w
    @cell_h = height / @h
    @calculatePolicy()

  bottomClick: (x) ->
    xIndex = Math.floor(x / @cell_w)
    if xIndex > @init + (@goal - @init) / 2
      @goal = xIndex
    else
      @init = xIndex
    @calculatePolicy()
    @drawArrows()

  calculatePolicy: ->
    calculatePolicy.call @

  drawArrows: ->
    clear 'initgoal'
    c = ctx.initgoal
    placeImg = (x, img) =>
      x = x * @cell_w + @cell_w/2 - img.width
      c.drawImage img, x, height - 35
    if @init_img
      placeImg @init, @init_img
    if @goal_img
      placeImg @goal, @goal_img

  draw: ->
    clear 'base'
    @drawArrows()
    c = ctx.base

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
        [x,y,w,h] = [gp(@cell_w * xi), gp(@cell_h * yi), @cell_w, @cell_h]
        c.strokeRect x,y,w,h

        speed = @lanes[yi][xi]
        hue = Math.floor((speed-min) * 180 / max)
        [r,g,b] = hsv_to_rgb(hue, 0.4, 1)
        c.fillStyle = "rgb(#{r},#{g},#{b})"
        c.fillRect x,y,w,h

        c.fillStyle = 'black'
        c.font = '20px sans-serif'
        c.fillText(speed,x+10, y+20)

        c.closePath()
    c.stroke()

getCleanLanes = (data) ->
  lanes = (row.trim().split(/[^\d.]+/i) for row in data.split(/[\r\n]/))
  maxW = 0

  clean_lanes = []
  for lane, i in lanes
    if lanes.length > 0
      laneRow = []
      for cell in lane
        if cell
          laneRow.push parseFloat cell
      if laneRow.length > 0
        clean_lanes.push laneRow
        if laneRow.length > maxW
          maxW = laneRow.length
  for lane in clean_lanes
    while lane.length < maxW
      lane.push 0
  clean_lanes

pointAt = (x, y) -> x: x, y: y
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


clear = (ctxId) ->
  if ctxId
    canvases[ctxId].width = width


