//----------- Show hide Buttons ---------//
// When the user clicks the button, open the modal 
document.getElementById("myBtn").onclick = function() {
  document.getElementById("myModal").style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")){
    document.getElementById("myModal").style.display = "none";
  }

  if (event.target == document.getElementById("myModal1")){
    document.getElementById("myModal1").style.display = "none";
  }

  if (event.target == document.getElementById("myModal2")){
    document.getElementById("myModal2").style.display = "none";
  }

  if (event.target == document.getElementById("myModal3")) 
  {
    document.getElementById("myModal3").style.display = "none";
  }

  if (event.target == document.getElementById("myModal4")) 
  {
    document.getElementById("myModal4").style.display = "none";
  }
  //if(event.target == document.getElementById("menu")){
    //document.getElementById("menu-items").style.display = "none";
  //}
}


// When the user clicks the button, open the modal 
document.getElementById("myBtn1").onclick = function() {
  document.getElementById("myModal1").style.display = "block";
}

// When the user clicks the button, open the modal 
document.getElementById("myBtn2").onclick = function() {
  document.getElementById("myModal2").style.display = "block";
}

// When the user clicks the button, open the modal 
document.getElementById("myBtn3").onclick = function() {
  document.getElementById("myModal3").style.display = "block";
}

// When the user clicks the button, open the modal 
document.getElementById("myBtn4").onclick = function () {
  document.getElementById("myModal4").style.display = "block";
}
document.getElementById("show-music").onclick = function() {
  document.getElementById("column").style.display = "block";
  document.getElementById("show-music").style.display = "none";
  document.getElementById("close-music").style.display = "block";
}
document.getElementById("close-music").onclick = function() {
  document.getElementById("column").style.display = "none";
  document.getElementById("show-music").style.display = "block";
  document.getElementById("close-music").style.display = "none";
}
document.getElementById("menu").onclick = function () {
  document.getElementById("menu-items").style.display = "contents";
  document.getElementById("menu").style.display = "none";
}
document.getElementById("close-menu").onclick = function () {
  document.getElementById("menu-items").style.display = "none";
  document.getElementById("menu").style.display = "block";
}


//-------- Playlist -------//

var songs = ["song1.mp3","song2.mp3","song3.mp3","song4.mp3","song5.mp3","song6.mp3"];
var poster = ["nf-search.jpg","nf-growup.jpg","nf-alone.jpg","fire-force.png","kim-pic.jpg","aot-pic.png"];
var songTitle = document.getElementById("songTitle");
var song = new Audio();
var currentSong = 0;    // it point to the current song
        
function playSong(){
  song.src = songs[currentSong];  //set the source of 0th song 
  if(currentSong == 0){
    songTitle.textContent = "NF The-Search";
  }
  if(currentSong == 1){
    songTitle.textContent = "NF When-I-Grow-Up";
  }
  if(currentSong == 2){
    songTitle.textContent = "NF Leave-Me-Alone";
  }
  if(currentSong == 3){
    songTitle.textContent = "Fire Force Op";
  }
  if(currentSong == 4){
    songTitle.textContent = "Kimetsu No Yaiba Op";
  }
  if(currentSong == 5){
    songTitle.textContent = "Attack On Titan Op";
  }
  song.play();    // play the song
}
        
function playOrPauseSong(){
  if(song.paused){
    playSong  ();
      $("#play img").attr("src","Pause.png");
  }
  else{
    song.pause();
    $("#play img").attr("src","Play.png");
  }
}
        
song.addEventListener('timeupdate',function(){ 
  if(song.currentTime == song.duration){
    next();
  }
});
        
    
function next(){
  currentSong++;
  if(currentSong > 5){
     currentSong = 0;
  }
  playSong();
  $("#play img").attr("src","Pause.png");
  $("#image img").attr("src",poster[currentSong]);
  $("#bg img").attr("src",poster[currentSong]);
}
function pre(){
  currentSong--;
  if(currentSong < 0){
    currentSong = 5;
  }
  playSong();
  $("#play img").attr("src","Pause.png");
  $("#image img").attr("src",poster[currentSong]);
  $("#bg img").attr("src",poster[currentSong]);
}

//------------------------- Timer JS code ---------------------------------------------//
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;

progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
	var offset = - length - length * value / (timePercent);
	progressBar.style.strokeDashoffset = offset; 
	pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};

//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause-timer');


let intervalTimer;
let timeLeft;
let wholeTime = 0;
let cardioBtn = document.getElementById('cardio');
cardioBtn.addEventListener("click", function(){
  wholeTime = this.getAttribute('data-time');
  displayOutput.textContent = `${Math.floor(wholeTime / 60)}:${Math.floor(
    wholeTime % 60
  )}`;
});
const exersice = document.querySelectorAll('.modal-content button');
exersice.forEach(option => {
  option.addEventListener("click", function() {
    wholeTime = this.getAttribute("data-time");
    displayOutput.textContent = `${Math.floor(wholeTime / 60)}:${Math.floor(
      wholeTime % 60
    )}`;
  });
});



let isPaused = false;
let isStarted = false;


update(wholeTime,wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds;
    update(wholeTime,0);
  }
}

function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){
      clearInterval(intervalTimer);
      isStarted = false;
      
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause-timer');
      pauseBtn.classList.add('play-timer');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play-timer');
    this.classList.add('pause-timer');

  }else if(isPaused){
    this.classList.remove('play-timer');
    this.classList.add('pause-timer');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause-timer');
    this.classList.add('play-timer');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}

function displayTimeLeft (timeLeft){ //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}

pauseBtn.addEventListener('click',pauseTimer);

