const musicContaioner = document.querySelector("#music-container");
const audio = document.querySelector("#audio");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const playBtn = document.querySelector("#play");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const random = document.querySelector("#random");

const songs = ["ukulele", "summer", "hey"];

let songIndex = 0;

loadSong(songs[songIndex]);
// whatToLoad();
// function whatToLoad() {
//   if (isRandom) {
//     loadSong(shuffledSongs[songIndex]);
//     console.log(shuffledSongs);
//   } else {
//     loadSong(songs[songIndex]);
//     console.log(songs);
//   }
// }

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContaioner.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  musicContaioner.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// function updateProgress(e) {
//   const { duration, currentTime } = e.srcElement;
//   const progressPercent = (currentTime / duration) * 100;
//   progress.style.width = `${progressPercent} %`;
// }
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  // progress.style.width = "100%";
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const clickX = e.offsetX;

  const width = this.clientWidth;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function activateRandom() {
  random.classList.toggle("random-active");
  if (random.classList.contains("random-active")) {
    let shuffledSongs = shuffleUntilDifferent(songs);
    loadSong(shuffledSongs[songIndex]);
    console.log(shuffledSongs);
  } else {
    loadSong(songs[songIndex]);
    console.log(songs);
  }
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContaioner.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function shuffleArray(array) {
  let newArr = array.slice();
  // Создаем новый массив
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
function shuffleUntilDifferent(array) {
  let shuffledArrey = shuffleArray(array);
  while (arraysAreEqual(array, shuffledArrey)) {
    shuffledArrey = shuffleArray(array);
  }
  return shuffledArrey;
}
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

// console.log(newArr);
// document.getElementById("generate").addEventListener("click");
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
random.addEventListener("click", activateRandom);
