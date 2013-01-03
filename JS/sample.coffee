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

yearsOld = max: 10, ida: 9, tim: 11

for filename in list
  do (filename) ->
    fs.readFile filename, (err, contents) ->
      compile filename, contents.toString()

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
start = numbers[0..2]
numbers[3..6] = [-3, -4, -5, -6]


alert(
  try
    nonexistent / undefined
  catch error
    "And the error is ... #{error}"
)


futurists =
  sculptor: "Umberto Boccioni"
  painter:  "Vladimir Burliuk"
  poet:
    name:   "F.T. Marinetti"
    address: [
      "Via Roma 42R"
      "Bellagio, Italy 22021"
    ]

{poet: {name, address: [street, city]}} = futurists


switch day
  when "Mon" then go work
  when "Tue" then go relax
  when "Thu" then go iceFishing
  when "Fri", "Sat"
    if day is bingoDay
      go bingo
      go dancing
  when "Sun" then go church
  else go work


cholesterol = 127
healthy = 200 > cholesterol > 60