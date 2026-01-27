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
    /* assets/js/highscores.js
   Read the 'highScores' array from localStorage and render it into #highScoresList.
   Each entry is expected to be an object: { name: string, score: number, date?: ISOString }.
*/
(() => {
  const listEl = document.getElementById('highScoresList');
  if (!listEl) {
    console.warn('highscores.js: #highScoresList not found');
    return;
  }

  // Try to parse saved scores
  let scores = [];
  try {
    scores = JSON.parse(localStorage.getItem('highScores')) || [];
  } catch (err) {
    console.warn('Could not parse highScores from localStorage', err);
    scores = [];
  }

  // Sort descending by score (then newest date first)
  scores.sort((a, b) => {
    if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
    const da = a.date || '';
    const db = b.date || '';
    return db.localeCompare(da);
  });

  // If empty, render friendly message
  if (!scores.length) {
    const li = document.createElement('li');
    li.textContent = 'No high scores yet — be the first!';
    listEl.appendChild(li);
    return;
  }

  // Render list: Name — Score (Date)
  scores.forEach((entry, idx) => {
    const li = document.createElement('li');

    // Position / rank
    const rank = document.createElement('span');
    rank.className = 'hs-rank';
    rank.textContent = `${idx + 1}. `;
    li.appendChild(rank);

    // Name
    const nameEl = document.createElement('strong');
    nameEl.textContent = entry.name || 'Anonymous';
    li.appendChild(nameEl);

    // Score
    const scoreEl = document.createElement('span');
    scoreEl.className = 'hs-score';
    scoreEl.textContent = ` — ${entry.score || 0}`;
    li.appendChild(scoreEl);

    // Date (optional)
    if (entry.date) {
      const dateEl = document.createElement('small');
      dateEl.className = 'hs-date';
      // Format date to locale string for readability
      try {
        dateEl.textContent = ` (${new Date(entry.date).toLocaleString()})`;
      } catch (err) {
        dateEl.textContent = ` (${entry.date})`;
      }
      li.appendChild(dateEl);
    }

    listEl.appendChild(li);
  });
})();
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
