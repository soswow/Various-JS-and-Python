describe "Contact model", ->
  model = null

  beforeEach ->
    app.models.contacts.reset()
    model = new app.models.Contact()
    app.models.contacts.add model

  it "shouldn't be saved without name and phone", ->
    invalid = model.save {}
    expect(invalid).toBe false
    expect(model.validationError.length).toBe 2
    expect(model.validationError[0]).toInclude 'name', 'phone'
    expect(model.validationError[1]).toBe 'Name, Phone are mandatory'

    invalid = model.save name: "Something"
    expect(invalid).toBe false
    expect(model.validationError.length).toBe 2
    expect(model.validationError[0]).toInclude 'phone'
    expect(model.validationError[1]).toBe 'Phone is mandatory'

  it "should be saved with name, phone and group", ->
    validData = name: 'Test', phone: '123', group: 10
    expect(model.save(validData)).toBeTruthy()


describe "Contacts collection", ->

  beforeEach ->
    app.models.contacts.reset()

  it "should return saved items only", ->
    model = new app.models.Contact(name: "Test", phone: "123")
    app.models.contacts.add model
    expect(app.models.contacts.notNew()).toBeEmpty()
    model.save()
    savedItems = app.models.contacts.notNew()
    expect(savedItems).toBeArray()
    expect(savedItems.length).toBe 1
    expect(savedItems[0]).toBe model