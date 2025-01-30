// Definir la canción con su título y archivo MP3
const songs = [
    { title: "The Way Things - beabadoobee", src: "beabadoobee-the-way-things.mp3
" }
];

let currentSongIndex = 0;
let audio = new Audio();
audio.src = songs[currentSongIndex].src;
audio.preload = "auto"; // Precargar la canción


// Obtener elementos del DOM
const playPauseBtn = document.getElementById("playPause");
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
        playPauseBtn.textContent = "⏸️"; // Cambia el icono a pausa
    } else {
        audio.pause();
        playPauseBtn.textContent = "▶️"; // Cambia el icono a play
    }
});

// Escuchar el evento "timeupdate" para actualizar la barra de progreso
audio.addEventListener("timeupdate", updateProgressBar);

// Permitir al usuario cambiar la posición de la canción
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Mostrar el título de la canción en la pantalla
songTitleSpan.textContent = songs[currentSongIndex].title;

