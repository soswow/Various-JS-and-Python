(function() {
  var User, socket;

  socket = io.connect('http://localhost:8080');

  User = (function() {

    function User(name) {
      this.name = name;
      this.title = "Mr.";
    }

    User.prototype.toString = function() {
      return "" + this.title + " " + this.name;
    };

    return User;

  })();

  this.addUser = function() {
    var nameObj;
    nameObj = document.getElementById("userName");
    return socket.emit('addNewUser', new User(nameObj.value));
  };

  this.sendMessage = function() {
    var messageObj;
    messageObj = document.getElementById("message");
    return socket.emit('msg', messageObj.value);
  };

  socket.on('ready', function() {
    return console.log("Name is setted");
  });

  socket.on('set sessionId', function(id) {
    var idObj;
    console.log("Our id is " + id);
    idObj = document.getElementById("userSessionId");
    return idObj.innerHTML = id;
  });

}).call(this);
