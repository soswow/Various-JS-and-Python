class app.SearchView extends Backbone.View
  el: '#search'

  events:
    'keypress input.search-query': 'doSearch'
    'click #loadMore': 'moreSearch'
    'click button.add': 'toMyShelf'

  bookTemplate: _.template $("#bookTemplate").html()

  initialize: ->
    _.bindAll @, 'addAllBooks', 'addOneBook', 'updateMyBook'
    @input = @$('.search-query')
    @resultContainer = @$('#search-results')
    @resultList = @resultContainer.find(".list")
    app.googleBooks.on 'reset', @addAllBooks
    app.googleBooks.on 'add', @addOneBook
    app.myBooks.on 'add remove destroy', @updateMyBook

  doSearch: (e) ->
    return unless e.keyCode is 13
    @preloader true
    app.googleBooks.search @input.val()

  moreSearch: ->
    @preloader true
    app.googleBooks.searchMore()

  updateCounter: ->
    @$(".found-count").html "Found #{app.googleBooks.total} results. First #{app.googleBooks.length} shown below."

  addOneBook: (book) ->
    @resultList.append @bookTemplate(book.attributes)
    $(".stars span").tooltip()
    @updateCounter()
    @preloader false

  addAllBooks: ->
    @resultList.empty()
    app.googleBooks.each @addOneBook

  preloader: (turnOn) ->
    @$(".form-search").toggleClass "preloader", turnOn

  toMyShelf: (e) ->
    book = app.googleBooks.get $(e.target).data('id')
    app.myBooks.create book.attributes

  updateMyBook: (model) ->
    id = model.id
    inCollection = app.myBooks.get(id)?
    console.log id, inCollection
    @$("#book_#{id} .buttons").toggleClass("onMyShelf", inCollection)

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