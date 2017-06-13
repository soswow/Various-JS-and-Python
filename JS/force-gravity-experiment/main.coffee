W = 900
H = 400

now = Date.now
mainLoop = ->
  env = new Environment()
  center = new P(W/2,H/2)
  obj = new RigObject(center, 10)
  env.friction = 0.00005
  env.gravity = new Force(0, 0.0005)
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
    forceAmount = 0.0008
    
    env.controllable.kick  keysState.up*forceAmount, keysState.down*forceAmount,
      keysState.left*forceAmount, keysState.right*forceAmount
    env.nextTick t

    if obj.pos.y > H
      obj.pos.y = H

    canvas.attr width:W, height:H
    draw  ctx, env
    requestAnimFrame -> runOnce(now())

  runOnce prevT

draw = (ctx, env) ->
  for obj in env.objects
    # Draw velocity
    ctx.beginPath()
    ctx.moveTo(obj.pos.x, obj.pos.y)
    velocity = obj.velocity.clone()
    velocity.setAmount(velocity.getAmount() * 2000)
    ctx.lineTo(obj.pos.x + velocity.x, obj.pos.y + velocity.y)
    ctx.strokeStyle = 'red';
    ctx.stroke()
    # Draw Ball
    ctx.beginPath()
    ctx.arc obj.pos.x, obj.pos.y, obj.mass, 0, 2 * Math.PI, true
    ctx.closePath()
    ctx.fill()


mainLoop()


