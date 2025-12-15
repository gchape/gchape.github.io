document.addEventListener("DOMContentLoaded", () => {
  const idCounts = {};

  for (const h2 of document.getElementsByTagName("h2")) {
    const id = h2.innerText
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    h2.id = id;
  }
});

const audio = new Audio("/audio/ChocolatespanishDance.mp3");
audio.volume = 0.4;

const toggle = document.getElementById("audio-toggle");

toggle.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    toggle.textContent = "❚❚ Pause Music";
  } else {
    audio.pause();
    toggle.textContent = "▶︎ Play Music";
  }
});
