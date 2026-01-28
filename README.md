
# Swenglish

## Introduction
Swenglish is a colour-activated quiz designed to help children who are learning to be bilingual (Swedish → English). The game is aimed at early learners (around 6 years old and up) but can also be used by older beginners. It uses a game-like interface and colour feedback to make learning motivating.

Live demo: https://justus-ai.github.io/swenglish/

---

## Table of contents
- [User experience (UX)](#user-experience-ux)
- [Screenshots](#screenshots)
- [Responsive preview](#responsive-preview)
- [How it works](#how-it-works)
- [Controls](#controls)
- [Quiz instructions](#quiz-instructions)
- [JavaScript behaviour](#javascript-behaviour)
- [Validator testing](#validator-testing)
- [Deployment](#deployment)
- [Local development](#local-development)
- [Regenerate responsive mockup (optional)](#regenerate-responsive-mockup-optional)

---

## User experience (UX)
I originally used a child stacking blocks as a logo concept, but chose a simple black background and clear UI to appeal to a broader age range. The game flow is straightforward:

- Press "Play" to start.
- Answer 16 multiple-choice questions.
- The progress bar shows progress regardless of right/wrong answers.
- Correct answers give positive (green) colour feedback; incorrect answers briefly show red.
- After 16 questions you are redirected to the end page where you can save your score and name (leaderboard stores up to five entries).

Design decisions:
- One level with randomly chosen questions to keep the code simpler and finishable.
- Colour-coded feedback for immediate reinforcement.
- Keep the UI simple and accessible for young learners.

---

## Screenshots

Home page (desktop):
![Home desktop screenshot](https://user-images.githubusercontent.com/83753891/144033014-361050dc-d991-4e31-8e98-fe1cdc1b3495.png)

Home page (mobile):
![Home mobile screenshot](https://user-images.githubusercontent.com/83753891/144033151-41857296-99fa-4fe4-8662-71479b231ca4.png)

Question — wrong:
![Wrong answer screenshot](https://user-images.githubusercontent.com/83753891/144033366-ade9d839-3abd-49ff-a334-8491e763f30c.png)

Question — correct:
![Correct answer screenshot](https://user-images.githubusercontent.com/83753891/144033468-d9ebde4c-60d9-44ce-b3f1-5c44611e963a.png)

End page (save score):
![End page screenshot](https://user-images.githubusercontent.com/83753891/144034761-599a948d-bf3b-487a-8b89-f0f1b193324b.png)

Leaderboard:
![Leaderboard screenshot](https://user-images.githubusercontent.com/83753891/144040334-5f8cb6e6-70ba-487c-898d-75f2ed8a55c0.png)

Additional responsive screenshots:
![Extra responsive 1](https://user-images.githubusercontent.com/83753891/144045780-acb6e968-1112-4cbf-a112-4047ae4fb756.png)
![Extra responsive 2](https://user-images.githubusercontent.com/83753891/144045878-e1dd4863-aabf-448f-adfa-317e14ac5146.png)

---

## Responsive preview
The app is responsive and works on desktop, tablet and mobile. To include a composed device mockup in this README, add an image at:

`assets/images/responsive-mockup.png`

Example Markdown (already included in this README after you add the image):
```markdown
![Responsive demo showing desktop, tablet and phone](assets/images/responsive-mockup.png)
```

If you want to generate this mockup automatically, see the "Regenerate responsive mockup" section below.

---

## How it works (brief)
- 16 prewritten questions are selected randomly each play.
- Each question has four choices.
- The progress bar advances after each question (right or wrong).
- Each correct answer increases the score by 100 points (max 1600).
- After all questions are answered the player lands on the End page where they can save a name + score to localStorage. The leaderboard keeps the top 5 entries.

---

## Controls
- Start / Play: launches the game (redirects to the game page).
- Home: returns to the index page.
- Restart: restarts the current game and resets the score.

---

## Quiz instructions
1. Press the Start/Play button.
2. Choose one of the four choices for each question.
3. The progress bar updates whether your answer is right or wrong.
4. After 16 questions you are redirected to the End page to save your score and name.
5. The leaderboard shows saved high scores (top 5).

---

## JavaScript behaviour
- The game uses JS to:
  - Randomise question order,
  - Update the progress bar,
  - Apply colour feedback on answers,
  - Save the most recent score to `localStorage.mostRecentScore`,
  - Persist the leaderboard array in `localStorage.highScores`.


## Validator testing
- HTML: validated with W3C HTML validator — no errors.
- CSS: validated with W3C CSS validator — no errors.
- JavaScript: open the browser console (F12) and check for errors during play — none were present during testing.

---

## Deployment
This project is deployed with GitHub Pages.

To publish from the repository:
1. In your repo, go to Settings → Pages (or "Pages" from the left menu).
2. Under "Source" choose the `main` branch (or whichever branch you use) and save.
3. GitHub Pages will build and expose your site.

Live URL: https://justus-ai.github.io/swenglish/

