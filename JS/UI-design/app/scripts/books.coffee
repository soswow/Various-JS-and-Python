class app.Book extends Backbone.Model
  @parseGoogle = (raw) ->
    volume = raw.volumeInfo

    id: raw.id
    title: volume.title
    subtitle: volume.subtitle
    authors: volume.authors
    description: volume.description
    averageRating: volume.averageRating
    ratingsCount: volume.ratingsCount
    categories: volume.categories
    image: volume.imageLinks?.thumbnail
    ISBN: volume.industryIdentifiers[1]?.identifier
    language: volume.language
    publishedDate: Date.parse(volume.publishedDate)
    publisher: volume.publisher

  @parseGoodreads = (raw) ->

  defaults:
    barrowed: false

class app.GoogleBooksCollection extends Backbone.Collection
  mode: app.Book

  initialize: ->
    @gapi = new app.GoogleApi()
    @grApi = new app.GoodreadApi()

  search: (q) ->
    @gapi.search q, (books) =>
      @total = books.totalItems
      books = books.items.map (book) => app.Book.parseGoogle(book)
      @reset books

  sync: ->


class app.OwnBooksCollection extends Backbone.Collection
  mode: app.Book

app.googleBooks = new app.GoogleBooksCollection()