import io from 'socket.io-client';
import { processGameUpdate } from './state';
const Constants = require('../shared/shared');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`);

// resolve when connection is made to server
const connection = new Promise(resolve => {
    socket.on('connect', () => {
        console.log('Connected to server!');
        resolve();
    });
});

//callbacks for messages from server
export const connect = gameOver => (
    connection.then(() => {
        socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
        socket.on(Constants.MSG_TYPES.GAME_OVER, gameOver);
        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
          });
    })
);
export const play = username => {
    socket.emit(Constants.MSG_TYPES.JOIN_GAME, username); // add player.svg parameter etc
};
export const changeDirection = direction => {
    socket.emit(Constants.MSG_TYPES.INPUT, direction);
};