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

canvasSize = width: 500, height: 400
shouldStop = false

root.reset = ->
  #landmarks = [{x:100, y:100}, {x:200, y:350}]
  #landmarks = [{x:100, y:100}]
  canvasHtml.width = canvasHtml.width #clear the canvas
  shouldStop = true
  landmarks = [{x:100, y:100}, {x:200, y:350}, {x:400, y:370}, {x:270, y:90}, {x:350, y:200}]
  N = 100
  simulation = new Simulation(N, landmarks, null, 1, 0).initiateParticles().draw(false)

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
    animateStep()
    unless shouldStop
      requestAnimationFrame step

  requestAnimationFrame step

animateStep = ->
  canvasHtml.width = canvasHtml.width #clear the canvas
  simulation.step(randomGauss(0, pi/20)).draw()

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
    if isRobotFirst
      @myrobot.draw(10)
    @drawLandmarks()
    for particle,i in @particles
      particle.draw(5)
    unless isRobotFirst
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
    distance(@, lendmark) + randomGauss(0, @sense_noise) for lendmark in landmarks

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

  measurement_prob: (measurement, landmarks) ->
    # calculates how likely a measurement should be
    probs = 1.0
    for landmark, i in landmarks
      dist = distance(@, landmark)
      prob = gauss dist, @sense_noise, measurement[i]
      #console.log "Prob for landmark #{i} (#{landmark.x}, #{landmark.y}): ", "#{dist} vs #{measurement[i]}", "->", Math.round(prob * 1000000) / 1000000
      probs *= prob
    pp = Math.round(probs * 1000000) / 1000000
    #console.log("Prob product: #{pp}")
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