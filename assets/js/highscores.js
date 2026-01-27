/* assets/js/highscores.js
   Single script that:
   - On the "end" page: shows final score and saves name+score to localStorage.
   - On the "highscores" page: reads and renders the leaderboard.
   Safe to include on both pages (use <script src="assets/js/highscores.js" defer></script>).
*/
(() => {
  'use strict';

  const STORAGE_KEY = 'highScores';
  const LAST_SAVED_KEY = 'lastSavedHighScore';
  const MAX_HIGH_SCORES = 5;

  // ---- Helpers ----
  function readHighScores() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (err) {
      console.warn('Could not parse highScores from localStorage', err);
      return [];
    }
  }

  function writeHighScores(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn('Could not save highScores to localStorage', err);
    }
  }

  function saveEntry(entry) {
    const list = readHighScores();
    list.push(entry);

    // sort by score desc, then newest date first for ties
    list.sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      return (b.date || '').localeCompare(a.date || '') * -1;
    });

    // keep only top N
    list.splice(MAX_HIGH_SCORES);

    writeHighScores(list);

    // store last saved for highlighting on leaderboard
    try {
      localStorage.setItem(LAST_SAVED_KEY, JSON.stringify(entry));
    } catch (err) {
      // ignore
    }
  }

  function formatDateIso(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch (err) {
      return iso || '';
    }
  }

  // ---- End page behavior (show score, enable save, store highscore) ----
  function initEndPage() {
    const username = document.querySelector('#username');
    const saveScoreBtn = document.querySelector('#saveScoreBtn');
    const finalScoreEl = document.querySelector('#finalScore');

    if (!saveScoreBtn || !finalScoreEl) return;

    const mostRecentScoreRaw = localStorage.getItem('mostRecentScore');
    const mostRecentScore = Number(mostRecentScoreRaw) || 0;

    // show final score
    finalScoreEl.textContent = mostRecentScore;

    // disable until name provided
    saveScoreBtn.disabled = true;

    if (username) {
      username.addEventListener('input', () => {
        saveScoreBtn.disabled = !username.value.trim();
      });

      // optionally allow Enter to save when input is focused
      username.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' && !saveScoreBtn.disabled) {
          ev.preventDefault();
          saveScoreBtn.click();
        }
      });
    }

    function onSave(e) {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      const name = username ? username.value.trim().slice(0, 24) : 'Anonymous';
      const entry = {
        name: name || 'Anonymous',
        score: mostRecentScore,
        date: new Date().toISOString()
      };
      saveEntry(entry);

      // navigate to leaderboard
      window.location.assign('highscores.html');
    }

    // Prevent duplicate listeners if script accidentally loaded twice
    saveScoreBtn.removeEventListener('click', onSave);
    saveScoreBtn.addEventListener('click', onSave);
  }

  // ---- Highscores page behavior (render list) ----
  function initHighscoresPage() {
    const listEl = document.getElementById('highScoresList');
    if (!listEl) return;

    let scores = readHighScores();

    // sort to be safe (score desc, newest first)
    scores.sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      return (b.date || '').localeCompare(a.date || '') * -1;
    });

    // if empty show a friendly note
    if (!scores.length) {
      const li = document.createElement('li');
      li.textContent = 'No high scores yet — be the first!';
      listEl.appendChild(li);
      return;
    }

    // try to get last saved entry to highlight it
    let lastSaved = null;
    try {
      lastSaved = JSON.parse(localStorage.getItem(LAST_SAVED_KEY));
    } catch (err) {
      lastSaved = null;
    }

    scores.forEach((entry, idx) => {
      const li = document.createElement('li');
      li.className = 'high-score-item';

      const rank = document.createElement('span');
      rank.className = 'hs-rank';
      rank.textContent = `${idx + 1}. `;
      li.appendChild(rank);

      const nameEl = document.createElement('strong');
      nameEl.textContent = entry.name || 'Anonymous';
      li.appendChild(nameEl);

      const scoreEl = document.createElement('span');
      scoreEl.className = 'hs-score';
      scoreEl.textContent = ` — ${entry.score || 0}`;
      li.appendChild(scoreEl);

      if (entry.date) {
        const dateEl = document.createElement('small');
        dateEl.className = 'hs-date';
        dateEl.textContent = ` (${formatDateIso(entry.date)})`;
        li.appendChild(dateEl);
      }

      // highlight recently saved (match by date+name+score if available)
      if (lastSaved && lastSaved.name === entry.name && Number(lastSaved.score) === Number(entry.score) && lastSaved.date === entry.date) {
        li.classList.add('highlight');
        try {
          localStorage.removeItem(LAST_SAVED_KEY);
        } catch (err) {}
      }

      listEl.appendChild(li);
    });
  }

  // ---- Initialization ----
  document.addEventListener('DOMContentLoaded', () => {
    // init both: each function will early-return if relevant DOM isn't present
    initEndPage();
    initHighscoresPage();
  });
})();
