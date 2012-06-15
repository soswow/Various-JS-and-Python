(function() {
  var app, express, io;

  io = require('socket.io');

  express = require('express');

  app = express.createServer();

  io = io.listen(app);

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/sockets.html');
  });

  app.configure(function() {
    app.use("/node_modules", express.static(__dirname + '/node_modules'));
    return app.use("/js", express.static(__dirname + '/js'));
  });

  app.listen(8080);

  io.sockets.on('connection', function(socket) {
    socket.id = Math.round(Math.random() * 100000);
    console.log("Connection recieved. ID: " + socket.id);
    io.sockets.emit('set sessionId', socket.id);
    socket.on('addNewUser', function(user) {
      var fullname;
      fullname = "" + user.title + " " + user.name;
      console.log("User with ID:" + socket.id + " got name -> " + fullname);
      return socket.set('nickname', fullname, function() {
        return socket.emit('ready');
      });
    });
    socket.on('msg', function(msg) {
      return socket.get('nickname', function(err, name) {
        return console.log("" + name + " (" + socket.id + "): " + msg);
      });
    });
    return socket.on('disconnect', function() {
      return socket.get('nickname', function(err, name) {
        return console.log("" + name + " (" + socket.id + ") disconnected");
      });
    });
  });

}).call(this);
