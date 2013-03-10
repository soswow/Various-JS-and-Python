class App extends Backbone.Router
  routes:
    '': 'index'
    'search': 'search'
    'my-shelf': 'myShelf'

  initialize: ->

  index: ->
    @navigate "search", {trigger: true}
    return false

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
