const Constants = require('../shared/shared');

// Make Min speed -> 100, Max radius -> ?
function blobCollisions(players, blobs) {
  for (var i = 0; i < players.length; i++) {
      for (var j = 0; j < Object.keys(blobs).length; j++) {
          const blob = blobs[j];
          const player = players[i];
          //if (!blob) continue;
          // Currently > 50% overlap, + blob_radius for any overlap
          if (player.distanceTo(blob) < player.radius) {
                var sum = Math.PI * player.radius * player.radius + Math.PI * Constants.BLOB_RADIUS * Constants.BLOB_RADIUS;
                player.radius = Math.sqrt(sum / Math.PI);
                // Figure out speed formula relative to radius
                player.speed -= Constants.PLAYER_RADIUS / (player.radius ** 2);
                blob.x = Math.random() * (Constants.MAP_SIZE-30);
                blob.y = Math.random() * (Constants.MAP_SIZE-30);
                break;
          }
      }
  }
  return blobs;
}

module.exports = blobCollisions;
