console.clear();

// instigate our audio context

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

reverbjs.extend(audioCtx);

// load some sound
// const audioElement = document.querySelector('audio');
const audioElement  = document.getElementById('track1');
const audioElement2 = document.getElementById('track2');
const audioElement3 = document.getElementById('track3');
const audioElement4 = document.getElementById('track4');
const audioElement5 = document.getElementById('track5');

const track  = audioCtx.createMediaElementSource(audioElement);
const track2 = audioCtx.createMediaElementSource(audioElement2);
const track3 = audioCtx.createMediaElementSource(audioElement3);
const track4 = audioCtx.createMediaElementSource(audioElement4);
const track5 = audioCtx.createMediaElementSource(audioElement5);

// const playButton = document.querySelector('.tape-controls-play');
const playButton  = document.getElementById("play1");
const playButton2 = document.getElementById("play2");

// // play pause audio.  ===== 1 ======
// playButton.addEventListener('click', function() {
// 	// check if context is in suspended state (autoplay policy)
// 	if (audioCtx.state === 'suspended') {
// 		audioCtx.resume();
// 	}
// 	if (this.dataset.playing === 'false') {
// 		audioElement.play();
// 		this.dataset.playing = 'true';
// 	// if track is playing pause it
// 	} else if (this.dataset.playing === 'true') {
// 		audioElement.pause();
// 		this.dataset.playing = 'false';
// 	}
// 	let state = this.getAttribute('aria-checked') === "true" ? true : false;
// 	this.setAttribute( 'aria-checked', state ? "false" : "true" );
// }, false);


// play pause audio.  ===== 2 ======
// playButton2.addEventListener('click', function() {
// 	// check if context is in suspended state (autoplay policy)
// 	if (audioCtx.state === 'suspended') {
// 		audioCtx.resume();
// 	}
// 	if (this.dataset.playing === 'false') {
// 		audioElement2.play();
// 		this.dataset.playing = 'true';
// 	// if track is playing pause it
// 	} else if (this.dataset.playing === 'true') {
// 		audioElement2.pause();
// 		this.dataset.playing = 'false';
// 	}
// 	let state = this.getAttribute('aria-checked') === "true" ? true : false;
// 	this.setAttribute( 'aria-checked', state ? "false" : "true" );
// }, false);


// volume. ===== 1 ======
const gainNode = audioCtx.createGain();
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);
gainNode.gain.value = 0;

// volume. ===== 2 ======
const gainNode2 = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControl2 = document.getElementById('volume2');
volumeControl2.addEventListener('input', function() {
	gainNode2.gain.value = this.value/1.1;
}, false);
gainNode2.gain.value = 0;

// volume. ===== 3 ======
const gainNode3 = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControl3 = document.getElementById('volume3');
volumeControl3.addEventListener('input', function() {
	gainNode3.gain.value = this.value/1.1;
}, false);
gainNode3.gain.value = 0;

// volume. ===== 4 ======
const gainNode4 = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControl4 = document.getElementById('volume4');
volumeControl4.addEventListener('input', function() {
	gainNode4.gain.value = this.value/1.1;
}, false);
gainNode4.gain.value = 0;

// volume. ===== 5 ======
const gainNode5 = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControl5 = document.getElementById('volume5');
volumeControl5.addEventListener('input', function() {
	gainNode5.gain.value = this.value/1.1;
}, false);
gainNode5.gain.value = 0;


// gain aux 1.1 
const gainNodeAux1_1 = audioCtx.createGain();
const knob_Aux1_1 = document.getElementById('knob_aux1_1');
knob_Aux1_1.addEventListener('input', function() {
	gainNodeAux1_1.gain.value = this.value/200;
	// gainNodeAux1_1.gain.value = knob_Aux1_1.getAttribute("--knob-position'");
}, false);
gainNodeAux1_1.gain.value = 0;

// gain aux 1.2
const gainNodeAux1_2 = audioCtx.createGain();
const knob_Aux1_2 = document.getElementById('knob_aux1_2');
knob_Aux1_2.addEventListener('input', function() {
	gainNodeAux1_2.gain.value = this.value/200;
	// gainNodeAux1_1.gain.value = knob_Aux1_1.getAttribute("--knob-position'");
}, false);
gainNodeAux1_2.gain.value = 0;

// gain aux 1.3
const gainNodeAux1_3 = audioCtx.createGain();
const knob_Aux1_3 = document.getElementById('knob_aux1_3');
knob_Aux1_3.addEventListener('input', function() {
	gainNodeAux1_3.gain.value = this.value/200;
	// gainNodeAux1_1.gain.value = knob_Aux1_1.getAttribute("--knob-position'");
}, false);
gainNodeAux1_3.gain.value = 0;

// gain aux 1.2
const gainNodeAux1_4 = audioCtx.createGain();
const knob_Aux1_4 = document.getElementById('knob_aux1_4');
knob_Aux1_4.addEventListener('input', function() {
	gainNodeAux1_4.gain.value = this.value/200;
	// gainNodeAux1_1.gain.value = knob_Aux1_1.getAttribute("--knob-position'");
}, false);
gainNodeAux1_4.gain.value = 0;

// gain aux 1.2
const gainNodeAux1_5 = audioCtx.createGain();
const knob_Aux1_5 = document.getElementById('knob_aux1_5');
knob_Aux1_5.addEventListener('input', function() {
	gainNodeAux1_5.gain.value = this.value/200;
	// gainNodeAux1_1.gain.value = knob_Aux1_1.getAttribute("--knob-position'");
}, false);
gainNodeAux1_5.gain.value = 0;



// filter to sound 1 
var filter = audioCtx.createBiquadFilter();


// REVERB NODE 
// 2) Load the impulse response; upon load, connect it to the audio output.
var reverbUrl = "https://dev.ideas-block.com/mixer/files/AbernyteGrainSilo.m4a";
var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  reverbNode.connect(audioCtx.destination);
});


// connect our graph
track.connect(gainNode).connect(audioCtx.destination); // 1
track2.connect(gainNode2).connect(audioCtx.destination); // 2
track3.connect(gainNode3).connect(audioCtx.destination); // 3
track4.connect(gainNode4).connect(audioCtx.destination); // 4
track5.connect(gainNode5).connect(audioCtx.destination); // 5

// track.connect(filter).connect(audioCtx.destination); //1
track.connect(gainNodeAux1_1).connect(reverbNode); //1
track2.connect(gainNodeAux1_2).connect(reverbNode); //2
track3.connect(gainNodeAux1_3).connect(reverbNode); //3
track4.connect(gainNodeAux1_4).connect(reverbNode); //4
track5.connect(gainNodeAux1_5).connect(reverbNode); //5

filter.type = 'lowpass';
filter.frequency.value = 300;

const powerButton = document.querySelector('.control-power');

// powerButton.addEventListener('click', function() {
// 	if (this.dataset.power === 'on') {
// 		audioCtx.suspend();
// 		this.dataset.power = 'off';
// 	} else if (this.dataset.power === 'off') {
// 		audioCtx.resume();
// 		this.dataset.power = 'on';
// 	}
// 	this.setAttribute( "aria-checked", state ? "false" : "true" );

// }, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 





powerButton.addEventListener('click', function() {
	// check if context is in suspended state (autoplay policy)


	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	if (this.dataset.playing === 'false') {
		audioElement.play();
		audioElement2.play();
		audioElement3.play();
		audioElement4.play();
		audioElement5.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		audioElement2.pause();
		audioElement3.pause();
		audioElement4.pause();
		audioElement5.pause();
		this.dataset.playing = 'false';
	}
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
}, false);
