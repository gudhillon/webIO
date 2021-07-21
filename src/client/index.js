// Javascript client entrypoint
import { connect, play } from './networking';
import {downloadAssets} from './assets'
import { startCapturingInput } from './input';
import { startRendering } from './render';
import { initState } from './state';

// Included with Webpack bundle
import './css/main.css'

// Retrieve elements from document
const playMenu = document.getElementById("play-menu");
const playButton = document.getElementById("play-button");
const usernameInput = document.getElementById("username-input");

//Asynchronous function handled by webpack 
Promise.all([
    connect(),
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
        };
});
