$ ->
  W = 700
  H = 500
  SIZE = 40
  columns = Math.ceil W/SIZE
  rows = Math.ceil H/SIZE
  
  c = $("#canvas").attr({width: W, height: H}).get(0).getContext '2d'

  drawGrid = ->
    c.fillStyle = "rgb(200,200,200)"
    c.strokeStyle = "rgb(100,100,100)"
    c.fillRect 0, 0, W, H
    
    for x in [SIZE...W] by SIZE
      c.moveTo x + 0.5, 0
      c.lineTo x + 0.5, H
      c.stroke()
      
    for y in [SIZE...H] by SIZE
      c.moveTo 0, y + 0.5
      c.lineTo W, y + 0.5
      c.stroke()

  maze = [
    ['#', '#', '#', '#', '#', 'D', '#', '#', '#', '#', '#', '#']
    ['#', 'B', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#']
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#']
    ['#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#']
    ['#', ' ', '#', ' ', ' ', 'C', ' ', ' ', ' ', ' ', ' ', 'E']
    ['#', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#']
    ['#', '#', '#', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#']
    ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'B', '#']
    ['#', '#', '#', '#', '#', 'D', '#', '#', '#', '#', '#', '#']
  ]

  gridLocation = (x, y) -> [x * SIZE, y * SIZE]
    
  drawMaze = ->
    mw = maze[0].length
    mh = maze.length
    colPadding = Math.round (columns - mw) / 2
    rowPadding = Math.round (rows - mh) / 2
    for row in [0...mh]
      for column in [0...mw]
        cell = maze[row][column]
        c.fillStyle = {
          '#': "rgb(200,200,200)"
          ' ': "rgb(240,240,240)"
          D: "rgb(200,100,100)"
          E: "rgb(100,200,100)"
          B: "rgb(100,100,200)"
          C: "rgb(100,200,200)"
        }[cell]
        c.fillRect (column + colPadding) * SIZE+1, (row + rowPadding) * SIZE+1, SIZE-1, SIZE-1

  drawGrid()
  drawMaze()