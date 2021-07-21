const Constants = require('../shared/shared');
const Player = require('./player');

class Game {
    constructor() {
        this.sockets = {};
        this.players = {};
        this.lastUpdateTime = Date.now();
        this.shouldSendUpdate = false;
        // 60 updates a second
        setInterval(this.update.bind(this), 1000 / 60);
    }
    addPlayer(socket, username) {
        this.sockets[socket.id] = socket;
    
        // Generate a position to start this player at.
        const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
        const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
       
        this.players[socket.id] = new Player(socket.id, username, x, y);
    }
    removePlayer(socket) {
        delete this.sockets[socket.id];
        delete this.players[socket.id];
    }
    handleInput(socket, dir) {
        if (this.players[socket.id]) this.players[socket.id].setDirection(dir);
    }

    update() {
        // Calculate time elapsed
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
    
        // Update each player
        Object.keys(this.sockets).forEach(playerID => {
          const player = this.players[playerID];
          player.update(dt);
        });
    
        // Send a game update to each player every other time
        if (this.shouldSendUpdate) {
          Object.keys(this.sockets).forEach(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player));
          });
          this.shouldSendUpdate = false;
        } else {
          this.shouldSendUpdate = true;
        }
      }
    
      createUpdate(player) {
        const nearbyPlayers = Object.values(this.players).filter(
          p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
        );
        return {
          t: Date.now(),
          me: player.serializeForUpdate(),
          others: nearbyPlayers.map(p => p.serializeForUpdate()),
        };
      }
    }
    
    module.exports = Game;