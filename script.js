const songs = [
    { title: "Canción 1", src: "song1.mp3", lyrics: "lyrics1.json" },
    { title: "Canción 2", src: "song2.mp3", lyrics: "lyrics2.json" }
];

let currentSongIndex = 0;
let sound;
let lyrics = [];

const songTitle = document.getElementById("songTitle");
const playPauseButton = document.getElementById("playPause");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const lyricsContainer = document.getElementById("lyrics");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

function loadSong(index) {
    if (sound) {
        sound.stop();
    }

    sound = new Howl({
        src: [songs[index].src],
        html5: true,
        onplay: () => {
            startLyricsSync(songs[index].lyrics);
            updateProgress();
        },
        onend: nextSong
    });

    songTitle.textContent = songs[index].title;

    // Esperar un momento para obtener la duración de la canción
    setTimeout(() => {
        durationDisplay.textContent = formatTime(sound.duration());
    }, 500);
}

async function startLyricsSync(lyricsFile) {
    const response = await fetch(lyricsFile);
    lyrics = await response.json();

    lyricsContainer.innerHTML = lyrics
        .map((line, index) => `<p id="line-${index}" class="lyric-line">${line.text}</p>`)
        .join("");

    sound.on("timeupdate", updateLyrics);
}

function updateLyrics() {
    const currentTime = sound.seek();
    currentTimeDisplay.textContent = formatTime(currentTime);

    lyrics.forEach((line, index) => {
        const lineElement = document.getElementById(`line-${index}`);
        if (currentTime >= line.time) {
            document.querySelectorAll(".lyric-line").forEach(el => el.classList.remove("active"));
            lineElement.classList.add("active");
        }
    });

    // Actualizar la barra de progreso
    progressBar.value = (currentTime / sound.duration()) * 100;
}

function togglePlay() {
    if (sound.playing()) {
        sound.pause();
        playPauseButton.textContent = "▶️";
    } else {
        sound.play();
        playPauseButton.textContent = "⏸️";
    }
}

// Permitir que el usuario mueva la barra de progreso
progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * sound.duration();
    sound.seek(seekTime);
    updateLyrics();
});

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    sound.play();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    sound.play();
}

// Formatear tiempo en minutos y segundos
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

playPauseButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

loadSong(currentSongIndex);

