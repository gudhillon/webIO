import { getAsset } from './assets';
import { getCurrentState } from './state';
import { debounce } from 'throttle-debounce';

const Shared = require('../shared/shared');
const { PLAYER_RADIUS, MAP_SIZE } = Shared;

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
    const { me, others } = getCurrentState();
    if (!me) return;
    // Draw background
    renderBackground(me.x, me.y);

    // Draw bounds that players cannot pass
    context.strokeStyle = 'darkgreen';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    //Draw Players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
}

// render background relative to player
function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'lightgray');
  backgroundGradient.addColorStop(0.2, 'green');
  backgroundGradient.addColorStop(0.4, 'lightgray');
  backgroundGradient.addColorStop(0.6, 'green');
  backgroundGradient.addColorStop(0.8, 'lightgray');
  backgroundGradient.addColorStop(1, 'green');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Render Player
function renderPlayer(me, player) {
    const { x, y, direction, username } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
      getAsset('player.png'),
      -PLAYER_RADIUS,
      -PLAYER_RADIUS,
      PLAYER_RADIUS * 2,
      PLAYER_RADIUS * 2,
    );
    context.restore();

    context.fillStyle = 'blue';
    context.font = "13.5px Verdana";
    context.fillText(
      username.substring(0, username.indexOf("NaN")),
      canvasX,
      canvasY,
      PLAYER_RADIUS * 2,
      2,
    );
    context.textBaseline = 'middle';
    context.textAlign = 'center';
}

// Setup up menu screen
function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

// Toggle between main menu and game rendering
let renderInterval = setInterval(renderMainMenu, 1000 / 60);

export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
