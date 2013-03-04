class app.SearchView extends Backbone.View
  el: '#search'

  events:
    'keypress input.search-query': 'doSearch'

  bookTemplate: _.template $("#bookTemplate").html()

  initialize: ->
    _.bindAll @
    @input = @$('.search-query')
    @resultContainer = @$('#search-results')
    @resultList = @resultContainer.find(".list")
    app.googleBooks.bind 'reset', @render

  doSearch: (e) ->
    return unless e.keyCode is 13
    app.googleBooks.search @input.val()

  addOneBook: (book) ->
    @resultList.append @bookTemplate(book.attributes)

  addAllBooks: ->
    @resultList.empty()
    app.googleBooks.each @addOneBook

  render: ->
    @addAllBooks()
    @$el.show()


class app.MyShelfView extends Backbone.View
  el: '#my-shelf'

  render: ->
    @$el.show()


class app.MainView extends Backbone.View
  el: 'body'

  events:
    "click .nav .search":  "navigateLink"
    "click .nav .my-shelf":   "navigateLink"

  initialize: ->
    console.log "init Main View"
    @mainMenu = @$el.find(".navbar:eq(0) .nav")
    @searchView = new app.SearchView()
    @myShelfView = new app.MyShelfView()

  navigateLink: (event) ->
    url = $(event.target).closest("a").attr("href")
    app.navigate url, {trigger: true}
    return false

  activateMenu: (name) ->
    @mainMenu.find("li")
      .removeClass("active")
      .filter(".#{name}")
      .addClass("active")

  hideContent: ->
    @$el.find(".content").hide()

  showSearch: ->
#    console.log "showSearch"
    @activateMenu("search")
    @hideContent()
    @searchView.render()

  showMyShelf: ->
#    console.log "showMyShelf"
    @activateMenu("my-shelf")
    @hideContent()
    @myShelfView.render()