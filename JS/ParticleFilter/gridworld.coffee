ctx = {}
canvases = {}
width = 700
height = 400

world = null
$ ->
  $('#grid canvas').each ->
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

  $("#cellSizeSlider").slider
    orientation: "vertical",
    range: "min",
    min: 10,
    max: 50,
    value: 50,
    start: ->
      world.clear()
      true
    slide: (event, ui ) ->
      world.changeCellSize ui.value
      world.draw()
      true

  gridMouseDown = false
  $("#grid").mousedown ->
    gridMouseDown = true
  .mouseup ->
    gridMouseDown = false
  .mouseleave ->
    gridMouseDown = false
  .mousemove (e) ->
    world.hover e.offsetX, e.offsetY, gridMouseDown
  .click (e) ->
    world.click e.offsetX, e.offsetY

  $("#actionsSet").buttonset()
  $("[name=actionType]").click ->
    world.clickAction = @value
  $("#clearEverythingId").button().click -> world.clear().clearData()
  $("#makeBorderWallId").button().click ->
    world.makeBorderWall()

  world = new GridWorld(50, width, height)

gridColors =
  hover: 'rgba(0,0,0,0.2)',
  wall: 'rgba(0,0,0,0.6)',
  init: 'rgba(0,255,0,0.8)',
  goal: 'rgba(255,0,0,0.8)'

class GridWorld
  constructor: (@cellSize, @w, @h) ->
    @setSizes()
    @data = make2DArray @width, @height, ''
    @hovered = p -1, -1
    @oldHovered = p -1, -1
    @clickAction = "walls"
    @resetInitGoal()
    @updatePolicy()
    @makeBorderWall()
    @draw()

  resetInitGoal: ->
    @init = p 1, 1
    @goal = p @width-2, @height-2

  updatePolicy: (init=@init, goal=@goal) ->
    unless equalPoints init, @init
      @data[@init.y][@init.x] = ''
      @init = init
    @data[@init.y][@init.x] = 'init'

    unless equalPoints goal, @goal
      @data[@goal.y][@goal.x] = ''
      @goal = goal
    @data[@goal.y][@goal.x] = 'goal'
    @

  setSizes: ->
    @width = Math.ceil @w / @cellSize
    @height = Math.ceil @h / @cellSize

  iterateDataCells: (func) ->
    for y in [0..@data.length-1]
        for x in [0..@data[0].length-1]
          func x, y

  clearData: ->
    @resetInitGoal()
    @iterateDataCells (x, y) =>
      @data[y][x] = ''
    @

  clear: (ctxId) ->
    if ctxId
      canvases[ctxId].width = width
    else
      canvases.hover.width = width
      canvases.walls.width = width
      canvases.policy.width = width
    @

  changeCellSize: (@cellSize) ->
    oldHeight = @height
    @setSizes()
    unless oldHeight is @height
      newdata = make2DArray @width, @height
      @iterateDataCells (x, y) =>
        if y < @height and x < @width
          if y < @data.length and x < @data[0].length
            newdata[y][x] = @data[y][x]
      @data = newdata
    @drawGrid()
    @

  cellByXY: (x, y) ->
    x:Math.floor(x / @cellSize),
    y:Math.floor(y / @cellSize)

  xyByCell: (xy) ->
    x:xy.x * @cellSize,
    y:xy.y * @cellSize

  hover: (x, y, mouseDown) ->
    hovered = @cellByXY x, y
    unless hovered.x is @hovered.x and hovered.y is @hovered.y
      @oldHovered = @hovered
      @hovered = hovered
      @drawHover()
      if mouseDown
        @toggleWallAt hovered.x, hovered.y

  drawCellAt: (xy, ctxId, color) ->
    ctx[ctxId].fillStyle = color
    ctx[ctxId].fillRect xy.x, xy.y, @cellSize, @cellSize

  clearCellAt: (xy, ctxId) ->
    ctx[ctxId].clearRect xy.x, xy.y, @cellSize, @cellSize

  toggleWallAt: (x, y) ->
    xy = @xyByCell x:x, y:y
    if @data[y][x] == 'wall'
      @data[y][x] = ''
    else
      @data[y][x] = 'wall'
    @drawAllWalls()

  makeBorderWall: ->
    for x in [0..@width-1]
      for y in [0..@height-1]
        if x is 0 or y is 0 or x is @width-1 or y is @height-1
          @data[y][x] = 'wall'
    @drawAllWalls()

  click: (x, y) ->
    pos = @cellByXY x, y
    switch @clickAction
      when 'walls' then @toggleWallAt pos.x, pos.y
      when 'init'
        @updatePolicy(pos, @goal).drawPolicy()
      when 'goal'
        @updatePolicy(@init, pos).drawPolicy()
#      when 'walls' then @toggleWallAt pos.x, pos.y

  drawAllWalls: ->
    @clear 'walls'
    @iterateDataCells (x, y) =>
      if @data[y]?[x] is 'wall'
        pos = @xyByCell x:x, y:y
        @drawCellAt pos, 'walls', gridColors.wall

  drawPolicy: ->
    @clear 'policy'
    @iterateDataCells (x, y) =>
      pos = @xyByCell x:x, y:y
      switch @data[y]?[x]
        when 'init' then @drawCellAt pos, 'policy', gridColors.init
        when 'goal' then @drawCellAt pos, 'policy', gridColors.goal

  drawGrid: ->
    @clear 'grid'
    c = ctx.grid
    c.beginPath()
    c.strokeStyle = 'black'
    for x in [1..@width]
      c.moveTo x*@cellSize + 0.5, 0
      c.lineTo x*@cellSize + 0.5, @h

    for y in [1..@height]
      c.moveTo 0, y*@cellSize + 0.5
      c.lineTo @w, y*@cellSize + 0.5
    c.closePath()
    c.stroke()

  drawHover: ->
    @clear 'hover'
    c = ctx.hover

    clearCell = @xyByCell @oldHovered
    @clearCellAt clearCell, 'hover'

    fillCell = @xyByCell @hovered
    @drawCellAt fillCell, 'hover', gridColors.hover

  draw: ->
    @drawGrid()
    @drawAllWalls()
    @drawPolicy()

equalPoints = (p1, p2) -> p1.x is p2.x and p1.y is p2.y
p = (x, y) -> x:x, y:y
make2DArray = (w, h, fill = 0) ->
  ((fill for i in [1..Math.ceil(w)]) for j in [1..Math.ceil(h)])