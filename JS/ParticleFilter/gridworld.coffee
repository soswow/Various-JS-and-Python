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
#    orientation: "vertical",
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

#  $("#actionsSet, #visibilitySet").buttonset()
  $("[name=actionType]").click ->
    world.clickAction = @value
  $("[name=visibility]").change ->
    if @value.indexOf('value') is 0
      world[@value] = @checked
    else if @value.indexOf('policy') is 0
      if @value is 'policyPath'
        world.showPathPolicy = @checked
        if @checked
          world.showDPPolicy = false
          $('#showDPPolicyId').removeAttr('checked')
      else if @value is 'policyDP'
        world.showDPPolicy = @checked
        if @checked
          world.showPathPolicy = false
          $('#showPathPolicyId').removeAttr('checked')
    world.updateValues()

  $("#clearEverythingId").click ->
    world.clear().clearData()
    $("[name=visibility]").each -> $(@).removeAttr('checked').trigger('change')

  $("#makeBorderWallId").click ->
    world.makeBorderWall()
    world.updateValues()

  $("#aStar").click ->
    world.aStarEnabled = @checked
    world.updateValues()

  $("[name=hFunc]").click ->
    world.aStarHFunc = parseInt @value, 10
    world.updateValues()

  $("TABLE#probobilitiesId input").keyup ->
    val = parseFloat @value
    world.probobilities[$(@).attr("id")[0]] = unless isNaN val then val else 0
    world.updateValues()

  $("#collitionCost").keyup ->
    world.collitionCost = parseInt @value, 10
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
    @clickAction = "wallsAdd"
    @valueAsNumber = false
    @valueAsColor = true
    @showPathPolicy = true
    @showDPPolicy = false
    @policyFails = true
    @aStarEnabled = false
    @aStarHFunc = 1
    @probobilities = f:1, l:0, r:0, b:0
    @collitionCost = 100
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

#  toggleWallAt: (x, y) ->
#    xy = @xyByCell p(x,y)
#    if @data[y][x].policy is 'wall'
#      @data[y][x].policy = ''
#    else
#      @data[y][x].policy = 'wall'
#    @drawAllWalls()

  makeBorderWall: ->
    for x in [0..@width-1]
      for y in [0..@height-1]
        if x is 0 or y is 0 or x is @width-1 or y is @height-1
          @data[y][x].policy = 'wall'
    @drawAllWalls()

  cellDataAt: (xy) ->
    @data[xy.y][xy.x]

  policyAt: (xy) ->
    @cellDataAt(xy)?.policy

  valueAt: (xy) ->
    @cellDataAt(xy)?.value

  click: (x, y) ->
    pos = @cellByXY x, y
    policy = @policyAt pos
    switch @clickAction
      when 'wallsAdd'
        unless policy in ['init', 'goal']
          @data[pos.y][pos.x].policy = 'wall'
          @drawAllWalls()
      when 'wallsRemove'
        if policy is 'wall'
          @data[pos.y][pos.x].policy = ''
          @drawAllWalls()
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
    policy = @getDataLayer('policy')
    algo = new SearchAlgos(policy, @init, @goal)

    [values, policy, @policyFails] =
      if @showDPPolicy
        algo.optimum_policy @probobilities, @collitionCost
      else
        algo.search if @aStarEnabled then @aStarHFunc else 0

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
            if (@showPathPolicy or @showDPPolicy) and not @policyFails
              @drawArrowAt pos, policy

    if @policyFails
      fontSize = @cellSize / 2.5
      c.font = "#{fontSize}px sans-serif"
      c.strokeStyle = 'red'
      c.fillStyle = 'red'
      pos = @xyByCell @init
      c.fillText 'FAIL', pos.x+5, pos.y + @cellSize/2

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
            oppacity = 0
          else
            oppacity = value * 0.7 / maxValue
        @drawCellAt pos, 'values', "rgba(20,20,255,#{oppacity})"

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
    @delta = [[0, -1], # go up
             [ -1, 0], # go left
             [ 0, 1 ], # go down
             [ 1, 0 ]] # go right
    @deltaName = ['up','left','down','right']
    @cost = 1

  heuristicsFuncs: (index, xy) ->
    [x,y] = [xy.x, xy.y]
    switch index
      when 1 then distance xy, @goal
      when 2 then Math.abs(x - @goal.x) + Math.abs(y - @goal.y)
      when 3 then Math.abs(x - @goal.x) * Math.abs(y - @goal.y)
      else 0

  search: (hIndex=0)->
    closed = make2DArray @width, @height, 0
    closed[@init.y][@init.x] = 1
    open = [[0, @init, distance @init, @goal]]
    found = false  # flag that is set when search is complete
    resign = false # flag set if we can't find expand
    expand = make2DArray @width, @height, megaValue
    action = make2DArray @width, @height, -1
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
        g = next[2]
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
                xy2 = p(x2, y2)
                h = if hIndex > 0 then @heuristicsFuncs hIndex, xy2 else 0
                g2 = g + @cost
                gh = g2 + h
                open.push [gh, xy2, g2]
                closed[y2][x2] = 1
                action[y2][x2] = i

    xy = @goal
    fail = false
    while not equalPoints(xy, @init) and not fail
      act = action[xy.y][xy.x]
      if act is -1
        fail = true
        break
      x2 = xy.x - @delta[act][0]
      y2 = xy.y - @delta[act][1]
      xy = p(x2, y2)
      if equalPoints xy, @init
        break
      policy[y2][x2] = @deltaName[act]

    if fail
      policy = make2DArray @width, @height, ''
    return [expand, policy, fail]

  optimum_policy: (motionProbs={f:1, l:0, r:0, b:0}, collision_cost=100) ->
    sum = 0
    for k,v of motionProbs
      sum += v
    unless sum is 0
      for k,v of motionProbs
        motionProbs[k] = v / sum
    else
      motionProbs = f:1, l:0, r:0, b:0

    value = make2DArray @width, @height, megaValue
    policy = make2DArray @width, @height, ''
    change = true

    while change
      change = false
      for row, yi in @data
        for cell, xi in row
          xy = p xi, yi
          if equalPoints xy, @goal
            if value[yi][xi] > 0
              value[yi][xi] = 0
              change = true
          else if cell is ''
            for d, i in @delta
              x2 = xi + d[0]
              y2 = yi + d[1]
#              if x2 is 12 and y2 is 6
#                console.log d, value[y2][x2], @data[y2][x2]
              if x2 >= 0 and x2 < @width and y2 >= 0 and y2 < @height and not(@data[y2][x2] is 'wall')
                forward_cost = value[y2][x2] * motionProbs.f

                lx2 = xi + @delta[mod(i+1, 4)][0]
                ly2 = yi + @delta[mod(i+1, 4)][1]
                left_cost = 0
                if lx2 >= 0 and lx2 < @width and ly2 >= 0 and ly2 < @height and not(@data[ly2][lx2] is 'wall')
                  if value[ly2][lx2] < megaValue
                    left_cost = value[ly2][lx2] * motionProbs.l
                else
                  left_cost = collision_cost * motionProbs.l

                rx2 = xi + @delta[mod(i-1, 4)][0]
                ry2 = yi + @delta[mod(i-1, 4)][1]
                right_cost = 0
                if rx2 >= 0 and rx2 < @width and ry2 >= 0 and ry2 < @height and not(@data[ry2][rx2] is 'wall')
                  if value[ry2][rx2] < megaValue
                    right_cost = value[ry2][rx2] * motionProbs.r
                else
                  right_cost = collision_cost * motionProbs.r

                bx2 = xi + @delta[mod(i+2, 4)][0]
                by2 = yi + @delta[mod(i+2, 4)][1]
                back_cost = 0
                if bx2 >= 0 and bx2 < @width and by2 >= 0 and by2 < @height and not(@data[by2][bx2] is 'wall')
                  if value[by2][bx2] < megaValue
                    back_cost = value[by2][bx2] * motionProbs.b
                else
                  back_cost = collision_cost * motionProbs.b

                v2 = forward_cost + right_cost + left_cost + back_cost + @cost
                if v2 < value[yi][xi]
                  change = true
                  policy[yi][xi] = @deltaName[i]
                  value[yi][xi] = v2

    return [value, policy, false] # Make sure your function returns the expected grid.

#Math function extraction
random = Math.random

distance = (from, to) ->
  Math.sqrt (Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
dp = (policy='', value=megaValue) -> policy:policy, value:value #Stands fore Data point
p = (x, y) -> x:x, y:y  #Stands for point
equalPoints = (p1, p2) -> p1.x is p2.x and p1.y is p2.y
make2DArray = (w, h, fill) ->
  (((if fill? then fill else dp()) for i in [1..Math.floor(w)]) for j in [1..Math.floor(h)])
mod = (a, b) -> a % b + (if a < 0 then b else 0)
