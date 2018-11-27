$(function() {
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $startBtn = $('.start-btn');

  var $donationIcon = $('.donateIcon');
  var $helpIcon = $('.helpIcon');

  var $loginPage = $('.login.page'); // The login page
  var $loadingPage = $('.loading.page'); // The loading page
  var $helpPage = $('.help.page'); // The help page
  var $gamePage = $('.game.page'); // The game page

  // help
  var $helpStory = $('#content');

  // Prompt for setting a username
  var username;
  var userID;
  var isConnected = false;
  var $currentInput = $usernameInput.focus();

  var helpTime;

  $loginPage.show();
  $loadingPage.fadeOut();
  $helpPage.fadeOut();
  $gamePage.fadeOut();

  // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $loginPage.off('click');
      $loadingPage.show();

      console.log(isConnected);
      // Tell the server your username
      socket.emit('add user', {name: username, sID: socket.id});
      console.log(socket.id);
      isConnected = true;
      localIsPlayer = true;
    }
  }

  // Prevents input from having injected markup
  const cleanInput = (input) => {
    return $('<div/>').text(input).html();
  }

  // Keyboard events

  $window.keydown(event => {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
      } else {
        setUsername();
      }
    }
  });

  // Help events


  // Click events
  $startBtn.click(() => {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
      $loginPage.fadeOut();
      $loginPage.off('click');
      $loadingPage.show();

      console.log(isConnected);
      // Tell the server your username
      socket.emit('add user', {name: username, sID: socket.id});
      console.log(socket.id);
      isConnected = true;
      localIsPlayer = true;
    }
  });

  // Focus input when clicking anywhere on login page
  $loginPage.click(() => {
    $currentInput.focus();
  });

  $helpIcon.click(() => {
    $loginPage.fadeOut();
    $loginPage.off('click');
    $helpPage.show();

    socket.emit('helpStory');
  });

  // Socket events
  var socket = io();

  socket.on('helpEnd', () => {
    console.log('asdfffff');
  });

  socket.on('start game', data => {
    $loadingPage.fadeOut();
    $gamePage.show();
  });

  socket.on('started game', () => {
    window.location.replace("");
  });
  
  socket.on('saveUserInfo', data => {
    localName = username = data.name;
    localID = userID = data.ID;
    console.log(data.ID + " | " + localID);
  });

  socket.on('updateUserList', () => {
    if (isConnected)
      socket.emit('updateUser', {name: username, ID: userID});
  });

  socket.on('disconnect', () => {
    if (isConnected)
      socket.emit('disconnect');
  });

  socket.on('reconnect', () => {
    console.log('재연결되었습니다');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', () => {
    log('연결에 실패하였습니다');
  });
  
});