(function() {

  $(function() {
    var H, SIZE, W, c, columns, drawGrid, drawMaze, gridLocation, maze, rows;
    W = 700;
    H = 500;
    SIZE = 40;
    columns = Math.ceil(W / SIZE);
    rows = Math.ceil(H / SIZE);
    c = $("#canvas").attr({
      width: W,
      height: H
    }).get(0).getContext('2d');
    drawGrid = function() {
      var x, y, _results;
      c.fillStyle = "rgb(200,200,200)";
      c.strokeStyle = "rgb(100,100,100)";
      c.fillRect(0, 0, W, H);
      for (x = SIZE; SIZE <= W ? x < W : x > W; x += SIZE) {
        c.moveTo(x + 0.5, 0);
        c.lineTo(x + 0.5, H);
        c.stroke();
      }
      _results = [];
      for (y = SIZE; SIZE <= H ? y < H : y > H; y += SIZE) {
        c.moveTo(0, y + 0.5);
        c.lineTo(W, y + 0.5);
        _results.push(c.stroke());
      }
      return _results;
    };
    maze = [['#', '#', '#', '#', '#', 'D', '#', '#', '#', '#', '#', '#'], ['#', 'B', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'], ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'], ['#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'], ['#', ' ', '#', ' ', ' ', 'C', ' ', ' ', ' ', ' ', ' ', 'E'], ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#'], ['#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#'], ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'B', '#'], ['#', '#', '#', '#', '#', 'D', '#', '#', '#', '#', '#', '#']];
    gridLocation = function(x, y) {
      return [x * SIZE, y * SIZE];
    };
    drawMaze = function() {
      var cell, colPadding, column, mh, mw, row, rowPadding, _results;
      mw = maze[0].length;
      mh = maze.length;
      colPadding = Math.round((columns - mw) / 2);
      rowPadding = Math.round((rows - mh) / 2);
      _results = [];
      for (row = 0; 0 <= mh ? row < mh : row > mh; 0 <= mh ? row++ : row--) {
        _results.push((function() {
          var _results2;
          _results2 = [];
          for (column = 0; 0 <= mw ? column < mw : column > mw; 0 <= mw ? column++ : column--) {
            cell = maze[row][column];
            c.fillStyle = {
              '#': "rgb(200,200,200)",
              ' ': "rgb(240,240,240)",
              D: "rgb(200,100,100)",
              E: "rgb(100,200,100)",
              B: "rgb(100,100,200)",
              C: "rgb(100,200,200)"
            }[cell];
            _results2.push(c.fillRect((column + colPadding) * SIZE + 1, (row + rowPadding) * SIZE + 1, SIZE - 1, SIZE - 1));
          }
          return _results2;
        })());
      }
      return _results;
    };
    drawGrid();
    return drawMaze();
  });

}).call(this);
