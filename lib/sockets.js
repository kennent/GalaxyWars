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
var games = [];

module.exports.listen = (app) => {
    io = socketio.listen(app);

    // socket event
    io.on('connection', (socket) => {
        // matching
        socket.on('joinFastMatching', data => {
            if (gamerooms.length === 0) gamerooms.push(new Room(0, randomRoomname()));
            gamerooms[gamerooms.length - 1].join(data.player, data.name);
            
            socket.emit('fastMatching', { idx: gamerooms.length - 1, 
                roomname: gamerooms[gamerooms.length - 1].roomname,
                playerID: gamerooms[gamerooms.length - 1].player.length
             });

            if (gamerooms[gamerooms.length - 1].isFull()) {
                games.push(new Game(gamerooms.length - 1, gamerooms[gamerooms.length - 1].roomname));
                gamerooms[gamerooms.length - 1].play();
                gamerooms.push(new Room(gamerooms.length - 1, randomRoomname()));
            }
        });

        //
        //
        // ingame
        //
        //

        socket.on('initGame', data => {
            games[games.length - 1].join(data.socketID, new Player(data.id, data.name));
            if (games[games.length - 1].isFull()) {
                var playerNames = [];
                for (var n of games[games.length - 1].player)
                    playerNames.push(n.data.name);
                for (var i = 0;i < 4;i++) {
                    io.to(games[games.length - 1].player[i].id).emit("updatePlayerList", playerNames);
                    io.to(games[games.length - 1].player[i].id).emit("play");
                }
            }
        });

        // update
        socket.on("cameraUpdate", data => {
            console.log(games[data.idx].player[data.id - 1]);
            console.log(data);
            games[data.idx].player[data.id - 1].carbon = data.carbon;
            games[data.idx].player[data.id - 1].isDead = data.isDead;
        });

        socket.on("update", data => {
            // galaxy update
            if (data.type === "gTerraforming") {
                games[data.idx].player[data.id - 1].carbon -= 2000;
                games[data.idx].galaxys[data.gIdx].terraforming += 1;
                games[data.idx].galaxys[data.gIdx].generativForce += games[data.idx].galaxys[data.gIdx].generativAdd;
            }
            if (data.type === "gBarrier") {
                games[data.idx].player[data.id - 1].carbon -= 2000;
                games[data.idx].galaxys[data.gIdx].beamBarrier += 1;
                games[data.idx].galaxys[data.gIdx].defensiveForce += games[data.idx].galaxys[data.gIdx].defensiveAdd;
                games[data.idx].galaxys[data.gIdx].maxDefensiveForce += games[data.idx].galaxys[data.gIdx].defensiveAdd;
            }
            if (data.type === "gDamage") {
                games[data.idx].galaxys[data.gIdx].defensiveForce -= dmg;
            }
            if (data.type === "gDeath") {
                games[data.idx].galaxys[data.gIdx].owner = data.owner;
                games[data.idx].galaxys[data.gIdx].defensiveForce = games[data.idx].galaxys[data.gIdx].maxDefensiveForce;
            }

            // spaceship update

        });
    });
    return io;
}

var Room = class {
    constructor(index, roomname) {
        this.player = [];
        this.gamePlayer = [];
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
        io.sockets.emit("ready", { roomname: this.roomname,
            pName: [gamerooms[gamerooms.length - 1].player[0].name,
            gamerooms[gamerooms.length - 1].player[1].name,
            gamerooms[gamerooms.length - 1].player[2].name,
            gamerooms[gamerooms.length - 1].player[3].name]
        });
        this.startTime = new Date().getTime();
    }
}

var Spaceship = class {
    constructor(spaceshipType, spaceshipName) {
        this.spaceshipName = spaceshipName;
        this.spaceshipType = spaceshipType;

        this.x = 0; this.y = 0;
        this.centerX = 0; this.centerY = 0;
        this.targetVX = 0; this.targetVY = 0;
        this.targetX = 0; this.targetY = 0;

        this.owner = 0;
        this.useful = true;

        this.attackTime = 1;
        
        this.maxHealth = 200;
        this.health = this.maxHealth;

        this.moveSpeed = 5;
        this.rot = 0;

        this.autoReload = 0; this.avoid = 0;
        this.mine = 0; this.engine = 0;

        this.attackTarget = null;
        this.isAttacking = false;
        this.canUse = true;
        this.useTime = 0;

    }
}

var Galaxy = class {
    constructor(galaxyType, galaxyName) {
        this.galaxyName = galaxyName;
        this.galaxyType = galaxyType;

        this.generateTime = 0;
        this.owner = 0;

        this.maxDefensiveForce = (galaxyType + 1) * 100;
        this.generativForce = (galaxyType + 1) * 100;
        this.defensiveForce = this.maxDefensiveForce;

        this.generativeAdd = this.generativeForce / 10;
        this.defensiveAdd = this.defensiveForce / 10;

        this.terraforming = 0;
        this.beamBarrier = 0;
    }
}

var SpaceMine = class {
    constructor(x, y, owner, ownerObj) {
        this.x = x; this.y = y;
        this.centerX = 0; this.centerY = 0;
        this.targetVX = 0; this.targetVY = 0;

        this.owner = owner;
        this.ownerObj = ownerObj;
        this.useful =true;

        this.target = null;
    }
}

var Bullet = class {
    constructor(x, y, rot, owner, dmg) {
        this.x = x; this.y = y;
        this.centerX = 0; this.centerY = 0;
        
        this.owner = owner;
        this.useful = true;

        this.rot = rot * Math.PI / 180;
        this.range = 30;
        this.speed = 20;
        this.lifeTime = 0.8;
        this.dmg = dmg;
    }
}

var BangParticle = class {
    constructor(x, y) {
        this.x = x; this.y = y;

        this.useful = true;
        this.lifeTime = 0.5;
    }
}

var Player = class {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.carbon = 1000;
        this.isDead = false;
        this.spaceships = [];
        this.bullets = [];
    }
}

var Game = class {
    constructor(index, roomname) {
        this.index = index;
        this.roomname = roomname;
        this.player = [];
        this.galaxys = [];
        this.startTime;
        this.galaxysGenerator();
    }
    join(id, data) {
        this.player.push({id: id, data: data});
    }
    isFull() {
        return this.player.length === 4;
    }
    galaxysGenerator() {
        for (var i = 0; i < 22;i++) {
            this.galaxys.push(new Galaxy(1, "name"));
        }
    }
    // start() {
    //     this.startTime = new Date.now();
    // }
    // getTime() {
    //     return Math.floor((new Date.now() - this.startTime));
    // }
}