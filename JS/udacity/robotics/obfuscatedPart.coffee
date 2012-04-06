@calculatePolicy = ->
  value = []
  @policy = []
  for i in [0..@h-1]
    value.push []
    @policy.push []
    for j in [1..@w]
      value[i].push 99999
      @policy[i].push ' '

  lane_delta = [-1, 1, 0]
  shift_names = ['up','dw','no']

  change = true
  while change
    change = false
    for lane, y in @lanes
      for speed, x in lane
        if y is @h-1 and @goal is x
          if value[y][x] > 0
            value[y][x] = 0
            @policy[y][x] = '*'
            change = true
        else if speed > 0
          x2 = x + 1
          if x2 >= 0 and x2 < @w
            for lane_shift, i in lane_delta
              y2 = y + lane_shift
              if y2 >= 0 and y2 < @h and @lanes[y][x] > 0
                speed_cost = 1 / @lanes[y][x]
                lane_shift_cost = abs(lane_shift) * @lane_change_cost
                v2 = value[y2][x2] + speed_cost + lane_shift_cost
                if v2 < value[y][x]
                  change = true
                  value[y][x] = v2
                  @policy[y][x] = shift_names[i]
  printIt @policy
  printIt value

printIt= (what) ->
  console.log (wh.join(", ") for wh in what).join("\n")
abs = Math.abs