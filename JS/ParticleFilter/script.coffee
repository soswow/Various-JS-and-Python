context = canvasHtml = simulation = null #Semi-Globals placeholders

root = exports ? this #Global scope variable

canvasSize = width: 700, height: 400
particleSize = 5
robotSize = 10
landmarkSize = 10
robotColor = 'red'
landmarkColor = 'red'
shouldStop = false

getFormData = ->
  getVal = (id) -> eval document.getElementById(id).value
  particlesN: getVal('particlesN'),
  landmarksN: getVal('landmarksN'),
  goByOneStep: getVal('goByOneStep'),
  particleForwardNoise: getVal('particleForwardNoise'),
  particleTurnNoise: getVal('particleTurnNoise'),
  particleSenseNoise: getVal('particleSenseNoise'),
  robotForwardNoise: getVal('robotForwardNoise'),
  robotTurnNoise: getVal('robotTurnNoise'),
  robotSenseNoise: getVal('robotSenseNoise'),
  fogOfWar: getVal('fogOfWar')

simulation = null
root.reset = ->
  shouldStop = true
  fd = getFormData()

  landmarksFieldEnv = new LandmarksField(canvasSize.width, canvasSize.height).generateRandom fd.landmarksN
  sensorCreator = (robot) ->
    noise = if robot.isParticle? then fd.robotSenseNoise else fd.particleSenseNoise
    new DistanceSensor(robot, fd.fogOfWar, noise)

  simulation = new Simulation(
      particlesNum: fd.particlesN,
      environment: landmarksFieldEnv,
      sensorCreator: sensorCreator,
      noiseConfig: null,
      initMoveBy: fd.goByOneStep,
      initMakeTurn: 0)
    .initiateParticles
      forward_noise: fd.particleForwardNoise,
      turn_noise: fd.particleTurnNoise,
      sense_noise: fd.particleSenseNoise
    .draw()

root.init = ->
  prepareCanvas()
  root.reset()
root.pause = -> shouldStop = true
root.step = -> animateStep()
root.start = ->
  shouldStop = false
  requestAnimationFrame = window.requestAnimationFrame or window.mozRequestAnimationFrame or
                          window.webkitRequestAnimationFrame or window.msRequestAnimationFrame
  step = (timestamp) ->
    unless shouldStop
      animateStep()
      requestAnimationFrame step

  requestAnimationFrame step

root.toggleLandmark = (e) ->
  simulation.environment.toggleLandmark e.offsetX, e.offsetY
  simulation.draw()

root.trackLandmark = (e) ->
  x = e.offsetX
  y = e.offsetY
  if simulation.environment.findLandmarkIndexAtLocation(x, y)?
    e.target.style.cursor = 'pointer'
  else
    e.target.style.cursor = 'crosshair'

stepNum = 0
currentTurn = 0
turnAfterSteps = 20
stearing = ->
  if stepNum % turnAfterSteps is 0
    if currentTurn is 0
      currentTurn = randomGauss(0, pi/40)
    else
      currentTurn = 0
    turnAfterSteps = Math.round(randomGauss(40-Math.abs(currentTurn*400), 10))
    turnAfterSteps or= 1
  stepNum += 1

animateStep = ->
  canvasHtml.width = canvasHtml.width #clear the canvas
  stearing()
  simulation.step(currentTurn).draw()

prepareCanvas = ->
  canvasHtml = document.getElementById 'canvas'
  canvasHtml.width = canvasSize.width
  canvasHtml.height = canvasSize.height
  context = canvasHtml?.getContext? '2d'

class DistanceSensor
  constructor: (@robot, @maxRange, @sense_noise)->

  sense: ->
    measurement = []
    for landmark in @robot.environment.landmarks
      dist = distance(@robot, landmark) + randomGauss(0, @sense_noise)
      if dist < @maxRange
        measurement.push dist
    measurement.sort (a,b)->a-b

  measurementProbability: (otherRobotMeasurements) ->
    #TODO Can be extracted to superclass
    probs = 1.0
    myMeasurements = @sense()
    unless myMeasurements.length is otherRobotMeasurements.length
      return 0
    for myMeasurement, i in myMeasurements
      prob = gauss myMeasurement, @sense_noise, otherRobotMeasurements[i]
      probs *= prob
    probs

  draw: ->
    x = @robot.x
    y = @robot.y
    context.beginPath()
    context.strokeStyle = robotColor
    context.moveTo x + @maxRange, y
    context.arc x, y, @maxRange, 0, TWOPI, true
    context.closePath()
    context.stroke()



class LandmarksField
  constructor: (@fieldWidth, @fieldHeight) ->
    @halfSize = landmarkSize / 2
    @landmarks = []

  generateRandom: (n) ->
    rand = (mult) -> Math.round(random() * mult)
    @landmarks = (x:rand(@fieldWidth), y:rand(@fieldHeight) for i in [1..n])
    @

  findLandmarkIndexAtLocation: (x,y) ->
    for landmark, i in @landmarks
      lx = landmark.x
      ly = landmark.y
      if  x > lx - @halfSize and x < lx + @halfSize and
          y > ly - @halfSize and y < ly + @halfSize
        return i

  toggleLandmark: (x, y) ->
    landmarkIndex = @findLandmarkIndexAtLocation x, y
    if landmarkIndex?
      @landmarks.splice landmarkIndex, 1
    else
      @landmarks.push x:x, y:y
    @

  draw: ->
    context.strokeStyle = landmarkColor
    for landmark,i in @landmarks
      context.beginPath()
      x = landmark.x + 0.5
      y = landmark.y + 0.5
      context.moveTo x, y - @halfSize
      context.lineTo x, y + @halfSize
      context.moveTo x - @halfSize, y
      context.lineTo x + @halfSize, y
      context.closePath()
      context.stroke()
    @


class Simulation
  constructor: (config)->
    @N = config.particlesNum
    @environment = config.environment
    @sensorCreator = config.sensorCreator
    @myrobot = new Robot(@environment, @sensorCreator)
    @myrobot.set_noise(config.noiseConfig) if config.noiseConfig
    @particles = []
    @moveBy = config.initMoveBy or 1
    @makeTurn = config.initMakeTurn or 0

  initiateParticles: (noiseConfig=@noiseConfig) ->
    noiseConfig or= forward_noise: 0.05, turn_noise: pi/20
    @noiseConfig = noiseConfig
    @particles = (new Robot(@environment, @sensorCreator, true).set_noise noiseConfig for i in [1..@N])
    @

  drawParticles: ->
    particleDensity = {}
    for particle,i in @particles
      tag = "#{Math.round(particle.x)}-#{Math.round(particle.y)}"
      if tag in Object.keys particleDensity
        particleDensity[tag].density += 1
      else
        particleDensity[tag] = density:1, particle: particle

    maxDensity = max(obj.density for k, obj of particleDensity)

    for key, value of particleDensity
      weight = value.density / maxDensity
      color = "rgba(0,0,0,#{weight})"
      value.particle.draw particleSize, color

  draw: ->
    clearCanvas()
    @environment.draw()
    @drawParticles()
    @myrobot.draw robotSize, robotColor
    @

  step: (makeTurn=@makeTurn, moveBy=@moveBy)->
    # Move and Sense
    @myrobot = @myrobot.move makeTurn, moveBy, true
    mainRobotMeasurements = @myrobot.sense()

    # Move particles with same actions as main robot
    particles = (p.move makeTurn, moveBy, true for p in @particles)

    weights = (p.sensor.measurementProbability mainRobotMeasurements for p in particles)

    #Resampling stange
    resampledParticles = []
    index = Math.round(random() * @N)
    beta = 0
    mw = max(weights)
    if mw > 0
      for i in [0..@N]
        beta += random() * 2.0 * mw
        while beta > weights[index]
          beta -= weights[index]
          index = (index + 1) % @N
        resampledParticles.push particles[index]
      @particles = resampledParticles
    else
      @initiateParticles()
    @draw()


class Robot
  constructor: (@environment, @sensorCreator, @isParticle=false) ->
    @x = Math.round(random() * canvasSize.width)+0.5
    @y = Math.round(random() * canvasSize.height)+0.5
    @orientation = random() * TWOPI
    @forward_noise = 0
    @turn_noise = 0
    @sensor = @sensorCreator @

  set: (new_x, new_y, new_orientation) ->
    if new_x < 0 or new_x >= canvasSize.width
      throw 'X coordinate out of bound'
    if new_y < 0 or new_y >= canvasSize.height
      throw 'Y coordinate out of bound'
    if new_orientation < 0 or new_orientation >= TWOPI
      throw 'Orientation must be in [0..2pi]'
    @x = new_x
    @y = new_y
    @orientation = new_orientation
    @

  set_noise: (noiseConfig) ->
    @forward_noise = noiseConfig.forward_noise
    @turn_noise = noiseConfig.turn_noise
    @

  sense: -> @sensor.sense()


  move: (turn, forward, makeNew=false) ->
    if forward < 0
      throw 'Robot cant move backwards'

    # turn, and add randomness to the turning command
    orientation = @orientation + turn + randomGauss 0, @turn_noise
    orientation = mod orientation, TWOPI

    # move, and add randomness to the motion command
    dist = forward + randomGauss 0, @forward_noise
    x = @x + cos(orientation) * dist
    y = @y + sin(orientation) * dist
    x = mod x, canvasSize.width    # cyclic truncate
    y = mod y, canvasSize.height

    if makeNew
      robot = if makeNew then new Robot(@environment, @sensorCreator, @isParticle).set_noise({
        forward_noise: @forward_noise,
        turn_noise: @turn_noise,
        sense_noise: @sense_noise
      })
    else
      robot = @
    robot.set x, y, orientation

  toString: ->
    "[x=#{@x} y=#{@y} orient=#{@orientation}]"

  draw: (R, color) ->
    context.beginPath()
    context.strokeStyle = color
    context.arc @x, @y, R, 0, TWOPI, true
    context.moveTo @x, @y
    context.lineTo @x + R * cos(@orientation), @y + R * sin(@orientation)
    context.closePath()
    context.stroke()
    unless @isParticle
      @sensor.draw()

  drawText: (text) ->
    context.font = 'normal 8px'
    context.strokeStyle = 'black'
    context.fillText text, @x+8.5, @y+3.5


#Util methods implementation
clearCanvas = -> canvasHtml.width = canvasHtml.width

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

max = (arr) ->
  result = -Number.MAX_VALUE
  for el in arr
    if el > result
      result = el
  result

sum = (arr) ->
  _sum = 0
  for el in arr
    _sum+=el
  _sum

randomGauss = (mu, sigma) ->
  #Box–Muller transform implemtation. 2nd variant
  #http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
  loop
    x = 2 * random() - 1 # Random value from -1 to 1
    y = 2 * random() - 1
    s = pow(x,2) + pow(y, 2)
    break unless s >= 1 || s == 0

  z = x * sqrt(-2 * log(s) / s)
  #  console.log "Gauss (#{mu}, #{sigma}) -> #{res}"
  mu + sigma * z


gauss = (mu, sigma, x) ->
  # calculates the probability of x for 1-dim Gaussian with mean mu and var. sigma
  exp(-(pow((mu - x), 2) / pow(sigma, 2) / 2.0) / sqrt TWOPI * pow(sigma, 2))

#Modulo function which gives mod(-3, 10) == 7 (not -3 as in pure JS)
mod = (a, b) -> a % b + (if a < 0 then b else 0)

distance = (from, to) ->
  sqrt (pow((from.x - to.x), 2) + pow((from.y - to.y), 2))