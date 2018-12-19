$(function() {
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ]; // User color

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $startBtn = $('.start-btn');

  var $fastGameBtn = $('.fast-game-btn');
  var $customGameBtn = $('.custom-game-btn');
  var $gameAccountBtn = $('.game-account-btn');
  var $gameSettingBtn = $('.game-setting-btn');

  var $loginPage = $('.login.page'); // The login -> main -> fast/custom/account/setting
  var $mainPage = $('.main.page');
  var $loadingPage = $('.loading.page');
  var $inGamePage = $('.InGame.page');

  // Prompt for setting a username
  var username;
  var $currentInput = $usernameInput.focus();

  // Initialize
  $mainPage.hide();
  $loadingPage.hide();

  // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
      $loginPage.fadeOut();
      $mainPage.show();

      // var form = document.createElement("form");
      // form.setAttribute("method", "POST");
      // form.setAttribute("action", "/main");

      // var hiddenField = document.createElement("input");
      // hiddenField.setAttribute("type", "hidden");
      // hiddenField.setAttribute("name", "nickname");
      // hiddenField.setAttribute("value", username);

      // form.appendChild(hiddenField);

      // document.body.appendChild(form);
      // form.submit();
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
      setUsername();
    }
  });

  // Focus input when clicking anywhere on login page
  $loginPage.click(() => {
    $currentInput.focus();
  });
  
  // Click events
  $startBtn.click(setUsername);

  $fastGameBtn.click(() => {
    $mainPage.fadeOut();
    $loadingPage.show();

    isJoin = true;
    socket.emit('joinFastMatching', {player: socket.id, name: username});
  });
  $customGameBtn.click(() => {
  });
  $gameAccountBtn.click(() => {
  });
  $gameSettingBtn.click(() => {
  });

  var upt = (id, idx, roomname) => {
    localPlayerID = id;
    localRoomIdx = idx;
    localRoomname = roomname;
  };

  // socket Events
  var socket = io();
  var isPlay = false, isJoin = false;
  var userRoomname;

  socket.on('fastMatching', data => {
    upt(data.playerID, data.idx, data.roomname);
  });

  // socket.on("disconnect", () => {
  //   if (!isJoin)
  //     socket.emit("leave", { id: socket.id, isPlay: isPlay, roomIdx: roomIdx });
  // });

  socket.on("play", data => {
    isPlay = true;
    $loadingPage.hide();
    $inGamePage.show();
    console.log(localPlayerID);
  });

  socket.on("endFastGame2Client", () => {
    isPlay = false;
    $loadingPage.show();
    $inGamePage.hide();
  });
});