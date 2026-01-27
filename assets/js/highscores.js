/* jshint esversion: 8*/

// global variables
/* 
const highscoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// insert localStorage scores into leaderboard
highscoresList.innerHTML =
    highScores.map((score, index) => {
        return `<li classs="high-score">${index + 1}. ${score.name} - ${score.score} pts</li>`;

    }).join('');*/
/* jshint esversion: 8 */
(() => {
  // DOM elements (guarded)
  const username = document.querySelector('#username');
  const saveScoreBtn = document.querySelector('#saveScoreBtn');
  const finalScore = document.querySelector('#finalScore');

  // Read and normalise scores
  const mostRecentScoreRaw = localStorage.getItem('mostRecentScore');
  const mostRecentScore = Number(mostRecentScoreRaw) || 0;

  let highScores = [];
  try {
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  } catch (err) {
    // If parse fails, start with empty array
    highScores = [];
    console.warn('Could not parse highScores from localStorage, resetting to []', err);
  }

  const MAX_HIGH_SCORES = 5;

  // Show final score if the element exists
  if (finalScore) finalScore.innerText = mostRecentScore;

  // Disable save button until username provided
  if (saveScoreBtn) saveScoreBtn.disabled = true;

  // Enable/disable the save button on input (handles paste, mobile etc.)
  if (username && saveScoreBtn) {
    username.addEventListener('input', () => {
      saveScoreBtn.disabled = !username.value.trim();
    });
  }

  // Save handler
  function saveHighScore(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const name = username ? username.value.trim() : 'Anonymous';
    const entry = {
      name: name || 'Anonymous',
      score: mostRecentScore,
      date: new Date().toISOString()
    };

    highScores.push(entry);

    // sort descending by score, newest first for ties
    highScores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.date.localeCompare(a.date) * -1;
    });

    // keep only top MAX_HIGH_SCORES entries
    highScores.splice(MAX_HIGH_SCORES);

    try {
      localStorage.setItem('highScores', JSON.stringify(highScores));
    } catch (err) {
      console.warn('Could not save highScores to localStorage', err);
    }

    // Navigate to leaderboard page
    window.location.assign('highscores.html');
  }

  // Attach click handler (if button exists)
  if (saveScoreBtn) {
    saveScoreBtn.addEventListener('click', saveHighScore);
  } else {
    console.warn('saveScoreBtn not found in DOM; high score cannot be saved.');
  }
})();
