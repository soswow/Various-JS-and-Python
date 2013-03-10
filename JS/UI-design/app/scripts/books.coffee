class app.Book extends Backbone.Model
  @parseGoogle = (raw) ->
    volume = raw.volumeInfo

    id: raw.id
    title: volume.title
    subtitle: volume.subtitle
    authors: volume.authors
    authorsStr: (volume.authors || ["unknown author"]).join(", ")
    description: volume.description
    averageRating: volume.averageRating
    ratingsCount: volume.ratingsCount
    categories: volume.categories
    image: volume.imageLinks?.thumbnail
    ISBN: volume.industryIdentifiers[1]?.identifier
    language: volume.language
    publishedDate: Date.parse(volume.publishedDate)
    publisher: volume.publisher

  defaults:
    borrowedBy: false
    borrowedDate: null

class app.GoogleBooksCollection extends Backbone.Collection
  model: app.Book

  initialize: ->
    @gapi = new app.GoogleApi()

  search: (@q) ->
    @page = 1
    @gapi.search @q, (books) =>
      @total = books.totalItems
      books = books.items.map (book) => app.Book.parseGoogle(book)
      @reset books

  searchMore: ->
    @page += 1
    @gapi.search @q, {page: @page}, (books) =>
      books = books.items.map (book) => app.Book.parseGoogle(book)
      @add books

  sync: ->


class app.MyBooksCollection extends Backbone.Collection
  model: app.Book
  localStorage: new Backbone.LocalStorage("MyShelf")

app.googleBooks = new app.GoogleBooksCollection()
app.myBooks = new app.MyBooksCollection()