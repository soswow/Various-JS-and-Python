class app.SearchView extends Backbone.View
  el: '#search'

  events:
    'keypress input.search-query': 'doSearch'
    'click #loadMore': 'moreSearch'
    'click button.add': 'toMyShelf'
    'click button.remove': 'fromMyShelf'

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
    $("#loadMore").show() if app.googleBooks.length > 0
    app.googleBooks.each @addOneBook

  preloader: (turnOn) ->
    @$(".form-search").toggleClass "preloader", turnOn

  toMyShelf: (e) ->
    book = app.googleBooks.get $(e.target).data('id')
    app.myBooks.create book.attributes

  fromMyShelf: (e) ->
    book = app.myBooks.get $(e.target).data('id')
    book.destroy()

  updateMyBook: (model) ->
    id = model.id
    inCollection = app.myBooks.get(id)?
    @$("#book_#{id}").toggleClass("onMyShelf", inCollection)

  render: ->
    @addAllBooks()
    @$el.show()



class app.MyShelfView extends Backbone.View
  el: '#my-shelf'

  events:
    'click button.remove': 'removeBook'
    'click button.give-away': 'giveAwayBook'
    'click button.submit-give-away': 'submitGiveAwayBook'
    'click button.cancel-give-away': 'cancelGiveAwayBook'
    'click button.take-back': 'takeBackBook'
    'keyup input.borrower-name': 'keyup'

  template: _.template $("#myShelfBookTemplate").html()
  infoTemplate: _.template $("#bookTemplate").html()

  initialize: ->
    _.bindAll @, 'addOneBook', 'addAllBooks', 'removeFromDOM', 'giveAwayBook', 'updateBook'
    @tableBody = @$("table tbody")
    app.myBooks.on 'reset', @addAllBooks
    app.myBooks.on 'add', @addOneBook
    app.myBooks.on 'change', @updateBook
    app.myBooks.on 'remove destroy', @removeFromDOM

  modelFromEvent: (e) -> app.myBooks.get $(e.target).data('id')

  rowFromEvent: (e) ->
    id = $(e.target).data('id')
    $("#my_book_#{id}")

  keyup: (e) ->
    if e.keyCode is 13
      @rowFromEvent(e).find('button.submit-give-away').click()

  giveAwayBook: (e) ->
    row = @rowFromEvent(e)
    row.find(".default-section").hide()
    row.find(".submit-section").show()
    row.find(".borrower-name-container").slideDown 'fast'
    row.find(".borrower-name").focus()

  submitGiveAwayBook: (e) ->
    row = @rowFromEvent(e)
    borrowdBy = row.find("input.borrower-name").val()
    row.find(".borrower-name-container").slideUp 'fast', =>
      @modelFromEvent(e).set(
        borrowedBy: borrowdBy
        borrowedDate: (new Date).toString("yyyy-MM-ddTHH:mm:ssZ")
      ).save()

  cancelGiveAwayBook: (e) ->
    @rowFromEvent(e).find(".borrower-name-container").slideUp 'fast', =>
      @updateBook @modelFromEvent(e)

  takeBackBook: (e) ->
    @modelFromEvent(e).set('borrowedBy', false).save()

  removeBook: (e) ->
    @modelFromEvent(e).destroy() if confirm("Are you sure want delete it?")

  removeFromDOM: (model) ->
    id = model.get('id')
    $("#my_book_#{id}").remove()
    if app.myBooks.length is 0
      @$("tr.no-books").show()

  updateBook: (model) ->
    id = model.get('id')
    $("#my_book_#{id}").replaceWith @template(model.attributes)

  addOneBook: (model) ->
    @tableBody.append @template(model.attributes)
    @$("tr.no-books").hide()

  addAllBooks: ->
    @tableBody.find("tr:not(.no-books)").remove()
    if app.myBooks.length is 0
      @$("tr.no-books").show()
    app.myBooks.each @addOneBook

  showModelInfo: (id) ->
    cb = =>
      attrs = app.myBooks.get(id).attributes
      modal = $("#modalInfo")
      $(".modal-body", modal).html(@infoTemplate(attrs))
      $("#modalInfoTitle").html(attrs.title).next("p").html(attrs.authorsStr)
      $(".titlePart", modal).remove()
      $("button.add, button.remove", modal).remove()
      modal.modal()
      modal.on 'hide', -> app.navigate 'my-shelf', {trigger: true}
    if app.myBooks.length > 0
      cb()
    else
      app.myBooks.once 'fetch reset', => cb()


  render: ->
    @addAllBooks()
    @$el.show()


class app.MainView extends Backbone.View
  el: 'body'

  events:
    "click .nav .search":  "navigateLink"
    "click .nav .my-shelf":   "navigateLink"

  initialize: ->
    _.bindAll @, 'updateMyBooksCount'
    @mainMenu = @$el.find(".navbar:eq(0) .nav")
    @searchView = new app.SearchView()
    @myShelfView = new app.MyShelfView()
    app.myBooks.on 'add remove destroy fetch reset', @updateMyBooksCount

  updateMyBooksCount: ->
    $("#myBooksCount").html(app.myBooks.length)

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