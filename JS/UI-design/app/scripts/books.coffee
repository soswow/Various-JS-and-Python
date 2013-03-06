class app.Book extends Backbone.Model
  @parseGoogle = (raw) ->
    id: raw.id
    title: raw.volumeInfo.title
    subtitle: raw.volumeInfo.subtitle
    description: raw.volumeInfo.description
    averageRating: raw.volumeInfo.averageRating
    categories: raw.volumeInfo.categories
    image: raw.volumeInfo.imageLinks?.thumbnail
    ISBN: raw.volumeInfo.industryIdentifiers[1].identifier
    language: raw.volumeInfo.language
    publishedDate: raw.volumeInfo.publishedDate
    publisher: raw.volumeInfo.publisher

  @parseGoodreads = (raw) ->


  defaults:
    barrowed: false

class app.GoogleBooksCollection extends Backbone.Collection
  mode: app.Book

  initialize: ->
    @api = new app.GoogleApi()

  search: (q) ->
    @api.search q, (books) =>
      @total = books.totalItems
      books = books.items.map (book) => app.Book.parseGoogle(book)
      @reset books

  sync: ->


class app.OwnBooksCollection extends Backbone.Collection
  mode: app.Book

app.googleBooks = new app.GoogleBooksCollection()