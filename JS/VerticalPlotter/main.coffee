console.log 'start'

dirPin1 = 8
stepPin1 = 9
dirPin2 = 10
stepPin2 = 11
dir = null
goUp = ->
  board.digitalWrite dirPin2, board.HIGH
  board.digitalWrite dirPin1, board.LOW
  dir = "up"

goDown = ->
  board.digitalWrite dirPin2, board.LOW
  board.digitalWrite dirPin1, board.HIGH
  dir = "down"

goRight = ->
  board.digitalWrite dirPin2, board.LOW
  board.digitalWrite dirPin1, board.LOW
#  dir = "right"

firmata = require('firmata')
board = new firmata.Board("/dev/cu.usbserial-A700ejJW", (err) ->
  return console.log(err) if err
  console.log('connected')
#  console.log "pins", board.pins
#  console.log "analpins", board.analogPins
#  console.log "version", board.version
#  console.log "firmware", board.firmware
#  board.pinMode dirPin1, board.MODES.OUTPUT
#  board.pinMode stepPin1, board.MODES.OUTPUT
  board.pinMode dirPin2, board.MODES.OUTPUT
  board.pinMode stepPin2, board.MODES.OUTPUT
  goDown()
  doStep()
)

stepRight = ->
  board.digitalWrite stepPin2, board.HIGH
  board.digitalWrite stepPin2, board.LOW

stepLeft = ->
  board.digitalWrite stepPin1, board.HIGH
  board.digitalWrite stepPin1, board.LOW

kill = false
stepNo = 0
prevWas = 'down'
doStep = ->
  stepRight()
  setTimeout doStep, 10 unless kill
  stepNo += 1

process.on 'SIGINT', ->
  kill = true
  console.log( "\ngracefully shutting down from  SIGINT (Crtl-C)" )
  console.log "#{stepNo} steps done"
  board.digitalWrite stepPin1, board.LOW
  board.digitalWrite stepPin2, board.LOW
  process.exit()