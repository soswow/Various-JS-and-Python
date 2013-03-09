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
    $(".search-query").val("Harry potter");
    app.googleBooks.search "Harry potter"

  myShelf: ->
    @mainView.showMyShelf()

  start: ->
    @mainView = new @MainView()
    Backbone.history.start pushState: true
    app.myBooks.fetch()
    return this

window.app = new App()

$ ->
  app.start()
