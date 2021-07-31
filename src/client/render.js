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

function drawCircle(xPos, yPos, radius, color) {
  var startAngle        = (Math.PI/180)*0;
  var endAngle          = (Math.PI/180)*360;
  context.beginPath();
   context.arc(xPos, yPos, radius, 
               startAngle, endAngle, false);
   context.fillStyle = color;
   context.fill(); 
}
//const randNum = [];
//for (var a = 0; a < numCircles; a++) randNum[a] = Math.random();
function renderRandomCircles() {
  var colors     = ["aqua",  "black", "blue",  "fuchsia",
                    "green", "cyan",  "lime",  "maroon",
                    "navy",  "olive", "purple","red",
                    "silver","teal",  "yellow","azure",
                    "gold",  "bisque","pink",  "orange"];
  var circleRadius = 10;
  var numColors  =  colors.length;
  var numCircles = 20;
  for(var n=0; n<numCircles; n++) {
      var xPos       =  randNum[n]*(MAP_SIZE);
      var yPos       =  randNum[n]*(MAP_SIZE);
      var radius     =  circleRadius;
      var colorIndex =  randNum[n]*(numColors-1);
      colorIndex     =  Math.round(colorIndex);
      var color      =  colors[colorIndex];
      drawCircle(xPos, yPos, radius, color);
   }

}

function render() {
    const { me, others } = getCurrentState();
    if (!me) return;
    // Draw Borders
    renderBorders(me.x, me.y);
    // Draw background
    renderBackground(me.x, me.y);
    // circle
    //renderRandomCircles();
 
    //Draw Players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
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
