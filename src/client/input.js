// Capture and document direction and movement events from user
import { changeDirection } from './networking';
function handleInput(x, y) {
    const curr = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
    changeDirection(curr);
  }
function onMouseInput(event) {
    handleInput(event.clientX, event.clientY);
}
export function startCapturingInput() {
    window.addEventListener('mousemove', onMouseInput);
}
export function stopCapturingInput() {
    window.removeEventListener('mousemove', onMouseInput);
}