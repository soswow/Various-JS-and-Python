info = document.getElementById("info");
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
  moveByDelta: (dPos, dt) ->
    @setX(@x + dPos.x * dt)
    @setY(@y + dPos.y * dt)
  setX: (@x=@x) ->
    @x = 0 if Math.abs(@x) < 0.0000001
  setY: (@y=@y) ->
    @y = 0 if Math.abs(@y) < 0.0000001
  toString: -> "(#{@x}, #{@y})"

point = (x,y) -> new Point(x,y)


class Vector extends P
  @sum= (vectors) -> 
    if vectors?.length > 0
      vectors.reduce (prev, next) -> prev.plus(next)
    else
      new this()

  constructor: (args...) ->
    super(args...)

  getAngle: -> Utils.getAngle  @x, @y

  getAmount: -> Utils.distance  new P(0,0), this

  # addAmount: (deltaAmount=0) -> @setAmount  @amount + deltaAmount
  
  setAmount: (amount) ->
    if Math.abs(@x) > 0 or Math.abs(@y) > 0
      angle = @getAngle()
      # @x = Math.cos(angle) * amount
      # @y = Math.sin(angle) * amount
      @setX(Math.cos(angle) * amount)
      @setY(Math.sin(angle) * amount)
    return this

  plus: (otherVector) -> new @constructor(@x + otherVector.x, @y + otherVector.y)

  toString: -> 
    "#{@constructor.name} is #{@getAmount()} (#{@constructor.unit}) pointing @ #{Utils.radToDeg(@getAngle())} deg."

  oposite: (amount) ->  
    new Vector(-@x, -@y).setAmount(amount)

  clone: () -> new Vector(@x, @y)


class Velocity extends Vector
  @unit = "px/ms"
  
  accelerate: (force, mass, dt) ->
    accel = force.clone()
    accel.setAmount(force.getAmount() / mass)
    @moveByDelta(accel, dt)
  
class Force extends Vector
  @unit = "N"

class Environment
  constructor: () ->
    @gravity = new Force()
    @airResist = 0 # in Newton, no directiob specified
    @friction = 0
    @objects = []
  
  addObject: (obj, controllable=false) ->
    obj.env = this
    @objects.push  obj
    @controllable = obj if controllable
    
  nextTick: (dt) ->
    #TODO All object should be moved simultaneously
    #Collition detection also should be hangled here
    @objects.map (o) -> o.nextTick  dt
  
class Momentum extends Vector
  @unit = "(kg*px)/ms"

  constructor: (mass, velocity) ->
    super(velocity.x, velocity.y)
    @setAmount(mass * velocity.getAmount())


class RigObject
  constructor: (@pos, @mass, @velocity) ->
    @velocity or= new Velocity()
    @forces = []

  netForce: -> 
    applied = Force.sum  @forces
    @forces = [] #clearing the applied forces
    force = applied.plus @env.gravity
    airResist = @velocity.oposite @env.airResist
    friction = @velocity.oposite @env.friction
    netForce = Force.sum [force, airResist, friction]
    return netForce
    
  nextTick: (dt) -> #assumes forces are filled before.
    if @friction > @velocity.amount
      @velocity.setAmount 0
    netForce = @netForce()
    @velocity.accelerate  netForce, @mass, dt
    @pos.moveByDelta  @velocity, dt
    info.innerHTML = @velocity + "<br/>" + netForce + "<br/>" + @getMomentum() + "<br/>" + @pos

  getMomentum: () -> new Momentum(@mass, @velocity)

  kick: (up=0, down=0, left=0, right=0) ->
    @forces.push  new Force(0, -up) if up
    @forces.push  new Force(0, down) if down
    @forces.push  new Force(-left, 0) if left
    @forces.push  new Force(right, 0) if right

exports = window unless exports
exports.P = P
exports.Vector = Vector
exports.Force = Force
exports.RigObject = RigObject
exports.Environment = Environment
exports.Velocity = Velocity