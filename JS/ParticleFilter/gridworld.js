(function() {
  var GridWorld, canvases, ctx, distance, dp, equalPoints, gridColors, height, initWalls, make2DArray, megaValue, p, random, width, world;

  ctx = {};

  canvases = {};

  width = 700;

  height = 400;

  megaValue = 99999;

  world = null;

  $(function() {
    var gridMouseDown;
    $('#grid canvas').each(function() {
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
    $("#cellSizeSlider").slider({
      range: "min",
      min: 10,
      max: 50,
      value: 50,
      start: function() {
        world.clear();
        return true;
      },
      slide: function(event, ui) {
        world.changeCellSize(ui.value);
        world.draw();
        return true;
      }
    });
    gridMouseDown = false;
    $("#grid").mousedown(function(e) {
      world.click(e.offsetX, e.offsetY);
      return gridMouseDown = true;
    }).mouseup(function(e) {
      gridMouseDown = false;
      return world.click(e.offsetX, e.offsetY);
    }).mouseleave(function() {
      return gridMouseDown = false;
    }).mousemove(function(e) {
      return world.hover(e.offsetX, e.offsetY, gridMouseDown);
    }).click(function(e) {
      return world.click(e.offsetX, e.offsetY);
    });
    $("[name=actionType]").click(function() {
      return world.clickAction = this.value;
    });
    $("[name=visibility]").change(function() {
      if (this.value.indexOf('value') === 0) {
        world[this.value] = this.checked;
      } else if (this.value.indexOf('policy') === 0) {
        if (this.value === 'policyPath') {
          world.showPathPolicy = this.checked;
          if (this.checked) {
            world.showDPPolicy = false;
            $('#showDPPolicyId').removeAttr('checked');
          }
        } else if (this.value === 'policyDP') {
          world.showDPPolicy = this.checked;
          if (this.checked) {
            world.showPathPolicy = false;
            $('#showPathPolicyId').removeAttr('checked');
          }
        }
      }
      return world.updateValues();
    });
    $("#clearEverythingId").click(function() {
      world.clear().clearData();
      return $("[name=visibility]").each(function() {
        return $(this).removeAttr('checked').trigger('change');
      });
    });
    $("#makeBorderWallId").click(function() {
      world.makeBorderWall();
      return world.updateValues();
    });
    $("#aStar").click(function() {
      world.aStarEnabled = this.checked;
      return world.updateValues();
    });
    $("[name=hFunc]").click(function() {
      world.aStarHFunc = parseInt(this.value, 10);
      return world.updateValues();
    });
    $("TABLE#probobilitiesId input").keyup(function() {
      var val;
      val = parseFloat(this.value);
      world.probobilities[$(this).attr("id")[0]] = !isNaN(val) ? val : 0;
      return world.updateValues();
    });
    $("#collitionCost").keyup(function() {
      world.collitionCost = parseInt(this.value, 10);
      return world.updateValues();
    });
    return world = new GridWorld(50, width, height);
  });

  initWalls = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

  gridColors = {
    hover: 'rgba(0,0,0,0.2)',
    wall: 'rgba(0,0,0,0.6)',
    init: 'rgba(0,255,0,0.8)',
    goal: 'rgba(255,0,0,0.8)'
  };

  GridWorld = (function() {

    function GridWorld(cellSize, w, h) {
      this.cellSize = cellSize;
      this.w = w;
      this.h = h;
      this.setSizes();
      this.data = make2DArray(this.width, this.height);
      this.hovered = p(-1, -1);
      this.oldHovered = p(-1, -1);
      this.clickAction = "wallsAdd";
      this.valueAsNumber = false;
      this.valueAsColor = true;
      this.showPathPolicy = true;
      this.showDPPolicy = false;
      this.policyFails = true;
      this.aStarEnabled = false;
      this.aStarHFunc = 1;
      this.probobilities = {
        f: 1,
        l: 0,
        r: 0,
        b: 0
      };
      this.collitionCost = 100;
      this.resetInitStructure();
      this.updatePolicy();
      this.makeBorderWall();
      this.updateValues();
      this.draw();
    }

    GridWorld.prototype.resetInitGoal = function() {
      this.init = p(1, 1);
      return this.goal = p(this.width - 2, this.height - 2);
    };

    GridWorld.prototype.resetInitStructure = function() {
      var _this = this;
      this.resetInitGoal();
      return this.iterateDataCells(function(x, y) {
        if (initWalls[y][x]) return _this.data[y][x].policy = 'wall';
      });
    };

    GridWorld.prototype.updatePolicy = function(init, goal) {
      if (init == null) init = this.init;
      if (goal == null) goal = this.goal;
      if (!equalPoints(init, this.init)) {
        this.data[this.init.y][this.init.x].policy = '';
        this.init = init;
      }
      this.data[this.init.y][this.init.x].policy = 'init';
      if (!equalPoints(goal, this.goal)) {
        this.data[this.goal.y][this.goal.x].policy = '';
        this.goal = goal;
      }
      this.data[this.goal.y][this.goal.x].policy = 'goal';
      return this;
    };

    GridWorld.prototype.setSizes = function() {
      this.width = Math.floor(this.w / this.cellSize);
      return this.height = Math.floor(this.h / this.cellSize);
    };

    GridWorld.prototype.iterateDataCells = function(func) {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.data.length - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = this.data[0].length - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            _results2.push(func(x, y));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    GridWorld.prototype.clearData = function() {
      var _this = this;
      this.resetInitGoal();
      this.iterateDataCells(function(x, y) {
        return _this.data[y][x] = dp();
      });
      this.updatePolicy();
      this.draw();
      return this;
    };

    GridWorld.prototype.clear = function(ctxId) {
      if (ctxId) {
        canvases[ctxId].width = width;
      } else {
        canvases.hover.width = width;
        canvases.walls.width = width;
        canvases.values.width = width;
        canvases.policy.width = width;
      }
      return this;
    };

    GridWorld.prototype.changeCellSize = function(cellSize) {
      var newdata, oldHeight,
        _this = this;
      this.cellSize = cellSize;
      oldHeight = this.height;
      this.setSizes();
      if (oldHeight !== this.height) {
        newdata = make2DArray(this.width, this.height);
        this.iterateDataCells(function(x, y) {
          if (y < _this.height && x < _this.width) {
            if (y < _this.data.length && x < _this.data[0].length) {
              return newdata[y][x] = _this.data[y][x];
            }
          }
        });
        this.data = newdata;
      }
      this.drawGrid();
      return this;
    };

    GridWorld.prototype.cellByXY = function(x, y) {
      return {
        x: Math.floor(x / this.cellSize),
        y: Math.floor(y / this.cellSize)
      };
    };

    GridWorld.prototype.xyByCell = function(xy) {
      return {
        x: xy.x * this.cellSize,
        y: xy.y * this.cellSize
      };
    };

    GridWorld.prototype.hover = function(x, y, mouseDown) {
      var hovered;
      hovered = this.cellByXY(x, y);
      if (!(hovered.x === this.hovered.x && hovered.y === this.hovered.y)) {
        this.oldHovered = this.hovered;
        this.hovered = hovered;
        this.drawHover();
        if (mouseDown) return this.click(x, y);
      }
    };

    GridWorld.prototype.drawCellAt = function(xy, ctxId, color) {
      ctx[ctxId].fillStyle = color;
      return ctx[ctxId].fillRect(xy.x, xy.y, this.cellSize, this.cellSize);
    };

    GridWorld.prototype.clearCellAt = function(xy, ctxId) {
      return ctx[ctxId].clearRect(xy.x, xy.y, this.cellSize, this.cellSize);
    };

    GridWorld.prototype.makeBorderWall = function() {
      var x, y, _ref, _ref2;
      for (x = 0, _ref = this.width - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        for (y = 0, _ref2 = this.height - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
            this.data[y][x].policy = 'wall';
          }
        }
      }
      return this.drawAllWalls();
    };

    GridWorld.prototype.cellDataAt = function(xy) {
      return this.data[xy.y][xy.x];
    };

    GridWorld.prototype.policyAt = function(xy) {
      var _ref;
      return (_ref = this.cellDataAt(xy)) != null ? _ref.policy : void 0;
    };

    GridWorld.prototype.valueAt = function(xy) {
      var _ref;
      return (_ref = this.cellDataAt(xy)) != null ? _ref.value : void 0;
    };

    GridWorld.prototype.click = function(x, y) {
      var policy, pos;
      pos = this.cellByXY(x, y);
      policy = this.policyAt(pos);
      switch (this.clickAction) {
        case 'wallsAdd':
          if (policy !== 'init' && policy !== 'goal') {
            this.data[pos.y][pos.x].policy = 'wall';
            this.drawAllWalls();
          }
          break;
        case 'wallsRemove':
          if (policy === 'wall') {
            this.data[pos.y][pos.x].policy = '';
            this.drawAllWalls();
          }
          break;
        case 'init':
          if (policy !== 'wall' && policy !== 'goal') {
            this.updatePolicy(pos, this.goal).drawPolicy();
          }
          break;
        case 'goal':
          if (policy !== 'wall' && policy !== 'init') {
            this.updatePolicy(this.init, pos).drawPolicy();
          }
      }
      return this.updateValues();
    };

    GridWorld.prototype.getDataLayer = function(layer) {
      var _this = this;
      this.result = make2DArray(this.width, this.height, 0);
      return this.iterateDataCells(function(x, y) {
        return _this.result[y][x] = _this.data[y][x][layer];
      });
    };

    GridWorld.prototype.updateValues = function() {
      var algo, policy, values, _ref,
        _this = this;
      this.iterateDataCells(function(x, y) {
        var _ref;
        if ((_ref = _this.data[y][x].policy) !== 'init' && _ref !== 'goal' && _ref !== 'wall') {
          return _this.data[y][x].policy = '';
        }
      });
      policy = this.getDataLayer('policy');
      algo = new SearchAlgos(policy, this.init, this.goal);
      _ref = this.showDPPolicy ? algo.optimum_policy(this.probobilities, this.collitionCost) : algo.search(this.aStarEnabled ? this.aStarHFunc : 0), values = _ref[0], policy = _ref[1], this.policyFails = _ref[2];
      this.iterateDataCells(function(x, y) {
        var policyItem;
        _this.data[y][x].value = values[y][x];
        policyItem = policy[y][x];
        if (!((policyItem === 'init' || policyItem === 'goal' || policyItem === 'wall') || policyItem === '')) {
          return _this.data[y][x].policy = policyItem;
        }
      });
      this.drawValues();
      return this.drawPolicy();
    };

    GridWorld.prototype.drawArrowAt = function(pos, direction) {
      var boxSize, c, half, padding, sides, x, y, _ref;
      c = ctx.policy;
      _ref = [pos.x, pos.y], x = _ref[0], y = _ref[1];
      c.fillStyle = 'black';
      boxSize = this.cellSize * 0.8;
      half = boxSize / 2;
      padding = this.cellSize * 0.1;
      sides = {
        top: p(x + padding + half, y + padding),
        left: p(x + padding, y + padding + half),
        right: p(x + padding + boxSize, y + padding + half),
        bottom: p(x + padding + half, y + padding + boxSize)
      };
      c.beginPath();
      switch (direction) {
        case 'up':
          c.moveTo(sides.left.x, sides.left.y);
          c.lineTo(sides.top.x, sides.top.y);
          c.lineTo(sides.right.x, sides.right.y);
          c.moveTo(sides.top.x, sides.top.y);
          c.lineTo(sides.bottom.x, sides.bottom.y);
          break;
        case 'down':
          c.moveTo(sides.left.x, sides.left.y);
          c.lineTo(sides.bottom.x, sides.bottom.y);
          c.lineTo(sides.right.x, sides.right.y);
          c.moveTo(sides.top.x, sides.top.y);
          c.lineTo(sides.bottom.x, sides.bottom.y);
          break;
        case 'left':
          c.moveTo(sides.top.x, sides.top.y);
          c.lineTo(sides.left.x, sides.left.y);
          c.lineTo(sides.bottom.x, sides.bottom.y);
          c.moveTo(sides.right.x, sides.right.y);
          c.lineTo(sides.left.x, sides.left.y);
          break;
        case 'right':
          c.moveTo(sides.top.x, sides.top.y);
          c.lineTo(sides.right.x, sides.right.y);
          c.lineTo(sides.bottom.x, sides.bottom.y);
          c.moveTo(sides.left.x, sides.left.y);
          c.lineTo(sides.right.x, sides.right.y);
      }
      c.closePath();
      return c.stroke();
    };

    GridWorld.prototype.drawAllWalls = function() {
      var _this = this;
      this.clear('walls');
      return this.iterateDataCells(function(x, y) {
        var pos;
        if (_this.data[y][x].policy === 'wall') {
          pos = _this.xyByCell(p(x, y));
          return _this.drawCellAt(pos, 'walls', gridColors.wall);
        }
      });
    };

    GridWorld.prototype.drawPolicy = function() {
      var c, fontSize, pos,
        _this = this;
      this.clear('policy');
      c = ctx.policy;
      this.iterateDataCells(function(x, y) {
        var policy, pos;
        pos = _this.xyByCell(p(x, y));
        policy = _this.policyAt(p(x, y));
        switch (policy) {
          case 'init':
            return _this.drawCellAt(pos, 'policy', gridColors.init);
          case 'goal':
            return _this.drawCellAt(pos, 'policy', gridColors.goal);
          default:
            if (policy !== 'wall') {
              if ((_this.showPathPolicy || _this.showDPPolicy) && !_this.policyFails) {
                return _this.drawArrowAt(pos, policy);
              }
            }
        }
      });
      if (this.policyFails) {
        fontSize = this.cellSize / 2.5;
        c.font = "" + fontSize + "px sans-serif";
        c.strokeStyle = 'red';
        c.fillStyle = 'red';
        pos = this.xyByCell(this.init);
        return c.fillText('FAIL', pos.x + 5, pos.y + this.cellSize / 2);
      }
    };

    GridWorld.prototype.drawGrid = function() {
      var c, x, y, _ref, _ref2;
      this.clear('grid');
      c = ctx.grid;
      c.beginPath();
      c.strokeStyle = 'black';
      for (x = 1, _ref = this.width; 1 <= _ref ? x <= _ref : x >= _ref; 1 <= _ref ? x++ : x--) {
        c.moveTo(x * this.cellSize + 0.5, 0);
        c.lineTo(x * this.cellSize + 0.5, this.h);
      }
      for (y = 1, _ref2 = this.height; 1 <= _ref2 ? y <= _ref2 : y >= _ref2; 1 <= _ref2 ? y++ : y--) {
        c.moveTo(0, y * this.cellSize + 0.5);
        c.lineTo(this.w, y * this.cellSize + 0.5);
      }
      c.closePath();
      return c.stroke();
    };

    GridWorld.prototype.drawHover = function() {
      var c, clearCell, fillCell;
      this.clear('hover');
      c = ctx.hover;
      clearCell = this.xyByCell(this.oldHovered);
      this.clearCellAt(clearCell, 'hover');
      fillCell = this.xyByCell(this.hovered);
      return this.drawCellAt(fillCell, 'hover', gridColors.hover);
    };

    GridWorld.prototype.drawValues = function() {
      var c, maxValue,
        _this = this;
      this.clear('values');
      c = ctx.values;
      maxValue = 0;
      this.iterateDataCells(function(x, y) {
        var pos, value;
        pos = _this.xyByCell(p(x, y));
        value = _this.valueAt(p(x, y));
        if (value < megaValue && value > maxValue) return maxValue = value;
      });
      if (this.valueAsColor) {
        this.iterateDataCells(function(x, y) {
          var color, oppacity, pos, value, _ref;
          pos = _this.xyByCell(p(x, y));
          value = _this.valueAt(p(x, y));
          if ((_ref = _this.policyAt(p(x, y))) === 'wall' || _ref === 'init' || _ref === 'goal') {
            return;
          }
          color = value === megaValue ? oppacity = 0 : oppacity = value * 0.7 / maxValue;
          return _this.drawCellAt(pos, 'values', "rgba(20,20,255," + oppacity + ")");
        });
      }
      return this.iterateDataCells(function(x, y) {
        var pos, value, _ref;
        pos = _this.xyByCell(p(x, y));
        value = _this.valueAt(p(x, y));
        if (((_ref = _this.policyAt(p(x, y))) === 'wall' || _ref === 'init' || _ref === 'goal') || value === megaValue) {
          return;
        }
        if (_this.valueAsNumber) {
          c.font = 'normal 8px';
          c.strokeStyle = 'black';
          c.fillStyle = 'black';
          return c.fillText(value, pos.x + 2, pos.y + 10);
        }
      });
    };

    GridWorld.prototype.draw = function() {
      this.drawGrid();
      this.drawAllWalls();
      this.drawValues();
      return this.drawPolicy();
    };

    return GridWorld;

  })();

  random = Math.random;

  distance = function(from, to) {
    return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
  };

  dp = function(policy, value) {
    if (policy == null) policy = '';
    if (value == null) value = megaValue;
    return {
      policy: policy,
      value: value
    };
  };

  p = function(x, y) {
    return {
      x: x,
      y: y
    };
  };

  equalPoints = function(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  };

  make2DArray = function(w, h, fill) {
    var i, j, _ref, _results;
    _results = [];
    for (j = 1, _ref = Math.floor(h); 1 <= _ref ? j <= _ref : j >= _ref; 1 <= _ref ? j++ : j--) {
      _results.push((function() {
        var _ref2, _results2;
        _results2 = [];
        for (i = 1, _ref2 = Math.floor(w); 1 <= _ref2 ? i <= _ref2 : i >= _ref2; 1 <= _ref2 ? i++ : i--) {
          _results2.push(fill != null ? fill : dp());
        }
        return _results2;
      })());
    }
    return _results;
  };

}).call(this);
