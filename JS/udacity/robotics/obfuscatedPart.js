(function() {
  var abs, printIt;

  this.calculatePolicy = function() {
    var change, i, j, lane, lane_delta, lane_shift, lane_shift_cost, shift_names, speed, speed_cost, v2, value, x, x2, y, y2, _len, _len2, _len3, _ref, _ref2, _ref3;
    value = [];
    this.policy = [];
    for (i = 0, _ref = this.h - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      value.push([]);
      this.policy.push([]);
      for (j = 1, _ref2 = this.w; 1 <= _ref2 ? j <= _ref2 : j >= _ref2; 1 <= _ref2 ? j++ : j--) {
        value[i].push(99999);
        this.policy[i].push(' ');
      }
    }
    lane_delta = [-1, 1, 0];
    shift_names = ['up', 'dw', 'no'];
    change = true;
    while (change) {
      change = false;
      _ref3 = this.lanes;
      for (y = 0, _len = _ref3.length; y < _len; y++) {
        lane = _ref3[y];
        for (x = 0, _len2 = lane.length; x < _len2; x++) {
          speed = lane[x];
          if (y === this.h - 1 && this.goal === x) {
            if (value[y][x] > 0) {
              value[y][x] = 0;
              this.policy[y][x] = '*';
              change = true;
            }
          } else if (speed > 0) {
            x2 = x + 1;
            if (x2 >= 0 && x2 < this.w) {
              for (i = 0, _len3 = lane_delta.length; i < _len3; i++) {
                lane_shift = lane_delta[i];
                y2 = y + lane_shift;
                if (y2 >= 0 && y2 < this.h && this.lanes[y][x] > 0) {
                  speed_cost = 1 / this.lanes[y][x];
                  lane_shift_cost = abs(lane_shift) * this.lane_change_cost;
                  v2 = value[y2][x2] + speed_cost + lane_shift_cost;
                  if (v2 < value[y][x]) {
                    change = true;
                    value[y][x] = v2;
                    this.policy[y][x] = shift_names[i];
                  }
                }
              }
            }
          }
        }
      }
    }
    printIt(this.policy);
    return printIt(value);
  };

  printIt = function(what) {
    var wh;
    return console.log(((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = what.length; _i < _len; _i++) {
        wh = what[_i];
        _results.push(wh.join(", "));
      }
      return _results;
    })()).join("\n"));
  };

  abs = Math.abs;

}).call(this);
