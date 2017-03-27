describe "Global stuff", ->
  it "should be in place", ->
    expect(app).toBeDefined()
    expect(app.models).toBeDefined()
    expect(app.models.Group).toBeDefined()
    expect(app.models.Contact).toBeDefined()
    expect(app.models.groups).toBeDefined()
    expect(app.models.contacts).toBeDefined()
