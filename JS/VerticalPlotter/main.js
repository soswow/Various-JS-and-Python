// Generated by CoffeeScript 1.6.3
(function() {
  var board, dir, dirPin1, dirPin2, doStep, firmata, goDown, goRight, goUp, kill, prevWas, stepLeft, stepNo, stepPin1, stepPin2, stepRight;

  console.log('start');

  dirPin1 = 8;

  stepPin1 = 9;

  dirPin2 = 10;

  stepPin2 = 11;

  dir = null;

  goUp = function() {
    board.digitalWrite(dirPin2, board.HIGH);
    board.digitalWrite(dirPin1, board.LOW);
    return dir = "up";
  };

  goDown = function() {
    board.digitalWrite(dirPin2, board.LOW);
    board.digitalWrite(dirPin1, board.HIGH);
    return dir = "down";
  };

  goRight = function() {
    board.digitalWrite(dirPin2, board.LOW);
    return board.digitalWrite(dirPin1, board.LOW);
  };

  firmata = require('firmata');

  board = new firmata.Board("/dev/cu.usbserial-A700ejJW", function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('connected');
    board.pinMode(dirPin2, board.MODES.OUTPUT);
    board.pinMode(stepPin2, board.MODES.OUTPUT);
    goDown();
    return doStep();
  });

  stepRight = function() {
    board.digitalWrite(stepPin2, board.HIGH);
    return board.digitalWrite(stepPin2, board.LOW);
  };

  stepLeft = function() {
    board.digitalWrite(stepPin1, board.HIGH);
    return board.digitalWrite(stepPin1, board.LOW);
  };

  kill = false;

  stepNo = 0;

  prevWas = 'down';

  doStep = function() {
    stepRight();
    if (!kill) {
      setTimeout(doStep, 10);
    }
    return stepNo += 1;
  };

  process.on('SIGINT', function() {
    kill = true;
    console.log("\ngracefully shutting down from  SIGINT (Crtl-C)");
    console.log("" + stepNo + " steps done");
    board.digitalWrite(stepPin1, board.LOW);
    board.digitalWrite(stepPin2, board.LOW);
    return process.exit();
  });

}).call(this);
