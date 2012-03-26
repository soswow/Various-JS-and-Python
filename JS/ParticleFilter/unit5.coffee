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

  gridMouseDown = false
  #  $("#canvasContainer").mousedown (e) ->
  #      world.click e.offsetX, e.offsetY
  #      gridMouseDown = true
  #    .mouseup (e) ->
  #      gridMouseDown = false
  #      world.click e.offsetX, e.offsetY
  #    .mouseleave ->
  #      gridMouseDown = false
  #    .mousemove (e) ->
  #      world.hover e.offsetX, e.offsetY, gridMouseDown
  #    .click (e) ->
  #      world.click e.offsetX, e.offsetY

  $('#canvasContainer').click (e) ->
    world.addPoint e.offsetX, e.offsetY

  world = new World(width, height).draw()


#TODO
# 2. Hoverable (change color
# 3. Selectable (state of selected)
# 4. Deleting with "Delete button" selected node
# 5. Moving nodes
# 6. Making smoother path - Different canvas layer?
# 7. ... Car simulation PID etc.

class World
  constructor: (@w, @h) ->
    @points = []

  addPoint: (x, y) ->
  #Searching where to put
    p = pointAt x, y
    #    console.log @points
    #    console.log @points[1..@points.length]
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
            console.log "inBetween"
            inBetween = true
          alpha * 180 / PI

    console.log angles

    if inBetween
      putAtIndex = findMaxIndex angles
      putAtIndex = 0 if putAtIndex < 0
      console.log putAtIndex
      @points.splice putAtIndex, 0, p
    else
      if @points.length >= 2
        dToFirst = distance p, @points[0]
        dToLast = distance p, @points[@points.length - 1]
        if dToFirst < dToLast
          console.log "First"
          @points.unshift p
        else
          console.log "Last"
          @points.push p
      else
        @points.push p
    @draw()
    @

  removePoint: (x, y) ->

  clear: (ctxId) ->
    if ctxId
      canvases[ctxId].width = width

  drawPointsAndLines: ->
    @clear 'simpleLines'
    c = ctx.simpleLines
    c.beginPath()
    prevPoint = null
    for p, i in @points
      c.moveTo p.x + 10, p.y
      c.arc p.x, p.y, 10, 0, TWOPI, true
      if prevPoint
        c.moveTo p.x, p.y
        c.lineTo prevPoint.x, prevPoint.y
      prevPoint = p
    if @points.length > 2
      c.moveTo prevPoint.x, prevPoint.y
      c.lineTo @points[0].x, @points[0].y

    c.closePath()
    c.stroke()

  draw: ->
    @drawPointsAndLines()
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
