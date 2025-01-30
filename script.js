const songs = [
    { title: "Canción 1", src: "song1.mp3" },
    { title: "Canción 2", src: "song2.mp3" },
    { title: "Canción 3", src: "song3.mp3" }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src);

// Elementos del DOM
const playPauseBtn = document.getElementById("playPause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progressBar");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");
const songTitleSpan = document.getElementById("songTitle");

// Función para actualizar la barra de progreso
function updateProgressBar() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
}

// Formatear el tiempo en minutos:segundos
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Actualizar duración de la canción cuando se carga
audio.addEventListener("loadedmetadata", () => {
    durationSpan.textContent = formatTime(audio.duration);
});

// Reproducir o pausar la canción
playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸️";
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
    }
});

// Avanzar a la siguiente canción
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
});

// Retroceder a la canción anterior
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong();
});

// Cambiar de canción
function changeSong() {
    audio.pause();
    audio = new Audio(songs[currentSongIndex].src);
    songTitleSpan.textContent = songs[currentSongIndex].title;
    audio.play();
    playPauseBtn.textContent = "⏸️";

    // Actualizar duración
    audio.addEventListener("loadedmetadata", () => {
        durationSpan.textContent = formatTime(audio.duration);
    });

    // Escuchar eventos de tiempo para actualizar la barra de progreso
    audio.addEventListener("timeupdate", updateProgressBar);
}

// Permitir al usuario cambiar la posición de la canción
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});


