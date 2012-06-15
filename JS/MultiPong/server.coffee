io = require  'socket.io'
express = require  'express'

app = express.createServer()
io = io.listen  app


app.get  '/', (req, res) ->
  res.sendfile  __dirname + '/sockets.html'

app.configure  ->
  app.use  "/node_modules", express.static  __dirname + '/node_modules'
  app.use  "/js", express.static  __dirname + '/js'

app.listen  8080

io.sockets.on  'connection', (socket) ->
  socket.id = Math.round  Math.random() * 100000

  console.log  "Connection recieved. ID: #{socket.id}"

  io.sockets.emit  'set sessionId', socket.id

  socket.on  'addNewUser', (user) ->
    fullname = "#{user.title} #{user.name}"
    console.log  "User with ID:#{socket.id} got name -> #{fullname}"
    socket.set  'nickname', fullname, -> socket.emit  'ready'

  socket.on  'msg', (msg) ->
    socket.get  'nickname', (err, name) ->
      console.log  "#{name} (#{socket.id}): #{msg}"

  socket.on  'disconnect', ->
    socket.get  'nickname', (err, name) ->
      console.log "#{name} (#{socket.id}) disconnected"

#  socket.emit  'news', hello: 'world'
#
#  socket.on  'userMoves', (data) ->
#    console.log  data
#
#  socket.on  'userMoves', (data) ->
#    console.log  data

#lsof -i :8080


