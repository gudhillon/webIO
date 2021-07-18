// Javascript client entrypoint
import { connect, play } from './networking';
import {downloadAssets} from './assets'
import { startCapturingInput, stopCapturingInput } from './input';
import { startRendering, stopRendering } from './render';
import { initState } from './state';
import './css/main.css'
const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");

function game() {
    play(usernameInput.value);
    playMenu.classList.add("menu");
    initState();
    startCapturingInput();
    startRendering();
}
//Pass in gameOver funct to connect
Promise.all([
    connect(),
    downloadAssets(),
    ]).then(() => {
        playMenu.classList.remove("menu");
        usernameInput.focus();
        playButton.onclick = game();
});
