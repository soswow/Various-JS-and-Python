ctx = {}
canvases = {}
width = 700
height = 400
megaValue = 99999

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
  $("#grid").mousedown (e) ->
    world.click e.offsetX, e.offsetY
    gridMouseDown = true
  .mouseup (e) ->
    gridMouseDown = false
    world.click e.offsetX, e.offsetY
  .mouseleave ->
    gridMouseDown = false
  .mousemove (e) ->
    world.hover e.offsetX, e.offsetY, gridMouseDown
  .click (e) ->
    world.click e.offsetX, e.offsetY

  $("#actionsSet, #visibilitySet").buttonset()
  $("[name=actionType]").click ->
    world.clickAction = @value
  $("[name=visibility]").change ->
    if @value.indexOf('value') is 0
      world[@value] = @checked
    else if @value.indexOf('policy') is 0
      world.showPolicy = @checked
    world.updateValues()

  $("#clearEverythingId").button().click ->
    world.clear().clearData()
    $("[name=visibility]").each -> $(@).removeAttr('checked').trigger('change')

  $("#makeBorderWallId").button().click ->
    world.makeBorderWall()
    world.updateValues()

  world = new GridWorld(50, width, height)

initWalls = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,1,1,1,1,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]

gridColors =
  hover: 'rgba(0,0,0,0.2)',
  wall: 'rgba(0,0,0,0.6)',
  init: 'rgba(0,255,0,0.8)',
  goal: 'rgba(255,0,0,0.8)'

class GridWorld
  constructor: (@cellSize, @w, @h) ->
    @setSizes()
    @data = make2DArray @width, @height
    @hovered = p -1, -1
    @oldHovered = p -1, -1
    @clickAction = "walls"
    @valueAsNumber = false
    @valueAsColor = true
    @showPolicy = true
    @resetInitStructure()
    @updatePolicy()
    @makeBorderWall()
    @updateValues()
    @draw()

  resetInitGoal: ->
    @init = p 1, 1
    @goal = p @width-2, @height-2

  resetInitStructure: ->
    @resetInitGoal()
    @iterateDataCells (x, y) =>
      if initWalls[y][x]
        @data[y][x].policy = 'wall'

  updatePolicy: (init=@init, goal=@goal) ->
    unless equalPoints init, @init
      @data[@init.y][@init.x].policy = ''
      @init = init
    @data[@init.y][@init.x].policy = 'init'

    unless equalPoints goal, @goal
      @data[@goal.y][@goal.x].policy = ''
      @goal = goal
    @data[@goal.y][@goal.x].policy = 'goal'
    @

  setSizes: ->
    @width = Math.floor @w / @cellSize
    @height = Math.floor @h / @cellSize

  iterateDataCells: (func) ->
    for y in [0..@data.length-1]
        for x in [0..@data[0].length-1]
          func x, y

  clearData: ->
    @resetInitGoal()
    @iterateDataCells (x, y) =>
      @data[y][x] = dp()
    @updatePolicy()
    @draw()
    @

  clear: (ctxId) ->
    if ctxId
      canvases[ctxId].width = width
    else
      canvases.hover.width = width
      canvases.walls.width = width
      canvases.values.width = width
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
        @click x, y

  drawCellAt: (xy, ctxId, color) ->
    ctx[ctxId].fillStyle = color
    ctx[ctxId].fillRect xy.x, xy.y, @cellSize, @cellSize

  clearCellAt: (xy, ctxId) ->
    ctx[ctxId].clearRect xy.x, xy.y, @cellSize, @cellSize

  toggleWallAt: (x, y) ->
    xy = @xyByCell p(x,y)
    if @data[y][x].policy is 'wall'
      @data[y][x].policy = ''
    else
      @data[y][x].policy = 'wall'
    @drawAllWalls()

  makeBorderWall: ->
    for x in [0..@width-1]
      for y in [0..@height-1]
        if x is 0 or y is 0 or x is @width-1 or y is @height-1
          @data[y][x].policy = 'wall'
    @drawAllWalls()

  cellDataAt: (xy) ->
    @data[xy.y][xy.x]

  policyAt: (xy) ->
    @cellDataAt(xy).policy

  valueAt: (xy) ->
    @cellDataAt(xy).value

  click: (x, y) ->
    pos = @cellByXY x, y
    policy = @policyAt pos
    switch @clickAction
      when 'walls'
        unless policy in ['init', 'goal']
          @toggleWallAt pos.x, pos.y
      when 'init'
        unless policy in ['wall', 'goal']
          @updatePolicy(pos, @goal).drawPolicy()
      when 'goal'
        unless policy in ['wall', 'init']
          @updatePolicy(@init, pos).drawPolicy()
    @updateValues()

  getDataLayer: (layer) ->
    @result = make2DArray @width, @height, 0
    @iterateDataCells (x, y) =>
      @result[y][x] = @data[y][x][layer]

  updateValues: ->
    @iterateDataCells (x, y) =>
      unless @data[y][x].policy in ['init', 'goal', 'wall']
        @data[y][x].policy = ''
    policy =@getDataLayer('policy')
    algo = new SearchAlgos(policy, @init, @goal)
    [values, policy] = algo.search()
    @iterateDataCells (x, y) =>
      @data[y][x].value = values[y][x]
      policyItem = policy[y][x]
      unless policyItem in ['init', 'goal', 'wall'] or policyItem is ''
        @data[y][x].policy = policyItem
    @drawValues()
    @drawPolicy()

  drawArrowAt: (pos, direction) ->
    c = ctx.policy
    [x, y] = [pos.x, pos.y]
    c.fillStyle = 'black'
    boxSize = @cellSize * 0.8
    half = boxSize / 2
    padding = @cellSize * 0.1
    sides =
      top: p(x + padding + half, y + padding),
      left: p(x + padding, y + padding + half)
      right: p(x + padding + boxSize, y + padding + half),
      bottom: p(x + padding + half, y + padding + boxSize)
    c.beginPath()
    switch direction
      when 'up'
        c.moveTo sides.left.x, sides.left.y
        c.lineTo sides.top.x, sides.top.y
        c.lineTo sides.right.x, sides.right.y
        c.moveTo sides.top.x, sides.top.y
        c.lineTo sides.bottom.x, sides.bottom.y
      when 'down'
        c.moveTo sides.left.x, sides.left.y
        c.lineTo sides.bottom.x, sides.bottom.y
        c.lineTo sides.right.x, sides.right.y
        c.moveTo sides.top.x, sides.top.y
        c.lineTo sides.bottom.x, sides.bottom.y
      when 'left'
        c.moveTo sides.top.x, sides.top.y
        c.lineTo sides.left.x, sides.left.y
        c.lineTo sides.bottom.x, sides.bottom.y
        c.moveTo sides.right.x, sides.right.y
        c.lineTo sides.left.x, sides.left.y
      when 'right'
        c.moveTo sides.top.x, sides.top.y
        c.lineTo sides.right.x, sides.right.y
        c.lineTo sides.bottom.x, sides.bottom.y
        c.moveTo sides.left.x, sides.left.y
        c.lineTo sides.right.x, sides.right.y
    c.closePath()
    c.stroke()

  drawAllWalls: ->
    @clear 'walls'
    @iterateDataCells (x, y) =>
      if @data[y][x].policy is 'wall'
        pos = @xyByCell p(x,y)
        @drawCellAt pos, 'walls', gridColors.wall

  drawPolicy: ->
    @clear 'policy'
    c = ctx.policy
    @iterateDataCells (x, y) =>
      pos = @xyByCell p(x,y)
      policy = @policyAt p(x,y)
      switch policy
        when 'init' then @drawCellAt pos, 'policy', gridColors.init
        when 'goal' then @drawCellAt pos, 'policy', gridColors.goal
        else
          unless policy is 'wall'
            if @showPolicy
              @drawArrowAt pos, policy

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

  drawValues: ->
    @clear 'values'
    c = ctx.values
    maxValue = 0
    @iterateDataCells (x, y) =>
      pos = @xyByCell p(x,y)
      value = @valueAt p(x,y)
      if value < megaValue and value > maxValue
        maxValue = value

    if @valueAsColor
      @iterateDataCells (x, y) =>
        pos = @xyByCell p(x,y)
        value = @valueAt p(x,y)
        if @policyAt(p(x,y)) in ['wall','init','goal']
          return

        color =
          if value is megaValue
            'rgb(50,50,200)'
          else
            oppacity = value * 0.7 / maxValue
            "rgba(20,20,255,#{oppacity})"
        @drawCellAt pos, 'values', color

    @iterateDataCells (x, y) =>
      pos = @xyByCell p(x,y)
      value = @valueAt p(x,y)
      if @policyAt(p(x,y)) in ['wall','init','goal'] or value is megaValue
        return
      if @valueAsNumber
        c.font = 'normal 8px'
        c.strokeStyle = 'black'
        c.fillStyle = 'black'
        c.fillText value, pos.x+2, pos.y + 10


  draw: ->
    @drawGrid()
    @drawAllWalls()
    @drawValues()
    @drawPolicy()


class SearchAlgos
  constructor: (@data, @init, @goal) ->
    @height = @data.length
    @width = @data[0].length
    @delta = [[0, -1 ], # go up
             [ -1, 0], # go left
             [ 0, 1 ], # go down
             [ 1, 0 ]] # go right
    @deltaName = ['up','left','down','right']
    @cost = 1

  search: ->
    closed = make2DArray @width, @height, 0
    closed[@init.y][@init.x] = 1
    open = [[0, @init]]
    found = false  # flag that is set when search is complete
    resign = false # flag set if we can't find expand
    expand = make2DArray @width, @height, megaValue
    action = make2DArray @width, @height, 0
    policy = make2DArray @width, @height, ''
    step = 0
    while not found and not resign
      if open.length is 0
        resign = true
      else
        open.sort (a,b) -> a[0]-b[0]
        open.reverse()
        next = open.pop()
        xy = next[1]
        g = next[0]
        expand[xy.y][xy.x] = step
        step += 1
        if equalPoints  xy, @goal
          found = true
        else
          for d, i in @delta
            x2 = xy.x + d[0]
            y2 = xy.y + d[1]
            if x2 >= 0 and x2 < @width and y2 >= 0 and y2 < @height and closed[y2][x2] is 0
              unless @data[y2][x2] is 'wall'
                g2 = g + @cost
                open.push [g2, p(x2, y2)]
                closed[y2][x2] = 1
                action[y2][x2] = i

    xy = @goal
    while not equalPoints xy, @init
      act = action[xy.y][xy.x]
      x2 = xy.x - @delta[act][0]
      y2 = xy.y - @delta[act][1]
      xy = p(x2, y2)
      unless x2 >= 0 and x2 < @width and y2 >= 0 and y2 < @height
        break
      if equalPoints xy, @init
        break
      policy[y2][x2] = @deltaName[act]


    return [expand, policy]

#Math function extraction
random = Math.random

dp = (policy='', value=megaValue) -> policy:policy, value:value #Stands fore Data point
p = (x, y) -> x:x, y:y  #Stands for point
equalPoints = (p1, p2) -> p1.x is p2.x and p1.y is p2.y
make2DArray = (w, h, fill) ->
  (((if fill? then fill else dp()) for i in [1..Math.floor(w)]) for j in [1..Math.floor(h)])