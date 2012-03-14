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
    max: 100,
    value: 50,
    start: ->
      world.clear()
      true
    slide: (event, ui ) ->
      world.changeCellSize ui.value
      true
    stop: ->
      world.drawAllWalls()

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

  world = new GridWorld(50, width, height)

gridColors =
  hover: 'rgba(0,0,0,0.2)',
  wall: 'rgba(0,0,0,0.6)'

class GridWorld
  constructor: (@cellSize, @w, @h) ->
    @setSizes()
    @data = make2DArray @width, @height, ''
    @hovered = x: -1, y: -1
    @oldHovered = x: -1, y: -1
    @clickAction = "walls"
    @drawGrid()

  setSizes: ->
    @width = Math.floor @w / @cellSize
    @height = Math.floor @h / @cellSize

  iterateDataCells: (func) ->
    for y in [1..@data.length]
        for x in [1..@data[0].length]
          func x, y

  clear: (ctxId) ->
    if ctxId
      canvases[ctxId].width = width
    else
      canvases.hover.width = width
      canvases.walls.width = width
      canvases.policy.width = width
    @

  changeCellSize: (@cellSize) ->
    @setSizes()
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
      @drawCellAt xy, 'walls'
    else
      @data[y][x] = 'wall'
      @drawCellAt xy,  'walls', gridColors.wall

  click: (x, y) ->
    pos = @cellByXY x, y
    @toggleWallAt pos.x, pos.y

  drawAllWalls: ->
    @clear 'walls'
    @iterateDataCells (x, y) =>
      if @data[y]?[x] is 'wall'
        pos = @xyByCell x:x, y:y
        @drawCellAt pos, 'walls', gridColors.wall

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

make2DArray = (w, h, fill = 0) ->
  ((fill for i in [1..Math.floor(w)]) for j in [1..Math.floor(h)])