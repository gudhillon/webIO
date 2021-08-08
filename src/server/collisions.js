const Constants = require('../shared/shared');

function blobCollisions(players, blobs) {
  for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < Object.keys(blobs).length; j++) {
          const blob = blobs[j];
          const player = players[i];
          // Currently > 50% overlap, + blob_radius for any overlap
          if (player.distanceTo(blob) < player.radius) {
                var sum = Math.PI * player.radius * player.radius + Math.PI * Constants.BLOB_RADIUS * Constants.BLOB_RADIUS;
                player.radius = Math.sqrt(sum / Math.PI);
                // Endgame Randomness
                // Math.random() * (max - min) + min
                if (player.radius >= 200) player.radius =  Math.random() * (220 - 200) + 200;
                player.speed -= Constants.PLAYER_RADIUS / player.radius;
                if (player.speed  <= 298) player.speed =  Math.random() * (298 - 278) + 278;
                blob.x = Math.random() * (Constants.MAP_SIZE-30);
                blob.y = Math.random() * (Constants.MAP_SIZE-30);

                player.score += Constants.SCORE_PER_BLOB;
                break;
          }
      }
  }
  return blobs;
}

function playerCollisions(players) {
  for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < players.length; j++) {
          if (i == j) continue;
          const other = players[j];
          const player = players[i];
          if ((player.distanceTo(other) < player.radius) && (player.radius > other.radius)) {
              player.score += other.score;
              other.isDead = true;
              var sum = Math.PI * player.radius * player.radius + Math.PI * other.radius * other.radius;
              player.radius = Math.sqrt(sum / Math.PI);
              // Endgame Randomness
              // Math.random() * (max - min) + min
              if (player.radius >= 200) player.radius =  Math.random() * (220 - 200) + 200;
              player.speed -= Constants.PLAYER_RADIUS / player.radius;
              if (player.speed  <= 298) player.speed =  Math.random() * (298 - 278) + 278;
          }
      }
  }
}

module.exports = {blobCollisions, playerCollisions};
