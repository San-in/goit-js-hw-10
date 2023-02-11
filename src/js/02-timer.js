import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notify from './nofify-config';

const refs = {
  dataTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  btnReset: document.querySelector('button[data-reset]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),

};

let calculatedTime = null;
let timerId = null;
const markupForDate = `${new Date().getFullYear()}-${addLeadingZero(new Date().getMonth() + 1)}-${addLeadingZero(new Date().getDate())} ${addLeadingZero(new Date().getHours())}:${addLeadingZero(new Date().getMinutes())}`;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates){
      isDateInThePresent(selectedDates)
      .then((date) => {
          refs.btnStart.removeAttribute('disabled');
          refs.btnReset.removeAttribute('disabled');
          calculatedTime = new Date(date[0]) - new Date();
          addDateTextContent(calculatedTime,refs);
        })
        .catch((error) => {
          Notify.warning(error);
          refs.btnStart.setAttribute('disabled', true);
        });
      },
  };

refs.btnStart.setAttribute('disabled', true);
refs.btnReset.setAttribute('disabled', true);

flatpickr('input#datetime-picker', options);

refs.btnStart.addEventListener('click', clickOnBtnStart);
refs.btnReset.addEventListener('click', clickOnBtnReset);

function clickOnBtnReset() {
  if(refs.dataTimePicker.value !== new Date()) {
    refs.btnStart.setAttribute('disabled', true);
    refs.btnReset.setAttribute('disabled', true);
    refs.dataTimePicker.value = markupForDate;
    calculatedTime = 0;
    addDateTextContent(calculatedTime,refs);
    clearInterval(timerId);
  }
}
function clickOnBtnStart(event) {
  event.target.setAttribute('disabled', true);
  refs.dataTimePicker.setAttribute('disabled', true);
  startTimer(timerId);
}
function isDateInThePresent(selectedDates) {
  return new Promise((resolve, reject) => {
    if (selectedDates[0] > new Date()){
      resolve(selectedDates);
    }
    reject("Please choose a date in the future");
  });
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2,0);
}
function addDateTextContent(date, objOfRefs) {
  const {days,hours, minutes, seconds} = convertMs(date);

  objOfRefs.days.textContent = addLeadingZero(days);
  objOfRefs.hours.textContent = addLeadingZero(hours);
  objOfRefs.minutes.textContent = addLeadingZero(minutes);
  objOfRefs.seconds.textContent = addLeadingZero(seconds);
}
function startTimer(id) {
  id = setInterval(() => {
    if (calculatedTime >= 1000) {
      calculatedTime -= 1000;
      addDateTextContent(calculatedTime,refs); 
    } else {
        clearInterval(id);
        // refs.btnStart.removeAttribute('disabled');
        refs.dataTimePicker.removeAttribute('disabled');
        refs.btnReset.setAttribute('disabled', true);
    }
  },1000);


} 



