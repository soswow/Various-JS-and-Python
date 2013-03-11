class App extends Backbone.Router
  routes:
    '': 'index'
    'search': 'search'
    'my-shelf': 'myShelf'
    'modal-info/:id': 'showModelInfo'

  initialize: ->

  index: ->
    @navigate "search", {trigger: true}
    return false

  search: ->
    @mainView.showSearch()

  myShelf: ->
    @mainView.showMyShelf()

  showModelInfo: (id) ->
    @myShelf()
    @mainView.myShelfView.showModelInfo id

  start: ->
    @mainView = new @MainView()
    Backbone.history.start pushState: false
    app.myBooks.fetch()

    $(document).delegate "a", "click", (evt) ->
      href = $(this).attr("href")
      protocol = this.protocol + "//"

      if href.slice(protocol.length) isnt protocol
        evt.preventDefault()
        app.navigate href, {trigger: true}

    return this

window.app = new App()

$ ->
  app.start()
