import io from 'socket.io-client';
import { processGameUpdate } from './state';
const Constants = require('../shared/shared');

const socket = io(`ws://${window.location.host}`);

// resolve when connection is made to server
const connection = new Promise(resolve => {
    socket.on('connect', () => {
        resolve();
    });
});

//callbacks for messages from server
export const connect = gameOver => (
    connection.then(() => {
        socket.on('update', processGameUpdate);
        socket.on('player_dead', gameOver);
    })
);
export const play = username => {
    socket.emit('join_game', username);
};
export const changeDirection = direction => {
    socket.emit('input', direction);
};