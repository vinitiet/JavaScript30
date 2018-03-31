let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endtime = document.querySelector('.display__end-time')
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}


function displayTimeLeft(seconds) {
  const [minutes, secs] = [Math.floor(seconds / 60), seconds % 60];
  console.log({minutes, secs});
  const display = `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endtime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`
}

const buttons = document.querySelectorAll('.timer__button');
buttons.forEach(button => button.addEventListener('click', () => timer(parseInt(button.dataset.time))));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(parseInt(mins) * 60);
});
