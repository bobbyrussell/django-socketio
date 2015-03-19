$(function() {
  // wire in to the socket
  var socket = io('http://localhost:3000');

  // chat related stuff
  var $messageList = $('#messages'),
    $messageForm = $('#message-form'),
    $messageInput = $('#message-input');

  var ENTER_KEY = 13;

  function messageFromServer (message, err) {
    var chatServer = '<dt class="chat-server">Chat Server:</dt>';
    $messageList.append(chatServer);
    if (err) {
      $messageList.append('<dd>' + message +
        ' See console for more details</dd>');
      console.log('Error Message: ' + message);
    } else {
      $messageList.append('<dd>' + message + '</dd>');
      console.log(message);
    }
  };

  function messageFromUser(message) {
    var user = '<dt>A User:</dt>';
    $messageList.append(user);
    $messageList.append('<dd>' + message.message + '</dd>');
  }

  function sendMessage(message) {
    var user = '<dt class="me">Me</dt>';
    $messageList.append(user);
    $messageList.append('<dd>' + message + '</dd>');
    socket.emit('chat', {message: message});
  }

  // handle some events
  socket.on('connect', function() {
    var message = 'Now Connected!';
    messageFromServer(message);
    socket.on('chat', function(data) {
      messageFromUser(data);
    });
  });

  socket.on('disconnect', function() {
    var message = "Disconnected";
    messageFromServer(message);
  });

  socket.on('error', function(err) {
    var message = "Something went wrong!";
    messageFromServer(message, true);
  });

  socket.on('reconnect', function(n) {
    var message = 'Successfully reconnected after ' + n + ' tries.';
    messageFromServer(message);
  });

  socket.on('reconnect_attempt', function() {
    var message = 'Trying to reconnect...';
    messageFromServer(message);
  });

  socket.on('reconnecting', function(n) {
    var message = 'Reconnection attempt number ' + n + '...';
    messageFromServer(message);
  });

  socket.on('reconnect_error', function(err) {
    var message = 'Could not connect!';
    messageFromServer(message, true);
  });

  $messageForm.submit(function(event) {
    event.preventDefault();
    var val = $messageInput.val();
    sendMessage(val);
    $messageInput.val('');
  });

  $messageInput.keypress(function(event) {
    if (event.which == ENTER_KEY) {
      event.preventDefault();
      $messageForm.submit();
    }
  });
});
