// carousel
const carousel = [...document.querySelectorAll(".carousel img")];

let carouselImgIndex = 0;

const changeCarousel = () => {
  carousel[carouselImgIndex].classList.toggle("active");

  if (carouselImgIndex >= carousel.length - 1) {
    carouselImgIndex = 0;
  } else {
    carouselImgIndex++;
  }
  carousel[carouselImgIndex].classList.toggle("active");
};

setInterval(() => {
  changeCarousel();
}, 3000);

// navigation // toggling music player
const musicPlayer = document.querySelector(".music-player");

let clickCount = 1;

musicPlayer.addEventListener("click", () => {
  if (clickCount >= 2) {
    musicPlayer.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

// back from music player
const backToHomeBtn = document.querySelector(".music-player .back-btn");

backToHomeBtn.addEventListener("click", () => {
  musicPlayer.classList.remove("active");
});

// access playlist
const playlist = document.querySelector(".playlist");
const navBtn = document.querySelector(".nav-btn");

navBtn.addEventListener("click", () => {
  playlist.classList.add("active");
});

// back from playlist
const backToMusicPlayer = document.querySelector(".playlist .back-btn");

backToMusicPlayer.addEventListener("click", () => {
  playlist.classList.remove("active");
});
// end navigation

// lists song
const lists = document.querySelector(".lists");
songs.forEach((song) => {
  lists.innerHTML += `<div class="queue active">
  <div class="queue-cover">
    <img src="${song.cover}" alt="" />
    <i class="fas fa-pause"></i>
  </div>
  <p class="name">${song.name}</p>`;
});

// music
let currentMusic = 0;

const music = document.querySelector("#audio-source");

const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".current-song-name");
const artistName = document.querySelector(".artist-name");
const coverImage = document.querySelector(".cover");
const currentMusicTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");

const queue = [...document.querySelectorAll(".queue")];

// all button control
const forwardBtn = document.querySelector("i.fa-forward");
const backwardBtn = document.querySelector("i.fa-backward");
const playBtn = document.querySelector("i.fa-play");
const pauseBtn = document.querySelector("i.fa-pause");
const repeatBtn = document.querySelector("span.fa-redo");
const volumeBtn = document.querySelector("span.fa-volume-up");
const volumeSlider = document.querySelector(".volume-slider");

// format duration in 00 : 00 format
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0` + min;
  }

  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0` + sec;
  }

  return `${min} : ${sec}`;
};

// function for setting music

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;

  music.src = song.path;

  songName.innerHTML = song.name;
  if (!musicPlayer.classList.contains("active")) {
    songName.innerHTML = song.name + " - " + song.artist;
  }

  artistName.innerHTML = song.artist;
  coverImage.src = song.cover;

  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 1000);
  currentMusicTime.innerHTML = "00 : 00";
  queue.forEach((item) => item.classList.remove("active"));
  queue[currentMusic].classList.add("active");
};

setMusic(0);

// playBtn click event
const playMusic = () => {
  if (playBtn.classList.contains("fa-play")) {
    music.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    music.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
};

playBtn.addEventListener("click", () => {
  playMusic();
});

// keyboard handling
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    playMusic();
  }
});

// forward button
const forward = () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  if (playBtn.classList.contains("fa-pause")) {
    music.play();
  }
};

forwardBtn.addEventListener("click", () => {
  forward();
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowRight") {
    forward();
  }
});

// backward button
const backward = () => {
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  if (playBtn.classList.contains("fa-pause")) {
    music.play();
  }
};

backwardBtn.addEventListener("click", () => {
  backward();
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") {
    backward();
  }
});

// seekbar event
setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    if (repeatBtn.className.includes("active")) {
      setMusic(currentMusic);
      playBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 1000);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

// repeat button
repeatBtn.addEventListener("click", () => {
  repeatBtn.classList.toggle("active");
});

// volume section
volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("active");
  volumeSlider.classList.toggle("active");
});

volumeSlider.addEventListener("input", () => {
  music.volume = volumeSlider.value;
});

window.addEventListener("click", (e) => {
  if (
    !e.target.matches(".fa-volume-up") &&
    !e.target.matches(".volume-slider")
  ) {
    const volumSlider = document.getElementsByClassName("volume-slider");
    for (let i = 0; i < volumSlider.length; i++) {
      let openVolumeSlider = volumSlider[i];
      if (openVolumeSlider.classList.contains("active")) {
        openVolumeSlider.classList.remove("active");
        volumeBtn.classList.remove("active");
      }
    }
  }
});

queue.forEach((item, i) => {
  item.addEventListener("click", () => {
    setMusic(i);
    playBtn.click();
  });
});
