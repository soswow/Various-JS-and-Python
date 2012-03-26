ctx = {}
canvases = {}
width = 800
height = 500

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

  $('#canvasContainer')
  .mousemove (e) ->
    isOverNode = world.hover e.offsetX, e.offsetY
    $(@).toggleClass "hovered", isOverNode
  .mousedown (e) ->
    isNodeSelected = world.selectNodeAt e.offsetX, e.offsetY
    world.moveNode = isNodeSelected
  .mouseup (e) ->
    unless world.moveNode
      world.addPoint e.offsetX, e.offsetY
    world.moveNode = false

  $(document).keydown (e) ->
    if e.keyCode is 46
      world.deleteSelectedNode()

  world = new World(width, height).draw()


#TODO
# 6. Making smoother path - Different canvas layer?
# 7. ... Car simulation PID etc.

nodeRadius = 8

class World
  constructor: (@w, @h) ->
    @points = []
    @hoveredNodeIndex = -1
    @selectedNodeIndex = -1
    @moveNode = false


  addPoint: (x, y) ->
    #Searching where to put
    unless @findNodeNear(x, y)?
      p = pointAt x, y
      indexToInsert = @getClosestIndexToInsert p
      @points.splice indexToInsert, 0, p
      @draw()
      @

  getClosestIndexToInsert: (p) ->
    inBetween = false
    angles =
      if @points.length == 0
        []
      else
        for i in [0..@points.length - 1]
          a = if i > 0
            @points[i - 1]
          else
            @points[@points.length - 1]
          b = @points[i]

          ap = distance a, p
          bp = distance b, p
          ab = distance b, a
          alpha = Math.acos (root(ap) + root(bp) - root(ab)) / (2 * ap * bp)
          beta = Math.acos (root(ab) + root(bp) - root(ap)) / (2 * ab * bp)
          gamma = Math.acos (root(ab) + root(ap) - root(bp)) / (2 * ab * ap)
          if beta < PI / 2 and gamma < PI / 2
            inBetween = true
          alpha * 180 / PI

    if inBetween
      putAtIndex = findMaxIndex angles
      if putAtIndex < 0
        0
      else
        putAtIndex
    else
      if @points.length >= 2
        dToFirst = distance p, @points[0]
        dToLast = distance p, @points[@points.length - 1]
        if dToFirst < dToLast
          0
        else
          @points.length
      else
        @points.length

  hover: (x, y) ->
    if @moveNode and @selectedNodeIndex >= 0
      @points[@selectedNodeIndex] = pointAt x, y
      @draw()
      true
    else
      pointIndex = @findNodeNear x, y
      oldHoveredPointIndex = @hoveredNodeIndex
      @hoveredNodeIndex = if pointIndex? then pointIndex else -1
      unless @hoveredNodeIndex is oldHoveredPointIndex
        @draw()

      @hoveredNodeIndex >= 0

  selectNodeAt: (x, y) ->
    pointIndex = @findNodeNear x, y
    oldSelectedNodeIndex = @selectedNodeIndex
    @selectedNodeIndex = if pointIndex? then pointIndex else -1
    unless @selectedNodeIndex is oldSelectedNodeIndex
      @draw()

    @selectedNodeIndex >= 0

  findNodeNear: (x, y) ->
    for p, i in @points
      if distance(p, pointAt(x, y)) <= nodeRadius
        return i
    null

  deleteSelectedNode: ->
    if @selectedNodeIndex >= 0
      @points.splice @selectedNodeIndex, 1
      @selectedNodeIndex = -1
      @draw()


  clear: (ctxId) ->
    if ctxId
      canvases[ctxId].width = width

  drawStraightLines: ->
    c = ctx.simpleLines
    c.beginPath()
    prevPoint = null
    for p, i in @points
      if prevPoint
        c.moveTo p.x, p.y
        c.lineTo prevPoint.x, prevPoint.y
      prevPoint = p

    if @points.length > 2
      c.moveTo prevPoint.x, prevPoint.y
      c.lineTo @points[0].x, @points[0].y
    c.closePath()
    c.stroke()

  drawNodes: ->
    c = ctx.simpleLines
    for p, i in @points
      c.beginPath()
      c.moveTo p.x + nodeRadius, p.y
      c.arc p.x, p.y, nodeRadius, 0, TWOPI, true
      c.closePath()
      c.fillStyle =
        if i == @selectedNodeIndex
          "rgb(200,255,200)"
        else if i == @hoveredNodeIndex
          "rgb(200,200,255)"
        else
          "white"
      c.fill()
      c.stroke()

  draw: ->
    @clear 'simpleLines'
    @drawStraightLines()
    @drawNodes()
    @

#Units
PI = Math.PI
TWOPI = Math.PI * 2

findMin = (arr, withIndex = false) ->
  min = Math.min.apply null, arr
  if withIndex then [min, arr.indexOf min] else min

findMinIndex = (arr) ->
  [_, index] = findMin arr, true
  return index

findMax = (arr, withIndex = false) ->
  max = Math.max.apply null, arr
  if withIndex then [max, arr.indexOf max] else max

findMaxIndex = (arr) ->
  [_, index] = findMax arr, true
  return index

pointAt = (x, y) -> x: x, y: y
root = (a) -> Math.pow a, 2
distance = (a, b) -> Math.sqrt root(b.x - a.x) + root(b.y - a.y)
distanceToLine = (a, b, p) ->
  Math.abs((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / distance a, b
