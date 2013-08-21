console.log 'start'

dirPin1 = 8
stepPin1 = 9
dirPin2 = 10
stepPin2 = 11

firmata = require('firmata')
board = new firmata.Board("/dev/cu.usbserial-A700ejJW", (err) ->
  return console.log(err) if err
  console.log('connected')
#  console.log "pins", board.pins
#  console.log "analpins", board.analogPins
#  console.log "version", board.version
#  console.log "firmware", board.firmware
  board.pinMode dirPin1, board.MODES.OUTPUT
  board.pinMode stepPin1, board.MODES.OUTPUT
  board.pinMode dirPin2, board.MODES.OUTPUT
  board.pinMode stepPin2, board.MODES.OUTPUT
  board.digitalWrite dirPin1, board.HIGH
  board.digitalWrite dirPin2, board.HIGH
  doStep()
)

doStep = ->
  board.digitalWrite stepPin1, board.HIGH
  board.digitalWrite stepPin1, board.LOW

  board.digitalWrite stepPin2, board.HIGH
  board.digitalWrite stepPin2, board.LOW

  setTimeout doStep, 3
