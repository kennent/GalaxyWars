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

  // Matching & Main socket event

  socket.on('add user', (data) => {
    if (!isStarted) {
      var _ID = getUserID();
      var _data = {name: data.name, ID:_ID, sID: data.sId};
      matchingUserList.push(_data);
      lobby.push(data.sID);
      socket.emit('saveUserInfo', _data);
    }

    if (matchingUserList.length == 4) {
      if (!isStarted) {
        roomObject[lobby[0]+lobby[1]+lobby[2]+lobby[3]] = new roomObject(lobby[0], lobby[1], lobby[2], lobby[3]);
        io.sockets.emit('start game', matchingUserList);
      }
      else {
        socket.emit('started game');
      }
    }
  });

  socket.on('ready', (data) => {
    roomObjects[data.roomname].ready(data, socket.id);
  });

  socket.on('updateUser', data => {
    matchingUserList.push(data);

    for (var i = 0; i < 4; i++) {
      if (i + 1 == data.ID)
        matchingUserID[i] = undefined;
        break;
    }
  });

  // update

  socket.on('update', (data) => {
    try {
      roomObjects["TestRoom"].userObjects[socket.id].x = data.x;
      roomObjects["TestRoom"].userObjects[socket.id].y = data.y;
      roomObjects["TestRoom"].userObjects[socket.id].carbon = data.carbon;
      roomObjects["TestRoom"].userObjects[socket.id].isDead = data.isDead;
      roomObjects["TestRoom"].userObjects[socket.id].rank = data.rank;
      roomObjects["TestRoom"].userObjects[socket.id].ID = data.ID;
    } catch (e) {

    }
  });

  socket.on('disconnect', () => {
    tempCnt = matchingUserList.length
    for(var i = 0; i < tempCnt;i++)
      matchingUserList.pop();
    for(var i = 0; i < 4;i++)
      matchingUserID[i] = i + 1;
    io.sockets.emit('updateUserList');
  });

  setInterval(() => {
    for (let room in roomObjects) {
      if (matchingUserList.length == 4)
        roomObjects[room].update();
    }
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
    update(){
      io.sockets.sockets[this.users[0]].emit('update',this.userObjects);
      io.sockets.sockets[this.users[1]].emit('update',this.userObjects);
      io.sockets.sockets[this.users[2]].emit('update',this.userObjects);
      io.sockets.sockets[this.users[3]].emit('update',this.userObjects);
    }
    ready(data, sID, type){
      this.userObjects[sID] = new userObject(data.x,data.y,data.color)
      console.log('this.userObjects[this.users[0]] : '+this.userObjects[this.users[0]]);
      console.log('this.userObjects[this.users[1]] : '+this.userObjects[this.users[1]]);
      console.log('this.userObjects[this.users[3]] : '+this.userObjects[this.users[3]]);
      console.log('this.userObjects[this.users[4]] : '+this.userObjects[this.users[4]]);
      if(this.userObjects[this.users[0]] != undefined&&this.userObjects[this.users[1]] != undefined&&this.userObjects[this.users[2]] != undefinedthis.userObjects[this.users[3]] != undefined){
        io.sockets.sockets[this.users[0]].emit('ready');
        io.sockets.sockets[this.users[1]].emit('ready');
        io.sockets.sockets[this.users[2]].emit('ready');
        io.sockets.sockets[this.users[3]].emit('ready');
        this.isRoomReady = true
        console.log(this.roomname + " : it's ready");
      }
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