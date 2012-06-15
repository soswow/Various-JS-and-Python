socket = io.connect  'http://localhost:8080'

class User
  constructor: (@name) ->
    @title = "Mr."

  toString: ->
    return "#{@title} #{@name}"

@addUser = ->
  nameObj = document.getElementById  "userName"
  socket.emit  'addNewUser', new User(nameObj.value)

@sendMessage = ->
  messageObj = document.getElementById  "message"
  socket.emit  'msg', messageObj.value

socket.on  'ready', -> console.log  "Name is setted"
socket.on  'set sessionId', (id) ->
  console.log "Our id is #{id}"
  idObj = document.getElementById  "userSessionId"
  idObj.innerHTML = id
