import { caseFile } from "./case-data.js";

const entrance = document.querySelector(".entrance");
const enterButton = entrance.querySelector(".enter-room");
const library = document.querySelector(".library");
const shelfTitle = library.querySelector("h2");
const records = [...library.querySelectorAll("[data-record]")];
const exitButton = document.querySelector(".exit-room");
const caseClock = document.querySelector(".case-clock");
const caseClockValue = caseClock.querySelector("span");
const desk = document.querySelector(".desk");
const deskTitle = desk.querySelector("h2");
const returnButton = document.querySelector(".return");
const closedBook = document.querySelector(".closed-book");
const openButton = document.querySelector(".open-book");
const openLabel = openButton.querySelector(".open-label");
const deskVolume = desk.querySelector(".desk-volume");
const previewLabel = desk.querySelector(".preview-label");
const jackets = [deskVolume.querySelector(".cover"), document.querySelector("#preview-cover").content.firstElementChild];
const closeButton = document.querySelector(".close-book");
const reader = document.querySelector(".reader");
const book = document.querySelector(".book");
const spread = document.querySelector(".spread");
const clueTabs = document.querySelector(".clue-tabs");
const spreadTemplate = document.querySelector("#spread-template");
const pageCount = document.querySelector("#page-count");
const viewer = document.querySelector(".viewer");
const exportImage = new Image();
exportImage.src = caseFile.scene.image.source;
const hintConfirm = document.querySelector(".hint-confirm");
const hintQuestion = document.querySelector("#hint-question");
const soundSettings = document.querySelector(".audio-options");
const volumeControl = soundSettings.querySelector("#bgm-volume");
const volumeOutput = soundSettings.querySelector("output");
const trackControl = soundSettings.querySelector("#bgm-track");
const trackCredit = soundSettings.querySelector(".track-credit");
const trackEditNote = soundSettings.querySelector(".track-edit-note");
const audioStatus = soundSettings.querySelector(".audio-status");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const stackedPages = matchMedia("(max-width: 760px)");

const hintsPage = caseFile.clues.length + 1;
const answerPage = hintsPage + 1;
const lastPage = answerPage;
const overviewPage = -1;
const viewedHints = new Set();
let activePage = overviewPage;
const recordFromHash = () => records.findIndex(record => record.hash === location.hash);
let desiredRecord = Math.max(0, recordFromHash());
let deskRecord = 0;
let bookState = recordFromHash() >= 0 ? "closed"
  : location.hash === "#investigation" ? "shelf" : "entrance";
let desiredState = bookState;
let moving = false;
let readerZoom;
let selectedHint;
let attemptStartedAt;
let completedSeconds = null;
let clockInterval;
let audioContext, musicGain, pendingMusic, activeMusic;

const number = value => String(value).padStart(2, "0");
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const elapsedSeconds = () => Math.floor((performance.now() - attemptStartedAt) / 1000);
const normalizeAnswer = value => value.normalize("NFKC").replace(/\s+/g, "").toLowerCase();

function updateClock() {
  const seconds = completedSeconds ?? elapsedSeconds();
  caseClockValue.textContent = `${number(Math.floor(seconds / 60))}:${number(seconds % 60)}`;
}

function setAttemptClock(active) {
  clearInterval(clockInterval);
  completedSeconds = null;
  caseClock.hidden = !active;
  caseClock.removeAttribute("data-complete");
  caseClock.setAttribute("aria-label", "조사 시간");
  if (active) {
    attemptStartedAt = performance.now();
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }
}

function updateVolume() {
  volumeOutput.value = `${volumeControl.value}%`;
  musicGain?.gain.setTargetAtTime(volumeControl.valueAsNumber / 100, audioContext.currentTime, .035);
}

async function startMusic() {
  const track = trackControl.selectedOptions[0];
  if (volumeControl.valueAsNumber === 0) return;
  if (activeMusic?.track === track && audioContext.state === "running") return;
  let request;
  try {
    audioContext ??= new AudioContext();
    if (!musicGain) {
      musicGain = audioContext.createGain();
      musicGain.gain.value = volumeControl.valueAsNumber / 100;
      musicGain.connect(audioContext.destination);
    }
    const ready = audioContext.resume();
    if (activeMusic?.track === track) {
      await ready;
      return;
    }
    if (pendingMusic?.track !== track) {
      const buffer = fetch(track.dataset.track)
        .then(response => {
          if (!response.ok) throw new Error("BGM unavailable");
          return response.arrayBuffer();
        })
        .then(data => audioContext.decodeAudioData(data));
      pendingMusic = { track, buffer };
    }
    request = pendingMusic;
    const [, buffer] = await Promise.all([ready, request.buffer]);
    if (trackControl.selectedOptions[0] !== track || pendingMusic !== request || activeMusic?.track === track || volumeControl.valueAsNumber === 0) return;

    const now = audioContext.currentTime;
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    source.loop = true;
    source.connect(gain);
    gain.connect(musicGain);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + .18);
    source.onended = () => gain.disconnect();
    source.start();
    if (activeMusic) {
      const previous = activeMusic.gain.gain;
      const level = previous.value;
      previous.cancelScheduledValues(now);
      previous.setValueAtTime(level, now);
      previous.linearRampToValueAtTime(0, now + .18);
      activeMusic.source.stop(now + .18);
    }
    activeMusic = { track, source, gain };
    audioStatus.hidden = true;
  } catch {
    if (pendingMusic === request) pendingMusic = undefined;
    if (trackControl.selectedOptions[0] !== track) return;
    audioStatus.hidden = false;
  }
}

function updateTrackCredit() {
  const track = trackControl.selectedOptions[0];
  trackCredit.textContent = `${track.textContent} · Kevin MacLeod`;
  trackCredit.href = `https://incompetech.com/music/royalty-free/index.html?isrc=${track.dataset.isrc}`;
  trackEditNote.hidden = !track.hasAttribute("data-edited");
  audioStatus.hidden = true;
}

const volumeKey = "traces-of-guilt.volume";
const trackKey = "traces-of-guilt.track";
try {
  const savedVolume = localStorage.getItem(volumeKey);
  if (savedVolume !== null) volumeControl.value = savedVolume;
  const savedTrack = localStorage.getItem(trackKey);
  if ([...trackControl.options].some(option => option.value === savedTrack)) trackControl.value = savedTrack;
} catch {}
updateVolume();
updateTrackCredit();

for (const button of document.querySelectorAll("[data-options]")) {
  button.addEventListener("click", () => soundSettings.showModal());
}
document.addEventListener("click", event => {
  if (event.target.closest("main button, main a, .masthead button")) void startMusic();
});
volumeControl.addEventListener("input", () => {
  updateVolume();
  try {
    localStorage.setItem(volumeKey, volumeControl.value);
  } catch {}
  void startMusic();
});
trackControl.addEventListener("change", () => {
  updateTrackCredit();
  try {
    localStorage.setItem(trackKey, trackControl.value);
  } catch {}
  void startMusic();
});

function illustration(title, crop) {
  const { source, width, height } = caseFile.scene.image;
  const viewBox = crop ?? [0, 0, width, height];
  const [x, y, frameWidth, frameHeight] = viewBox;
  return `<svg class="illustration" role="img" aria-label="${title}" viewBox="${viewBox.join(" ")}">
    <svg x="${x}" y="${y}" width="${frameWidth}" height="${frameHeight}" viewBox="${viewBox.join(" ")}" overflow="hidden">
      <image href="${source}" width="${width}" height="${height}"></image>
    </svg>
  </svg>`;
}

function artCaption(title) {
  return `<div class="art-caption"><span>${title}</span>
    <div class="art-controls">
      <button class="plate plate-paper" type="button" data-zoom aria-haspopup="dialog">전체 화면 ${icon("zoom")}</button>
      <button class="plate plate-paper" type="button" data-download aria-label="이미지 저장">${icon("download")} <span><span class="download-label-prefix">이미지 </span>저장</span></button>
    </div></div>
    <p class="download-status" role="status"></p>`;
}

async function saveIllustration(container) {
  const art = container.querySelector(".illustration");
  const status = container.querySelector(".download-status");
  status.textContent = "";
  try {
    if (!exportImage.complete || !exportImage.naturalWidth) await exportImage.decode();
    const { x, y, width, height } = art.viewBox.baseVal;
    const source = caseFile.scene.image;
    const scale = 1920 / Math.max(width, height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    const context = canvas.getContext("2d");
    context.scale(canvas.width / width, canvas.height / height);
    context.drawImage(exportImage, -x, -y, source.width, source.height);
    const link = document.createElement("a");
    link.download = `Traces-of-Guilt_${art.getAttribute("aria-label").replaceAll(" ", "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    container.append(link);
    link.click();
    link.remove();
  } catch {
    status.textContent = "이미지를 저장하지 못했어요. 다시 시도해 주세요.";
  }
}

function folio(index, title) {
  return `<p class="folio"><span>${title}</span><span>${number(index)}</span></p>`;
}

function titleBlock(kicker, title, text) {
  return `<p class="paper-kicker">${kicker}</p><h3 tabindex="-1">${title}</h3><p class="paper-description">${text}</p>`;
}

function overview(left, right) {
  const { scene, clues } = caseFile;
  left.innerHTML = `${titleBlock("사건 기록 01", scene.title, scene.description)}
    <ol class="clue-index">${clues.map((clue, index) => `<li><button type="button" data-page="${index + 1}">
      <span>${number(index + 1)}</span><span>${clue.action}</span>${icon("next")}</button></li>`).join("")}</ol>
    ${folio(1, "현장 안내")}`;
  const { width, height } = scene.image;
  right.innerHTML = `<div class="scene-map">
    <div class="scene-plane" style="--scene-ratio:${width / height}">
    ${illustration("샘플 녹음실 전체 현장")}
    ${clues.map((clue, index) => `<button class="marker" type="button" data-page="${index + 1}"
      style="--x:${clue.position[0]}%;--y:${clue.position[1]}%" aria-label="${clue.action}">${index + 1}</button>`).join("")}
    </div></div>
    ${artCaption("녹음실 전체")}
    ${folio(2, "현장 도판")}`;
}

function evidence(left, right, page) {
  const clue = caseFile.clues[page - 1];
  left.innerHTML = `${titleBlock(`단서 ${number(page)}`, clue.title, clue.description)}
    ${clue.document ? `<table class="sample-log">
      <caption>출입 기록 양식</caption>
      <thead><tr><th scope="col">시간</th><th scope="col">이름</th><th scope="col">비고</th></tr></thead>
      <tbody><tr><td>—</td><td>—</td><td>—</td></tr><tr><td>—</td><td>—</td><td>—</td></tr></tbody>
    </table>` : ""}
    <button class="text-link plate plate-paper" type="button" data-page="0">${icon("back")} 현장으로 돌아가기</button>
    ${folio(page * 2 + 1, "단서 기록")}`;
  right.innerHTML = `<figure class="evidence-art">${illustration(`${clue.title} 확대 그림`, clue.viewBox)}</figure>
    ${artCaption(`${clue.title} 확대`)}
    ${folio(page * 2 + 2, "단서 도판")}`;
}

function hints(left, right, page) {
  const cards = caseFile.hints.map((hint, index) => {
    const shown = viewedHints.has(index);
    return `<div class="hint-card">
      <button class="hint-trigger" type="button" data-hint="${index}" aria-expanded="${shown}" aria-controls="hint-${index}">${icon("seal")} 힌트 ${index + 1}</button>
      <p id="hint-${index}" aria-hidden="${!shown}">${hint}</p>
    </div>`;
  });
  left.classList.add("hint-page");
  right.classList.add("hint-page");
  left.innerHTML = `${titleBlock("책갈피", "힌트", "카드를 고르고 확인하면 가려진 힌트가 나타납니다.")}
    <div class="hint-grid">${cards.slice(0, 2).join("")}</div>${folio(page * 2 + 1, "힌트 카드")}`;
  right.innerHTML = `<div class="hint-grid">${cards.slice(2).join("")}</div>${folio(page * 2 + 2, "힌트 카드")}`;
}

function solution(left, right, page) {
  const { question, explanation } = caseFile.answer;
  const complete = completedSeconds !== null;
  left.innerHTML = `${titleBlock("연습 문제", "정답", question)}
    ${complete
      ? `<div class="case-result" tabindex="-1"><span>풀이 완료</span>
          <strong>${Math.floor(completedSeconds / 60)}분 ${completedSeconds % 60}초</strong></div>`
      : `<form class="answer-form">
          <label for="case-answer">답안</label>
          <div class="answer-entry">
            <input id="case-answer" name="answer" required maxlength="100" autocomplete="off" aria-describedby="answer-feedback">
            <button class="plate plate-paper" type="submit">정답 확인</button>
          </div>
          <p id="answer-feedback" role="status"></p>
        </form>`}
    <button class="text-link plate plate-paper" type="button" data-page="0">${icon("back")} 현장 다시 보기</button>
    ${folio(page * 2 + 1, "정답")}`;
  right.innerHTML = `<div class="answer-sheet">
      <h4>연습 문제 해설</h4><p>${complete ? explanation : "정답을 맞히면 해설이 열려요."}</p>
    </div>${folio(page * 2 + 2, "사건 해설")}`;
}

function renderPage(page) {
  const layout = spreadTemplate.content.firstElementChild.cloneNode(true);
  const [left, right] = layout.children;
  if (page < hintsPage && caseFile.clues.length) {
    left.classList.add("indexed-paper");
    right.classList.add("indexed-paper");
  }
  if (page === 0) overview(left, right);
  else if (page === hintsPage) hints(left, right, page);
  else if (page === answerPage) solution(left, right, page);
  else evidence(left, right, page);
  return layout;
}

function removeTurns() {
  for (const overlay of book.querySelectorAll(".turn-overlay")) {
    for (const animation of overlay.getAnimations({ subtree: true })) animation.cancel();
    overlay.remove();
  }
}

function castShadow(leaf, direction, options) {
  const cast = document.createElement("div");
  cast.className = direction < 0 ? "turn-cast" : "turn-cast right";
  leaf.before(cast);
  return cast.animate([
    { transform: "scaleX(.07)", opacity: 0 },
    { transform: "scaleX(.3)", opacity: .54, offset: .29 },
    { transform: "scaleX(.91)", opacity: .66, offset: .57 },
    { transform: "scaleX(.36)", opacity: .45, offset: .84 },
    { transform: "scaleX(.14)", opacity: 0 }
  ], options);
}

function swingCover(leaf, duration, reverse) {
  const options = { duration, fill: "both", direction: reverse ? "reverse" : "normal" };
  const poses = [[0,0,0], [.19,0,.16], [.36,25,.28], [.64,110,.82], [.9,174,.28], [1,180,0]];
  const turn = leaf.animate(poses.map(([offset, angle, shade]) => ({
    offset,
    transform: `rotateY(${-angle}deg)`,
    "--leaf-shade": shade,
    easing: "cubic-bezier(.38,.13,.27,.95)"
  })), options);
  return { turn, shadow: castShadow(leaf, -1, options) };
}

function curlPage(leaf, front, back, direction) {
  const count = 11;
  const width = leaf.offsetWidth;
  const step = width / count;
  const liftHeight = Math.min(19, leaf.offsetHeight * .036);
  const keyframes = Array.from({ length: count }, () => []);

  // Integrate the bend from the gutter so adjacent strips keep a shared edge.
  for (let frame = 0; frame <= 34; frame++) {
    const offset = frame / 34;
    const progress = offset * offset * (3 - 2 * offset);
    const lift = Math.sin(Math.PI * offset) ** 1.2;
    let x = 0;
    let z = 0;
    for (let i = 0; i < count; i++) {
      const across = (i + .5) / count;
      const angle = Math.max(0, Math.min(Math.PI, Math.PI * progress + (across - .4) * 1.52 * lift));
      const y = -liftHeight * lift * (i / count) ** 2;
      const slope = direction * liftHeight * lift * (2 * i + 1) / (count * count * step);
      keyframes[i].push({
        offset,
        transform: `translate3d(${x}px,${y}px,${z}px) rotateY(${direction * angle}rad) skewY(${Math.atan(slope)}rad)`,
        "--curl-shadow": .66 * lift * Math.sin(angle) * (1 - .35 * across)
      });
      x -= direction * step * Math.cos(angle);
      z += step * Math.sin(angle);
    }
  }

  const face = (page, index, reverse = false) => {
    const pane = document.createElement("div");
    pane.className = reverse ? "curl-face curl-back" : "curl-face";
    const art = page.cloneNode(true);
    for (const element of art.querySelectorAll("[id]")) element.removeAttribute("id");
    art.style.width = `${width}px`;
    art.style.left = `${-index * step}px`;
    pane.append(art);
    return pane;
  };
  const options = { duration: 655, fill: "both" };
  leaf.classList.add(direction < 0 ? "curl-from-right" : "curl-from-left");
  const movements = keyframes.map((frames, i) => {
    const panel = document.createElement("div");
    panel.className = "curl-strip";
    panel.style.width = `${step + (direction < 0 ? (i < count - 1 ? .55 : 0) : (i > 0 ? .55 : 0))}px`;
    const frontIndex = direction < 0 ? i : count - 1 - i;
    panel.append(face(front, frontIndex), face(back, count - 1 - frontIndex, true));
    leaf.append(panel);
    return panel.animate(frames, options);
  });
  const shadow = castShadow(leaf, direction, options);
  movements[0].onfinish = () => {
    shadow.cancel();
    leaf.parentElement?.remove();
  };
}

function turnPage(outgoing, incoming, forward) {
  if (motionPreference.matches) return;
  const stacked = stackedPages.matches;
  const side = forward && !stacked ? 1 : 0;
  const overlay = document.createElement("div");
  const leaf = document.createElement("div");
  overlay.className = "turn-overlay";
  overlay.inert = true;
  overlay.setAttribute("aria-hidden", "true");
  leaf.className = `turn-leaf paper-turn ${forward ? "turn-right" : "turn-left"}`;
  if (stacked) {
    overlay.style.height = `${incoming.children[0].offsetHeight}px`;
  } else {
    const stationary = outgoing.children[1 - side].cloneNode(true);
    stationary.classList.add("turn-still", forward ? "turn-left" : "turn-right");
    overlay.append(stationary);
  }
  overlay.append(leaf);
  for (const element of overlay.querySelectorAll("[id]")) element.removeAttribute("id");
  book.append(overlay);
  curlPage(leaf, outgoing.children[side], incoming.children[stacked ? 0 : 1 - side], forward ? -1 : 1);
}

function updateNavigation() {
  pageCount.textContent = activePage === overviewPage ? "사건 개요" : `${activePage + 1} / ${lastPage + 1} 펼침면`;
  for (const button of reader.querySelectorAll("[data-step]")) {
    const destination = activePage + Number(button.dataset.step);
    button.disabled = destination < overviewPage || destination > lastPage;
  }
  clueTabs.hidden = !caseFile.clues.length || activePage >= hintsPage;
  for (const button of reader.querySelectorAll(":is(.bookmarks, .clue-tabs) [data-page]")) {
    if (Number(button.dataset.page) === Math.max(0, activePage)) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
  const activeTab = clueTabs.children[activePage - 1];
  if (activeTab) {
    const top = activeTab.offsetTop;
    const bottom = top + activeTab.offsetHeight;
    clueTabs.scrollTop = Math.min(top, Math.max(clueTabs.scrollTop, bottom - clueTabs.clientHeight));
  } else if (!clueTabs.hidden) clueTabs.scrollTop = 0;
}

function setReadingLayout(reading) {
  const before = book.getBoundingClientRect();
  readerZoom?.cancel();
  desk.classList.toggle("is-reading", reading);
  window.scrollTo(0, 0);
  if (motionPreference.matches) return;

  const after = book.getBoundingClientRect();
  const x = before.left + before.width / 2 - (after.left + after.width / 2);
  const y = Math.max(0, before.top) - after.top;
  const scaleX = before.width / after.width;
  const scaleY = stackedPages.matches ? scaleX : before.height / after.height;
  const zoom = book.animate([
    { transform: `translate(${x}px,${y}px) scale(${scaleX},${scaleY})`, transformOrigin: "center top" },
    { transform: "none", transformOrigin: "center top" }
  ], { duration: reading ? 655 : 520, easing: "cubic-bezier(.25,.68,.23,1)" });
  readerZoom = zoom;
  zoom.onfinish = () => { if (readerZoom === zoom) readerZoom = undefined; };
  return zoom;
}

function showPage(page, animate = true) {
  if (page < overviewPage || page > lastPage || (page === activePage && spread.hasChildNodes())) return;
  removeTurns();
  const outgoing = spread.firstElementChild;
  const reading = page !== overviewPage;
  if (animate && outgoing && reading !== desk.classList.contains("is-reading")) setReadingLayout(reading);
  const contentPage = Math.max(0, page);
  const pageChanged = !outgoing || contentPage !== Math.max(0, activePage);
  let incoming = outgoing;
  if (pageChanged) {
    incoming = renderPage(contentPage);
    spread.replaceChildren(incoming);
    if (animate && outgoing) turnPage(outgoing, incoming, page > activePage);
  }
  activePage = page;
  updateNavigation();
  incoming.querySelector("h3").focus({ preventScroll: true });
}

function showStage(stage) {
  if (stage !== "closed" && hintConfirm.open) hintConfirm.close("no");
  if (stage === "shelf") viewedHints.clear();
  entrance.hidden = stage !== "entrance";
  library.hidden = stage !== "shelf";
  desk.hidden = stage !== "closed";
  exitButton.hidden = stage !== "shelf";
  returnButton.hidden = stage !== "closed";
  setAttemptClock(stage === "closed" && !openButton.disabled);
  window.scrollTo(0, 0);
}

function copyScene(view, className) {
  const echo = view.cloneNode(true);
  echo.classList.add(className);
  echo.setAttribute("aria-hidden", "true");
  echo.inert = true;
  echo.removeAttribute("id");
  for (const element of echo.querySelectorAll("[id]")) element.removeAttribute("id");
  echo.style.top = `${view.getBoundingClientRect().top}px`;
  document.body.append(echo);
  return echo;
}

async function enterArchive() {
  if (motionPreference.matches) {
    showStage("shelf");
    return;
  }

  const scene = entrance.querySelector(".archive-scene");
  const { left, top, width, height } = scene.getBoundingClientRect();
  const frame = scene.querySelector(".archive-shot").getBoundingClientRect();
  const lightLevel = getComputedStyle(scene.querySelector(".archive-presence")).opacity;
  const aimX = Math.max(width * .45, Math.min(width * .83, frame.left - left + frame.width * .855));
  const aimY = frame.top - top + frame.height * .53;
  const dx = width * .54 - aimX;
  const dy = height * .49 - aimY;
  const echo = copyScene(entrance, "entrance-echo");
  const closeup = echo.querySelector(".archive-scene");
  Object.assign(closeup.querySelector(".archive-presence").style, { animation: "none", opacity: lightLevel });
  closeup.style.transformOrigin = `${aimX}px ${aimY}px`;
  library.inert = true;
  showStage("shelf");
  const options = { duration: 920, fill: "both", easing: "cubic-bezier(.44,.07,.22,1)" };
  const camera = closeup.animate([
    { transform: "translate(0,0) scale(1)", filter: "brightness(1)" },
    { transform: `translate(${dx * .29}px,${dy * .25}px) scale(1.24)`, filter: "brightness(1)", offset: .34 },
    { transform: `translate(${dx}px,${dy}px) scale(3.55)`, filter: "brightness(.65) blur(2px)" }
  ], options);
  const title = echo.querySelector(".entrance-content").animate([
    { opacity: 1 }, { opacity: 0, offset: .49 }, { opacity: 0 }
  ], options);
  const cut = echo.animate([{ opacity: 1 }, { opacity: 1, offset: .55 }, { opacity: 0 }], options);
  const arrival = library.querySelector(".library-scene").animate([
    { transform: "scale(1.1)", filter: "brightness(.64)", offset: .38 },
    { transform: "scale(1)", filter: "brightness(1)" }
  ], options);
  try {
    await camera.finished;
  } finally {
    for (const animation of [camera, title, cut, arrival]) animation.cancel();
    echo.remove();
    library.inert = false;
  }
}

function setDeskRecord(index) {
  deskRecord = index;
  const playable = index === 0;
  deskTitle.textContent = records[index].querySelector(".spine-title").textContent;
  deskVolume.querySelector(".cover").replaceWith(jackets[index].cloneNode(true));
  deskVolume.querySelector(".book-spine").replaceChildren(records[index].querySelector(".shelf-spine").cloneNode(true));
  deskVolume.classList.toggle("preview-volume", !playable);
  previewLabel.hidden = playable;
  openLabel.hidden = !playable;
  openButton.disabled = !playable;
  openButton.setAttribute("aria-label", playable ? openLabel.textContent.trim() : `${deskTitle.textContent} 표지`);
}

async function travel(toDesk) {
  const destination = toDesk ? "closed" : "shelf";
  if (motionPreference.matches) {
    showStage(destination);
    return;
  }

  const spine = records[deskRecord].querySelector(".shelf-spine");
  const readShelf = () => {
    const style = getComputedStyle(spine);
    const matrix = new DOMMatrix(style.transform);
    return {
      rect: spine.getBoundingClientRect(),
      height: spine.offsetHeight,
      angle: Math.atan2(matrix.b, matrix.a),
      filter: style.filter
    };
  };
  const readDesk = () => {
    const style = getComputedStyle(deskVolume);
    const { left, top, width } = openButton.getBoundingClientRect();
    return { left, top, width, height: parseFloat(style.height), tilt: style.getPropertyValue("--desk-tilt").trim() };
  };
  const origin = toDesk ? readShelf() : readDesk();
  const echo = copyScene(toDesk ? library : desk, "stage-echo");
  echo.querySelector(toDesk ? `[data-record="${deskRecord}"]` : ".desk-jacket").style.visibility = "hidden";
  desk.classList.add("is-carrying");
  showStage(destination);
  const { rect, height: spineHeight, angle, filter } = toDesk ? origin : readShelf();
  const { left, top, width, height, tilt } = toDesk ? readDesk() : origin;
  const arriving = toDesk ? deskVolume : spine;

  const carrier = document.createElement("div");
  carrier.className = "flying-volume";
  carrier.setAttribute("aria-hidden", "true");
  Object.assign(carrier.style, {
    left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px`
  });
  const replica = deskVolume.cloneNode(true);
  const spineFace = replica.querySelector(".shelf-spine");
  spineFace.style.filter = filter;
  carrier.append(replica);
  document.body.append(carrier);

  const zoom = amount => `scale3d(${amount},${amount},${amount})`;
  const shelfPose = scale => `rotateZ(${angle}rad) rotateX(0deg) rotateY(90deg) ${zoom(scale)}`;
  // The side facing the camera is half a cover-width in front of the rotation axis.
  const perspective = parseFloat(getComputedStyle(carrier).perspective);
  const scale = spineHeight / (height + spineHeight * width / (2 * perspective));
  replica.style.transform = shelfPose(scale);
  const projection = spineFace.getBoundingClientRect();
  const x = rect.left - projection.left + (rect.width - projection.width) / 2;
  const y = rect.top - projection.top + (rect.height - projection.height) / 2;
  const lift = Math.min(27, rect.height * .12);
  arriving.style.visibility = "hidden";

  const options = { duration: 1050, fill: "both", direction: toDesk ? "normal" : "reverse" };
  const path = carrier.animate([
    { transform: `translate(${x}px,${y}px)`, easing: "cubic-bezier(.37,.04,.32,1)" },
    { transform: `translate(${x * .93 + 5}px,${y * .93 - lift}px)`, offset: .23, easing: "cubic-bezier(.37,.23,.33,1)" },
    { transform: `translate(${x * .19}px,${y * .2 - lift * .84}px)`, offset: .73, easing: "cubic-bezier(.19,.62,.31,1)" },
    { transform: "translate(0,0)" }
  ], options);
  const turn = replica.animate([
    { transform: shelfPose(scale), easing: "cubic-bezier(.4,.05,.28,1)" },
    { transform: `rotateZ(${angle / 2}rad) rotateX(0deg) rotateY(86deg) ${zoom(scale)}`, offset: .23, easing: "cubic-bezier(.43,.1,.31,1)" },
    { transform: `rotateZ(0rad) rotateX(13deg) rotateY(14deg) ${zoom(scale + (1 - scale) * .84)}`, offset: .73, easing: "cubic-bezier(.2,.7,.32,1)" },
    { transform: `rotateZ(0rad) rotateX(${tilt}) rotateY(0deg) ${zoom(1)}` }
  ], options);
  const bindingLight = spineFace.animate([
    { filter }, { filter: "brightness(1)", offset: .65 }, { filter: "brightness(1)" }
  ], options);
  const background = echo.animate([
    { opacity: 1 }, { opacity: 1, offset: .21 }, { opacity: 0, offset: .86 }, { opacity: 0 }
  ], { ...options, direction: "normal", easing: "ease-in-out" });

  try {
    await path.finished;
  } finally {
    for (const animation of [path, turn, bindingLight, background]) animation.cancel();
    echo.remove();
    carrier.remove();
    arriving.style.visibility = "";
    desk.classList.remove("is-carrying");
  }
}

async function foldBook(opening) {
  const reduced = motionPreference.matches;
  if (!opening && hintConfirm.open) hintConfirm.close("no");
  window.scrollTo(0, 0);
  removeTurns();

  if (!opening && desk.classList.contains("is-reading")) {
    reader.inert = true;
    await setReadingLayout(false)?.finished;
    reader.inert = false;
  }

  if (opening) {
    closedBook.classList.add("under-reader");
    desk.classList.add("is-open");
    reader.hidden = false;
    showPage(overviewPage, false);
  }

  const anchor = deskVolume.querySelector(".cover").getBoundingClientRect();
  const anchorWidth = deskVolume.offsetWidth;
  const anchorHeight = deskVolume.offsetHeight;
  if (!reduced) {
    const stacked = stackedPages.matches;
    const target = spread.querySelector(stacked ? ".paper-left" : ".paper-right").getBoundingClientRect();
    const bookRect = book.getBoundingClientRect();
    const originX = target.left + target.width / 2;
    const originY = target.top + target.height / 2;
    const x = anchor.left + anchor.width / 2 - originX;
    const y = anchor.top + anchor.height / 2 - originY;
    const cover = deskVolume.querySelector(".cover").cloneNode(true);
    for (const label of [".cover-index", ".cover-name", ".cover-brand"]) {
      const size = parseFloat(getComputedStyle(deskVolume.querySelector(label)).fontSize);
      cover.querySelector(label).style.fontSize = `${size * target.width / anchorWidth}px`;
    }
    const inside = spread.querySelector(".paper-left").cloneNode(true);
    const overlay = document.createElement("div");
    const leaf = document.createElement("div");
    overlay.className = "turn-overlay opening-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.inert = true;
    leaf.className = "turn-leaf turn-right";
    cover.classList.add("turn-front");
    inside.classList.add("turn-back");
    for (const element of inside.querySelectorAll("[id]")) element.removeAttribute("id");
    if (stacked) overlay.style.height = `${target.height}px`;
    leaf.append(cover, inside);
    overlay.append(leaf);
    book.append(overlay);
    reader.inert = true;
    reader.classList.add("is-folding");
    book.style.transformOrigin = `${originX - bookRect.left}px ${originY - bookRect.top}px`;
    const duration = 790;
    const clip = stacked ? 100 * (1 - target.height / spread.offsetHeight) : 50;
    const poseAtRest = getComputedStyle(deskVolume).getPropertyValue("--desk-pose").trim();
    const rest = "translate(0,0) rotateX(0deg) rotateY(0deg) scale(1,1)";
    const aligned = `translate(0,0) rotateX(0deg) rotateY(0deg) scale(${anchorWidth / target.width},${anchorHeight / target.height})`;
    const pose = book.animate([
      { transform: `translate(${x}px,${y}px) ${poseAtRest} scale(${anchorWidth / target.width},${anchorHeight / target.height})`, "--binding-cut": `${clip}%`, easing: "cubic-bezier(.24,.58,.3,1)" },
      { transform: aligned, "--binding-cut": `${clip}%`, offset: .28, easing: "cubic-bezier(.37,.12,.19,1)" },
      { transform: rest, "--binding-cut": stacked ? "0%" : "50%", offset: .69 },
      { transform: rest, "--binding-cut": stacked ? "0%" : "50%", offset: .9 },
      { transform: rest, "--binding-cut": "0%", offset: .985 },
      { transform: rest, "--binding-cut": "0%" }
    ], { duration, fill: "both", direction: opening ? "normal" : "reverse" });
    const { turn, shadow } = swingCover(leaf, duration, !opening);
    try {
      await turn.finished;
    } finally {
      pose.cancel();
      turn.cancel();
      shadow.cancel();
      overlay.remove();
      book.style.transformOrigin = "";
      reader.classList.remove("is-folding");
      reader.inert = false;
    }
  }

  if (opening) {
    spread.querySelector("h3").focus({ preventScroll: true });
  } else {
    reader.hidden = true;
    desk.classList.remove("is-open");
    closedBook.classList.remove("under-reader");
    spread.replaceChildren();
    if (desiredState === "closed") openButton.focus({ preventScroll: true });
  }
}

async function goTo(state) {
  desiredState = state;
  if (moving) return;
  moving = true;
  try {
    while (bookState !== desiredState || (bookState === "closed" && deskRecord !== desiredRecord)) {
      if (bookState === "entrance" || (bookState === "shelf" && desiredState === "entrance")) {
        const toShelf = bookState === "entrance";
        if (toShelf) await enterArchive();
        else showStage("entrance");
        bookState = toShelf ? "shelf" : "entrance";
        if (desiredState === bookState) {
          (toShelf ? shelfTitle : enterButton).focus({ preventScroll: true });
        }
      } else if (bookState === "shelf") {
        selectRecord(desiredRecord);
        setDeskRecord(desiredRecord);
        await travel(true);
        bookState = "closed";
        if (desiredState === "closed" && deskRecord === desiredRecord) {
          (openButton.disabled ? deskTitle : openButton).focus({ preventScroll: true });
        }
      } else if (bookState === "open") {
        await foldBook(false);
        bookState = "closed";
      } else if (desiredState === "open" && deskRecord === desiredRecord) {
        await foldBook(true);
        bookState = "open";
      } else {
        await travel(false);
        bookState = "shelf";
        if (desiredState === "shelf") {
          records[deskRecord].focus({ preventScroll: true });
        }
      }
    }
  } finally {
    moving = false;
  }
}

const catalogue = ["읽을 사건 기록을 골라보세요.", "책등을 누르면 표지를 볼 수 있어요."];
const shelfSteps = library.querySelectorAll("[data-shelf-step]");
const caption = library.querySelector(".shelf-caption");
const shelfBooks = library.querySelector(".shelf-books");
let selectedRecord = 0;
let pointerStart;
let suppressClickUntil = 0;

function selectRecord(index) {
  if (!catalogue[index] || index === selectedRecord) return;
  selectedRecord = index;
  for (const [i, record] of records.entries()) {
    record.closest(".shelf-slot").classList.toggle("is-active", i === index);
  }
  shelfSteps[0].disabled = index === 0;
  shelfSteps[1].disabled = index === catalogue.length - 1;
  caption.textContent = catalogue[index];
}

shelfBooks.addEventListener("pointerdown", event => {
  pointerStart = event.isPrimary ? [event.clientX, event.clientY] : undefined;
});
shelfBooks.addEventListener("pointercancel", () => { pointerStart = undefined; });
shelfBooks.addEventListener("pointerup", event => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart[0];
  const dy = event.clientY - pointerStart[1];
  pointerStart = undefined;
  if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy) * 1.35) {
    suppressClickUntil = performance.now() + 170;
    selectRecord(selectedRecord - Math.sign(dx));
  }
});
shelfBooks.addEventListener("click", event => {
  if (performance.now() < suppressClickUntil) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

for (const step of shelfSteps) {
  step.addEventListener("click", () => selectRecord(selectedRecord + Number(step.dataset.shelfStep)));
}
document.addEventListener("keydown", event => {
  if (bookState !== "shelf" || moving || event.altKey || event.metaKey || event.ctrlKey) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    selectRecord(selectedRecord + (event.key === "ArrowRight" ? 1 : -1));
  }
});

for (const [index, record] of records.entries()) {
  record.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    desiredRecord = index;
    history.pushState(null, "", record.hash);
    goTo("closed");
  });
}
enterButton.addEventListener("click", event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  history.pushState(null, "", "#investigation");
  goTo("shelf");
});
exitButton.addEventListener("click", () => {
  history.pushState(null, "", location.pathname + location.search);
  goTo("entrance");
});
returnButton.addEventListener("click", () => {
  history.pushState(null, "", "#investigation");
  goTo("shelf");
});
window.addEventListener("hashchange", () => {
  const index = recordFromHash();
  if (index >= 0) {
    desiredRecord = index;
    goTo("closed");
  } else {
    goTo(location.hash === "#investigation" ? "shelf" : "entrance");
  }
});
openButton.addEventListener("click", () => goTo("open"));
closeButton.addEventListener("click", () => goTo("closed"));

reader.querySelector('[data-bookmark="hints"]').dataset.page = hintsPage;
reader.querySelector('[data-bookmark="answer"]').dataset.page = answerPage;
clueTabs.innerHTML = caseFile.clues.map((clue, index) => {
  const page = index + 1;
  return `<button class="plate" type="button" data-page="${page}" aria-label="단서 ${page} ${clue.title}" title="${clue.title}">${page}</button>`;
}).join("");
reader.addEventListener("click", event => {
  const button = event.target.closest("button") ?? event.target.closest(".hint-card")?.querySelector(".hint-trigger");
  if (!button) return;
  if (button.hasAttribute("data-page")) {
    showPage(Number(button.dataset.page));
  } else if (button.hasAttribute("data-step")) {
    showPage(activePage + Number(button.dataset.step));
  } else if (button.hasAttribute("data-hint")) {
    const index = Number(button.dataset.hint);
    if (viewedHints.has(index) || hintConfirm.open) return;
    selectedHint = index;
    hintQuestion.textContent = `힌트 ${index + 1}번을 확인하시겠습니까?`;
    hintConfirm.showModal();
  } else if (button.hasAttribute("data-zoom")) {
    const art = button.closest(".paper").querySelector(".illustration");
    viewer.querySelector("h2").textContent = art.getAttribute("aria-label");
    viewer.querySelector(".viewer-art").replaceChildren(art.cloneNode(true));
    viewer.showModal();
  } else if (button.hasAttribute("data-download")) {
    void saveIllustration(button.closest(".paper"));
  }
});

spread.addEventListener("submit", event => {
  const form = event.target;
  if (!form.matches(".answer-form")) return;
  event.preventDefault();
  const input = form.elements.answer;
  const entry = normalizeAnswer(input.value);
  if (!caseFile.answer.accepted.some(answer => normalizeAnswer(answer) === entry)) {
    form.querySelector("#answer-feedback").textContent = "아직 정답이 아니에요. 단서를 다시 확인해 보세요.";
    input.select();
    return;
  }
  completedSeconds = elapsedSeconds();
  clearInterval(clockInterval);
  caseClock.setAttribute("data-complete", "");
  caseClock.setAttribute("aria-label", "최종 풀이 시간");
  updateClock();
  spread.replaceChildren(renderPage(answerPage));
  spread.querySelector(".case-result").focus();
});

hintConfirm.querySelector("form").addEventListener("submit", event => {
  if (event.submitter?.value !== "yes") return;
  const button = spread.querySelector(`.hint-trigger[data-hint="${selectedHint}"]`);
  if (!button) return;
  viewedHints.add(selectedHint);
  button.setAttribute("aria-expanded", "true");
  document.getElementById(button.getAttribute("aria-controls")).setAttribute("aria-hidden", "false");
});

viewer.querySelector("[data-download]").addEventListener("click", () => void saveIllustration(viewer));
viewer.addEventListener("close", () => {
  viewer.querySelector(".viewer-art").replaceChildren();
  viewer.querySelector(".download-status").textContent = "";
});
if (bookState === "closed") setDeskRecord(desiredRecord);
showStage(bookState);
