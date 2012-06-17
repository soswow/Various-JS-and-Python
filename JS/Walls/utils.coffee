
class Utils
  degToRad: (deg) -> deg * (Math.PI / 180)

  radialMove: (start, distance, angle) ->
    radians = @degToRad  angle
    deltaY = Math.sin(radians) * distance
    deltaX = Math.cos(radians) * distance
    @xy  start.x + deltaX, start.y - deltaY

  xy: (x, y) -> new Point(x, y)


class Point
  constructor: (@x, @y) ->
  toString: -> "(#{@x}, #{@y})"


window.utils = new Utils()