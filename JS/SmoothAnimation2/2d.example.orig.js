$(function(){
  var state = {
    x: -1,  //position
    y: -1,  //position
    sx: 0,   //speed
    sy: 0   //speed
  };
  var cons = {
    maxSpeed: 1,
    acceleration: 0.001,
    friction: 0.98
  };

  var keyStatus = {
    left: false,
    right: false,
    up: false,
    down: false,
    horizontal: function(){
      if(this.left === this.right){
        return 0;
      }else if(this.left){
        return -1;
      }else{
        return 1;
      }
    },
    vertical: function(){
      if(this.up === this.down){
        return 0;
      }else if(this.up){
        return -1;
      }else{
        return 1;
      }
    }
  };

  $(document).on('keyup keydown', function(e){
    console.log(e.keyCode);
    if(e.keyCode == 37){
      keyStatus.left = e.type == 'keydown';
    }else if(e.keyCode == 39){
      keyStatus.right = e.type == 'keydown';
    }else if(e.keyCode == 38){
      keyStatus.up = e.type == 'keydown';
    }else if(e.keyCode == 40){
      keyStatus.down = e.type == 'keydown';
    }
  });

  var object = $("#object");
  var container = $("#container");
  var log1 = $("#log1");
  var containerWidth = container.width();
  var objectWidth = object.width();
  var containerHeight = container.height();
  var objectHeight = object.width();

  var tickOneAxis = function(speedKey, stateKey, direction, dt, objectSize, arendSize){
    state[speedKey] += cons.acceleration * keyStatus[direction]() * dt;
    if(state[speedKey] > cons.maxSpeed) {
      state[speedKey] = cons.maxSpeed;
    }

    state[speedKey] *= cons.friction;
    if(Math.abs(state[speedKey]) < 0.009){
      state[speedKey] = 0;
    }

    var newState = state[stateKey] + dt * state[speedKey];
    if(newState < -1){
      newState = arendSize - 1;
    }
    if(newState > arendSize - objectSize && state[speedKey] > 0){
      newState = - 1;
    }

    state[stateKey] = newState;
  };

  var stateLoop = function(dt){
    tickOneAxis("sx", "x", "horizontal", dt, objectWidth, containerWidth);
    tickOneAxis("sy", "y", "vertical", dt, objectHeight, containerHeight);
  };

  var uiLoop = function(){
    object.css('left', state.x);
    object.css('top', state.y);
  };

  var makeLooper = function(loop){
    return function looper(frameTime) {
      var t = frameTime - prevT;
      loop(t);
      prevT = frameTime;
      return requestAnimFrame(looper);
    };
  };
  var stateLooper = makeLooper(stateLoop);
  var uiLooper = makeLooper(uiLoop);

  var prevT = Date.now();
  stateLooper(prevT);
  uiLooper(prevT)
});