const knob = document.querySelector('.adjustment');
const knob_freq = document.querySelector('.adjustment_freq');
let touch = {
  start: 0,
  current: 0,
  diff: 0 };


knob.addEventListener('touchstart', e => {
  touch.start = e.changedTouches[0].screenY;
});

knob_freq.addEventListener('touchstart', e => {
  touch.start = e.changedTouches[0].screenY;
});


knob.addEventListener('touchmove', e => {
  requestAnimationFrame(() => {
    touch.current = e.changedTouches[0].screenY;
    touch.diff = (touch.current - touch.start) * -1;
    knob.style.setProperty('--knob-position', limit(touch.diff, 0, 100));
  });
});

// knob_freq.addEventListener('touchmove', e => {
//   requestAnimationFrame(() => {
//     touch.current = e.changedTouches[0].screenY;
//     touch.diff = (touch.current - touch.start) * -1;
//     knob_freq.style.setProperty('--knob-position', limit(touch.diff, 0, 22000));
//   });
// });

function limit(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}