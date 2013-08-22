casper.test.begin "Simple Test", 1, (test) ->
  test.assert(true)
  test.done()

#casper.start 'http://localhost:9000', ->
#  @echo @getTitle()

#casper.run()