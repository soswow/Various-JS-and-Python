$ = (arg) -> document.querySelector arg

el = $("#canvas")
ctx = el.getContext("2d")
max =
  w: el.width
  h: el.height

$log = document.getElementById("span")
buffer = []
i = undefined
j = undefined
k = 0
state =
  for j in [0...max.h]
    Math.round(Math.random()) for i in [0...max.w]
stateTmp =
  for j in [0...max.h]
    Math.round(Math.random()) for i in [0...max.w]

drawNewImage = ->
  imageData = ctx.createImageData(max.w, max.h)
  j = 0
  inRow = max.w * 4
  while j < max.h * max.w * 4
    if (j+1) % 4 is 0
      row = Math.ceil((j+1) / inRow) - 1
      col = ((j-3) % inRow) / 4
      imageData.data[j] = (state[row][col] > 0) and 255 or 0
    j++

  ctx.putImageData imageData, 0, 0, 0, 0, max.w, max.h

neighbour = (row, col) ->
  row >= 0 and col >= 0 and state[row] and state[row][col] or 0

countNeighbours = (row, col) ->
  neighbour(row-1,  col-1) +
  neighbour(row-1,  col) +
  neighbour(row-1,  col+1) +
  neighbour(row,    col-1) +
  neighbour(row,    col+1) +
  neighbour(row+1,  col-1) +
  neighbour(row+1,  col)
  neighbour(row+1,  col+1)

updateState = ->
#  console.time "updateState"
  #  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  #  Any live cell with two or three live neighbours lives on to the next generation.
  #  Any live cell with more than three live neighbours dies, as if by overcrowding.
  #  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  for row in [0...max.h]
    for col in [0...max.w]
      neighboursNum = countNeighbours(row, col)
      if state[row][col] is 1
        if neighboursNum < 2 or neighboursNum > 3
          stateTmp[row][col] = 0
        else
          stateTmp[row][col] = 1
      else
        if neighboursNum is 3
          stateTmp[row][col] = 1
        else
          stateTmp[row][col] = 0
#  console.timeEnd "updateState"
  tmp = state
  state = stateTmp
  stateTmp = tmp


stop = false
step = ->
  drawNewImage()
  updateState()
  requestAnimationFrame step  unless stop


$("#start").addEventListener "click", ->
  stop = false
  step()

$("#stop").addEventListener "click", ->
  stop = true