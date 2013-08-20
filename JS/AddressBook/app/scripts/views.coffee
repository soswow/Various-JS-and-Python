class app.views.SearchForm extends Backbone.View
  el: '#top-form'

  events:
    'keydown #search-add-field': 'search'

  initialize: ->
    @$query = $ '#search-add-field'
    @$searchAddIcon = @$ "label[for=search-add-field] i"

  render: ->
    @$query.attr 'placeholder', 'Search contact'
    @$searchAddIcon.removeAttr('class').addClass("icon-search")
    @$el.removeClass 'add-form-state'
    @$('.has-error').removeClass 'has-error'
    app.mainPage.closeError()
    @$query.focus()

  search: ->

class app.views.AddForm extends Backbone.View
  el: '#top-form'

  events:
    'click button.cancel': 'cancel'
    'click button.save': 'save'
    'keyup input': 'clearErorrs'

  initialize: ->
    @$name = $ '#search-add-field'
    @$phone = $ '#phone-field'
    @$group = $ '#group-field'
    @$searchAddIcon = @$ "label[for=search-add-field] i"
    @resetModel()
    @model.on 'invalid', (a,b) =>
      console.log a,b,@model.validationError
      [fields, message] = @model.validationError
      for field in fields
        @$("[data-field=#{field}]").parent().addClass('has-error')
      app.mainPage.showError message

  resetModel: ->
    @model = new app.models.Contact()

  cancel: ->
    @$name.val ""
    @$phone.val ""

  clearErorrs: (e) ->
    ($ e.target).parents('.has-error').removeClass 'has-error'
    app.mainPage.closeError()

  save: ->
    dataOpts =
      name: @$name.val()
      phone: @$phone.val()
      group: @$group.val()
    console.log dataOpts
    if @model.set(dataOpts, validate: true)
      console.log("OK")
    else
      console.log("ERR")

  render: ->
    @$name.attr 'placeholder', 'Full name'
    @$searchAddIcon.removeAttr('class').addClass 'icon-user'
    @$el.addClass 'add-form-state'
    @$('.has-error').removeClass 'has-error'
    app.mainPage.closeError()
    @$name.focus()

    @$group.selectpicker(
      container: 'body'
    ).selectpicker('setStyle', 'form-control btn-lg input-lg group-select-ui')


class app.views.ContactsListView extends Backbone.View
  collection: app.models.contacts

  render: ->


class app.views.MainPage extends Backbone.View
  el: '#main-page-content'

  errorTemplate: _.template $("#error-message-box").html()

  events: ->
    'click #top-form button.cancel': => @searchForm.render()
    'click #top-form button.add-one': => @addForm.render()

  initialize: ->
    @addForm = new app.views.AddForm()
    @searchForm = new app.views.SearchForm()
    @contactsListView = new app.views.ContactsListView()

  render: ->
    @$(".alert").alert()
    @searchForm.render()
    @contactsListView.render()

  showError: (msg) ->
    $("#alerts-box").html @errorTemplate message: msg

  closeError: ->
    @$("button.close").click()