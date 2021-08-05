class Blob {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  
    distanceTo(object) {
      const dx = this.x - object.x;
      const dy = this.y - object.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    serializeForUpdate() {
      return {
        x: this.x,
        y: this.y,
        color: this.color,
      };
    }
  }
  module.exports = Blob;