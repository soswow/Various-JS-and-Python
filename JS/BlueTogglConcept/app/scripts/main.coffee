$ ->
  gradientIn = (from, to) ->
    $("#inrunner").css
      background: "radial-gradient(circle, rgba(32, 115, 145, 0) #{from}px, #207391 #{from}px, rgba(32, 115, 145, 0) #{to}px)"

  gradientOut = (from, to) ->
    $("#outrunner").css
      background: "radial-gradient(circle, rgba(0, 0, 0, 0) #{from}px, rgba(32, 115, 145, 0) #{from}px, #207391 #{to}px, rgba(32, 115, 145, 0) #{to}px)"

  window.params = {
    inFrom: 267
    inOutChange: 140
    inTo: 0
    outFrom: 30
    outInChange: 167
    outTo: 267
    length: 100
    delta: 3.3
  }

  isRunning =
    stoped: true
    in: false
    out: false
    lastRun: null

  runOut = (pos, speed=params.delta) ->
#    console.log 'out'
    isRunning.out = true
    requestAnimationFrame ->
      gradientOut(pos, pos + params.length)
      if pos < params.outTo
        if not isRunning.in and pos > params.outInChange
          unless isRunning.stoped
            console.log "switch to in"
            $("#outer").css(opacity:1).animate(opacity:0.5, 2000)
            runIn params.inFrom
          speed = params.delta
        if isRunning.stoped
          speed = params.delta + 2
        else
          speed *= 0.984
        runOut(pos + speed, speed)
      else
        isRunning.lastRun = 'out'
        isRunning.out = false

  runIn = (pos, speed=params.delta) ->
#    console.log 'in'
    isRunning.in = true
    requestAnimationFrame ->
      gradientIn(pos, pos + params.length)
      if pos > params.inTo
        if not isRunning.out and pos < params.inOutChange
          unless isRunning.stoped
            console.log "switch to out"
            $("#center").css(opacity:1).animate(opacity:0.9, 2000)
            runOut params.outFrom
          speed = params.delta
        if isRunning.stoped
          speed = params.delta + 2
        else
          speed *= 0.984
        runIn(pos - speed, speed)
      else
        isRunning.lastRun = 'in'
        isRunning.in = false

  $("#clickCatcher").click ->
    isRunning.stoped = not isRunning.stoped
    unless isRunning.stoped
      console.log isRunning.in, isRunning.out
      if isRunning.lastRun is 'out'
        runIn params.inFrom
      else
        $("#center").css(opacity:1).animate(opacity:0.9, 2000)
        runOut params.outFrom


#  radial-gradient(radial, circle, 0, circle, 361, color-stop(72.29917%, rgba(32, 115, 145, 0)), color-stop(72.29917%, #207391), color-stop(100%, #000000))"
#  //@include background(radial-gradient(circle,
#  //  rgba(32, 115, 145, 0) 231px,
#  //  rgba(32, 115, 145, 1) 231px,
#  //  rgba(0, 0, 0, 1) 331px));
