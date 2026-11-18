const video = document.querySelector("#demo video");

document.querySelector("[data-play-demo]").addEventListener("click", () => {
  video.focus({ preventScroll: true });
  video.play().catch(() => {});
});
