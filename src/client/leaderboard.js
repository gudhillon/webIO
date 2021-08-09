import escape from 'lodash/escape';

const leaderboard = document.getElementById('leaderboard');
const rows = document.querySelectorAll('#leaderboard table tr');
const scoreDisplay = document.getElementById('score-display');
const rankDisplay = document.getElementById('rank-display');

export function updateLeaderboard(data, player) {
    var temp = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == player.id) temp = i + 1;
    }
    scoreDisplay.innerHTML = "Your score: " + player.score;
    rankDisplay.innerHTML = "Your rank: " + temp + " of " + data.length;
    data = data.slice(0, 10);
    for (let i = 0; i < data.length; i++) {
      rows[i + 1].innerHTML = `<td>#${i + 1}</td><td>${escape(data[i].username) || 'Unknown'}</td><td>${data[i].score}</td>`;
    }
    // Clear empty or dead players rank out of leaderboard
    for (let i = data.length; i < 10; i++) {
      //rows[i + 1].innerHTML = `<td>#${i + 1}</td><td>-</td><td>-</td>`;
      rows[i + 1].innerHTML = `<td></td><td></td><td></td>`;
    }
  }

export function setLeaderboardHidden(hidden) {
    if (hidden) {
      leaderboard.classList.add('hidden');
      scoreDisplay.classList.add('hidden');
      rankDisplay.classList.add('hidden');
    } else {
      leaderboard.classList.remove('hidden');
      scoreDisplay.classList.remove('hidden');
      rankDisplay.classList.remove('hidden');
    }
  }