const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let intervalID = null;

refs.body.addEventListener('click', onBtnClick);
refs.btnStop.setAttribute('disabled', true);

////////////////////////////////////////////////////////////
function onBtnClick({ target }) {
  if (target === refs.btnStart) clickOnBtnStart();
  if (target === refs.btnStop) clickOnBtnStop();
}

function clickOnBtnStop() {
  refs.btnStart.removeAttribute('disabled');
  refs.btnStop.setAttribute('disabled', true);
  clearInterval(intervalID);
}

function clickOnBtnStart() {
  refs.btnStop.removeAttribute('disabled');
  refs.btnStart.setAttribute('disabled', true);
  intervalID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}