const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('lotto-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute(
    'aria-label',
    isDark ? '화이트 모드로 전환' : '다크 모드로 전환'
  );
  themeToggle.textContent = isDark ? '☀️ 화이트 모드' : '🌙 다크 모드';
}

applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  localStorage.setItem('lotto-theme', nextTheme);
  applyTheme(nextTheme);
});

let history = [];

function getColor(num) {
  if (num <= 10) return 'yellow';
  if (num <= 20) return 'blue';
  if (num <= 30) return 'red';
  if (num <= 40) return 'gray';
  return 'green';
}

function createNumbers() {
  const numbers = [];

  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;

    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  return numbers.sort((a, b) => a - b);
}

function generateLotto() {
  const numbers = createNumbers();

  displayNumbers(numbers);
  addHistory(numbers);
}

function displayNumbers(numbers) {
  const container = document.getElementById('lottoBalls');

  container.innerHTML = numbers.map((num, index) => `
    <div class="ball ${getColor(num)}"
         style="animation-delay:${index * 0.08}s">
      ${num}
    </div>
  `).join('');
}

function addHistory(numbers) {
  history.unshift(numbers);

  if (history.length > 5) {
    history.pop();
  }

  const list = document.getElementById('historyList');

  list.innerHTML = history.map((numbers, index) => `
    <div class="history-item">
      <div class="small-balls">
        ${numbers.map(num => `
          <div class="small-ball ${getColor(num)}">
            ${num}
          </div>
        `).join('')}
      </div>
      <span>${index === 0 ? '방금 추천' : (index + 1) + '번째'}</span>
    </div>
  `).join('');
}

function generateMultiple() {
  const container = document.getElementById('lottoBalls');

  history = [];

  for (let i = 0; i < 5; i++) {
    addHistory(createNumbers());
  }

  displayNumbers(history[0]);
}
