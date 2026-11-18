const section = document.querySelector("#demo");
const screenshot = section.querySelector(".editor-shot");
const video = section.querySelector("video");
const openControls = document.querySelectorAll("[data-open-demo]");
const captionButton = section.querySelector("[data-open-demo]");
const closeButton = section.querySelector("[data-close-demo]");

for (const control of openControls) {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    video.hidden = false;
    screenshot.hidden = true;
    captionButton.hidden = true;
    closeButton.hidden = false;
    section.scrollIntoView({ block: "start" });
    video.focus({ preventScroll: true });
    video.play().catch(() => {});
  });
}

closeButton.addEventListener("click", () => {
  video.pause();
  video.hidden = true;
  screenshot.hidden = false;
  captionButton.hidden = false;
  closeButton.hidden = true;
  captionButton.focus();
});
