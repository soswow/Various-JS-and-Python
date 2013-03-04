class App extends Backbone.Router
  routes:
    '': 'index'
    'search': 'search'
    'my-shelf': 'myShelf'

  initialize: ->

  index: ->
    @navigate "search", {trigger: true}

  search: ->
    @mainView.showSearch()

  myShelf: ->
    @mainView.showMyShelf()

  start: ->
    @mainView = new @MainView()
    Backbone.history.start pushState: true
    return this

window.app = new App()

$ -> app.start()
