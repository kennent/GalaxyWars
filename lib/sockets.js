var socketio = require('socket.io');

function randomRoomname() {
    var roomname = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*_-=+";
    for (var i = 0;i < 64;i++)
        roomname += possible.charAt(Math.floor(Math.random() * possible.length));
    return roomname;
}

module.exports.listen = (app) => {
    io = socketio.listen(app);

    // ServerInfo - Matching
    var gamerooms = [];

    // socket event
    io.on('connection', (socket) => {
        socket.on('joinFastMatching', player => {
            if (gamerooms.length === 0) gamerooms.push(new Room(0, randomRoomname()));
            gamerooms[gamerooms.length - 1].join(player);
            
            if (gamerooms[gamerooms.length - 1].isFull()) {
                gamerooms[gamerooms.length - 1].play();
                gamerooms.push(new Room(gamerooms.length - 1, randomRoomname()));
            }
            
            socket.emit('fastMatching', { idx: gamerooms.length - 1, roomname: gamerooms[gamerooms.length - 1].roomname });
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


            socket.emit("socketUpdate", data);
        });
        // socket Update :
    });

    return io;
}

var Room = class {
    constructor(index, roomname) {
        this.player = []; 
        this.index = index;
        this.roomname = roomname;
    }
    join(player) {
        this.player.push(player);
    }
    leave(player) {
        // ...code
    }
    isFull() {
        return this.player.length === 4
    }
    play() {
        for (var i = 0; i < 4;i++)
            io.to(this.player[i]).emit("play");
    }
}

/* 이 아래에 클래스 작성 */