p=[0.2, 0.2, 0.2, 0.2, 0.2]
world=['green', 'red', 'red', 'green', 'green']
measurements = ['red', 'green']
motions = [1,1]
pHit = 0.6
pMiss = 0.2
pExact = 0.8
pOvershoot = 0.1
pUndershoot = 0.1

def sense(p, measurement):
    q = [it * pHit if world[i] == measurement else it * pMiss for i, it in enumerate(p)]
    total = sum(q)
    return [it/total for it in q]

def move(p, U):
    l = len(p)
    i = U % l
    accum = [0] * l
    q = p[-i:] + p[:-i]
    for i, k in enumerate(q):
      accum[i] += k * pExact
      accum[(i-1) % l] += k * pUndershoot
      accum[(i+1) % l] += k * pUndershoot
    return accum

for i in range(len(measurements)):
  p = sense(p, measurements[i])
  p = move(p, motions[i])
  
print p