class App extends Backbone.Router
  routes:
    '': 'index'
    'login': 'login'
    'registration': 'registration'
    'search': 'search'
    'my-shelf': 'myShelf'
    'modal-info/:id': 'showModelInfo'

  initialize: ->

  index: ->
    if @name
      @navigate "search", {trigger: true}
    else
      @navigate "login", {trigger: true}
    return false

  login: ->
    @mainView.showLogin()

  registration: ->
    @mainView.showRegistration()

  search: ->
    @mainView.showSearch()

  myShelf: ->
    @mainView.showMyShelf()

  showModelInfo: (id) ->
    @myShelf()
    @mainView.myShelfView.showModelInfo id

  setName: (@name) ->
    $("#userNamePlace").text(@name)

  start: ->
    @mainView = new @MainView()
    Backbone.history.start pushState: true
    app.myBooks.fetch()

    $("body").on "click", "a", (evt) ->
      href = $(this).attr("href")
#      console.log (href.indexOf("http") isnt 0), (href isnt '#')
      if href.indexOf("http") isnt 0 and href isnt '#'
        evt.preventDefault()
        app.navigate href, {trigger: true}
      else
        return true

    return this

window.app = new App()

$ ->
  app.start()
