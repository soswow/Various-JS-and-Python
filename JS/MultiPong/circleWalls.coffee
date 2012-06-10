DIAMETER = 500
RADIUS = DIAMETER/2
WALL_THICK = 4
SIDES = 6

xy = utils.xy

$ ->
  el = $('#canvas')
  el.attr 'width', DIAMETER
  el.attr 'height', DIAMETER
  context = el[0]?.getContext? '2d'

  clearCanvas el
  portions = [
    {start: 0.1, end:0.9},
    {start: 0.2, end:0.8},
    {start: 0.3, end:0.5},
    {start: 0, end:1},
    {start: 0, end:0.5},
    {start: 0, end:0.8},
  ]
  walls = makeWalls findCorners(), portions
  drawWalls context, walls

clearCanvas = (el) ->
  el.attr 'width', DIAMETER

drawWalls = (context, walls) ->
  for [start, end], i in walls
    context.strokeStyle = "rgba(0, 0, 0, #{(0.5 * (i / walls.length)) + 0.5 })"
    context.lineWidth = WALL_THICK
    context.beginPath()
    context.moveTo start.x, start.y
    context.lineTo end.x, end.y
    context.closePath()
    context.stroke()
  context.lineWidth = 1

makeWalls = (corners, portions) ->
  console.log corners
  for corner, i in corners
    {start: startPortion, end: endPortion} = portions[i]
    [start, end] = [corners[i-1..i-1][0], corner]
    xd = end.x - start.x
    yd = end.y - start.y
    start = xy start.x + xd * startPortion, start.y + yd * startPortion
    end = xy end.x - xd * (1-endPortion), end.y - yd * (1-endPortion)
    [start, end]

findCorners = ->
  center = xy RADIUS, RADIUS
  sectorAngle = 360 / SIDES
  angle = 270 - sectorAngle / 2
  for sideIndex in [0..SIDES-1]
    angle += sectorAngle
    radialMove center, RADIUS, angle

radialMove = (start, distance, angle) ->
  radians = utils.degToRad(angle)
  deltaY = Math.sin(radians) * distance
  deltaX = Math.cos(radians) * distance
  x = start.x + deltaX
  y = start.y - deltaY
  return xy x, y