actions =
  plus: (a, b) -> a + b
  minus: (a, b) -> a - b

calculate = (a, action="plus", others...) ->
  validAction = action in Object.keys(actions)
  throw "Wrong action" unless validAction
  while others.length > 0
    a = actions[action]  a, others.shift()
  return a

result = calculate  10, "plus", 20, 30, 40
console.log  result is 100