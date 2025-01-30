const songs = ["song1.mp3", "song2.mp3", "song3.mp3"];
let currentSong = 0;
const audio = new Audio(songs[currentSong]);

document.getElementById("playPause").addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        document.getElementById("playPause").textContent = "⏸️";
    } else {
        audio.pause();
        document.getElementById("playPause").textContent = "▶️";
    }
});

document.getElementById("next").addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    document.getElementById("songTitle").textContent = `Canción ${currentSong + 1}`;
    audio.play();
});

document.getElementById("prev").addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    audio.src = songs[currentSong];
    document.getElementById("songTitle").textContent = `Canción ${currentSong + 1}`;
    audio.play();
});
