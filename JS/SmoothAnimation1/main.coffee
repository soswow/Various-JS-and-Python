W = 600
H = 400
$ ->
  mainLoop()

now = Date.now
mainLoop = ->
  env = new Environment()
  center = new P(W/2,H/2)
  obj = new RigObject(center, 10)
  env.friction = 0.002
  env.addObject  obj, true

  keysMap = 
    37: 'left'
    39: 'right'
    38: 'up'
    40: 'down'
  keysState = keysStatusMonitor keysMap

  canvas = $('#canvas')
  canvas.attr width:W, height:H
  ctx = canvas.get(0).getContext '2d'

  prevT = now()
  runOnce = (frameTime) ->
    t = frameTime - prevT
    prevT = frameTime
    forceAmount = 0.005
    env.controllable.kick  keysState.up*forceAmount, keysState.down*forceAmount,
      keysState.left*forceAmount, keysState.right*forceAmount
    env.nextTick  t

    canvas.attr width:W, height:H
    draw  ctx, env

    requestAnimFrame runOnce

  runOnce prevT

draw = (ctx, env) ->
  for obj in env.objects
    ctx.beginPath()
    ctx.arc obj.pos.x, obj.pos.y, obj.mass, 0, 2 * Math.PI, true
    ctx.closePath()
    ctx.fill()




