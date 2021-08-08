import { getAsset } from './assets';
import { getCurrentState } from './state';
import { debounce } from 'throttle-debounce';

const Shared = require('../shared/shared');
const { MAP_SIZE, BLOB_RADIUS, PLAYER_RADIUS } = Shared;

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
    const { me, others, blobs } = getCurrentState();
    if (!me) return;
    // Draw Borders
    renderBorders(me.x, me.y);
    // Draw background
    renderBackground(me.x, me.y);
    // Draw blobs
    for (var blob = 0; blob < blobs.length; blob++) {
      renderBlob(me, blobs[blob].x, blobs[blob].y, BLOB_RADIUS, blobs[blob].color);
    }
    //Draw other players
    others.forEach(renderPlayer.bind(null, me));
    //Draw player
    renderPlayer(me, me);

    // Render players from least to greatest
    // others.push(me);
    // others.sort((a, b) => parseFloat(a.radius) - parseFloat(b.radius));
    // console.log(others);
    // others.forEach(function(event) {
    //   if (event.id == me.id) renderPlayer(me, me);
    //   else renderPlayer(me, event);
    // });
}

function renderBorders(x, y) {
  context.fillStyle = "#AB274F";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Draw bounds that players cannot pass
  context.strokeStyle = '#E52B50';
  context.lineWidth = 10;
  context.strokeRect(canvas.width / 2 - x, canvas.height / 2 - y, MAP_SIZE, MAP_SIZE);

}

// render background relative to player
// background pattern
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
  backgroundGradient.addColorStop(0, '#C9FFE5');
  backgroundGradient.addColorStop(1, '#7CB9E8');
  context.fillStyle = backgroundGradient;
  context.fillRect(canvas.width / 2 - x, canvas.height / 2 - y, MAP_SIZE, MAP_SIZE);  
}

function renderBlob(me, xPos, yPos, radius, color) {
  const canvasX = canvas.width / 2 + xPos - me.x;
  const canvasY = canvas.height / 2 + yPos - me.y;
  var startAngle        = (Math.PI/180)*0;
  var endAngle          = (Math.PI/180)*360;
  // Save/Restore?
  context.save();
  context.beginPath();
  context.arc(canvasX, canvasY, radius, 
               startAngle, endAngle, false);
  context.fillStyle = color;
  context.fill(); 
  context.restore();
}

// Render Player
// Scale factor Default size / Actual size
function renderPlayer(me, player) {
    const { x, y, direction, username, radius } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    context.drawImage(
      getAsset('player.png'),
      -radius,
      -radius,
      radius * 2,
      radius * 2,
    );
    context.restore();

    context.fillStyle = 'lightblue';
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.font =  "bold " + radius/(PLAYER_RADIUS/13) +"px Verdana";
    context.fillText(
      username.substring(0, username.indexOf("NaN")),
      canvasX,
      canvasY,
      radius * 2,
    );
    context.strokeText(
      username.substring(0, username.indexOf("NaN")),
      canvasX,
      canvasY,
      radius * 2,
    );
    context.textBaseline = 'middle';
    context.textAlign = 'center';
}

// Setup up menu screen
function renderMainMenu() {
  context.drawImage(getAsset("agarBackground.png"),0,0,canvas.width,canvas.height);
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
