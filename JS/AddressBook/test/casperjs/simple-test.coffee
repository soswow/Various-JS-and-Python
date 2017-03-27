casper.test.begin "Initial smoke test", 7, (test) ->

  casper.start 'http://localhost:9001', ->
    test.assertTitle "Super puper address book!", "Right title"
    test.assertExists "#search-add-field"
    searchAttr = @getElementAttribute '#search-add-field', 'placeholder'
    test.assertEquals searchAttr, "Search contact", 'Search field has right placeholder'
    test.assertVisible "button.add-one", "Add button is visible"
    test.assertSelectorHasText "button.add-one", "or Add one"
    test.assertExists "#contacts-list span.no-data"
    test.assertSelectorHasText "#contacts-list span.no-data", "There is no contacts yet."

  casper.run -> test.done()


casper.test.begin "Adding new contact", 4, (test) ->

  casper.start 'http://localhost:9001', ->
    test.comment "Let's click add button"
    @click 'button.add-one'
    test.assertNotVisible "button.add-one", "Add button not visible now"
    test.assertVisible ".btn-group button.save", "Save button is visible"
    test.assertVisible ".btn-group button.cancel", "Cancel button is visible"
    searchAttr = @getElementAttribute '#search-add-field', 'placeholder'
    test.assertEquals searchAttr, "Full name", 'Name field has right placeholder'

  casper.run -> test.done()

