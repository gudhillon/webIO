import { getAsset } from './assets';
import { getCurrentState } from './state';


const Shared = require('../shared/shared');
const { PLAYER_RADIUS, MAP_SIZE } = Shared;

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

// npm throttle-debounce later
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// use map size to draw boundaries later
function render() {
    const { me, others } = getCurrentState();
    if (!me) return;
    renderBackground();
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
}

// render relative to player?
function renderBackground() {
    context.fillStyle = 'rgba(0,255,0,1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function renderPlayer(me, player) {
    const { x, y, direction } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
      getAsset('player.jpg'),
      -PLAYER_RADIUS,
      -PLAYER_RADIUS,
      PLAYER_RADIUS * 2,
      PLAYER_RADIUS * 2,
    );
    context.restore();
  }

// Toggle between main menu and game rendering
let renderInterval = setInterval(renderBackground, 1000 / 60);

export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderBackground, 1000 / 60);
}
