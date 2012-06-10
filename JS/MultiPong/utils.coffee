#Math function extraction
random = Math.random
pow = Math.pow
sqrt = Math.sqrt
log = Math.log
pi = Math.PI
TWOPI = pi * 2
exp = Math.exp
cos = Math.cos
sin = Math.sin

xy = (x, y) -> new Point(x, y)

class Point
  constructor: (@x, @y) ->
  toString: -> "(#{@x}, #{@y})"

exports ?= window
exports.utils =
  randomGauss: (mu, sigma) ->
    #Box–Muller transform implemtation. 2nd variant
    #http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    loop
      x = 2 * random() - 1 # Random value from -1 to 1
      y = 2 * random() - 1
      s = pow(x,2) + pow(y, 2)
      break unless s >= 1 || s == 0

    z = x * sqrt(-2 * log(s) / s)
    return mu + sigma * z

  gauss: (mu, sigma, x) ->
    # calculates the probability of x for 1-dim Gaussian with mean mu and var. sigma
    exp(-(pow((mu - x), 2) / pow(sigma, 2) / 2.0) / sqrt TWOPI * pow(sigma, 2))

  distance: (from, to) ->
    Math.sqrt (Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))

  angleBetweenLines: (p1, p2, p3, p4) ->
    [x1,x2,x3,x4] = [p1.x,p2.x,p3.x,p4.x]
    [y1,y2,y3,y4] = [p1.y,p2.y,p3.y,p4.y]
    angle1 = Math.atan2  y1 - y2, x1 - x2
    angle2 = Math.atan2  y3 - y4, x3 - x4
    return angle1 - angle2

  lineIntersections: (p1, p2, p3, p4) ->
    [x1,x2,x3,x4] = [p1.x,p2.x,p3.x,p4.x]
    [y1,y2,y3,y4] = [p1.y,p2.y,p3.y,p4.y]
    ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    if 0 <= ua <= 1 and 0 <= ub <= 1
      xy x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)

  randomInRange: (from, to) -> Math.random() * (to - from) + from;

  degToRad: (deg) -> deg * (Math.PI / 180)

  radToDeg: (rad) -> rad * (180 / Math.PI)

  xy: xy



