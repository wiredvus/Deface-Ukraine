function startMedia() {
  const audio = document.getElementById("audio");
  const video = document.getElementById("bg-video");

  if (!audio || !video) return;

  // Unmute and set volume
  audio.muted = false;
  audio.volume = 0.1;

  // Start video
  video
    .play()
    .then(() => {
      // Sync audio time to video immediately
      audio.currentTime = video.currentTime;
      audio.play().catch((err) => console.log("Audio play failed:", err));

      // Keep audio continuously synced with video
      video.addEventListener("timeupdate", () => {
        if (Math.abs(audio.currentTime - video.currentTime) > 0.05) {
          audio.currentTime = video.currentTime;
        }
      });
    })
    .catch((err) => console.log("Video play failed:", err));
}

// Invisible button triggers both
document.addEventListener("DOMContentLoaded", () => {
  const enableAudioBtn = document.getElementById("enable-audio");
  if (enableAudioBtn) {
    enableAudioBtn.addEventListener(
      "click",
      () => {
        startMedia();
        enableAudioBtn.style.display = "none"; // hide button
      },
      { once: true }
    );
  }
});
