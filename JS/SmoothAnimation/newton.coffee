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
  constructor: (@x=0, @y=0) ->
  distance: (toPoint) -> Utils.distance  this, toPoint

point = (x,y) -> new Point(x,y)


class Vector extends P
  @sum= (vectors) -> vectors.reduce (prev, next) -> prev.plus(next)

  constructor: (args...) ->
    super(args...)
    @amount = @getAmount()
    @angle = @getAngle()

  getAngle: -> Utils.getAngle  @x, @y

  getAmount: -> Utils.distance  new P(0,0), this

  addAmount: (deltaAmount=0) -> @setAmount  @amount + deltaAmount
  
  setAmount: (@amount=@amount) ->
    @x = Math.cos(angle) * @amount
    @y = Math.sin(angle) * @amount
    return this

  plus: (otherVector) -> new @constructor(@x + otherVector.x, @y + otherVector.y)

  toString: -> 
    "#{@constructor.name} is #{@amount.roundTo(3)} (#{@constructor.unit}) pointing @ #{Utils.radToDeg(@angle).roundTo(3)} deg."


class MotionState extends Vector
  @unit = "Px/ms"
  
  accelerate: (accel, dt) -> @addAmount  accel * dt

  
class Force extends Vector
  @unit = "N"

  oposite: (amount) ->
    new Force(-@x, -@y).setAmount(amount)


class Environment
  constructor: ->
    @gravity = new Force()
    @airResist = 0 # in Newton, no directiob specified
    @friction = 0
    @objects = []
  
  addObject: (obj) ->
    obj.env = this
    @objects.push  obj
    
  nextTick: ->
    #TODO All object should be moved simultaneously
    #Collition detection also should be hangled here
    @objects.map (o) -> o.nextTick()
    

class RigObject
  constructor: (@pos, @mass, @motion) ->
    @motion or= new MotionState()
    @forces = []

  netForce: -> 
    applied = Force.sum  @forces
    @forces = [] #clearing the applied forces
    force = applied.plus  @env.gravity
    airResist = force.oposite  @env.airResist
    friction = force.oposite  @env.friction
    netForce = Force.sum [force, airResist, friction]
    
  nextTick: (dt) -> #assumes forces are filled before.
    @motion.accelerate  @netForce() / @mass, dt
    @pos.move  @motion, dt

