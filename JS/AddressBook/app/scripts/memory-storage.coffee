data = null
class MemoryStorage
  constructor: -> data = {}
  setItem: (key, value) -> data[key] = value
  getItem: (key) -> data[key]
  removeItem: (key) -> delete data[key]
  length: -> data.length

Backbone.LocalStorage::localStorage = ->
  try
    window.localStorage.setItem 'safari private mode test', true
    window.localStorage.removeItem 'safari private mode test'
    localStorage
  catch e
    new MemoryStorage()