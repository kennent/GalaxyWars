var socketio = require('socket.io');

function randomRoomname() {
    var roomname = "";
    for (var i = 0;i < 32;i++)
        roomname += Math.round(Math.random() * 10).toString();
    return roomname;
}

module.exports.listen = (app) => {
    io = socketio.listen(app);

    // ServerInfo - Matching
    var gamerooms = [new Room(randomRoomname())];

    // socket event

    io.on('connection', (socket) => {
        socket.on('matchingJoin', (player) => {
            gamerooms[gamerooms.lastIndexOf()].join(player);
            
            if (gamerooms[gamerooms.lastIndexOf()].isFull()) {
                gamerooms[gamerooms.lastIndexOf()].play();
                gamerooms.push(new Room(randomRoomname()));
            }
        });
        socket.on('leaveMathcing', (player) => {
            gamerooms[gamerooms.lastIndexOf()].player.splice(
                gamerooms[gamerooms.lastIndexOf()].player[
                    gamerooms[gamerooms.lastIndexOf()].player.findIndex(player)
            ], 1);
        });

        class Room {
            constructor(roomname) {
                this.player = []; 
                this.roomname = roomname;
            }
            join(player) {
                this.player.push(player);
                io.to(player).emit("joinedRoom", this.roomname);
            }
            leave(player) {
                // ...code
            }
            isFull() {
                return this.player.length === 4
            }
            play() {
                for (var i = 0; i < 4;i++)
                    io.to(this.player[i]).emit("play", this.roomname);
            }
        }

        /********************************************
         * 
         * 이 아래부터 자유롭게 만들고 싶은 class 작성
         * 
         ********************************************/



        data = "" // 클라언트에 전송할 데이터, 이건 주석 달면 내가 처리함
        socket.emit("update", data);
        
    });

    return io;
}