fs = require 'fs'
input = fs.readFileSync('bullseye.in', 'utf-8')

arithmSum = (n) -> n/2 * (1 + n)
ringsAreaPaint = (n, r) -> n * 2 * r + 4 * arithmSum(n-1) + n

results =
  for [r, t] in input.split('\n')[1..].map( (s) -> [+s.split(' ')[0],+s.split(' ')[1]])
    i = 0
    while ringsAreaPaint(i, r) < t
      i++
    i

console.log results