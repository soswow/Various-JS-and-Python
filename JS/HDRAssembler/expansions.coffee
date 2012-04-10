unless String.prototype.startsWith
  String.prototype.startsWith = (thing) ->
    @.indexOf(thing) is 0

throw "error in startsWith" unless "SOME_DO".startsWith("SOME")
throw "error in startsWith" if "SOME_DO".startsWith("DO")

unless String.prototype.endsWith
  String.prototype.endsWith = (thing) ->
    @.indexOf(thing) is (@.length - thing.length)

throw "error in endsWith" unless "SOME_DO".endsWith("DO")
throw "error in endsWith" if "SOME_DO".endsWith("SOME")

unless String.prototype.lines
  Object.defineProperty String.prototype, 'lines', get: -> @.split /\n/

throw "error in endsWith" if """Something
is
here
""".lines.length isnt 3