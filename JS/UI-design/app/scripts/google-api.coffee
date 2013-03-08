class app.GoogleApi
  constructor: (@perPage=20) ->
    @key = "AIzaSyBh4CXjrAS1zFJPO_2KWTG5HavZnDjhjkQ"

  search: (q, options, cb) ->
    unless cb
      cb = options
      options = {}

    options = $.extend options,
      page: 1

#    window.callback = (res) ->


    filterBy = [
      "id"
      "volumeInfo/title"
      "volumeInfo/subtitle"
      "volumeInfo/authors"
      "volumeInfo/description"
      "volumeInfo/publisher"
      "volumeInfo/publishedDate"
      "volumeInfo/imageLinks"
      "volumeInfo/categories"
      "volumeInfo/mainCategory"
      "volumeInfo/averageRating"
      "volumeInfo/ratingsCount"
      "volumeInfo/language"
      "volumeInfo/industryIdentifiers"
      "volumeInfo/imageLinks"
    ].join(",")

    $.ajax
      url: "https://www.googleapis.com/books/v1/volumes"
      data:
        key: @key
        q: q
        country: "us"
        #      startIndex: (options.page-1) * @perPage
        #      maxResults: @perPage
        callback: "callback"
        fields: "items(#{filterBy}),totalItems"
      dataType: 'jsonp'
      error: -> console.log 'Error', arguments
      success: cb


#api = new app.GoogleApi()
#api.search "Harry Potter", (books) ->
#  console.log(books)