describe "Group collection", ->

  it "should make options list", ->
    expect(app.models.groups.length).toBe 3
    expect(app.models.groups.map( (obj) -> obj.get('name') )).toInclude 'Work', 'Family', 'Other'

  it "should have initial items", ->
    options = app.models.groups.makeOptions()
    expect(options).toMatch /<option.*<\/option>/