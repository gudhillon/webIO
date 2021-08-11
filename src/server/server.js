const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.dev.js');
const socketio = require('socket.io');
const Constants = require('../shared/shared');
const Game = require('./game');
const Blob = require('./blob');

const app = express();
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}
const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log(`Server listening on port ${port}`);

const io = socketio(server);

// Array of object blobs, use shortid?
var blobs = {}; // change to []
var colors =       [ "aqua",  "black", "blue",  "fuchsia",
                     "green", "cyan",  "lime",  "maroon",
                     "navy",  "olive", "purple","red",
                     "silver","teal",  "yellow","azure",
                     "gold",  "bisque","pink",  "orange" ];
for (var i = 0; i < Constants.MAP_SIZE / 4; i++) { 
  // Math.random() * (max - min) + min
  var x = Math.random() * (Constants.MAP_SIZE);
  var y = Math.random() * (Constants.MAP_SIZE);

  var colorIndex =  Math.random()*(colors.length-1);
  colorIndex     =  Math.round(colorIndex);
  var color      =  colors[colorIndex];
  blobs[i] = new Blob(x, y, color);
}
io.on('connection', socket => {
    console.log('Player connected!', socket.id);
    socket.on(Constants.MSG_TYPES.JOIN_GAME, joinGame);
    socket.on(Constants.MSG_TYPES.INPUT, handleInput);
    socket.on('disconnect', onDisconnect);
});
const game = new Game(blobs);
function joinGame(username) {
  game.addPlayer(this, username);
}
function handleInput(dir) {
  game.handleInput(this, dir);
}
function onDisconnect() {
  game.removePlayer(this);
}
