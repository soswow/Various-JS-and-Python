class BaseModel extends Backbone.Model
  mandatory: []

  validate: (attrs) ->
    errorFields =
      for field in @mandatory when not attrs[field]
        field

    if errorFields.length
      failedFieldsStr = _.map(errorFields, _.capitalize).join(', ')
      isAre = if errorFields.length > 1 then 'are' else 'is'
      [errorFields, "#{failedFieldsStr} #{isAre} mandatory"]


class app.models.Group extends BaseModel
  defaults:
    name: ''
  mandatory: ['name']


class app.models.Contact extends BaseModel
  defaults:
    name: ''
    phone: ''
    group: null

  mandatory: ['name', 'phone']

app.models.contacts = new Backbone.Collection([],
  model: app.models.Contact
  localStorage: new Backbone.LocalStorage("ContactsCollection"),
)
