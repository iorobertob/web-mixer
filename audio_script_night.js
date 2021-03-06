console.clear();

function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {
      var url = URL.createObjectURL(blob);
      var li = document.createElement('li');
      var au = document.createElement('audio');
      var br = document.createElement('br');
      var hf = document.createElement('a');
      
      au.controls = true;
      au.src = url;
      hf.href = url;
      hf.download = new Date().toISOString() + '.wav';
      hf.innerHTML = hf.download;
      li.appendChild(au);
      li.appendChild(br);
      li.appendChild(hf);
      recordingslist.appendChild(li);
    });
}

// instigate our audio context
// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioCtx = new AudioContext();

var tuna = new Tuna(audioCtx);

reverbjs.extend(audioCtx);


var audio_files_city = [
  "https://dev.ideas-block.com/mixer/files/night/city/1-1.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-2.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-3.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-4.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-5.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-6.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-7.mp3",
  "https://dev.ideas-block.com/mixer/files/night/city/1-8.mp3"
];
var audio_files_nature = [
  "https://dev.ideas-block.com/mixer/files/night/nature/2-1.mp3",
  "https://dev.ideas-block.com/mixer/files/night/nature/2-2.mp3",
  "https://dev.ideas-block.com/mixer/files/night/nature/2-3.mp3"
];
var audio_files_people = [
  "https://dev.ideas-block.com/mixer/files/night/people/3-1.mp3",
  "https://dev.ideas-block.com/mixer/files/night/people/3-2.mp3",
  "https://dev.ideas-block.com/mixer/files/night/people/3-3.mp3",
  "https://dev.ideas-block.com/mixer/files/night/people/3-4.mp3"
];
var audio_files_silence = [
  "https://dev.ideas-block.com/mixer/files/night/silence/4-1.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-2.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-3.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-4.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-5.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-6.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-7.mp3",
  "https://dev.ideas-block.com/mixer/files/night/silence/4-8.mp3"
];
var audio_files_noise = [
  "https://dev.ideas-block.com/mixer/files/night/noise/5-1.mp3",
  "https://dev.ideas-block.com/mixer/files/night/noise/5-2.mp3",
  "https://dev.ideas-block.com/mixer/files/night/noise/5-3.mp3",
  "https://dev.ideas-block.com/mixer/files/night/noise/5-4.mp3",
  "https://dev.ideas-block.com/mixer/files/night/noise/5-5.mp3"
];



// load some sound
// const audioElement = document.querySelector('audio');
var audioElement  = document.getElementById('track1');
var audioElement2 = document.getElementById('track2');
var audioElement3 = document.getElementById('track3');
var audioElement4 = document.getElementById('track4');
var audioElement5 = document.getElementById('track5');

var track  = audioCtx.createMediaElementSource(audioElement);
var track2 = audioCtx.createMediaElementSource(audioElement2);
var track3 = audioCtx.createMediaElementSource(audioElement3);
var track4 = audioCtx.createMediaElementSource(audioElement4);
var track5 = audioCtx.createMediaElementSource(audioElement5);

// RANDOM BUTTONS
// Random 1
const randomButton1 = document.getElementById('randomButton');
randomButton1.addEventListener('click', function() {

	var audio  = document.getElementById('track1');
	var source = document.getElementById('audioSource1');
	source.src = audio_files_city   [Math.floor(Math.random() * audio_files_city.length)]  ;

	audio.load();

	if (playButton.dataset.playing === 'true') 
	{
		audio.play().then(function() {
		    // Playback started!
		    playButton.dataset.playing = 'true';
		  }).catch(function(error) {
		    // Playback failed.
		    alert(error);
		  });
	}

}, false);

// Random 2
const randomButton2 = document.getElementById('randomButton2');
randomButton2.addEventListener('click', function() {

	var audio  = document.getElementById('track2');
	var source = document.getElementById('audioSource2');
	source.src = audio_files_nature   [Math.floor(Math.random() * audio_files_nature.length)]  ;
	audio.load();

	if (playButton.dataset.playing === 'true') 
	{
		audio.play().then(function() {
		    // Playback started!
		    playButton.dataset.playing = 'true';
		  }).catch(function(error) {
		    // Playback failed.
		    alert(error);
		  });
	}

}, false);


// Random 3
const randomButton3 = document.getElementById('randomButton3');
randomButton3.addEventListener('click', function() {

	var audio  = document.getElementById('track3');
	var source = document.getElementById('audioSource3');
	source.src = audio_files_people   [Math.floor(Math.random() * audio_files_people.length)]  ;

	audio.load();

	if (playButton.dataset.playing === 'true') 
	{
		audio.play().then(function() {
		    // Playback started!
		    playButton.dataset.playing = 'true';
		  }).catch(function(error) {
		    // Playback failed.
		    alert(error);
		  });
	}

}, false);

// Random 4
const randomButton4 = document.getElementById('randomButton4');
randomButton4.addEventListener('click', function() {

	var audio  = document.getElementById('track4');
	var source = document.getElementById('audioSource4');
	source.src = audio_files_silence   [Math.floor(Math.random() * audio_files_silence.length)]  ;

	audio.load();

	if (playButton.dataset.playing === 'true') 
	{
		audio.play().then(function() {
		    // Playback started!
		    playButton.dataset.playing = 'true';
		  }).catch(function(error) {
		    // Playback failed.
		    alert(error);
		  });
	}

}, false);

// Random 5
const randomButton5 = document.getElementById('randomButton5');
randomButton5.addEventListener('click', function() {

	var audio  = document.getElementById('track5');
	var source = document.getElementById('audioSource5');
	source.src = audio_files_noise   [Math.floor(Math.random() * audio_files_noise.length)]  ;

	audio.load();

	if (playButton.dataset.playing === 'true') 
	{
		audio.play().then(function() {
		    // Playback started!
		    playButton.dataset.playing = 'true';
		  }).catch(function(error) {
		    // Playback failed.
		    alert(error);
		  });
	}

}, false);


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

// volume. ===== MASTER ======
const gainNodeMaster = audioCtx.createGain();
// const volumeControl2 = document.querySelector('[data-action="panner"]');
const volumeControlMaster = document.getElementById('volumeMASTER');
volumeControlMaster.addEventListener('input', function() {
	gainNodeMaster.gain.value = this.value/1.1;
}, false);
gainNodeMaster.gain.value = 1;


// Create all the knobs' gain nodes. 
var knob_id;
var gains_aux_array = [];
var knobs_aux_array = [];
for (i=1; i <= 4; i++){

	for(j=1; j <= 5; j++){

		gains_aux_array.push(audioCtx.createGain());

		knob_id = "knob_aux" + i + "_" + j;
		knobs_aux_array.push(document.getElementById(knob_id));
		// knobs_aux_array[((i-1)*5)+(j-1)].addEventListener('input', function() {
		// 	gains_aux_array[((i-1)*5)+(j-1)].gain.value = this.value/200;
		// 	console.log(this.value);
		// }, false);
		// gains_aux_array[gains_aux_array.length-1].gain.value = 0;
	}
}

for(i=0;i<knobs_aux_array.length;i++){
	var index = i;
	knobs_aux_array[i].addEventListener('input', function() {
			var index = this.getAttribute("data-array-index");
			if((index >19)&&(index < 25)){
				// gains_aux_array[index].gain.value = this.value/200;
				var new_index = index - 20;
				filter_array[new_index].frequency.value = this.value;
			}
			else{
				gains_aux_array[index].gain.value = this.value/200;
			}
		}, false);
		gains_aux_array[index].gain.value = 0;
}

// filter to sound 1 
var filter = audioCtx.createBiquadFilter();


// REVERB NODE 
// 2) Load the impulse response; upon load, connect it to the audio output.
var reverbUrl = "https://dev.ideas-block.com/mixer/files/AbernyteGrainSilo_MP3.mp3";
var reverbNode = audioCtx.createReverbFromUrl(reverbUrl, function() {
  // reverbNode.connect(audioCtx.destination);
  reverbNode.connect(gainNodeMaster);
});


// CHORUS NODE 
var chorusNode = new tuna.Chorus({
    rate: 7,         //0.01 to 8+
    feedback: 0.5,     //0 to 1+
    delay: 0.045,     //0 to 1
    bypass: 0          //the value 1 starts the effect as bypassed, 0 or 1
});


// DELAY NODE 
var delayNode = new tuna.Delay({
    feedback: 0.45,    //0 to 1+
    delayTime: 150,    //1 to 10000 milliseconds
    wetLevel: 0.95,    //0 to 1+
    dryLevel: 0.0,       //0 to 1+
    cutoff: 10000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});

// OVERDRIVE NODE 
var overdriveNode = new tuna.Overdrive({
    outputGain: -42,           //-42 to 0 in dB
    drive: 0.7,              //0 to 1
    curveAmount: 1,          //0 to 1
    algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
    bypass: 0
});


// FILTER NODEs
var filter_array = [];
for(i = 0; i < 5; i++){
	filter_array.push(new tuna.Filter({
    frequency: 440, //20 to 22050
    Q: 1, //0.001 to 100
    gain: 0, //-40 to 40 (in decibels)
    filterType: "lowpass", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
    bypass: 0
}));

}


// TRACK VOLUMES
track.connect(gainNode).connect(gainNodeMaster); // 1
track2.connect(gainNode2).connect(gainNodeMaster); // 2
track3.connect(gainNode3).connect(gainNodeMaster); // 3
track4.connect(gainNode4).connect(gainNodeMaster); // 4
track5.connect(gainNode5).connect(gainNodeMaster); // 5

// REVERB PATCHING
track.connect(gains_aux_array[0]).connect(reverbNode); //1
track2.connect(gains_aux_array[1]).connect(reverbNode); //2
track3.connect(gains_aux_array[2]).connect(reverbNode); //3
track4.connect(gains_aux_array[3]).connect(reverbNode); //4
track5.connect(gains_aux_array[4]).connect(reverbNode); //5

// DELAY PATCHING
track.connect(gains_aux_array[5]).connect(delayNode).connect(gainNodeMaster); //1
track2.connect(gains_aux_array[6]).connect(delayNode).connect(gainNodeMaster); //2
track3.connect(gains_aux_array[7]).connect(delayNode).connect(gainNodeMaster);//3
track4.connect(gains_aux_array[8]).connect(delayNode).connect(gainNodeMaster);//4
track5.connect(gains_aux_array[9]).connect(delayNode).connect(gainNodeMaster); //5

// CHORUS PATCHING
track.connect(gains_aux_array[10]).connect(chorusNode).connect(gainNodeMaster); //1
track2.connect(gains_aux_array[11]).connect(chorusNode).connect(gainNodeMaster); //2
track3.connect(gains_aux_array[12]).connect(chorusNode).connect(gainNodeMaster); //3
track4.connect(gains_aux_array[13]).connect(chorusNode).connect(gainNodeMaster); //4
track5.connect(gains_aux_array[14]).connect(chorusNode).connect(gainNodeMaster); //5

// OVERDRIVE PATCHING
track.connect(gains_aux_array[15]).connect(overdriveNode).connect(gainNodeMaster); //1
track2.connect(gains_aux_array[16]).connect(overdriveNode).connect(gainNodeMaster); //2
track3.connect(gains_aux_array[17]).connect(overdriveNode).connect(gainNodeMaster); //3
track4.connect(gains_aux_array[18]).connect(overdriveNode).connect(gainNodeMaster); //4
track5.connect(gains_aux_array[19]).connect(overdriveNode).connect(gainNodeMaster); //5

gainNodeMaster.connect(audioCtx.destination);

filter.type = 'lowpass';
filter.frequency.value = 300;


var recorder = new Recorder(gainNodeMaster);


function stopAudio(){
	playButton.dataset.playing='false';
		
	if (recButton.dataset.recording==='true'){
		// Stop and clear recorder and create WAV download link using audio data blob
		recorder && recorder.stop();
    	createDownloadLink();
    	recorder.clear();
    	recButton.dataset.recording='false';
	}
	
	audioElement.pause();
	audioElement.currentTime = 0;
	audioElement2.pause();
	audioElement2.currentTime = 0;
	audioElement3.pause();
	audioElement3.currentTime = 0;
	audioElement4.pause();
	audioElement4.currentTime = 0;
	audioElement5.pause();
	audioElement5.currentTime = 0;
}

// STOP BUTTON 
const powerButton = document.querySelector('.control-power');
powerButton.addEventListener('click', function() {

	stopAudio();
		
}, false);


function playAudio()
{
	audioElement.play();
	audioElement2.play();
	audioElement3.play();
	audioElement4.play();
	audioElement5.play();
	playButton.dataset.playing = 'true';
}
// PLAY BUTTON 
const playButton = document.querySelector('.tape-controls-play');
playButton.addEventListener('click', function() {
	// check if context is in suspended state (autoplay policy)


	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	if (this.dataset.playing === 'false') {
		// playAudio();
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

const recButton = document.querySelector('.control-rec');
recButton. addEventListener('click',function(){

	if (this.dataset.recording === 'false') {
		this.dataset.recording = 'true';
		recorder && recorder.record();
	}
	else if (this.dataset.recording === 'true') {
		// Stop and clear recorder and create WAV download link using audio data blob
		recorder && recorder.stop();
    	createDownloadLink();
    	recorder.clear();
    	this.dataset.recording = 'false';
	}

	

},false);