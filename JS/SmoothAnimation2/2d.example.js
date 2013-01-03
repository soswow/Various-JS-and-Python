(function() {

  $(function() {
    var Utils, cons, container, containerHeight, containerWidth, keyStatus, log1, makeLooper, object, objectHeight, objectWidth, prevT, state, stateLoop, stateLooper, tickOneAxis, uiLoop, uiLooper;
    Utils = (function() {

      function Utils() {}

      Utils.distance = function(from, to) {
        return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
      };

      Utils.getAngle = function(x, y) {
        return this.mod(Math.atan2(y, x), this.TWOPI);
      };

      Utils.degToRad = function(deg) {
        return deg * (Math.PI / 180);
      };

      Utils.radToDeg = function(rad) {
        return rad * (180 / Math.PI);
      };

      Utils.mod = function(a, b) {
        return a % b + (a < 0 ? b : 0);
      };

      Utils.TWOPI = Math.PI * 2;

      return Utils;

    })();
    state = {
      x: -1,
      y: -1,
      sx: 0,
      sy: 0
    };
    cons = {
      maxSpeed: 1,
      acceleration: 0.001,
      friction: 0.98
    };
    keyStatus = {
      left: false,
      right: false,
      up: false,
      down: false,
      horizontal: function() {
        if (this.left === this.right) {
          return 0;
        } else if (this.left) {
          return -1;
        } else {
          return 1;
        }
      },
      vertical: function() {
        if (this.up === this.down) {
          return 0;
        } else if (this.up) {
          return -1;
        } else {
          return 1;
        }
      }
    };
    $(document).on('keyup keydown', function(e) {
      if (e.keyCode === 37) {
        return keyStatus.left = e.type === 'keydown';
      } else if (e.keyCode === 39) {
        return keyStatus.right = e.type === 'keydown';
      } else if (e.keyCode === 38) {
        return keyStatus.up = e.type === 'keydown';
      } else if (e.keyCode === 40) {
        return keyStatus.down = e.type === 'keydown';
      }
    });
    object = $("#object");
    container = $("#container");
    log1 = $("#log1");
    containerWidth = container.width();
    objectWidth = object.width();
    containerHeight = container.height();
    objectHeight = object.width();
    tickOneAxis = function(speedKey, stateKey, direction, dt, objectSize, arendSize) {
      var newState;
      state[speedKey] += cons.acceleration * keyStatus[direction]() * dt;
      if (state[speedKey] > cons.maxSpeed) state[speedKey] = cons.maxSpeed;
      state[speedKey] *= cons.friction;
      if (Math.abs(state[speedKey]) < 0.009) state[speedKey] = 0;
      newState = state[stateKey] + dt * state[speedKey];
      if (newState < -1) newState = arendSize - 1;
      if (newState > arendSize - objectSize && state[speedKey] > 0) newState = -1;
      return state[stateKey] = newState;
    };
    stateLoop = function(dt) {
      tickOneAxis("sx", "x", "horizontal", dt, objectWidth, containerWidth);
      return tickOneAxis("sy", "y", "vertical", dt, objectHeight, containerHeight);
    };
    uiLoop = function() {
      var angle;
      angle = Utils.radToDeg(Utils.getAngle(state.sx, state.sy));
      return object.css({
        'left': state.x,
        'top': state.y,
        '-webkit-transform': "rotate(" + angle + "deg)"
      });
    };
    prevT = Date.now();
    makeLooper = function(loopFunc) {
      var looper;
      return looper = function(frameTime) {
        var t;
        t = frameTime - prevT;
        loopFunc(t);
        prevT = frameTime;
        return requestAnimFrame(looper);
      };
    };
    stateLooper = makeLooper(stateLoop);
    uiLooper = makeLooper(uiLoop);
    stateLooper(prevT);
    return uiLooper(prevT);
  });

}).call(this);
