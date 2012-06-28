Array::sum or= -> this.reduce  (a,b) -> a+b

Number::roundTo or= (decNum=0) -> 
  mult = Math.pow  10, decNum
  return Math.round(@valueOf() * mult) / mult

Array::mapKeys or= (prop) -> this.map (el) -> el[prop]

class Utils
  @distance = (from, to) -> Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))
  
  @getAngle = (x, y) -> @mod (Math.atan2  y, x), @TWOPI
  
  @degToRad= (deg) -> deg * (Math.PI / 180)

  @radToDeg= (rad) -> rad * (180 / Math.PI)

  @mod= (a, b) -> a % b + (if a < 0 then b else 0)

  @TWOPI = Math.PI * 2


class P
  constructor: (@x, @y) ->
  distance: (toPoint) -> Utils.distance  this, toPoint

point = (x,y) -> new Point(x,y)


class Vector extends P
  @sum= (vectors, Constructor) -> 
    new (Constructor or Vector)(vectors.mapKeys('x').sum(), vectors.mapKeys('y').sum())

  constructor: (args...) ->
    super(args...)
    @amount = @getAmount()
    @angle = @getAngle()

  getAngle: -> Utils.getAngle  @x, @y

  getAmount: -> Utils.distance  new P(0,0), this

  setAmount: (@amount=@amount) ->  
    @x = Math.cos(angle) * @amount
    @y = Math.sin(angle) * @amount
    return this

  toString: -> 
    "#{@constructor.name} is #{@amount.roundTo(3)} (#{@constructor.unit}) pointing @ #{Utils.radToDeg(@angle).roundTo(3)} deg."


class MotionState extends Vector
  @unit = "Px/Ms"


class Force extends Vector
  @unit = "N"
  @sum = (vectors) -> Vector.sum(vectors, Force)

  oposite: (amount) ->
    new Force(-@x, -@y).setAmount(amount)


forces = [
  new Force(0, 10)
  new Force(20, 0)
  new Force(-5, 0)
  new Force(0, -5)
]
netF = Force.sum  forces
console.log  netF
console.log  netF+""
# console.log new Force(10, 20)+ ""
# console.log new MotionState(-2, -50) + ""
