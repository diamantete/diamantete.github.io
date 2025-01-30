const audio = new Audio("the-way-things.mp3"); // Asegúrate de que el nombre del archivo es correcto

const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar"); // Control de volumen

// Formatear tiempo en minutos:segundos
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Actualizar duración cuando se carga el audio
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

// Actualizar barra de progreso mientras suena la canción
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// Permitir al usuario cambiar la posición de la canción
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Control de volumen
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});

