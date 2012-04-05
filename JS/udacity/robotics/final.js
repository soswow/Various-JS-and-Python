(function() {
  var RoadWorld, abs, canvases, clear, ctx, gp, height, hsv_to_rgb, pointAt, width, world;

  ctx = {};

  canvases = {};

  width = 800;

  height = 270;

  world = null;

  $(function() {
    var goal_img, init_img, lanes;
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
    lanes = [[100, 100, 100, 200, 300], [50, 50, 50, 50, 50], [1, 1, 1, 1, 1]];
    world = new RoadWorld(lanes);
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
    return $(canvases.initgoal).click(function(e) {
      return world.bottomClick(e.offsetX);
    });
  });

  RoadWorld = (function() {

    function RoadWorld(lanes) {
      this.lanes = lanes;
      this.h = this.lanes.length;
      this.w = this.lanes[0].length;
      this.init = 0;
      this.goal = this.w - 1;
      this.cell_w = width / this.w;
      this.cell_h = height / this.h;
      this.goal_img;
      this.init_img;
      this.draw();
    }

    RoadWorld.prototype.bottomClick = function(x) {
      var xIndex;
      xIndex = Math.floor(x / this.cell_w);
      if (xIndex > this.init + (this.goal - this.init) / 2) {
        this.goal = xIndex;
      } else {
        this.init = xIndex;
      }
      return this.drawArrows();
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

    RoadWorld.prototype.draw = function() {
      var b, c, g, h, hue, lane, max, min, r, speed, w, x, xi, y, yi, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _ref5;
      clear('base');
      this.drawArrows();
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
      for (xi = 0, _ref2 = this.w - 1; 0 <= _ref2 ? xi <= _ref2 : xi >= _ref2; 0 <= _ref2 ? xi++ : xi--) {
        for (yi = 0, _ref3 = this.h - 1; 0 <= _ref3 ? yi <= _ref3 : yi >= _ref3; 0 <= _ref3 ? yi++ : yi--) {
          c.beginPath();
          _ref4 = [gp(this.cell_w * xi), gp(this.cell_h * yi), this.cell_w, this.cell_h], x = _ref4[0], y = _ref4[1], w = _ref4[2], h = _ref4[3];
          c.strokeRect(x, y, w, h);
          speed = this.lanes[yi][xi];
          hue = Math.floor((speed - min) * 180 / max);
          _ref5 = hsv_to_rgb(hue, 0.4, 1), r = _ref5[0], g = _ref5[1], b = _ref5[2];
          c.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          c.fillRect(x, y, w, h);
          c.fillStyle = 'black';
          c.font = '20px sans-serif';
          c.fillText(speed, x + 10, y + 20);
          c.closePath();
        }
      }
      return c.stroke();
    };

    return RoadWorld;

  })();

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

  abs = Math.abs;

  clear = function(ctxId) {
    if (ctxId) return canvases[ctxId].width = width;
  };

}).call(this);
