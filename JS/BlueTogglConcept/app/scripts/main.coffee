$ ->
  gradientIn = (from, to) ->
    $("#inrunner").css
      background: "radial-gradient(circle, rgba(32, 115, 145, 0) #{from}px, #207391 #{from}px, rgba(32, 115, 145, 0) #{to}px)"
  gradientIn(0, 100)

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
    delta: 4
    acc: 0.984
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
            startIn()
          speed = params.delta
        if isRunning.stoped
          speed = params.delta + 2
        else
          speed *= params.acc
        runOut(pos + speed, speed)
      else
        isRunning.lastRun = 'out'
        isRunning.out = false


  runIn = (pos, speed=params.delta) ->
    isRunning.in = true
    requestAnimationFrame ->
      gradientIn(pos, pos + params.length)
      if pos > params.inTo
        if not isRunning.out and pos < params.inOutChange
          unless isRunning.stoped
            startOut()
          speed = params.delta
        if isRunning.stoped
          speed = params.delta + 2
        else
          speed *= params.acc
        runIn(pos - speed, speed)
      else
        isRunning.lastRun = 'in'
        isRunning.in = false

  startIn = ->
    $("#outer").css(opacity:1).animate(opacity:0.5, 1500)
    console.timeEnd("bounce")
    console.time("bounce")
    runIn params.inFrom

  startOut = ->
    $("#center").css(opacity:1).animate(opacity:0.9, 1500)
    $("#center-border").css(opacity:1).animate(opacity:0.7, 1500)
    console.timeEnd("bounce")
    console.time("bounce")
    runOut params.outFrom

  $("#clickCatcher").click ->
    isRunning.stoped = not isRunning.stoped
    $("body").toggleClass 'stoped', isRunning.stoped
    unless isRunning.stoped
      console.log isRunning.in, isRunning.out
      if isRunning.lastRun is 'out'
        startIn()
      else
        startOut()


#  radial-gradient(radial, circle, 0, circle, 361, color-stop(72.29917%, rgba(32, 115, 145, 0)), color-stop(72.29917%, #207391), color-stop(100%, #000000))"
#  //@include background(radial-gradient(circle,
#  //  rgba(32, 115, 145, 0) 231px,
#  //  rgba(32, 115, 145, 1) 231px,
#  //  rgba(0, 0, 0, 1) 331px));
