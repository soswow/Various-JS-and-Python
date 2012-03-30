(function() {
  var PI, Robot, Runner, Smoother, TWOPI, World, canvases, clear, copyPath, cos, ctx, distance, distanceToLine, exp, findMax, findMaxIndex, findMin, findMinIndex, gauss, height, log, max, mod, nodeRadius, pi, pointAt, pow, printNodes, random, randomGauss, root, sin, sqrt, sum, width, world;

  ctx = {};

  canvases = {};

  width = 800;

  height = 500;

  world = null;

  $(function() {
    var PID, animateStep, robot, runner, shouldStop, slideUpdate, start;
    $('#canvasContainer canvas').each(function() {
      var ctx_id, gridDiv, that;
      that = $(this);
      gridDiv = $('#grid');
      this.width = width;
      this.height = height;
      that.css('width', width);
      that.css('height', height);
      gridDiv.css('width', width);
      gridDiv.css('height', height);
      ctx_id = that.attr('id').split("_")[1];
      canvases[ctx_id] = this;
      ctx[ctx_id] = typeof this.getContext === "function" ? this.getContext('2d') : void 0;
      return ctx[ctx_id].clearRect(0, 0, width, height);
    });
    $('#canvasContainer').mousemove(function(e) {
      var isOverNode;
      isOverNode = world.hover(e.offsetX, e.offsetY);
      return $(this).toggleClass("hovered", isOverNode);
    }).mousedown(function(e) {
      var isNodeSelected;
      isNodeSelected = world.selectNodeAt(e.offsetX, e.offsetY);
      return world.moveNode = isNodeSelected;
    }).mouseup(function(e) {
      if (!world.moveNode) world.addPoint(e.offsetX, e.offsetY);
      return world.moveNode = false;
    });
    $(document).keydown(function(e) {
      if (e.keyCode === 46) return world.deleteSelectedNode();
    });
    world = new World(width, height).draw();
    world.addPoint(200, 100);
    world.addPoint(400, 100);
    world.addPoint(220, 300);
    robot = new Robot();
    robot.set(world.points[1].x + 50, world.points[1].y, TWOPI);
    robot.setSteeringDrift(10 / 180.0 * pi);
    robot.draw();
    runner = new Runner(robot, world);
    PID = [0.3020698159940172, 4.058570137849624, 0.003109729253799231];
    animateStep = function() {
      return runner.step(PID[0], PID[1], PID[2]);
    };
    shouldStop = true;
    start = function() {
      var requestAnimationFrame, step;
      shouldStop = false;
      requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      step = function() {
        if (!shouldStop) {
          animateStep();
          return requestAnimationFrame(step);
        }
      };
      return requestAnimationFrame(step);
    };
    slideUpdate = function(key, value) {
      var obj;
      obj = {};
      obj[key] = value;
      world.setSmoothingParams(obj);
      return $("#" + key + "_id").val(value);
    };
    $("#slider_weight_data").slider({
      min: 0,
      max: 3,
      step: 0.01,
      value: 0.5,
      slide: function(e, ui) {
        return slideUpdate("weight_data", ui.value);
      }
    });
    $("#slider_weight_data").slider({
      min: 0,
      max: 0.2,
      step: 0.005,
      value: 0.01,
      slide: function(e, ui) {
        return slideUpdate("weight_data", ui.value);
      }
    });
    $("#slider_weight_smooth").slider({
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.24,
      slide: function(e, ui) {
        return slideUpdate("weight_smooth", ui.value);
      }
    });
    $("#slider_detalization").slider({
      min: 5,
      max: 30,
      step: 1,
      value: 10,
      slide: function(e, ui) {
        world.setDetalization(ui.value);
        return $("#detalization_id").val(ui.value);
      }
    });
    $("#slider_p_pid").slider({
      min: 0,
      max: 1,
      step: 0.001,
      value: 0.3,
      slide: function(e, ui) {
        PID[0] = ui.value;
        return $("#p_pid_id").val(ui.value);
      }
    });
    $("#slider_d_pid").slider({
      min: 0.5,
      max: 20,
      step: 0.1,
      value: 12,
      slide: function(e, ui) {
        PID[1] = ui.value;
        return $("#d_pid_id").val(ui.value);
      }
    });
    $("#slider_i_pid").slider({
      min: 0,
      max: 0.01,
      step: 0.0001,
      value: 0.003,
      slide: function(e, ui) {
        PID[2] = ui.value;
        return $("#i_pid_id").val(ui.value);
      }
    });
    $("#slider_drift").slider({
      min: -30,
      max: 30,
      step: 1,
      value: 10,
      slide: function(e, ui) {
        robot.setSteeringDrift(ui.value / 180.0 * pi);
        return $("#drift_id").val(ui.value);
      }
    });
    $("#start_robot_id").click(function() {
      shouldStop = false;
      return start();
    });
    $("#stop_robot_id").click(function() {
      return shouldStop = true;
    });
    return $("#twiddle_id").click(function() {
      robot = new Robot();
      robot.set(world.points[1].x + 50, world.points[1].y, TWOPI);
      robot.setSteeringDrift(10 / 180.0 * pi);
      runner = new Runner(robot, world);
      return console.log(runner.twiddle());
    });
  });

  nodeRadius = 8;

  World = (function() {

    function World(w, h) {
      this.w = w;
      this.h = h;
      this.points = [];
      this.hoveredNodeIndex = -1;
      this.selectedNodeIndex = -1;
      this.moveNode = false;
      this.smoothingParams = {
        weight_data: 0.01,
        weight_smooth: 0.24
      };
      this.detalization = 10;
    }

    World.prototype.addPoint = function(x, y) {
      var indexToInsert, p;
      if (this.findNodeNear(x, y) == null) {
        p = pointAt(x, y);
        indexToInsert = this.getClosestIndexToInsert(p);
        this.points.splice(indexToInsert, 0, p);
        this.updateSmoothLine();
        this.draw();
        return this;
      }
    };

    World.prototype.getClosestIndexToInsert = function(p) {
      var a, ab, alpha, angles, ap, b, beta, bp, dToFirst, dToLast, gamma, i, inBetween, putAtIndex;
      inBetween = false;
      angles = (function() {
        var _ref, _results;
        if (this.points.length === 0) {
          return [];
        } else {
          _results = [];
          for (i = 0, _ref = this.points.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
            a = i > 0 ? this.points[i - 1] : this.points[this.points.length - 1];
            b = this.points[i];
            ap = distance(a, p);
            bp = distance(b, p);
            ab = distance(b, a);
            alpha = Math.acos((root(ap) + root(bp) - root(ab)) / (2 * ap * bp));
            beta = Math.acos((root(ab) + root(bp) - root(ap)) / (2 * ab * bp));
            gamma = Math.acos((root(ab) + root(ap) - root(bp)) / (2 * ab * ap));
            if (beta < PI / 2 && gamma < PI / 2) inBetween = true;
            _results.push(alpha * 180 / PI);
          }
          return _results;
        }
      }).call(this);
      if (inBetween) {
        putAtIndex = findMaxIndex(angles);
        if (putAtIndex < 0) {
          return 0;
        } else {
          return putAtIndex;
        }
      } else {
        if (this.points.length >= 2) {
          dToFirst = distance(p, this.points[0]);
          dToLast = distance(p, this.points[this.points.length - 1]);
          if (dToFirst < dToLast) {
            return 0;
          } else {
            return this.points.length;
          }
        } else {
          return this.points.length;
        }
      }
    };

    World.prototype.hover = function(x, y) {
      var oldHoveredPointIndex, pointIndex;
      if (this.moveNode && this.selectedNodeIndex >= 0) {
        this.points[this.selectedNodeIndex] = pointAt(x, y);
        this.updateSmoothLine();
        this.draw();
        return true;
      } else {
        pointIndex = this.findNodeNear(x, y);
        oldHoveredPointIndex = this.hoveredNodeIndex;
        this.hoveredNodeIndex = pointIndex != null ? pointIndex : -1;
        if (this.hoveredNodeIndex !== oldHoveredPointIndex) this.draw();
        return this.hoveredNodeIndex >= 0;
      }
    };

    World.prototype.selectNodeAt = function(x, y) {
      var oldSelectedNodeIndex, pointIndex;
      pointIndex = this.findNodeNear(x, y);
      oldSelectedNodeIndex = this.selectedNodeIndex;
      this.selectedNodeIndex = pointIndex != null ? pointIndex : -1;
      if (this.selectedNodeIndex !== oldSelectedNodeIndex) this.draw();
      return this.selectedNodeIndex >= 0;
    };

    World.prototype.findNodeNear = function(x, y) {
      var i, p, _len, _ref;
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        if (distance(p, pointAt(x, y)) <= nodeRadius) return i;
      }
      return null;
    };

    World.prototype.deleteSelectedNode = function() {
      if (this.selectedNodeIndex >= 0) {
        this.points.splice(this.selectedNodeIndex, 1);
        this.selectedNodeIndex = -1;
        this.draw();
        return this.updateSmoothLine();
      }
    };

    World.prototype.setSmoothingParams = function(params) {
      var key, value, _results;
      _results = [];
      for (key in params) {
        value = params[key];
        this.smoothingParams[key] = value;
        if (this.points.length > 2) {
          _results.push(this.updateSmoothLine());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    World.prototype.setDetalization = function(detalization) {
      this.detalization = detalization;
      if (this.points.length > 2) return this.updateSmoothLine();
    };

    World.prototype.updateSmoothLine = function() {
      this.smoother = new Smoother(this.points);
      this.smoother.segmentatePath(this.detalization);
      this.smoother.smooth(this.smoothingParams.weight_data, this.smoothingParams.weight_smooth);
      return this.smoother.draw();
    };

    World.prototype.drawStraightLines = function() {
      var c, i, p, prevPoint, _len, _ref;
      c = ctx.base;
      c.beginPath();
      prevPoint = null;
      c.strokeStyle = "rgba(0,0,0,0.3)";
      _ref = this.points;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        if (prevPoint) {
          c.moveTo(p.x, p.y);
          c.lineTo(prevPoint.x, prevPoint.y);
        }
        prevPoint = p;
      }
      if (this.points.length > 2) {
        c.moveTo(prevPoint.x, prevPoint.y);
        c.lineTo(this.points[0].x, this.points[0].y);
      }
      c.closePath();
      return c.stroke();
    };

    World.prototype.drawNodes = function() {
      var c, i, p, _len, _ref, _results;
      c = ctx.base;
      _ref = this.points;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        c.beginPath();
        c.moveTo(p.x + nodeRadius, p.y);
        c.arc(p.x, p.y, nodeRadius, 0, TWOPI, true);
        c.closePath();
        c.fillStyle = i === this.selectedNodeIndex ? "rgb(200,255,200)" : i === this.hoveredNodeIndex ? "rgb(200,200,255)" : "white";
        c.fill();
        _results.push(c.stroke());
      }
      return _results;
    };

    World.prototype.draw = function() {
      clear('base');
      this.drawStraightLines();
      this.drawNodes();
      return this;
    };

    return World;

  })();

  Smoother = (function() {

    function Smoother(initPath) {
      this.initPath = initPath;
      this.resetAugmentedPath();
    }

    Smoother.prototype.resetAugmentedPath = function() {
      return this.path = copyPath(this.initPath);
    };

    Smoother.prototype.segmentatePath = function(segmentLength) {
      var doit, i, newPoint, nextPoint, p, _len, _ref, _results;
      doit = true;
      _results = [];
      while (doit) {
        doit = false;
        this.newAugmentedPath = [];
        _ref = this.path;
        for (i = 0, _len = _ref.length; i < _len; i++) {
          p = _ref[i];
          nextPoint = i < this.path.length - 1 ? this.path[i + 1] : this.path[0];
          this.newAugmentedPath.push(p);
          if (distance(p, nextPoint) > segmentLength) {
            doit = true;
            newPoint = pointAt(Math.min(p.x, nextPoint.x) + Math.abs(p.x - nextPoint.x) / 2, Math.min(p.y, nextPoint.y) + Math.abs(p.y - nextPoint.y) / 2);
            this.newAugmentedPath.push(newPoint);
          }
        }
        if (doit) {
          _results.push(this.path = this.newAugmentedPath);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Smoother.prototype.augmentNodesByFactorOf = function(factor) {
      var i, newPoint, nextPoint, p, _len, _ref, _results;
      _results = [];
      for (i = 1; 1 <= factor ? i <= factor : i >= factor; 1 <= factor ? i++ : i--) {
        this.newAugmentedPath = [];
        _ref = this.path;
        for (i = 0, _len = _ref.length; i < _len; i++) {
          p = _ref[i];
          nextPoint = i < this.path.length - 1 ? this.path[i + 1] : this.path[0];
          newPoint = pointAt((p.x + nextPoint.x) / 2, (p.y + nextPoint.y) / 2);
          this.newAugmentedPath.push(p);
          this.newAugmentedPath.push(newPoint);
        }
        _results.push(this.path = this.newAugmentedPath);
      }
      return _results;
    };

    Smoother.prototype.smooth = function(weight_data, weight_smooth) {
      var i, k, newpath, nextI, p, prevI, _i, _len, _ref, _ref2;
      if (weight_data == null) weight_data = 0.5;
      if (weight_smooth == null) weight_smooth = 0.1;
      newpath = copyPath(this.path);
      for (p = 1; p <= 600; p++) {
        _ref = ['x', 'y'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          for (i = 0, _ref2 = this.path.length - 1; 0 <= _ref2 ? i <= _ref2 : i >= _ref2; 0 <= _ref2 ? i++ : i--) {
            nextI = i === this.path.length - 1 ? 0 : i + 1;
            prevI = i === 0 ? this.path.length - 1 : i - 1;
            newpath[i][k] = newpath[i][k] + weight_data * (this.path[i][k] - newpath[i][k]);
            newpath[i][k] = newpath[i][k] + weight_smooth * (newpath[nextI][k] + newpath[prevI][k] - 2 * newpath[i][k]);
          }
        }
      }
      return this.path = newpath;
    };

    Smoother.prototype.drawSmoothLines = function() {
      var c, i, p, prevPoint, _len, _ref;
      c = ctx.smooth;
      c.beginPath();
      prevPoint = null;
      c.strokeStyle = "rgba(255,50,50,0.7)";
      _ref = this.path;
      for (i = 0, _len = _ref.length; i < _len; i++) {
        p = _ref[i];
        if (prevPoint) {
          c.moveTo(p.x, p.y);
          c.lineTo(prevPoint.x, prevPoint.y);
        }
        prevPoint = p;
      }
      if (this.path.length > 2) {
        c.moveTo(prevPoint.x, prevPoint.y);
        c.lineTo(this.path[0].x, this.path[0].y);
      }
      c.closePath();
      return c.stroke();
    };

    Smoother.prototype.draw = function() {
      clear('smooth');
      return this.drawSmoothLines();
    };

    return Smoother;

  })();

  Robot = (function() {

    function Robot(len) {
      this.len = len != null ? len : 30.0;
      this.x = 0;
      this.y = 0;
      this.orientation = 0;
      this.steering_noise = 0;
      this.distance_noise = 0;
      this.steering_drift = 0;
      this.trace = [];
      this.maxTraceLength = 300;
    }

    Robot.prototype.set = function(x, y, new_orientation) {
      this.x = x;
      this.y = y;
      return this.orientation = new_orientation % TWOPI;
    };

    Robot.prototype.setNoise = function(steering_noise, distance_noise) {
      this.steering_noise = steering_noise;
      this.distance_noise = distance_noise;
    };

    Robot.prototype.setSteeringDrift = function(steering_drift) {
      this.steering_drift = steering_drift;
    };

    Robot.prototype.move = function(steering, dist, tolerance, max_steering_angle) {
      var cx, cy, distance2, new_orientation, new_x, new_y, radius, steering2, turn;
      if (tolerance == null) tolerance = 0.001;
      if (max_steering_angle == null) max_steering_angle = PI / 4.0;
      if (steering > max_steering_angle) steering = max_steering_angle;
      if (steering < -max_steering_angle) steering = -max_steering_angle;
      if (dist < 0) dist = 0;
      steering2 = randomGauss(steering, this.steering_noise);
      distance2 = randomGauss(dist, this.distance_noise);
      steering2 += this.steering_drift;
      this.steering = steering2;
      turn = Math.tan(steering2) * distance2 / this.len;
      if (Math.abs(turn) < tolerance) {
        new_x = this.x + (distance2 * cos(this.orientation));
        new_y = this.y + (distance2 * sin(this.orientation));
        new_orientation = mod(this.orientation + turn, TWOPI);
      } else {
        radius = distance2 / turn;
        cx = this.x - (sin(this.orientation) * radius);
        cy = this.y + (cos(this.orientation) * radius);
        new_orientation = mod(this.orientation + turn, TWOPI);
        new_x = cx + (sin(new_orientation) * radius);
        new_y = cy - (cos(new_orientation) * radius);
      }
      this.x = new_x;
      this.y = new_y;
      this.trace.push(pointAt(new_x, new_y));
      if (this.trace.length > this.maxTraceLength) this.trace.shift();
      this.orientation = new_orientation;
      return this;
    };

    Robot.prototype.drawTrace = function() {
      var c, i, len, p, prevP, _len, _ref, _results;
      c = ctx.robot;
      len = this.trace.length;
      if (len > 1) {
        prevP = this.trace[0];
        _ref = this.trace.slice(1, (this.trace.length - 1) + 1 || 9e9);
        _results = [];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          p = _ref[i];
          c.strokeStyle = "rgba(30,30,255," + (i / len) + ")";
          c.beginPath();
          c.moveTo(prevP.x, prevP.y);
          c.lineTo(p.x, p.y);
          c.closePath();
          c.stroke();
          _results.push(prevP = p);
        }
        return _results;
      }
    };

    Robot.prototype.draw = function() {
      var c, x, y, _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
      clear('robot');
      c = ctx.robot;
      this.drawTrace();
      c.strokeStyle = "black";
      _ref = [this.x + 5 * cos(this.orientation), this.y + 5 * sin(this.orientation)], x = _ref[0], y = _ref[1];
      _ref2 = [x + 10 * cos(this.orientation - PI / 2), y + 10 * sin(this.orientation - PI / 2)], x = _ref2[0], y = _ref2[1];
      c.moveTo(x, y);
      _ref3 = [x + 20 * cos(this.orientation + PI / 2), y + 20 * sin(this.orientation + PI / 2)], x = _ref3[0], y = _ref3[1];
      c.lineTo(x, y);
      _ref4 = [x + this.len * cos(this.orientation + PI), y + this.len * sin(this.orientation + PI)], x = _ref4[0], y = _ref4[1];
      c.lineTo(x, y);
      _ref5 = [x + 20 * cos(this.orientation - PI / 2), y + 20 * sin(this.orientation - PI / 2)], x = _ref5[0], y = _ref5[1];
      c.lineTo(x, y);
      _ref6 = [x + this.len * cos(this.orientation), y + this.len * sin(this.orientation)], x = _ref6[0], y = _ref6[1];
      c.lineTo(x, y);
      return c.stroke();
    };

    return Robot;

  })();

  Runner = (function() {

    function Runner(robot, world, speed) {
      this.robot = robot;
      this.speed = speed != null ? speed : 1.0;
      this.old_cte = this.countCrossTrackError();
      this.err_sum = this.old_cte;
    }

    Runner.prototype.isLeft = function(a, b, c) {
      return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) > 0;
    };

    Runner.prototype.closestSegment = function() {
      var dist, index, nextIndex, p, _ref;
      this.path = world.smoother.path;
      _ref = findMin((function() {
        var _i, _len, _ref, _results;
        _ref = this.path;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          _results.push(distance(p, this.robot));
        }
        return _results;
      }).call(this), true), dist = _ref[0], index = _ref[1];
      if (index === this.path.length - 1) {
        nextIndex = 0;
      } else {
        nextIndex = index + 1;
      }
      return [dist, this.path[index], this.path[nextIndex]];
    };

    Runner.prototype.countCrossTrackError = function() {
      var a, b, dist, isLeft, _ref;
      _ref = this.closestSegment(), dist = _ref[0], a = _ref[1], b = _ref[2];
      isLeft = this.isLeft(a, b, this.robot);
      return dist *= isLeft ? 1 : -1;
    };

    Runner.prototype.twiddle = function(tol) {
      var best_err, dp, err, i, p;
      if (tol == null) tol = 0.0000000001;
      p = [0.3, 4, 0.001];
      dp = [0.001, 0.05, 0.001];
      best_err = this.dryRun(p);
      while (sum(dp) > tol) {
        for (i = 0; i <= 2; i++) {
          p[i] += dp[i];
          err = this.dryRun(p);
          if (err < best_err) {
            best_err = err;
            dp[i] *= 1.005;
          } else {
            p[i] -= 2 * dp[i];
            if (err < best_err) {
              best_err = err;
              dp[i] *= 1.005;
            } else {
              p[i] += dp[i];
              dp[i] *= 0.99;
            }
          }
        }
      }
      console.log(sum(dp));
      return p;
    };

    Runner.prototype.dryRun = function(params, N) {
      var cte, err, i, _ref;
      if (N == null) N = 100;
      err = 0;
      for (i = 1, _ref = N * 2; 1 <= _ref ? i <= _ref : i >= _ref; 1 <= _ref ? i++ : i--) {
        cte = this.step(params[0], params[1], params[2], false);
        if (i >= N) err += pow(cte, 2);
      }
      return err / N;
    };

    Runner.prototype.step = function(tau_p, tau_d, tau_i, draw) {
      var a, alpha, alphaDeg, angle, angleDiff, b, c, cond, cte, diff, diffDef, dist, p1, p2, robOrDeg, _ref;
      this.tau_p = tau_p;
      this.tau_d = tau_d;
      this.tau_i = tau_i;
      if (draw == null) draw = true;
      _ref = this.closestSegment(), dist = _ref[0], p1 = _ref[1], p2 = _ref[2];
      a = p2.x - p1.x;
      b = p2.y - p1.y;
      alpha = Math.atan(b / a);
      cond = (a < 0 && b > 0) || (a < 0 && b < 0);
      if (cond) alpha += PI;
      alpha = mod(alpha, TWOPI);
      robOrDeg = this.robot.orientation / (PI / 180);
      alphaDeg = alpha / (PI / 180);
      cte = this.countCrossTrackError();
      diff = mod(this.robot.orientation - alpha, TWOPI);
      if (diff > PI) diff -= TWOPI;
      angleDiff = Math.abs(diff);
      diffDef = angleDiff / (PI / 180);
      $("#box").html("" + (a.toFixed(4)) + " " + (b.toFixed(4)) + "<br/>\n" + alphaDeg + " - slope<br/>\n" + robOrDeg + " - orient<br/>\n" + diffDef + " - diff<br/>" + cte + " - cte");
      diff = cte - this.old_cte;
      angle = -this.tau_p * cte - this.tau_d * diff - this.tau_i * this.err_sum;
      this.robot.move(angle, this.speed);
      this.err_sum += cte;
      this.old_cte = cte;
      if (draw) this.robot.draw();
      c = ctx.base;
      c.strokeStyle = 'black';
      c.beginPath();
      c.moveTo(p2.x, p2.y);
      c.lineTo(p2.x + 30 * cos(alpha - PI / 2), p2.y + 30 * sin(alpha - PI / 2));
      c.moveTo(p2.x, p2.y);
      c.lineTo(p2.x + 30 * cos(alpha), p2.y + 30 * sin(alpha));
      c.closePath();
      c.stroke();
      return cte;
    };

    return Runner;

  })();

  PI = Math.PI;

  TWOPI = Math.PI * 2;

  findMin = function(arr, withIndex) {
    var min;
    if (withIndex == null) withIndex = false;
    min = Math.min.apply(null, arr);
    if (withIndex) {
      return [min, arr.indexOf(min)];
    } else {
      return min;
    }
  };

  findMinIndex = function(arr) {
    var index, _, _ref;
    _ref = findMin(arr, true), _ = _ref[0], index = _ref[1];
    return index;
  };

  findMax = function(arr, withIndex) {
    var max;
    if (withIndex == null) withIndex = false;
    max = Math.max.apply(null, arr);
    if (withIndex) {
      return [max, arr.indexOf(max)];
    } else {
      return max;
    }
  };

  findMaxIndex = function(arr) {
    var index, _, _ref;
    _ref = findMax(arr, true), _ = _ref[0], index = _ref[1];
    return index;
  };

  clear = function(ctxId) {
    if (ctxId) return canvases[ctxId].width = width;
  };

  pointAt = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  printNodes = function(nodes) {
    var p;
    return console.log(((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        p = nodes[_i];
        _results.push("(x:" + p.x + ", y:" + p.y + ")");
      }
      return _results;
    })()).join(", "));
  };

  root = function(a) {
    return Math.pow(a, 2);
  };

  distance = function(a, b) {
    return Math.sqrt(root(b.x - a.x) + root(b.y - a.y));
  };

  distanceToLine = function(a, b, p) {
    return Math.abs((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / distance(a, b);
  };

  copyPath = function(path) {
    var p, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = path.length; _i < _len; _i++) {
      p = path[_i];
      _results.push(pointAt(p.x, p.y));
    }
    return _results;
  };

  random = Math.random;

  pow = Math.pow;

  sqrt = Math.sqrt;

  log = Math.log;

  pi = Math.PI;

  TWOPI = pi * 2;

  exp = Math.exp;

  cos = Math.cos;

  sin = Math.sin;

  max = function(arr) {
    var el, result, _i, _len;
    result = -Number.MAX_VALUE;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      el = arr[_i];
      if (el > result) result = el;
    }
    return result;
  };

  sum = function(arr) {
    var el, _i, _len, _sum;
    _sum = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      el = arr[_i];
      _sum += el;
    }
    return _sum;
  };

  randomGauss = function(mu, sigma) {
    var s, x, y, z;
    while (true) {
      x = 2 * random() - 1;
      y = 2 * random() - 1;
      s = pow(x, 2) + pow(y, 2);
      if (!(s >= 1 || s === 0)) break;
    }
    z = x * sqrt(-2 * log(s) / s);
    return mu + sigma * z;
  };

  gauss = function(mu, sigma, x) {
    return exp(-(pow(mu - x, 2) / pow(sigma, 2) / 2.0) / sqrt(TWOPI * pow(sigma, 2)));
  };

  mod = function(a, b) {
    return a % b + (a < 0 ? b : 0);
  };

}).call(this);
