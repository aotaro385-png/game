const holes = document.querySelectorAll('.hole');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const messageEl = document.getElementById('message');
const startButton = document.getElementById('startButton');

const GAME_DURATION = 30;
const MOLE_INTERVAL = 650;

let score = 0;
let timeLeft = GAME_DURATION;
let moleTimer = null;
let countdownTimer = null;
let activeIndex = null;
let playing = false;

function clearActiveMole() {
  if (activeIndex === null) {
    return;
  }

  holes[activeIndex].classList.remove('active');
  activeIndex = null;
}

function showRandomMole() {
  clearActiveMole();
  const nextIndex = Math.floor(Math.random() * holes.length);
  holes[nextIndex].classList.add('active');
  activeIndex = nextIndex;
}

function stopGame() {
  playing = false;
  clearInterval(moleTimer);
  clearInterval(countdownTimer);
  clearActiveMole();
  startButton.disabled = false;
  messageEl.textContent = `終了！あなたのスコアは ${score} 点です。`;
}

function tick() {
  timeLeft -= 1;
  timeEl.textContent = String(timeLeft);

  if (timeLeft <= 0) {
    stopGame();
  }
}

function startGame() {
  if (playing) {
    return;
  }

  score = 0;
  timeLeft = GAME_DURATION;
  playing = true;
  scoreEl.textContent = '0';
  timeEl.textContent = String(GAME_DURATION);
  messageEl.textContent = 'もぐらをクリックして得点しよう！';
  startButton.disabled = true;

  showRandomMole();
  moleTimer = setInterval(showRandomMole, MOLE_INTERVAL);
  countdownTimer = setInterval(tick, 1000);
}

holes.forEach((hole, index) => {
  hole.addEventListener('click', () => {
    if (!playing || activeIndex !== index) {
      return;
    }

    score += 1;
    scoreEl.textContent = String(score);
    clearActiveMole();
  });
});

startButton.addEventListener('click', startGame);
