const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let audioMap = {};
let mapedKeys = [];

const createAudio = (src) => {
    const audio = new Audio(src);
    audio.volume = volumeSlider.value;
    return audio;
};

const playTune = (key) => {
    const audio = audioMap[key];
    if (audio) {
        audio.currentTime = 0; // Reinicia a reprodução, se já estiver tocando
        audio.play();
    }
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
};

pianoKeys.forEach((key) => {
    const audioSrc = `src/tunes/${key.dataset.key}.wav`;
    audioMap[key.dataset.key] = createAudio(audioSrc);
    mapedKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (mapedKeys.includes(key)) {
        playTune(key);
    }
});

const handleVolume = (e) => {
    const volume = e.target.value;
    for (const key in audioMap) {
        audioMap[key].volume = volume;
    }
};

const showHideKeys = () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);
