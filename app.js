// Setup basic express server
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 80;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/Resources')));
app.use(express.static(path.join(__dirname, 'public/Sounds')));
app.use(express.static(path.join(__dirname, 'public/src')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());
app.use('/', require('./public/index.js'));
// app.use('/game', require('./public/game'));

// ServerInfo - Matching
var matchingUserList = []; // name, ID, socket.id
var matchingUserID = [];
var isStarted = false;

// ServerInfo - InGame
let lobby = [];
let roomObjects = {};
let userRoomInfo = {};

function getUserID() {
  for (var i = 0;i < 4;i++) {
    if (matchingUserID[i] !== undefined) {
      matchingUserID[i] = undefined;
      return i + 1;
    }
  }
}

function update() {
  // io.sockets.sockets[matchingUserList[0].sID].emit('update');
}
// socket event

io.on('connection', (socket) => {

  // Help 
  socket.on('helpStory', () => {
    var helpStartTime = new Date();
    var helpNowTime;
    var helpInterval = setInterval(() => {
      helpNowTime = new Date();
      console.log(parseInt((helpNowTime - helpStartTime) / 1000));
      if (parseInt((helpNowTime - helpStartTime) / 1000) >= 15) {
        socket.emit('helpEnd');
        clearInterval(helpInterval);
      }
    }, 1000);
  });

  // Matching & Main socket event

  socket.on('add user', (data) => {
    if (!isStarted) {
      var _ID = getUserID();
      var _data = {name: data.name, ID:_ID, sID: data.sId};
      matchingUserList.push(_data);
      socket.emit('saveUserInfo', _data);
    }

    if (matchingUserList.length == 4) {
      if (!isStarted) {
        io.sockets.emit('start game', matchingUserList);
      }
      else {
        socket.emit('started game');
      }
    }
  });

  socket.on('updateUser', data => {
    matchingUserList.push(data);

    for (var i = 0; i < 4; i++) {
      if (i + 1 == data.ID)
        matchingUserID[i] = undefined;
        break;
    }
  });

  socket.on('reset', () => {
    tempCnt = matchingUserList.length
    for(var i = 0; i < tempCnt;i++)
      matchingUserList.pop();
    for(var i = 0; i < 4;i++)
      matchingUserID[i] = i + 1;

    isStarted = false;
  });
  // update

  socket.on('update', (data) => {
    console.log(data);
    if (data.ID == 1)
      io.sockets.emit('update1', data);
    if (data.ID == 2)
      io.sockets.emit('update2', data);
    if (data.ID == 3)
      io.sockets.emit('update3', data);
    if (data.ID == 4)
      io.sockets.emit('update4', data);
  });

  socket.on('disconnect', () => {
    tempCnt = matchingUserList.length
    for(var i = 0; i < tempCnt;i++)
      matchingUserList.pop();
    for(var i = 0; i < 4;i++)
      matchingUserID[i] = i + 1;
    io.sockets.emit('updateUserList');
  });

  // InGame socket event
  // socket.on('randomInt', data => {
  //   var result = Math.floor(Math.random() * (data.max - data.min + 1) + data.min);
  //   console.log(result);
  //   socket.emit('randomInt', result);
  // });

  // class
  class basicObject{
    constructor(width,height,x,y){
      this.width = width
      this.height = height
      this.x = x
      this.y = y
    }
  }
  class galaxy extends basicObject{
    constructor(x, y, owner) {
      super(50, 50, x, y);
      this.owner = owner;
    }
  }
  class spaceShip extends basicObject{
    constructor(x, y, targetX, targetY, attack) {
      super(50, 50, x, y);
      this.targetX = targetX;
      this.targetY = targetY;
      this.attack = attack;
    }
  }
  class camera extends basicObject{
    constructor(x, y, carbon, isDead, rank){
      super(50, 50, x, y);
      this.carbon = carbon;
      this.isDead = isDead;
      this.rank = rank;
    }
  }
  class roomObject{
    constructor(user1, user2, user3, user4){
      this.userObjects = {};
      this.userObjects[user1] = undefined;
      this.userObjects[user2] = undefined;
      this.userObjects[user3] = undefined;
      this.userObjects[user4] = undefined;
      this.users = [user1, user2, user3, user4];
      this.roomname = "TestRoom";
      this.isRoomReady = false
      userRoomInfo[user1] = this.roomname
      userRoomInfo[user2] = this.roomname
      userRoomInfo[user3] = this.roomname
      userRoomInfo[user4] = this.roomname
      console.log('making room : '+this.roomname);
    }
    // disconnect(user){
    //   if(io.sockets.sockets[this.users[3]]!=undefined)
    //     io.sockets.sockets[this.users[[3]]].emit('otheruser_disconnect')
    //     if(io.sockets.sockets[this.users[2]]!=undefined)
    //     io.sockets.sockets[this.users[2]].emit('otheruser_disconnect')
    //   if(io.sockets.sockets[this.users[1]]!=undefined)
    //     io.sockets.sockets[this.users[1]].emit('otheruser_disconnect')
    //   if(io.sockets.sockets[this.users[0]]!=undefined)
    //     io.sockets.sockets[this.users[0]].emit('otheruser_disconnect')
    //   delete roomObjects[this.roomname]
    // }
  }
});