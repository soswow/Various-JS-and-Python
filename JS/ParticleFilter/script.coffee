context = canvasHtml = simulation = null #Semi-Globals placeholders

root = exports ? this #Global scope variable

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

canvasSize = width: 700, height: 400
shouldStop = false

getFormData = ->
  getVal = (id) -> eval document.getElementById(id).value
  particlesN: getVal('particlesN'),
  landmarksN: getVal('landmarksN'),
  goByOneStep: getVal('goByOneStep'),
  particleForwardNoise: getVal('particleForwardNoise'),
  particleTurnNoise: getVal('particleTurnNoise'),
  particleSenseNoise: getVal('particleSenseNoise')

root.reset = ->
  #landmarks = [{x:100, y:100}, {x:200, y:350}]
  #landmarks = [{x:100, y:100}]
  canvasHtml.width = canvasHtml.width #clear the canvas
  shouldStop = true

  fd = getFormData()
  landmarks =  (x:Math.round(random()*canvasSize.width), y:Math.round(random()*canvasSize.height) for i in [0..fd.landmarksN-1])
  simulation = new Simulation(fd.particlesN, landmarks, null, fd.goByOneStep, 0)
    .initiateParticles
      forward_noise: fd.particleForwardNoise,
      turn_noise: fd.particleTurnNoise,
      sense_noise: fd.particleSenseNoise
    .draw false

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

class Simulation
  constructor: (particlesNum, landmarks, noiseConfig, initMoveBy=1, initMakeTurn=0)->
    @N = particlesNum
    @landmarks = landmarks
    @myrobot = new Robot().setColor 'red'
    @myrobot.set_noise(noiseConfig) if noiseConfig
    @particles = []
    @moveBy = initMoveBy
    @makeTurn = initMakeTurn

  initiateParticles: (noiseConfig, color='gray') ->
    noiseConfig or= forward_noise: 0.05, turn_noise: pi/20, sense_noise: 5
    @particles = (new Robot().setColor(color).set_noise noiseConfig for i in [0..@N])
    @

  draw: (isRobotFirst=true) ->
    unless isRobotFirst
      @myrobot.draw(10)
    @drawLandmarks()
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
      value.particle.draw(5, color)

    if isRobotFirst
      @myrobot.draw(10)
    @

  drawLandmarks: (withLabels=false) ->
    size = 10 / 2
    context.strokeStyle = "black"
    for landmark,i in @landmarks
      context.beginPath()
      x = landmark.x + 0.5
      y = landmark.y + 0.5
      context.moveTo x, y - size
      context.lineTo x, y + size
      context.moveTo x - size, y
      context.lineTo x + size, y
      if withLabels
        context.font = 'normal 8px'
        context.strokeStyle = 'black'
        context.fillText i, x+8.5, y+3.5
      context.closePath()
      context.stroke()
    @

  step: (makeTurn=@makeTurn, moveBy=@moveBy)->
#    makeTurn = randomGauss(0, pi/20)

    # Move and Sense
    @myrobot = @myrobot.move(makeTurn, moveBy, true)
    Z = @myrobot.sense(@landmarks)

    # Move particles with same actions as main robot
    particles = (p.move makeTurn, moveBy, true for p in @particles)

    weights = []
    for p, i in particles
      #console.log i
      weights.push p.measurement_prob(Z, @landmarks)

#    weightsSum = sum(weights)
#    weightsNormalized = (w / weightsSum for w in weights)

    #Resampling stange
    resampledParticles = []
    index = Math.round(random() * @N)
    beta = 0
    mw = max(weights)
    for i in [0..@N]
      beta += random() * 2.0 * mw
      while beta > weights[index]
        beta -= weights[index]
        index = (index + 1) % @N
      resampledParticles.push particles[index]

    @particles = resampledParticles
    @.draw false


class Robot
  constructor: ->
    @x = Math.round(random() * canvasSize.width)+0.5
    @y = Math.round(random() * canvasSize.height)+0.5
    @orientation = random() * TWOPI
    @forward_noise = 0
    @turn_noise = 0
    @sense_noise = 0
    @color = 'black'

  set: (new_x, new_y, new_orientation, color) ->
    if new_x < 0 or new_x >= canvasSize.width
      throw 'X coordinate out of bound'
    if new_y < 0 or new_y >= canvasSize.height
      throw 'Y coordinate out of bound'
    if new_orientation < 0 or new_orientation >= TWOPI
      throw 'Orientation must be in [0..2pi]'
    @x = new_x
    @y = new_y
    @orientation = new_orientation
    @color = color if color
    @

  setColor: (@color) -> @

  set_noise: (noiseConfig) ->
    @forward_noise = noiseConfig.forward_noise
    @turn_noise = noiseConfig.turn_noise
    @sense_noise = noiseConfig.sense_noise
    @

  sense: (landmarks) ->
    (distance(@, lendmark) + randomGauss(0, @sense_noise) for lendmark in landmarks)
      .sort (a,b)->a-b

  move: (turn, forward, makeNew=false) ->
    if forward < 0
      throw 'Robot cant move backwards'

    # turn, and add randomness to the turning command
    orientation = @orientation + turn + randomGauss 0.0, @turn_noise
    orientation = mod orientation, TWOPI

    # move, and add randomness to the motion command
    dist = forward + randomGauss 0.0, @forward_noise
    x = @x + cos(orientation) * dist
    y = @y + sin(orientation) * dist
    x = mod x, canvasSize.width    # cyclic truncate
    y = mod y, canvasSize.height

    if makeNew
      robot = if makeNew then new Robot().set_noise({
        forward_noise: @forward_noise,
        turn_noise: @turn_noise,
        sense_noise: @sense_noise
      })
    else
      robot = @
    robot.set x, y, orientation, @color

  measurement_prob: (measurements, landmarks) ->
    # calculates how likely a measurement should be
    dists = (distance(@, landmark) for landmark in landmarks)
      .sort (a, b) -> a-b
    probs = 1.0
    for dist, i in dists
      prob = gauss dist, @sense_noise, measurements[i]
      probs *= prob
    probs

  toString: ->
    "[x=#{@x} y=#{@y} orient=#{@orientation}]"

  draw: (R = 10, color = @color) ->
#    console.log(@x, @y, R, color)
    context.beginPath()
    context.strokeStyle = color
    context.arc @x, @y, R, 0, TWOPI, true
    context.moveTo @x, @y
    context.lineTo @x + R * cos(@orientation), @y + R * sin(@orientation)
    context.closePath()
    context.stroke()

  drawText: (text) ->
    context.font = 'normal 8px'
    context.strokeStyle = 'black'
    context.fillText text, @x+8.5, @y+3.5


#Util methods implementation
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