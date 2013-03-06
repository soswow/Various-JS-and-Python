class app.GoodreadApi
  constructor: (@perPage=20) ->
    @key = "6UbF5q3VgYQwX3WKRKKo1Q"

  search: (q, options, cb) ->
    unless cb
      cb = options
      options = {}

    site = "http://www.goodreads.com/search.xml?key=#{@key}&amp;q=#{encodeURIComponent(q)}"
    yqlQ = "select * from xml where url=\"#{site}\""
    $.ajax
      url: "http://query.yahooapis.com/v1/public/yql"
      data:
        q:yqlQ
        format: 'json'
        callback: '?'
      dataType: 'jsonp'
      error: -> console.log 'Error', arguments
      success: cb


api = new app.GoodreadApi()
api.search "Harry Potter", (books) ->
  console.log(books)