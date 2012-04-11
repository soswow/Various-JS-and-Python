(function() {
  var RoadWorld, abs, canvases, clear, ctx, getCleanLanes, gp, height, hsv_to_rgb, pointAt, width, world;

  abs = Math.abs;

  ctx = {};

  canvases = {};

  width = 800;

  height = 270;

  world = null;

  $(function() {
    var cost, goal_img, init_img;
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
    cost = parseFloat($("#shiftCost").val());
    world = new RoadWorld(getCleanLanes($("#dataBox").val()), cost);
    init_img = new Image();
    init_img.src = 'arrow_up_32x32.png';
    $(init_img).load(function() {
      world.init_img = init_img;
      return world.draw();
    });
    goal_img = new Image();
    goal_img.src = 'arrow_down_32x32.png';
    $(goal_img).load(function() {
      world.goal_img = goal_img;
      return world.draw();
    });
    $(canvases.initgoal).click(function(e) {
      return world.bottomClick(e.offsetX);
    });
    $("#dataBox").keyup(function(e) {
      world.setLanes(getCleanLanes($(this).val()));
      return world.draw();
    });
    $("#predefinedRoads").change(function() {
      var costs, predefined, raw, sel;
      predefined = ["100 100 100 100 100 100 100 100\n10  10  10  10  10  10  10  10\n1   1   1   1   1   1   1   1", "80 80 80 80 80 80 80 80 80 80 80 80 80 80\n60 60 60 60 60 60 60 60 60 60 60 60 60 60\n40 40 40 40 40 40 40 40 40 40 40 40 40 40\n20 20 20 20 20 20 20 20 20 20 20 20 20 20", "[50, 50, 50, 50, 50, 40, 0, 40, 50, 50, 50, 50, 50, 50, 50]\n[40, 40, 40, 40, 40, 30, 20, 30, 40, 40, 40, 40, 40, 40, 40],\n[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]", "[50, 50, 50, 50, 50, 40,  0, 40, 50, 50,  0, 50, 50, 50, 50],\n[40, 40, 40, 40,  0, 30, 20, 30,  0, 40, 40, 40, 40, 40, 40],\n[30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]"];
      costs = [1.0 / 1000.0, 1.0 / 100.0, 1.0 / 500.0, 1.0 / 65.0];
      sel = $(this).val();
      if (sel) {
        raw = predefined[sel];
        $("#dataBox").val(raw);
        $("#shiftCost").val(costs[sel]);
        world.lane_change_cost = costs[sel];
        world.setLanes(getCleanLanes(raw), true);
        return world.draw();
      }
    });
    $("#shiftCost").keyup(function(e) {
      world.lane_change_cost = parseFloat($(this).val());
      world.calculatePolicy();
      return world.draw();
    });
    return $("#predefinedRoads").val(2).change();
  });

  RoadWorld = (function() {

    function RoadWorld(lanes, lane_change_cost) {
      this.lane_change_cost = lane_change_cost;
      this.setLanes(lanes, true);
      this.goal_img;
      this.init_img;
      this.draw();
    }

    RoadWorld.prototype.setLanes = function(lanes, forceResetInitGoal) {
      this.lanes = lanes;
      if (forceResetInitGoal == null) forceResetInitGoal = false;
      this.h = this.lanes.length;
      this.w = this.lanes[0].length;
      if (!(this.goal && this.goal <= this.w - 1)) this.goal = this.w - 1;
      if (forceResetInitGoal) {
        this.init = 0;
        this.goal = this.w - 1;
      }
      this.cell_w = width / this.w;
      this.cell_h = height / this.h;
      return this.calculatePolicy();
    };

    RoadWorld.prototype.calculatePolicy = function() {
      this.calculatePolicyAndValues();
      $("#pathCost").html(this.values[this.h - 1][this.init]);
      return this.makeResultPath();
    };

    RoadWorld.prototype.makeResultPath = function() {
      var laneArr, x, y, _ref, _ref2, _ref3, _ref4, _results;
      this.resultPath = [];
      for (y = 0, _ref = this.h - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        laneArr = [];
        for (x = 0, _ref2 = this.w - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          laneArr.push('');
        }
        this.resultPath.push(laneArr);
      }
      y = this.h - 1;
      _results = [];
      for (x = _ref3 = this.init, _ref4 = this.goal; _ref3 <= _ref4 ? x <= _ref4 : x >= _ref4; _ref3 <= _ref4 ? x++ : x--) {
        this.resultPath[y][x] = '*';
        switch (this.policy[y][x]) {
          case 'up':
            _results.push(y -= 1);
            break;
          case 'dw':
            _results.push(y += 1);
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    RoadWorld.prototype.bottomClick = function(x) {
      var xIndex;
      xIndex = Math.floor(x / this.cell_w);
      if (xIndex > this.init + (this.goal - this.init) / 2) {
        this.goal = xIndex;
      } else {
        this.init = xIndex;
      }
      this.calculatePolicy();
      return this.draw();
    };

    RoadWorld.prototype.iterateCells = function(func) {
      var d, h, w, x, xi, y, yi, _ref, _results;
      _results = [];
      for (xi = 0, _ref = this.w - 1; 0 <= _ref ? xi <= _ref : xi >= _ref; 0 <= _ref ? xi++ : xi--) {
        _results.push((function() {
          var _ref2, _ref3, _results2;
          _results2 = [];
          for (yi = 0, _ref2 = this.h - 1; 0 <= _ref2 ? yi <= _ref2 : yi >= _ref2; 0 <= _ref2 ? yi++ : yi--) {
            d = this.policy[yi][xi];
            _ref3 = [this.cell_w * xi, this.cell_h * yi, this.cell_w, this.cell_h], x = _ref3[0], y = _ref3[1], w = _ref3[2], h = _ref3[3];
            _results2.push(func(yi, xi, x, y, w, h));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    RoadWorld.prototype.calculatePolicyAndValues = function() {
      var change, i, j, lane, lane_delta, lane_shift, lane_shift_cost, shift_names, speed, speed_cost, v2, x, x2, y, y2, _ref, _ref2, _results;
      this.values = [];
      this.policy = [];
      for (i = 0, _ref = this.h - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        this.values.push([]);
        this.policy.push([]);
        for (j = 1, _ref2 = this.w; 1 <= _ref2 ? j <= _ref2 : j >= _ref2; 1 <= _ref2 ? j++ : j--) {
          this.values[i].push(99999);
          this.policy[i].push(' ');
        }
      }
      lane_delta = [-1, 1, 0];
      shift_names = ['up', 'dw', 'no'];
      change = true;
      _results = [];
      while (change) {
        change = false;
        _results.push((function() {
          var _len, _ref3, _results2;
          _ref3 = this.lanes;
          _results2 = [];
          for (y = 0, _len = _ref3.length; y < _len; y++) {
            lane = _ref3[y];
            _results2.push((function() {
              var _len2, _results3;
              _results3 = [];
              for (x = 0, _len2 = lane.length; x < _len2; x++) {
                speed = lane[x];
                if (y === this.h - 1 && this.goal === x) {
                  if (this.values[y][x] > 0) {
                    this.values[y][x] = 0;
                    this.policy[y][x] = '*';
                    _results3.push(change = true);
                  } else {
                    _results3.push(void 0);
                  }
                } else if (speed > 0) {
                  x2 = x + 1;
                  if (x2 >= 0 && x2 < this.w) {
                    _results3.push((function() {
                      var _len3, _results4;
                      _results4 = [];
                      for (i = 0, _len3 = lane_delta.length; i < _len3; i++) {
                        lane_shift = lane_delta[i];
                        y2 = y + lane_shift;
                        if (y2 >= 0 && y2 < this.h && this.lanes[y][x] > 0) {
                          speed_cost = 1 / this.lanes[y][x];
                          lane_shift_cost = abs(lane_shift) * this.lane_change_cost;
                          v2 = this.values[y2][x2] + speed_cost + lane_shift_cost;
                          if (v2 < this.values[y][x]) {
                            change = true;
                            this.values[y][x] = v2;
                            _results4.push(this.policy[y][x] = shift_names[i]);
                          } else {
                            _results4.push(void 0);
                          }
                        } else {
                          _results4.push(void 0);
                        }
                      }
                      return _results4;
                    }).call(this));
                  } else {
                    _results3.push(void 0);
                  }
                } else {
                  _results3.push(void 0);
                }
              }
              return _results3;
            }).call(this));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    RoadWorld.prototype.drawArrows = function() {
      var c, placeImg,
        _this = this;
      clear('initgoal');
      c = ctx.initgoal;
      placeImg = function(x, img) {
        x = x * _this.cell_w + _this.cell_w / 2 - img.width;
        return c.drawImage(img, x, height - 35);
      };
      if (this.init_img) placeImg(this.init, this.init_img);
      if (this.goal_img) return placeImg(this.goal, this.goal_img);
    };

    RoadWorld.prototype.drawPolicy = function() {
      var c,
        _this = this;
      clear('policy');
      c = ctx.policy;
      return this.iterateCells(function(yi, xi, x, y, w, h) {
        var d, isInit, isResultPath, xf, yf, ys;
        c.beginPath();
        isResultPath = _this.resultPath[yi][xi] === '*';
        c.lineWidth = isResultPath ? 4 : 2;
        c.strokeStyle = "rgba(0,0,0," + (isResultPath ? 1 : 0.4) + ")";
        d = _this.policy[yi][xi];
        isInit = yi === _this.h - 1 && xi === _this.init;
        ys = isInit ? y + h : y + h / 2;
        c.moveTo(x + w / 2, ys);
        xf = x + w;
        switch (d) {
          case 'up':
            yf = y - h / 2;
            break;
          case 'dw':
            yf = y + h + h / 2;
            break;
          case 'no':
            yf = y + h / 2;
            break;
          case '*':
            yf = y + h;
        }
        if (yf) c.bezierCurveTo(x + w, ys, xf, yf, xf + w / 2, yf);
        c.stroke();
        return c.closePath();
      });
    };

    RoadWorld.prototype.draw = function() {
      var c, lane, max, min, speed, _i, _j, _len, _len2, _ref,
        _this = this;
      this.drawArrows();
      this.drawPolicy();
      clear('base');
      c = ctx.base;
      min = Number.MAX_VALUE;
      max = -1 * Number.MAX_VALUE;
      _ref = this.lanes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lane = _ref[_i];
        for (_j = 0, _len2 = lane.length; _j < _len2; _j++) {
          speed = lane[_j];
          if (speed > max) max = speed;
          if (speed < min) min = speed;
        }
      }
      max = max - min + 1;
      return this.iterateCells(function(yi, xi, x, y, w, h) {
        var b, g, hue, r, v, _ref2;
        c.strokeRect(x, y, w, h);
        speed = _this.lanes[yi][xi];
        hue = Math.floor((speed - min) * 180 / max);
        v = _this.resultPath[yi][xi] ? 0.7 : 1;
        _ref2 = hsv_to_rgb(hue, 0.4, v), r = _ref2[0], g = _ref2[1], b = _ref2[2];
        c.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        c.fillRect(x, y, w, h);
        c.fillStyle = 'black';
        c.font = '20px sans-serif';
        c.fillText(speed, x + 10, y + 20);
        return c.closePath();
      });
    };

    return RoadWorld;

  })();

  getCleanLanes = function(data) {
    var cell, clean_lanes, i, lane, laneRow, lanes, maxW, row, _i, _j, _len, _len2, _len3;
    lanes = (function() {
      var _i, _len, _ref, _results;
      _ref = data.split(/[\r\n]/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(row.trim().split(/[^\d.]+/i));
      }
      return _results;
    })();
    maxW = 0;
    clean_lanes = [];
    for (i = 0, _len = lanes.length; i < _len; i++) {
      lane = lanes[i];
      if (lanes.length > 0) {
        laneRow = [];
        for (_i = 0, _len2 = lane.length; _i < _len2; _i++) {
          cell = lane[_i];
          if (cell) laneRow.push(parseFloat(cell));
        }
        if (laneRow.length > 0) {
          clean_lanes.push(laneRow);
          if (laneRow.length > maxW) maxW = laneRow.length;
        }
      }
    }
    for (_j = 0, _len3 = clean_lanes.length; _j < _len3; _j++) {
      lane = clean_lanes[_j];
      while (lane.length < maxW) {
        lane.push(0);
      }
    }
    return clean_lanes;
  };

  pointAt = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  gp = function(any) {
    return Math.ceil(any) + 0.5;
  };

  hsv_to_rgb = function(h, s, v) {
    var b1, c, g1, m, r1, x, _h, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
    c = s * v;
    _h = h / 60;
    x = c * (1 - abs((_h % 2) - 1));
    _ref = [0, 0, 0], r1 = _ref[0], g1 = _ref[1], b1 = _ref[2];
    if ((0 <= _h && _h < 1)) _ref2 = [c, x], r1 = _ref2[0], g1 = _ref2[1];
    if ((1 <= _h && _h < 2)) _ref3 = [x, c], r1 = _ref3[0], g1 = _ref3[1];
    if ((2 <= _h && _h < 3)) _ref4 = [c, x], g1 = _ref4[0], b1 = _ref4[1];
    if ((3 <= _h && _h < 4)) _ref5 = [x, c], g1 = _ref5[0], b1 = _ref5[1];
    if ((4 <= _h && _h < 5)) _ref6 = [x, c], r1 = _ref6[0], b1 = _ref6[1];
    if ((5 <= _h && _h < 6)) _ref7 = [c, x], r1 = _ref7[0], b1 = _ref7[1];
    m = v - c;
    return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
  };

  clear = function(ctxId) {
    if (ctxId) return canvases[ctxId].width = width;
  };

}).call(this);
