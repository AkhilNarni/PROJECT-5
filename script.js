const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./music/music1 .mp3",
    title: "ANKIT GUPTA",
    artist: "ANKIT GUPTA",
    imgSrc: "./img/music1.jpeg",
  },
  {
    songSrc: "./music/music2.mp3",
    title: "ASHWINI KUMAR",
    artist: "PANDEY",
    imgSrc: "./img/music2.jpeg",
  },
  {
    songSrc: "./music/music3.mp3",
    title: "DJ ROCKEY",
    artist: "SUPER MAXI",
    imgSrc: "./img/music3.jpeg",
  },
  {
    songSrc: "./music/music4.mp3",
    title: "RAMARAO SONGS",
    artist: "Unknown",
    imgSrc: "./img/music4.jpeg",
  },
  {
    songSrc: "./music/music5.mp3",
    title: "PAWAN SINGH",
    artist: "BOJHPURI",
    imgSrc: "./img/music5.jpeg",
  },
  {
    songSrc: "./music/music6.mp3",
    title: "SHARU KHAN",
    artist:"MISS YOU",
    imgSrc: "./img/music6.jpeg",
  },
  {
    songSrc: "./music/music7.mp3",
    title: "DEVA NATH",
    artist: "KUMARSINGH",
    imgSrc: "./img/music7.jpeg",
  },
  {
    songSrc: "./music/music8.mp3",
    title: "ABHINASH",
    artist: "DO OR DIE",
    imgSrc: "./img/misic10.jpeg",
  },
  {
    songSrc: "./music/music9.mp3",
    title: "KASHMIRI",
    artist: "Mix",
    imgSrc: "./img/music2.jpeg",
  },
  {
    songSrc: "./music/music10.mp3",
    title: "AYODHYA",
    artist: "RAM",
    imgSrc: "./img/music4.jpeg",
  },
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});
