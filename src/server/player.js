const ObjectClass = require('./object');
const Constants = require('../shared/shared');

class Player extends ObjectClass {
    constructor(id, username, x, y) {
      super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
      this.username = username;
    }
    update(dt) {
      super.update(dt);
      // Make sure the player stays in bounds
      this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
      this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
      return null;
    }
  
    serializeForUpdate() {
      return {
        ...(super.serializeForUpdate()),
        direction: this.direction,
        username: this.username,
      };
    }
}
module.exports = Player;