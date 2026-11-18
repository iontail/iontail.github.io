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

const copyButton = document.querySelector("[data-copy]");
const command = document.querySelector("#build-command");
const copyStatus = document.querySelector("#copy-status");

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(command.textContent);
    copyButton.textContent = "복사 완료";
    copyStatus.textContent = "빌드와 실행 명령이 클립보드에 복사됐어요.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(command);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = "명령 선택됨";
    copyStatus.textContent = "선택된 명령을 복사해 주세요.";
  }
});
