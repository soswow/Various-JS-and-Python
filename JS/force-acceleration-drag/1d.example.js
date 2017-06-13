$(function(){
  var state = {
    x: -1,  //position
    sx: 0   //speed
  };
  var cons = {
    maxSpeed: 1,
    acceleration: 0.001,
    friction: 0.98
  };

  var keyStatus = {
    left: false,
    right: false,
    horizontal: function(){
      if(this.left === this.right){
        return 0;
      }else if(this.left){
        return -1;
      }else{
        return 1;
      }
    }
  };

  $(document).on('keyup keydown', function(e){
    if(e.keyCode == 37){
      keyStatus.left = e.type == 'keydown';
    }else if(e.keyCode == 39){
      keyStatus.right = e.type == 'keydown';
    }
  });

  var object = $("#object");
  var container = $("#container");
  var log1 = $("#log1");
  var containerWidth = container.width();
  var objectWidth = object.width();

  var stateLoop = function(dt){
    state.sx += cons.acceleration * keyStatus.horizontal() * dt;
    if(state.sx > cons.maxSpeed) {
      state.sx = cons.maxSpeed;
    }

    state.sx *= cons.friction;
    if(Math.abs(state.sx) < 0.009){
      state.sx = 0;
    }

    var newx = state.x + dt * state.sx;
    if(newx < -1){
      newx = containerWidth - 1;
    }
    if(newx > containerWidth - objectWidth && state.sx > 0){
      newx = - 1;
    }
    log1.html(state.sx + " " + Math.round(newx));
    state.x = newx;
  };
  var uiLoop = function(){
    object.css('left', state.x);
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