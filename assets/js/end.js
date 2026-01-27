/* jshint esversion: 8*/
​// global variables
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;
let saveHighScore;

// update final score
finalScore.innerText = mostRecentScore;

// enable save button if username exists
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// save the highscore once username exists
saveScoreBtn.addEventListener('click', function () {
    saveHighScore(event);
});

// save localStorage highscore, and direct user to leaderboard
saveHighScore = e => {
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign = 'highscores.html';
};
