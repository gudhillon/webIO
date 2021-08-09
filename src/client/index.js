// Javascript client entrypoint
import { connect, play } from './networking';
import {downloadAssets} from './assets'
import { startCapturingInput, stopCapturingInput } from './input';
import { startRendering, stopRendering } from './render';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

// Included with Webpack bundle
import './css/main.css'

// Retrieve elements from document
const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");
const deathScreen = document.getElementById("container-popup");
const restartButton = document.getElementById("restart-button");
const userValue = document.getElementById("username-value");

function gameOver() {
    console.log("Player dead");
    stopCapturingInput();
    setLeaderboardHidden(true);
    userValue.innerHTML = usernameInput.value + "?";
    deathScreen.classList.remove("hidden");
    restartButton.onclick = () => {
        stopRendering();
        deathScreen.classList.add("hidden");
        playMenu.classList.remove('hidden');
      };
}
//Asynchronous function handled by webpack 
Promise.all([
    connect(gameOver),
    downloadAssets(),
    ]).then(() => {
        playMenu.classList.remove("hidden");
        usernameInput.focus();
        playButton.onclick = () => {
            play(usernameInput.value);
            playMenu.classList.add("hidden");
            initState();
            startCapturingInput();
            startRendering();
            setLeaderboardHidden(false);
        };
});
