var socketio = require('socket.io');

function randomRoomname() {
    var roomname = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*_-=+";
    for (var i = 0;i < 64;i++)
        roomname += possible.charAt(Math.floor(Math.random() * possible.length));
    return roomname;
}

// ServerInfo - Matching
var gamerooms = [];

module.exports.listen = (app) => {
    io = socketio.listen(app);

    // socket event
    io.on('connection', (socket) => {
        socket.on('joinFastMatching', data => {
            if (gamerooms.length === 0) gamerooms.push(new Room(0, randomRoomname()));
            gamerooms[gamerooms.length - 1].join(data.player, data.name);
            
            socket.emit('fastMatching', { idx: gamerooms.length - 1, 
                roomname: gamerooms[gamerooms.length - 1].roomname,
                playerID: gamerooms[gamerooms.length - 1].player.length
             });

            if (gamerooms[gamerooms.length - 1].isFull()) {
                gamerooms[gamerooms.length - 1].play();
                gamerooms.push(new Room(gamerooms.length - 1, randomRoomname()));
            }
            console.log(gamerooms);
        });
        socket.on('disconnect', () => {
            console.log("disconnect");
            // 연결 해제 시
        });
        socket.on('endFastGame2Server', idx => {
            for (var i = 0;i < 4;i++) {
                io.to(gamerooms[idx].player[i]).emit("endFastGame2Client");
                // gamerooms.splice(idx, 1);
            }
        });
        // socket.on('leave', (data) => {
        //     console.log(data);
        //     console.log(gamerooms);
        //     if (!data.isPlay) {
        //         gamerooms[data.roomIdx].player.splice(
        //             gamerooms[data.roomIdx].player[
        //                 gamerooms[data.roomIdx].player.findIndex(data.player)
        //         ], 1);
        //     }
        //     console.log(gamerooms);
        // });        

        socket.on("socketUpdate2Server", data => {
            /* 다시 클라이언트에 전송 할 부분 */ // data는 staykeys
            if (data.keys.a) {
                // 카메라 왼쪽으로 이동하는 코드
                var result = {}; // ...

                for (var i = 0;i < 4;i++) {
                    io.to(gamerooms[data.idx].player[i]).emit("socketUpdate2Client", result);
                }
            }
        });
    });

    return io;
}

var Room = class {
    constructor(index, roomname) {
        this.player = [];
        this.index = index;
        this.roomname = roomname;
    }
    join(player, name) {
        this.player.push({ socketID: player, name: name });
    }
    leave(player) {
        // ...code
    }
    isFull() {
        return this.player.length === 4
    }
    play() {
        for (var i = 0; i < 4;i++)
            io.sockets.emit("play", { roomname: this.roomname,
                p1Name: gamerooms[gamerooms.length - 1].player[0].name,
                p2Name: gamerooms[gamerooms.length - 1].player[1].name,
                p3Name: gamerooms[gamerooms.length - 1].player[2].name,
                p4Name: gamerooms[gamerooms.length - 1].player[3].name
            });
    }
}

/* 이 아래에 클래스 작성 */