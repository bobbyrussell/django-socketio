var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('listening on *:3000');
});

var users = 0;

io.on('connection', function(socket) {
  var message;

  users += 1;
  console.log('a user connected');

  if (users == 1) {
    message = 'There is  1 user online';
  } else {
    message = 'There are ' + users + ' users online';
  }
  socket.emit('server', {message: 'Welcome to the chat!'});
  socket.emit('server', {message: message});

  socket.on('chat', function(message) {
    socket.broadcast.emit('chat', message);
  });

  socket.on('entered', function(user) {
    socket.broadcast.emit('server',
                          {message: user + ' user has entered the chat!'});
  });

  socket.on('disconnect', function() {
    var message;

    console.log('a user disconnected');
    users -= 1;

    if (users == 1) {
      message = 'There is 1 user online';
    } else {
      message = 'There are ' + users + ' users online';
    }
    socket.emit('server', {message: message});
  });
});
