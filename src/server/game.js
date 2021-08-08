const Constants = require('../shared/shared');
const Player = require('./player');
const collisions = require('./collisions');
const blobCollisions = collisions.blobCollisions;
const playerCollisions = collisions.playerCollisions;

class Game {
    constructor(blobs) {
        this.sockets = {};
        this.players = {};
        this.blobs = blobs;
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
        
        this.blobs = blobCollisions(Object.values(this.players), this.blobs);
        playerCollisions(Object.values(this.players));
        
        // Check if any players are dead
        Object.keys(this.sockets).forEach(playerID => {
          const socket = this.sockets[playerID];
          const player = this.players[playerID];
          if (player.isDead) {
            socket.emit(Constants.MSG_TYPES.GAME_OVER);
            this.removePlayer(socket);
          }
        });

        // Send a game update to each player every other time
        // This is to save bandwidth, 30 updates a second to game is good enough
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
        const nearbyBlobs = Object.values(this.blobs).filter(
          b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
        );
        // if []
        // const nearbyBlobs = this.blobs.filter(
        //   b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
        // );
        return {
          t: Date.now(),
          me: player.serializeForUpdate(),
          others: nearbyPlayers.map(p => p.serializeForUpdate()),
          blobs: nearbyBlobs.map(b => b.serializeForUpdate()),
        };
      }
    }
    
    module.exports = Game;