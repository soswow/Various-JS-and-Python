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
    groupId: null

  mandatory: ['name', 'phone']


class ContactsCollection extends Backbone.Collection
  model: app.models.Contact
  localStorage: new Backbone.LocalStorage("ContactsCollection")
  comparator: (contact) -> contact.get("name")

class GroupsCollection extends Backbone.Collection

  model: app.models.Group

  localStorage: new Backbone.LocalStorage("GroupCollection")

  makeOptions: (selectedId) ->
    @map((group) ->
      id = group.id or group.cid
      selected = if id is selectedId then "selected" else ""
      "<option value='#{id}' #{selected}>#{group.escape('name')}</option>"
    ).join("")

app.models.contacts = new ContactsCollection()

app.models.groups = new GroupsCollection()
app.models.groups.fetch()
if app.models.groups.length is 0
  for name in ['Work', 'Family', 'Other']
    app.models.groups.create name: name