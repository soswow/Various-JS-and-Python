
class Utils

  distance: (from, to) ->
    Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))

  unfoldPoints: (points...) ->
    _.flatten([p.x, p.y] for p in points)

  angleBetweenLines: (p1, p2, p3, p4) ->
    [x1,y1,x2,y2,x3,y3,x4,y4] = @unfoldPoints  p1, p2, p3, p4
    angle1 = Math.atan2  y1 - y2, x1 - x2
    angle2 = Math.atan2  y3 - y4, x3 - x4
    return angle1 - angle2

  lineIntersections: (p1, p2, p3, p4) ->
    [x1,y1,x2,y2,x3,y3,x4,y4] = @unfoldPoints  p1, p2, p3, p4
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    if 0 <= ua <= 1 and 0 <= ub <= 1
      @xy  x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)

  randomInRange: (from, to) -> Math.random() * (to - from) + from;

  degToRad: (deg) -> deg * (Math.PI / 180)

  radToDeg: (rad) -> rad * (180 / Math.PI)

  xy: (x, y) -> new Point(x, y)

  radialMove: (start, distance, angle) ->
    radians = @degToRad  angle
    deltaY = Math.sin(radians) * distance
    deltaX = Math.cos(radians) * distance
    @xy  start.x + deltaX, start.y - deltaY


class Point
  constructor: (@x, @y) ->
  toString: -> "(#{@x}, #{@y})"


window.utils = new Utils()