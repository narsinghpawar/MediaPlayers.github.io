let current_index = 0;
let isPlaying = false;
let playpause_btn = document.querySelector(".playpause-track");
let now_playing = document.querySelector(".now-playing");
let volume = document.querySelector(".slider_container");
let slider =  document.getElementById('seek_slider').value;
let total_duration = document.querySelector(".total-duration");
let volume_slider =  document.querySelector(".volume_slider");
let seek_slider = document.querySelector(".seek_slider");
let track_name = document.querySelector(".track-name"); 
let track_artist = document.querySelector(".track-artist");
let current_time = document.querySelector(".current-time");

let muteVol = document.querySelector(".mute-vol");
let audios = document.getElementById('audio');
let track_art = document.querySelector(".track-art");
 


let volumeMuted =  false;

let playlist = [
{
	name: "Dance Ka Bhoot Brahmastra",
	artist: "dance-ka-bhoot",
	image: "Dance-2.jfif",
	backgroundColor:"lightgreen",
	path: "dance-ka-bhoot-brahmastra-128-kbps-sound.mp3"
},
{
	name: "Chumma Chumma",
	artist: "Chumma-Chumma",
	image: "Chuma-1.jfif",
	backgroundColor: "#ccffff",
	path: "Chumma-ChummaPagalWorld.com_.se_.mp3"
	
},

{
	name: "Jab Barasta Hai Badal",
	artist: "Jab Barasta Hai Badal",
	image: "Badal-3.jfif",
	backgroundColor: "#ffd1b3",
	path: "Jab-Barasta-Hai-BadalPagalWorldl.mp3"
},

];
function playpauseTrack(){

	if(!isPlaying){
		playSongs();
	}else{
		pusePlaying();
	}
}


function nextTrack(){
	if(isPlaying){
		//let audios = document.getElementById('audio');
		current_index++;
		if(current_index >= playlist.length-1){
			current_index = playlist.length-1;
		}
		audios.src = playlist[current_index].path;
		load();
		audios.play();
		
	}
}

function prevTrack(){

	if(isPlaying){
		let audios =  document.getElementById('audio');
		current_index--;
		if(current_index == -1){
			current_index=0;
		}
			audios.src = playlist[current_index].path;
			load();
			audios.play();

	}

}

function pusePlaying(){
	
	audios.src = playlist[current_index].path;
	audios.pause();
	isPlaying = false;
	playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function playSongs(){
	
	if(!isPlaying){
		audios.src = playlist[current_index].path;
		load();
		audios.play();
		isPlaying =  true;
		playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
	}
	
}

function load(){

	var artist_name = playlist[current_index].name;
	track_name.innerHTML = artist_name;

	var bg_color = playlist[current_index].backgroundColor;
	document.body.style.backgroundColor = bg_color;

	let track_artist_name =  playlist[current_index].artist;
	track_artist.innerHTML = track_artist_name;

	track_art.style.backgroundImage =
     "url(" + playlist[current_index].image + ")";
}


function seekTo(){
	//let audio = document.getElementById('audio');
	let seek = document.getElementById('seek_slider');
	let audio_duration = audios.duration;
	if(isPlaying){
	let sec =  audio_duration;
	let min = sec / 60;
	let curr_sec = audio.currentTime;
	let curr_min = curr_sec / 60;
	total_duration.innerHTML = Math.floor(min)+":"+Math.floor(sec - (60*min));

    seek.value = ((audios.currentTime / audios.duration) * 100).toFixed(2);
    current_time.innerHTML =  Math.floor(curr_min) + ":"+ Math.floor(curr_sec);
    if(audios.ended){
    	nextTrack();
    }

	}else{
		total_duration.innerHTML="00:00";
	}
}

function UpdateSeek() {
	
	let seek = document.getElementById('seek_slider');
	if (intervalId) {
		clearInterval(intervalId);
	}
	audios.currentTime = (seek.value / 100) * audios.duration;
	intervalId = setInterval(seekTo,500);
	
}

let intervalId= setInterval(seekTo,500);
 
function setVolume(){
		let audio = document.getElementById('audio');
		let vol_slider = 0 + "." +document.getElementById("volume_slider").value;
		
		if(vol_slider <= 0.0){
			audio.muted = true;
		}else {
			audio.muted = false;
				
		}
		audio.volume = vol_slider;
}

function muteOrUnmuted(){
	
	if(audios.muted == true){
		audios.muted = false;
		
	}else{
		audios.muted = true;
		
	}
}
