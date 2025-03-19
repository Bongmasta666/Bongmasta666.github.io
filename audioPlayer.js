
// <section>
// <h2>Gamer Music</h2>
// <button class="audioBTN" onclick="changeSong(-1)">
//     <img class="audioIMG" src="./Images/previous.png" alt="audio_prev"></button>
// <button class="audioBTN" onclick="toggleMusic()">
//     <img class="audioIMG" id="play/pause" src="./Images/forward.png" alt="audio_play"></button>
// <button class="audioBTN" onclick="changeSong(1)">
//     <img class="audioIMG" src="./Images/next.png" alt="audio_next"></button>
// <br>
// <label for="audio_player" id="audio_label">Now Playing:</label>
// <br>
// <audio loop src="./Audio/Sea_Shanty_2.ogg" id="audio_player"></audio>
// </section> 

// .audioBTN {background-color: blueviolet;}
// .audioIMG {width: 24px;}

let index = 0;
let enabled = false;

const AUDIO_PLAYER = document.getElementById("audio_player")
const AUDIO_LABEL = document.getElementById("audio_label")
const AUDIO_PLAY_BTN = document.getElementById("play/pause")
const AUDIO_PATH = "./Audio/"

const SONG_FILES = [
    "Sea_Shanty_2.ogg",
    "Arcade_Kid_David_Renda_2020.mp3"
]

const SONG_TITLES = [
    "Runescape - Sea Shanty 2",
    "David Renda - Arcade Kid"
]

AUDIO_LABEL.innerText += "\nRunescape - Sea Shanty 2"

function toggleMusic() {
    enabled = !enabled
    enabled ? AUDIO_PLAYER.play() : AUDIO_PLAYER.pause()
    enabled ? AUDIO_PLAY_BTN.src = "./Images/pause.png" : AUDIO_PLAY_BTN.src = "./Images/forward.png"
}

function changeSong(direction){
    index += direction;
    if (index >= SONG_FILES.length) index = 0;
    else if (index < 0) index = SONG_FILES.length - 1;
    AUDIO_LABEL.innerText = "Now Playing:\n" + SONG_TITLES[index]
    AUDIO_PLAYER.src = AUDIO_PATH + SONG_FILES[index];
    if (enabled) AUDIO_PLAYER.play();
}