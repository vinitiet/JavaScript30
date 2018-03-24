// Get elements
const player = document.querySelector('.player');
const video = document.querySelector('.player video');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
console.dir(video);
//  Build functions
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  };

};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};


function handleRangeUpdate() {
  video[this.name] = this.value;
};

function skip() {
  video.currentTime +=  parseFloat(this.dataset.skip);
};

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // progressBar.setAttribute("style", `flexBasis: ${video.currentTime * 100 / video.duration}%`);
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime =  scrubTime;
}

function toggleMouseClicked() {
  mouseClicked = !mouseClicked;
}
// Hookk up the event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(b => b.addEventListener('click', skip));
progress.addEventListener('click', scrub);
let mouseClicked = false;
progress.addEventListener('mousemove', (e) => mouseClicked && scrub(e));
progress.addEventListener('mousedown', () => mouseClicked = true);
progress.addEventListener('mouseup', () => mouseClicked = false);
// progress.addEventListener('mouseout', toggleMouseClicked);
