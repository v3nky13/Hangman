const phrases = [
  'ping pong',
  'piano',
  'earthquake',
  'skateboard',
  'alarm clock',
  'money',
  'banana peel',
  'think',
  'shopping cart',
  'newspaper',
  'hula hoop',
  'rain',
  'seesaw',
  'jazz',
  'hangman',
  'zebra',
  'subway',
  'blizzard',
  'buffalo',
  'quantum',
  'cow',
  'puppy',
  'glyph',
  'transparent',
  'funny',
];

let phrase = '';
let guessed = '';
let countLeft = 0;

const createGuessed = () => {
  guessed = '';
  for (let i = 0; i < phrase.length; i++)
    guessed += phrase[i] === ' ' ? ' ' : '_';
};

const prettyOutput = (str) => {
  let prettyOutput = '';
  for (let i = 0; i < str.length; i++)
    if (str[i] !== ' ') prettyOutput += ' ' + str[i] + ' ';
    else prettyOutput += '&nbsp;&nbsp;';
  return prettyOutput;
};

const newPhrase = () => {
  countLeft = 6;
  const winningStatus = document.getElementById('winning-status');
  winningStatus.innerHTML = 'Guess:';
  winningStatus.style.color = '#ebecf0';
  buttons = document.getElementsByClassName('letter');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = '#ebecf0';
    buttons[i].disabled = false;
    buttons[i].classList.add('letter-hover');
  }
  phrase = phrases[Math.floor(Math.random() * phrases.length)];
  console.log(phrase);
  createGuessed();
  document.getElementById('phrase-text').innerHTML = prettyOutput(guessed);
};

const replaceAt = (str, index, replacement) => {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
};

const updateGuessed = (ch) => {
  let crtGuess = false;
  for (let i = 0; i < guessed.length; i++) {
    if (guessed[i] === '_' && phrase[i] === ch) {
      guessed = replaceAt(guessed, i, ch);
      crtGuess = true;
    }
  }
  return crtGuess;
};

const playerWon = () => {
  let won = true;
  for (let i = 0; i < guessed.length; i++) if (guessed[i] == '_') won = false;
  return won;
};

const newGuess = (id) => {
  const button = document.getElementById(id);
  const crtGuess = updateGuessed(id);
  button.disabled = true;
  button.classList.remove('letter-hover');
  if (!crtGuess) {
    countLeft--;
    document.getElementById('hm-img').src =
      './imgs/hangman-' + countLeft + '.png';
  }
  button.style.backgroundColor = crtGuess ? '#50C878' : '#ff6863';
  const won = playerWon();
  document.getElementById('phrase-text').innerHTML =
    won || !countLeft ? prettyOutput(phrase) : prettyOutput(guessed);
  const winningStatus = document.getElementById('winning-status');
  if (won) {
    winningStatus.innerHTML = 'You Win!';
    winningStatus.style.color = '#50C878';
  } else if (!countLeft) {
    winningStatus.innerHTML = 'You Lost!';
    winningStatus.style.color = '#ff6863';
  }
};

newPhrase();
