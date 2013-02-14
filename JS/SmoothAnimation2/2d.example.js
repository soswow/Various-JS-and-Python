(function() {

  $(function() {
    var Utils, cons, container, keyStatus, log1, makeLooper, object, prevT, sizes, state, stateLoop, stateLooper, tickOneAxis, tickOneAxis2, uiLoop, uiLooper;
    Utils = (function() {

      function Utils() {}

      Utils.distance = function(from, to) {
        return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
      };

      Utils.getAngle = function(x, y) {
        return this.mod(Math.atan2(y, x), this.TWOPI);
      };

      Utils.getComponent = function(angle, length) {
        return [Math.cos(angle) * length, Math.sin(angle) * length];
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
      sy: 0,
      speed: 0,
      angle: Utils.degToRad(0),
      controlType: 'type1'
    };
    cons = {
      maxSpeed: 1,
      acceleration: 0.001,
      rotationSpeed: 0.3,
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
    $("input[name=control]").click(function() {
      return state.controlType = $(this).val();
    });
    object = $("#object");
    container = $("#container");
    log1 = $("#log1");
    sizes = {
      area: {
        x: container.width(),
        y: container.height()
      },
      object: {
        x: object.width(),
        y: object.height()
      }
    };
    tickOneAxis = function(speedKey, stateKey, direction, dt) {
      var arendSize, newState, objectSize;
      objectSize = sizes.object[stateKey];
      arendSize = sizes.area[stateKey];
      state[speedKey] += cons.acceleration * keyStatus[direction]() * dt;
      if (state[speedKey] > cons.maxSpeed) state[speedKey] = cons.maxSpeed;
      state[speedKey] *= cons.friction;
      if (Math.abs(state[speedKey]) < 0.009) state[speedKey] = 0;
      newState = state[stateKey] + dt * state[speedKey];
      if (newState < -1) newState = arendSize - 1;
      if (newState > arendSize - objectSize && state[speedKey] > 0) newState = -1;
      return state[stateKey] = newState;
    };
    tickOneAxis2 = function(dt) {
      var axis, delta, newState, rotationDeltaDeg, xd, yd, _i, _len, _ref, _ref2, _ref3, _results;
      rotationDeltaDeg = cons.rotationSpeed * keyStatus.horizontal() * dt;
      state.angle = Utils.degToRad(Utils.radToDeg(state.angle) + rotationDeltaDeg);
      state.speed += cons.acceleration * keyStatus.vertical() * dt;
      if (state.speed > cons.maxSpeed) state.speed = cons.maxSpeed;
      state.speed *= cons.friction;
      if (Math.abs(state.speed) < 0.009) state.speed = 0;
      _ref = Utils.getComponent(state.angle, state.speed), xd = _ref[0], yd = _ref[1];
      _ref2 = [["x", xd], ["y", yd]];
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        _ref3 = _ref2[_i], axis = _ref3[0], delta = _ref3[1];
        newState = state[axis] - dt * delta;
        if (newState < -1) newState = sizes.area[axis] - 1;
        if (newState > sizes.area[axis] - sizes.object[axis] && delta < 0) {
          newState = -1;
        }
        _results.push(state[axis] = newState);
      }
      return _results;
    };
    stateLoop = function(dt) {
      if (state.controlType === "type1") {
        tickOneAxis("sx", "x", "horizontal", dt);
        tickOneAxis("sy", "y", "vertical", dt);
        return state.angle = Utils.getAngle(state.sx, state.sy);
      } else {
        return tickOneAxis2(dt);
      }
    };
    uiLoop = function() {
      return object.css({
        'left': state.x,
        'top': state.y,
        '-webkit-transform': "rotate(" + (Utils.radToDeg(state.angle)) + "deg)"
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
