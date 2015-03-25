$(function() {

  var ENTER_KEY = 13;

  var $createUser = $("#create-user").dialog({modal: true}),
    $userForm = $("#user-info");

  $userForm.submit(function(event) {
    event.preventDefault();
    var name = $("#nickname").val();
    socketChat(name);
    $createUser.dialog("close");
  });

  $createUser.keypress(function(event) {
    if (event.which == ENTER_KEY) {
      event.preventDefault();
      $userForm.submit();
    }
  });

  function socketChat(name) {
    var socket = io('http://localhost:3000'),
      name = name;

    // chat related stuff
    var $messageList = $('#messages'),
      $messageForm = $('#message-form'),
      $messageInput = $('#message-input'),
      $chatPanel = $('#chat-panel');


    function messageFromServer(message, err) {
      var chatServer = '<dt class="chat-server">Chat Server:</dt>';
      $messageList.append(chatServer);
      if (err) {
        $messageList.append('<dd>' + message.message +
          ' See console for more details</dd>');
        console.log('Error Message: ' + message.err);
      } else {
        $messageList.append('<dd>' + message.message + '</dd>');
      }
      $chatPanel.animate({scrollTop: $chatPanel[0].scrollHeight}, 1000);
    };

    function messageFromUser(message) {
      var user = '<dt>' + message.user + ':</dt>';
      $messageList.append(user);
      $messageList.append('<dd>' + message.message + '</dd>');
      $chatPanel.animate({scrollTop: $chatPanel[0].scrollHeight}, 1000);
    }

    function sendMessage(message) {
      var user = '<dt class="me">' + name + ':</dt>';
      $messageList.append(user);
      $messageList.append('<dd>' + message + '</dd>');
      $chatPanel.animate({scrollTop: $chatPanel[0].scrollHeight}, 1000);
      socket.emit('chat', {message: message, user:name});
    }

    // handle some events
    socket.on('connect', function() {
      var message = '<dt>Now Connected!</dt><dd></dt>';
      $messageList.append(message);
      socket.emit('entered', name);

      socket.on('chat', function(data) {
        messageFromUser(data);
      });

      socket.on('server', function(data) {
        messageFromServer(data);
      });

      socket.on('entered', function(data) {
        messageFromServer(data);
      });
    });

    socket.on('disconnect', function() {
      var message = {message: "Disconnected"};
      messageFromServer(message);
    });

    socket.on('error', function(err) {
      var message = {
        message: "Something went wrong!",
        err: err
      };
      messageFromServer(message, true);
    });

    socket.on('reconnect', function(n) {
      var message = {message: 'Successfully reconnected after ' + n + ' tries.'};
      messageFromServer(message);
    });

    socket.on('reconnect_attempt', function() {
      var message = {message: 'Trying to reconnect...'};
      messageFromServer(message);
    });

    socket.on('reconnecting', function(n) {
      var message = {message: 'Reconnection attempt number ' + n + '...'};
      messageFromServer(message);
    });

    socket.on('reconnect_error', function(err) {
      var message = {
        message: 'Could not connect!',
        err: err
      };
      messageFromServer(message, true);
    });

    $messageInput.keypress(function(event) {
      if (event.which == ENTER_KEY) {
        event.preventDefault();
        $messageForm.submit();
      }
    });

    $messageForm.submit(function(event) {
      event.preventDefault();
      var val = $messageInput.val();
      sendMessage(val);
      $messageInput.val('');
    });
  };
});
