colors = [['red', 'green', 'green', 'red' , 'red'],
          ['red', 'red', 'green', 'red', 'red'],
          ['red', 'red', 'green', 'green', 'red'],
          ['red', 'red', 'red', 'red', 'red']]

measurements = ['green', 'green', 'green' ,'green', 'green']


motions = [[0,0],[0,1],[1,0],[1,0],[0,1]]

sensor_right = 0.7

p_move = 0.8

def show(p):
    for i in range(len(p)):
        print p[i]

#DO NOT USE IMPORT
#ENTER CODE BELOW HERE
#ANY CODE ABOVE WILL CAUSE
#HOMEWORK TO BE GRADED
#INCORRECT
world = colors
pHit = sensor_right
pMiss = 1 - sensor_right
pExact = p_move
pStay = 1 - p_move

def get_dims():
  return len(world), len(world[0])

def init(num=None):
  p = []
  ydim, xdim = get_dims()
  if num is None:
    num = 1.0 / (xdim * ydim)
  for y in range(ydim):
    p.append([num] * xdim)
  return p

def sense(p, measurement):
  total = 0

  for y, row in enumerate(p):
    for x, cell in enumerate(row):
      p[y][x] = cell * pHit if world[y][x] == measurement else cell * pMiss
    total += sum(p[y])

  for y, row in enumerate(p):
    for x, cell in enumerate(row):
      p[y][x] = cell / total

  return p

def move(p, U):
  ydim, xdim = get_dims()
  ydif, xdif = U[0] % ydim, U[1] % xdim
  accum = init(0)
  q = p[-ydif:] + p[:-ydif]
  for y, row in enumerate(q):
    q[y] = row[-xdif:] + row[:-xdif]

  for y, row in enumerate(q):
    for x, cell in enumerate(row):
      accum[y][x] += cell * pExact
      accum[y-ydif][x-xdif] += cell * pStay

  return accum

p = init()
for i, color in enumerate(measurements):
  p = move(p, motions[i])
  p = sense(p, color)

#Your probability array must be printed 
#with the following code.

show(p)




