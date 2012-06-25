W = 600
H = 400
$ ->
  cEl = $ "#canvas"
  cEl.attr 'width': W, 'height': H
  c = cEl.get(0).getContext('2d')

  space = new Space(c)
  ball = new Ball(10)
  space.objects.push  ball
  space.draw()
  mainLoop  space

quite = false
output = []

now = Date.now
maxDis = 200
mainLoop = (space) ->
  c = 0
  prevT = now()
  initPos = space.objects[0].pos.copy()
  runOnce = (frameTime) ->
    t = frameTime - prevT
    prevT = frameTime

    space.move  t

    dis = distance initPos, space.objects[0].pos
    console.log t
    space.draw()
    quite = true if dis >  maxDis
    requestAnimFrame runOnce if not quite

  runOnce prevT
    


class RigObject
  constructor: (@pos, @vel, @acl, @rot=[0, 0], @mass=1) ->
    @pos or= vector  W/2, H/2 #Position
    @vel or= vector  0.1, 0.02 #Velocity in x and y directions
    @acl or= vector  0, 0 #Acceleration in x and y directions
    #@rot => [Rotation speed, rotation acceleration]
    #@mass => Mass of the object
    #force = mass * acceleration

  # angle: (newAngle) -> 
    # randomInRange  0, TWOPI

  move: (dt) ->
    initPos = @pos.copy()
    for axis in ['x','y']
      @pos[axis] += @vel[axis] * dt
      @vel[axis] += @acl[axis] * dt
    # output.push  distance initPos, @pos
    # console.log distance initPos, @pos


class Ball extends RigObject
  constructor: (@size, superArgs...) ->
    super(superArgs...)

  draw: (c) ->
    c.beginPath()
    c.arc @pos.x, @pos.y, @size, 0, TWOPI, true
    c.fill()
    c.closePath()

  copy: -> new Ball(@pos, @vel, @acl, @rot, @mass)



class Space
  constructor: (@canvas, @fric=1) ->
    @objects = []

  move: (dt) ->
    obj.move(dt) for obj in @objects
  
  draw: ->
    @canvas.canvas.width = @canvas.canvas.width
    obj.draw(@canvas) for obj in @objects




class Vector
  constructor: (@x, @y) ->
  copy: -> new Vector(@x, @y)

vector= (x,y) -> new Vector(x,y)

randomInRange= (from, to) -> Math.random() * (to - from) + from;

degToRad= (deg) -> deg * (Math.PI / 180)

radToDeg= (rad) -> rad * (180 / Math.PI)

distance= (from, to) ->
    Math.sqrt(Math.pow((from.x - to.x), 2) + Math.pow((from.y - to.y), 2))

TWOPI = Math.PI * 2