console.clear();

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

reverbjs.extend(audioCtx);

// load some sound
// const audioElement = document.querySelector('audio');
const audioElement = document.getElementById('track2');
const audioElement2 = document.getElementById('track1');
const track = audioCtx.createMediaElementSource(audioElement);
const track2 = audioCtx.createMediaElementSource(audioElement2);

// const playButton = document.querySelector('.tape-controls-play');
const playButton = document.getElementById("play1");
const playButton2 = document.getElementById("play2");

// play pause audio.  ===== 1 ======
playButton.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	
	if (this.dataset.playing === 'false') {
	}
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);


// play pause audio.  ===== 2 ======
playButton2.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	
	if (this.dataset.playing === 'false') {
		audioElement2.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement2.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);



// if track ends ===== 1 ======
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

// if track ends ===== 2 ======
audioElement2.addEventListener('ended', () => {
	playButton2.dataset.playing = 'false';
	playButton2.setAttribute( "aria-checked", "false" );
}, false);

// volume. ===== 1 ======
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);


// volume. ===== 2 ======
const gainNode2 = audioCtx.createGain();

// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControl2 = document.getElementById('volume2');
volumeControl2.addEventListener('input', function() {
	gainNode2.gain.value = this.value;
}, false);


// // panning
// const pannerOptions = {pan: 0};
// const panner = new StereoPannerNode(audioCtx, pannerOptions);

// const pannerControl = document.querySelector('[data-action="panner"]');
// pannerControl.addEventListener('input', function() {
// 	panner.pan.value = this.value;	
// }, false);


// filter to sound 1 
var filter = audioCtx.createBiquadFilter();


// REVERB NODE 
// 2) Load the impulse response; upon load, connect it to the audio output.
var reverbUrl = "http://reverbjs.org/Library/AbernyteGrainSilo.m4a";
var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  reverbNode.connect(audioCtx.destination);
});


// connect our graph
track.connect(gainNode).connect(audioCtx.destination); //1
// track.connect(filter).connect(audioCtx.destination); //1
track.connect(reverbNode); //1

track2.connect(gainNode2).connect(audioCtx.destination); // 2


filter.type = 'lowpass';
filter.frequency.value = 300;

const powerButton = document.querySelector('.control-power');

powerButton.addEventListener('click', function() {
	if (this.dataset.power === 'on') {
		audioCtx.suspend();
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		audioCtx.resume();
		this.dataset.power = 'on';
	}
	this.setAttribute( "aria-checked", state ? "false" : "true" );
	console.log(audioCtx.state);
}, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 
