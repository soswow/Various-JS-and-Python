testCases = [
  {
    in: ["A1", "A10", "A2" ]
    out: ["A1", "A2", "A10" ]
  }
  {
    in: ["B9", "B345", "A10", "DAC", "B76"]
    out: ["A10", "B9", "B76", "B345", "DAC"]
  }
  {
    in: [ "11" , "1" , "21" , "122" , "A11" , "A2" , "A2B2" , "A2B11" , "A11B0" , "A1B11" , "A1C0D2" , "A1C0D11" ]
    out: [ "1" , "11" , "21" , "122" , "A1B11" , "A1C0D2" , "A1C0D11" , "A2" , "A2B2" , "A2B11" , "A11" , "A11B0"]
  }
]

print = console.log

assertEqualsArray = (arr1, arr2) ->
  throw "Lengths are different: #{arr1.length} and #{arr2.length}" unless arr1.length is arr2.length
  for el, i in arr1
    throw "Element #{i} is different: #{el} and #{arr2[i]}" unless el is arr2[i]

sort = (input) ->
  max_tokens = 0
  input = input.map (item) ->
    tokenized = item.match(/(\D+)|(\d+)/g)
    max_tokens = tokenized.length if tokenized.length > max_tokens
    tokenized.map (token) ->
      int = parseInt token, 10
      if isNaN(int) then token else int
  for tok_i in [0...max_tokens]
    input.sort (a, b) ->
#      print a, b
      res =
        if a.length <= tok_i or b.length <= tok_i
          0
        else if tok_i > 0 and a[tok_i-1] isnt b[tok_i-1]
          0
        else if a[tok_i] is b[tok_i]
          0
        else if a[tok_i] > b[tok_i]
          1
        else
          -1
#      res = 0
      print tok_i, a.join(""), b.join(""), a[tok_i], b[tok_i], res
      res

    print tok_i, input.map (tokens) -> tokens.join ""
  input.map (tokens) -> tokens.join ""

test = ->
  for {in: input, out: answer} in testCases
    print "======="
    assertEqualsArray sort(input), answer

test()


a = ['1', '11', '21', '122', 'A11', 'A2', 'A1C0D11', 'A2B11', 'A11B0', 'A1B11', 'A1C0D2', 'A2B2']