import { caseFile } from "./case-data.js?v=solution-time";
import { alpineLodge } from "./alpine-lodge/case-data.js?v=alpine-answer-video";

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
const deskVolume = desk.querySelector(".desk-volume");
const jackets = [deskVolume.querySelector(".cover"), document.querySelector("#preview-cover").content.firstElementChild];
const closeButton = document.querySelector(".close-book");
const reader = document.querySelector(".reader");
const book = document.querySelector(".book");
const spread = document.querySelector(".spread");
const clueTabs = document.querySelector(".clue-tabs");
const spreadTemplate = document.querySelector("#spread-template");
const pageCount = document.querySelector("#page-count");
const recordLock = document.querySelector(".record-lock");
const recordLockForm = recordLock.querySelector("form");
const recordPasscode = recordLockForm.querySelector("input");
const recordLockError = recordLockForm.querySelector(".record-lock-error");
const viewer = document.querySelector(".viewer");
const viewerDownload = viewer.querySelector("[data-download]");
const viewerArt = viewer.querySelector(".viewer-art");
const viewerScale = viewer.querySelector("[data-art-scale]");
const hintConfirm = document.querySelector(".hint-confirm");
const hintQuestion = document.querySelector("#hint-question");
const answerConfirm = document.querySelector(".answer-confirm");
const suspectPicker = document.querySelector(".suspect-picker");
const suspectForm = suspectPicker.querySelector("form");
const suspectLineup = suspectForm.querySelector(".suspect-lineup");
const suspectSubmit = suspectForm.querySelector('button[type="submit"]');
const suspectStatus = suspectForm.querySelector(".suspect-status");
const submissionConfirm = document.querySelector(".submission-confirm");
const soundSettings = document.querySelector(".audio-options");
const volumeControl = soundSettings.querySelector("#bgm-volume");
const volumeOutput = soundSettings.querySelector("output");
const trackControl = soundSettings.querySelector("#bgm-track");
const trackCredit = soundSettings.querySelector(".track-credit");
const trackEditNote = soundSettings.querySelector(".track-edit-note");
const audioStatus = soundSettings.querySelector(".audio-status");
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
const stackedPages = matchMedia("(max-width: 760px)");

function investigationFor(file) {
  let clueCount = 0;
  const sheets = file.clues.map((clue, index) => ({
    ...clue,
    sheetIndex: index + 1,
    clueNumber: clue.map ? null : ++clueCount
  }));
  const sceneLinks = sheets.filter(clue => clue.action);
  return {
    file,
    sheets,
    sceneLinks,
    clueLinks: sceneLinks.filter(clue => clue.clueNumber),
    evidencePages: Math.ceil(sheets.length / 2)
  };
}

const investigations = [investigationFor(caseFile), investigationFor(alpineLodge)];
let investigation = investigations[0];
const hintsPage = () => investigation.evidencePages + 1;
const answerPage = () => hintsPage() + 1;
const overviewPage = -1;
const lockedRecord = 1;
const recordPin = "0416";
const viewedHints = new Set();
let activePage = overviewPage;
let activeClue;
const recordFromHash = () => records.findIndex(record => record.hash === location.hash);
const initialRecord = recordFromHash();
let desiredRecord = Math.max(0, initialRecord);
let deskRecord = 0;
let bookState = initialRecord === lockedRecord || location.hash === "#investigation" ? "shelf"
  : initialRecord >= 0 ? "closed" : "entrance";
let desiredState = bookState;
let moving = false;
let readerZoom;
let selectedHint;
let attemptStartedAt;
let completedSeconds = null;
let submittedSuspect;
let clockInterval;
let audioContext, musicGain, pendingMusic, activeMusic;

const number = value => String(value).padStart(2, "0");
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const elapsedSeconds = () => Math.floor((performance.now() - attemptStartedAt) / 1000);
const durationParts = seconds => [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];
const suspectLabel = suspect => `${investigation.file.suspects.indexOf(suspect) + 1}번 용의자`;
const clueSpread = clue => Math.ceil(clue / 2);
const backgroundVolume = () => spread.querySelector(".solution-youtube") ||
  spread.querySelector(".solution-video")?.paused === false ? 0 : volumeControl.valueAsNumber / 100;

function updateClock() {
  const seconds = completedSeconds ?? elapsedSeconds();
  caseClockValue.textContent = durationParts(seconds).map(number).join(":");
}

function setAttemptClock(active) {
  clearInterval(clockInterval);
  completedSeconds = null;
  submittedSuspect = undefined;
  suspectForm.reset();
  updateSuspectSelection();
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
  musicGain?.gain.setTargetAtTime(backgroundVolume(), audioContext.currentTime, .035);
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
      musicGain.gain.value = backgroundVolume();
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

function illustration(title, image) {
  return `<img class="illustration" src="${image}" alt="${title}" width="1600" height="1280" decoding="async">`;
}

function sheetHeading(title, image, { clueNumber, map } = {}) {
  const extension = image.split("?")[0].split(".").at(-1);
  const filename = `Traces-of-Guilt_${title.replaceAll(" ", "-")}.${extension}`;
  return `<header class="sheet-heading">
    ${clueNumber ? `<span class="sheet-number" aria-hidden="true">${number(clueNumber)}</span>` : ""}
    <h3 tabindex="-1">${title}</h3>
    ${map ? '<span class="sheet-location">조사 장소</span>' : ""}
    <div class="art-controls sheet-actions">
      <button type="button" data-zoom aria-haspopup="dialog" aria-label="전체 화면" title="전체 화면">${icon("zoom")} <span>확대</span></button>
      <a href="${image}" download="${filename}" data-download aria-label="이미지 저장" title="이미지 저장">${icon("download")} <span>저장</span></a>
    </div></header>`;
}

function sceneArt(title, image, location) {
  const markers = investigation.sceneLinks.filter(clue => clue.location === location && clue.position);
  return `<div class="art-window"><figure class="art-board scene-map">
      <div class="scene-plane">
        ${illustration(title, image)}
        ${markers.map(clue => `<button class="marker${clue.map ? " marker-location" : ""}" type="button" data-clue="${clue.sheetIndex}" data-align="${clue.align ?? "start"}"
          style="--x:${clue.position[0]}%;--y:${clue.position[1]}%;
            ${clue.compactPosition ? `--compact-x:${clue.compactPosition[0]}%;--compact-y:${clue.compactPosition[1]}%` : ""}"
          aria-label="${clue.clueNumber ? `${clue.clueNumber}. ` : ""}${clue.action}">
          ${clue.clueNumber ? `<span class="marker-number">${clue.clueNumber}</span>` : ""}
          <span class="marker-label">${clue.action}</span><span class="marker-short">${clue.mapLabel ?? clue.action}</span>
        </button>`).join("")}
      </div>
    </figure></div>`;
}

function overview(left, right) {
  const { file: { title, scene }, clueLinks } = investigation;
  left.classList.add("case-intro");
  right.classList.add("art-page");
  left.innerHTML = `<div class="case-intro-content">
    <p class="paper-kicker">${scene.period}</p>
    <h3 tabindex="-1">${title}</h3>
    ${scene.description.map(paragraph => `<p class="paper-description">${paragraph}</p>`).join("")}
    <p class="case-objective">${scene.objective}</p>
    <details class="overview-index"><summary>단서 목록</summary>
      <ol class="clue-index">${clueLinks.map(({ sheetIndex, clueNumber, action }) => `<li><button type="button" data-clue="${sheetIndex}">
        <span>${number(clueNumber)}</span><span>${action}</span></button></li>`).join("")}</ol>
    </details></div>`;
  right.innerHTML = `${sheetHeading(scene.title, scene.image)}
    ${sceneArt(`${scene.title} 사건 현장`, scene.image)}`;
}

function evidence(paper, index) {
  const clue = investigation.sheets[index - 1];
  if (!clue) return;
  paper.classList.add("art-page");
  paper.dataset.clue = index;
  const art = clue.map
    ? sceneArt(clue.title, clue.image, clue.map)
    : `<div class="art-window"><figure class="art-board">${illustration(clue.title, clue.image)}</figure></div>`;
  paper.innerHTML = `${sheetHeading(clue.title, clue.image, clue)}${art}`;
}

function hints(left, right) {
  const cards = investigation.file.hints.map((hint, index) => {
    const shown = viewedHints.has(index);
    return `<div class="hint-card">
      <button class="hint-trigger" type="button" data-hint="${index}" aria-expanded="${shown}" aria-controls="hint-${index}">${icon("seal")} 힌트 ${index + 1}</button>
      <p id="hint-${index}" aria-hidden="${!shown}">${hint}</p>
    </div>`;
  });
  left.classList.add("hint-page");
  right.classList.add("hint-page");
  left.innerHTML = `<h3 tabindex="-1">힌트</h3><div class="hint-grid">${cards.slice(0, 2).join("")}</div>`;
  right.innerHTML = `<div class="hint-grid">${cards.slice(2).join("")}</div>`;
}

function cipherTable(rows, title, filled) {
  const directions = [["north", "위"], ["east", "오른쪽"], ["south", "아래"], ["west", "왼쪽"]];
  const shapeNames = { square: "사각형", triangle: "삼각형", diamond: "마름모", circle: "원" };
  const baseLetters = new Map(rows.filter(([, dots]) => dots === 1).map(([shape, , letters]) => [shape, letters]));
  return `<table class="cipher-table">
    <caption>${title}</caption>
    <thead><tr><th scope="col">도형 · 점</th>${directions.map(([, label]) => `<th scope="col">${label}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(([shape, dots, letters]) => `<tr data-dots="${dots}">
      <th scope="row">${shapeNames[shape]} <span>점 ${dots}개</span></th>
      ${[...letters].map((letter, index) => letter === "-" ? '<td aria-label="미배정">–</td>' : `<td>
        <span class="cipher-match">
          <span class="cipher-glyph" data-shape="${shape}" data-direction="${directions[index][0]}" data-filled="${filled}" aria-hidden="true">
            <span class="cipher-shape"></span><span class="cipher-dots"><i></i>${dots === 2 ? "<i></i>" : ""}</span>
          </span>
          <span class="cipher-letter">${dots === 2 ? `<span class="cipher-base">${baseLetters.get(shape)[index]} → </span>` : ""}${letter}</span>
        </span>
      </td>`).join("")}
    </tr>`).join("")}</tbody>
  </table>`;
}

function cipherGuide(cipher) {
  return `<p>빈 도형은 자음, 검게 채운 도형은 모음이에요. 점의 위치와 개수로 자모를 구별해요. 짧은 세로선은 음절을 나누고, 넓은 여백은 어절을 나눠요.</p>
    <p>자음에서 <strong>점 두 개</strong>는 ㄱ에서 ㄲ으로 바뀌는 것처럼 쌍자음을 뜻해요. 모음에서는 ㅏ에 ㅣ가 붙어 ㅐ가 되는 것처럼, 기본 모음에 세로획 ㅣ가 붙으면 같은 도형의 같은 방향에 점을 하나 더 찍어요.</p>
    <div class="cipher-tables">
      ${cipherTable(cipher.consonants, "자음 · 빈 도형", false)}
      ${cipherTable(cipher.vowels, "모음 · 검은 도형", true)}
    </div>`;
}

function solutionCast(suspects, culpritId) {
  return `<section class="solution-cast" aria-labelledby="solution-cast">
        <h4 id="solution-cast">용의자 인물표</h4>
        <ol class="solution-cast-list">${suspects.map((suspect, index) => `<li>
          <div class="solution-portrait">
            <div class="solution-portrait-label">
              <span class="solution-cast-number" aria-hidden="true">${index + 1}</span>
              ${suspect.id === culpritId ? '<span class="solution-culprit">살인자</span>' : ""}
            </div>
            <img src="${suspect.portrait}" alt="" loading="lazy" decoding="async">
          </div>
          <h5>${suspect.name}</h5>
          <p>${suspect.role}</p>
          ${suspect.relationship ? `<p class="solution-cast-relationship">${suspect.relationship}</p>` : ""}
        </li>`).join("")}</ol>
      </section>`;
}

function solutionImage({ image, alt = "", label, frame, imageRatio = 1.25, underlines = [], circles = [] }, title) {
  const [left, top, width, height] = frame ?? [0, 0, 100, 100];
  const cropRatio = imageRatio * width / height;
  const crop = frame
    ? ` style="--panel-width:${Math.min(100, 100 * cropRatio / 1.5)}%;--panel-height:${Math.min(100, 150 / cropRatio)}%;--image-width:${10000 / width}%;--image-height:${10000 / height}%;--image-left:${-100 * left / width}%;--image-top:${-100 * top / height}%"`
    : "";
  const marks = underlines.length || circles.length ? `<svg class="solution-image-marks" viewBox="${left} ${top} ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      ${underlines.map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`).join("")}
      ${circles.map(([cx, cy, rx, ry]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`).join("")}
    </svg>` : "";
  const art = `<img class="illustration" src="${image}" alt="${alt}" loading="lazy" decoding="async">${marks}`;
  return `<button class="solution-step-image${frame ? " solution-framed-image" : ""}" type="button" data-zoom aria-haspopup="dialog" aria-label="${frame ? `${alt} 원본 보기` : `${title} 단서 이미지 확대`}"${crop}>
    ${frame ? `<span class="solution-image-panel">${art}</span>` : art}
    ${label ? `<span class="solution-step-label" aria-hidden="true">${label}</span>` : ""}
    <span class="solution-step-zoom">${icon("zoom")}</span>
  </button>`;
}

function solution(layout) {
  const { suspects, answer } = investigation.file;
  const { practice, suspectId, video, cipher, stepsTitle = "장면별 해설", steps = [], story = [], storyImage } = answer;
  const youtubeId = /^[\w-]{11}$/.test(video?.youtubeId ?? "") ? video.youtubeId : null;
  const hasVideo = youtubeId || video?.src || video?.poster;
  const videoTitle = video?.title ?? "사건 재구성 영상";
  const successful = submittedSuspect.id === suspectId;
  const verdict = `${practice ? "시연 지목" : "범인 검거"} ${successful ? "성공" : "실패"}`;
  const [hours, minutes, seconds] = durationParts(completedSeconds);
  layout.classList.add("solution-layout");
  layout.innerHTML = `<section class="paper answer-page" aria-labelledby="solution-title">
    <div class="solution-content">
      <header class="solution-heading">
        <div class="solution-title-line">
          <h3 id="solution-title" tabindex="-1" aria-describedby="solution-verdict solution-time">사건 해결</h3>
          <div class="solution-outcome">
            <p id="solution-verdict" class="answer-verdict" data-outcome="${successful ? "success" : "failure"}">${verdict}</p>
            <p id="solution-time" class="solution-time">풀이 시간 <time datetime="PT${completedSeconds}S">${hours ? `${hours}시간 ` : ""}${minutes}분 ${seconds}초</time></p>
          </div>
        </div>
        <div class="solution-links">
          ${hasVideo ? `<button class="solution-jump" type="button" data-solution-jump="solution-film-title">${video.title ?? "재구성 영상"} 보기</button>` : ""}
          ${cipher ? '<button class="solution-jump" type="button" data-solution-jump="solution-cipher-title">비밀암호 대응표 보기</button>' : ""}
          ${steps.length ? '<button class="solution-jump" type="button" data-solution-jump="solution-steps">장면별 해설 보기</button>' : ""}
          ${story.length ? '<button class="solution-jump" type="button" data-solution-jump="solution-story">사건의 전말 읽기</button>' : ""}
        </div>
      </header>
      ${solutionCast(suspects, practice ? null : suspectId)}
      ${hasVideo ? `<section class="solution-reconstruction" aria-labelledby="solution-film-title">
        <h4 id="solution-film-title" tabindex="-1">${videoTitle}</h4>
        <div class="solution-film">
          ${youtubeId ? `<iframe class="solution-youtube" title="${videoTitle}"
            src="https://www.youtube-nocookie.com/embed/${youtubeId}?playsinline=1&amp;rel=0"
            loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>` : `
          ${video.src ? `<video class="solution-video" src="${video.src}"${video.poster ? ` poster="${video.poster}"` : ""}
            controls playsinline preload="metadata" aria-labelledby="solution-film-title">
            ${video.captions ? `<track kind="captions" src="${video.captions}" srclang="ko" label="한국어">` : ""}
          </video>` : ""}
          <div class="solution-film-still"${video.src ? " hidden" : ""}>
            ${video.poster ? `<img src="${video.poster}" alt="" decoding="async">` : ""}
            <p>${video.src ? "재구성 영상을 불러올 수 없어요." : "재구성 영상 준비 중"}</p>
          </div>`}
        </div>
      </section>` : ""}
      ${cipher ? `<section class="solution-cipher" aria-labelledby="solution-cipher-title">
        <h4 id="solution-cipher-title" tabindex="-1">비밀암호 대응표</h4>
        ${cipherGuide(cipher)}
      </section>` : ""}
      ${steps.length ? `<section class="solution-sequence" aria-labelledby="solution-steps">
        <h4 id="solution-steps" tabindex="-1">${stepsTitle}</h4>
        <ol class="solution-steps">${steps.map((step, index) => `<li>
          ${solutionImage(step, step.title)}
          <div class="solution-step-text">
            <span class="solution-step-number" aria-hidden="true">${number(index + 1)}</span>
            <div><h5>${step.title}</h5>${[step.text].flat().map(paragraph => `<p>${paragraph}</p>`).join("")}</div>
          </div>
        </li>`).join("")}</ol>
      </section>` : ""}
      ${story.length ? `<section class="solution-story" aria-labelledby="solution-story">
        <h4 id="solution-story" tabindex="-1">사건의 전말</h4>
        ${story.map((paragraph, index) => `<p>${paragraph}</p>
          ${index === 0 && storyImage ? `<img class="solution-story-image" src="${storyImage.src}" alt="${storyImage.alt}"
            width="${storyImage.width}" height="${storyImage.height}" loading="lazy" decoding="async">` : ""}`).join("")}
      </section>` : ""}
    </div>
  </section>`;
  const player = layout.querySelector(".solution-video");
  player?.addEventListener("error", () => {
    player.hidden = true;
    layout.querySelector(".solution-film-still").hidden = false;
    updateVolume();
  });
}

function renderPage(page) {
  const layout = spreadTemplate.content.firstElementChild.cloneNode(true);
  const [left, right] = layout.children;
  if (page <= investigation.evidencePages && investigation.clueLinks.length) {
    left.classList.add("indexed-paper");
    right.classList.add("indexed-paper");
  }
  if (page === 0) overview(left, right);
  else if (page === hintsPage()) hints(left, right);
  else if (page === answerPage()) solution(layout);
  else {
    evidence(left, page * 2 - 1);
    evidence(right, page * 2);
  }
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

function turnPage(outgoing, incoming, forward, nextClue) {
  if (motionPreference.matches || outgoing.matches(".solution-layout") || incoming.matches(".solution-layout")) return;
  const stacked = stackedPages.matches;
  const side = stacked ? Number(activeClue % 2 === 0) : Number(forward);
  const landingSide = stacked ? Number(nextClue % 2 === 0) : 1 - side;
  const overlay = document.createElement("div");
  const leaf = document.createElement("div");
  overlay.className = "turn-overlay";
  overlay.inert = true;
  overlay.setAttribute("aria-hidden", "true");
  leaf.className = `turn-leaf paper-turn ${forward ? "turn-right" : "turn-left"}`;
  if (stacked) {
    overlay.style.height = `${incoming.children[landingSide].offsetHeight}px`;
  } else {
    const stationary = outgoing.children[1 - side].cloneNode(true);
    stationary.classList.add("turn-still", forward ? "turn-left" : "turn-right");
    overlay.append(stationary);
  }
  overlay.append(leaf);
  for (const element of overlay.querySelectorAll("[id]")) element.removeAttribute("id");
  book.append(overlay);
  curlPage(leaf, outgoing.children[side], incoming.children[landingSide], forward ? -1 : 1);
}

function updateNavigation() {
  const currentPage = Math.max(0, activePage);
  pageCount.textContent = activePage === overviewPage ? "사건 개요" : `${activePage + 1} / ${answerPage() + 1} 펼침면`;
  for (const button of reader.querySelectorAll("[data-step]")) {
    const destination = activePage + Number(button.dataset.step);
    button.disabled = destination < overviewPage || destination > answerPage();
  }
  clueTabs.hidden = !investigation.clueLinks.length || activePage > investigation.evidencePages;
  for (const button of reader.querySelectorAll(".bookmarks [data-page]")) {
    if (Number(button.dataset.page) === currentPage) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
  for (const button of clueTabs.children) {
    if (Number(button.dataset.clue) === activeClue) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
  const activeTab = clueTabs.querySelector('[aria-current="page"]');
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

function focusSheet(layout) {
  const sheet = layout.querySelector(`.paper[data-clue="${activeClue}"]`);
  (sheet ?? layout).querySelector("h3").focus({ preventScroll: true });
  if (sheet && stackedPages.matches) layout.scrollTop = sheet.offsetTop;
}

function stepSpread(step) {
  showPage(activePage + step);
}

function showPage(page, animate = true, clue) {
  if (page < overviewPage || page > answerPage()) return;
  if (page === activePage && spread.hasChildNodes()) {
    if (clue) {
      activeClue = clue;
      updateNavigation();
      focusSheet(spread.firstElementChild);
    }
    return;
  }
  if (page === answerPage() && completedSeconds === null) {
    if (!answerConfirm.open) answerConfirm.showModal();
    return;
  }
  removeTurns();
  const outgoing = spread.firstElementChild;
  const reading = page !== overviewPage;
  if (animate && outgoing && reading !== desk.classList.contains("is-reading")) setReadingLayout(reading);
  const contentPage = Math.max(0, page);
  const nextClue = clue ?? (page > 0 && page <= investigation.evidencePages ? page * 2 - 1 : undefined);
  const pageChanged = !outgoing || contentPage !== Math.max(0, activePage);
  let incoming = outgoing;
  if (pageChanged) {
    outgoing?.querySelector(".solution-video")?.pause();
    incoming = renderPage(contentPage);
    spread.replaceChildren(incoming);
    if (activePage === answerPage() || page === answerPage()) updateVolume();
    if (animate && outgoing) turnPage(outgoing, incoming, page > activePage, nextClue);
  }
  activePage = page;
  activeClue = nextClue;
  updateNavigation();
  focusSheet(incoming);
}

function showStage(stage) {
  if (stage !== "closed" && hintConfirm.open) hintConfirm.close("no");
  if (stage === "shelf") {
    viewedHints.clear();
  }
  entrance.hidden = stage !== "entrance";
  library.hidden = stage !== "shelf";
  desk.hidden = stage !== "closed";
  exitButton.hidden = stage !== "shelf";
  returnButton.hidden = stage !== "closed";
  setAttemptClock(stage === "closed");
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
  investigation = investigations[index];
  const draft = index === lockedRecord;
  deskTitle.textContent = records[index].querySelector(".spine-title").textContent;
  deskVolume.querySelector(".cover").replaceWith(jackets[index].cloneNode(true));
  deskVolume.querySelector(".book-spine").replaceChildren(records[index].querySelector(".shelf-spine").cloneNode(true));
  deskVolume.classList.toggle("preview-volume", draft);
  renderSuspects();
  reader.querySelector('[data-bookmark="hints"]').dataset.page = hintsPage();
  reader.querySelector('[data-bookmark="answer"]').dataset.page = answerPage();
  clueTabs.innerHTML = investigation.clueLinks.map(({ sheetIndex, clueNumber, action }) =>
    `<button class="plate" type="button" data-clue="${sheetIndex}" aria-label="${clueNumber}. ${action}" title="${action}">${clueNumber}</button>`
  ).join("");
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
  if (!opening) {
    for (const dialog of [submissionConfirm, suspectPicker, answerConfirm, hintConfirm]) {
      if (dialog.open) dialog.close();
    }
    if (activePage === answerPage()) showPage(overviewPage, false);
  }
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
    while (bookState !== desiredState ||
      ((bookState === "closed" || bookState === "open") && deskRecord !== desiredRecord)) {
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
          openButton.focus({ preventScroll: true });
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

const catalogue = ["읽을 사건 기록을 골라보세요.", "책등을 누르면 비밀번호를 입력할 수 있어요."];
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
  const { key, target } = event;
  const space = key === " ";
  if (!space && key !== "ArrowLeft" && key !== "ArrowRight") return;
  if (moving || event.defaultPrevented || event.isComposing || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (document.querySelector("dialog[open]")) return;

  const step = key === "ArrowLeft" ? -1 : 1;
  if (bookState === "shelf" && !space) {
    event.preventDefault();
    selectRecord(selectedRecord + step);
  } else if (bookState === "open") {
    if (target.isContentEditable || target.closest("input, select, textarea, video")) return;
    if (space && target.closest(".answer-page")) return;
    if (space && target.closest("button, summary, [role='button']")) return;
    event.preventDefault();
    if (!event.repeat) stepSpread(step);
  }
});

function clearRecordLockError() {
  recordLockError.hidden = true;
  recordPasscode.removeAttribute("aria-invalid");
}

function requestLockedRecord() {
  if (location.hash === records[lockedRecord].hash) {
    history.replaceState(null, "", "#investigation");
    goTo("shelf");
  }
  if (recordLock.open) return;
  selectRecord(lockedRecord);
  records[lockedRecord].focus({ preventScroll: true });
  recordLockForm.reset();
  clearRecordLockError();
  recordLock.showModal();
}

recordLock.querySelector("[data-close-record-lock]").addEventListener("click", () => recordLock.close());
recordPasscode.addEventListener("input", clearRecordLockError);
recordLockForm.addEventListener("submit", event => {
  event.preventDefault();
  if (recordPasscode.value !== recordPin) {
    recordPasscode.setAttribute("aria-invalid", "true");
    recordLockError.hidden = false;
    recordPasscode.select();
    return;
  }
  recordLock.close();
  desiredRecord = lockedRecord;
  history.pushState(null, "", records[lockedRecord].hash);
  goTo("open");
});

for (const [index, record] of records.entries()) {
  record.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (index === lockedRecord) {
      requestLockedRecord();
      return;
    }
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
  if (index === lockedRecord) {
    requestLockedRecord();
    return;
  }
  if (recordLock.open) recordLock.close();
  if (index >= 0) {
    desiredRecord = index;
    goTo("closed");
  } else {
    goTo(location.hash === "#investigation" ? "shelf" : "entrance");
  }
});
openButton.addEventListener("click", () => goTo("open"));
closeButton.addEventListener("click", () => goTo("closed"));

for (const event of ["play", "pause", "ended"]) spread.addEventListener(event, updateVolume, true);
reader.addEventListener("click", event => {
  const button = event.target.closest("button") ?? event.target.closest(".hint-card")?.querySelector(".hint-trigger");
  if (!button) return;
  if (button.hasAttribute("data-clue")) {
    const clue = Number(button.dataset.clue);
    showPage(clueSpread(clue), true, clue);
  } else if (button.hasAttribute("data-page")) {
    showPage(Number(button.dataset.page));
  } else if (button.hasAttribute("data-step")) {
    stepSpread(Number(button.dataset.step));
  } else if (button.hasAttribute("data-solution-jump")) {
    spread.querySelector(".solution-video")?.pause();
    const heading = document.getElementById(button.dataset.solutionJump);
    heading.scrollIntoView({ block: "start" });
    heading.focus({ preventScroll: true });
  } else if (button.hasAttribute("data-hint")) {
    const index = Number(button.dataset.hint);
    if (viewedHints.has(index) || hintConfirm.open) return;
    selectedHint = index;
    hintQuestion.textContent = `힌트 ${index + 1}번을 확인하시겠습니까?`;
    hintConfirm.showModal();
  } else if (button.hasAttribute("data-zoom")) {
    const paper = button.closest(".paper");
    const art = button.querySelector("img") ?? paper.querySelector(".illustration");
    const download = paper.querySelector("[data-download]");
    showArt(art, download?.download, download?.href);
  }
});

function showArt(art, filename = "", href = art.src) {
  viewer.querySelector("h2").textContent = art.alt;
  viewerDownload.href = href;
  viewerDownload.download = filename;
  viewerScale.hidden = investigation.file !== alpineLodge;
  setViewerScale(false);
  viewerArt.replaceChildren(art.cloneNode(true));
  viewer.showModal();
}

function setViewerScale(original) {
  viewerArt.classList.toggle("is-native-size", original);
  viewerScale.setAttribute("aria-pressed", String(original));
  viewerScale.querySelector("span").textContent = original ? "화면에 맞춤" : "원본 크기";
  viewerArt.scrollTo(0, 0);
}

viewerScale.addEventListener("click", () => setViewerScale(!viewerArt.classList.contains("is-native-size")));

function renderSuspects() {
  const { answer, suspects } = investigation.file;
  suspectPicker.classList.toggle("alpine-suspect-picker", investigation.file === alpineLodge);
  suspectForm.querySelector("#suspect-prompt").textContent = answer.question;
  suspectForm.querySelector(".suspect-practice").hidden = !answer.practice;
  suspectLineup.innerHTML = suspects.map(suspect => `
    <label class="suspect-card">
      <input type="radio" name="suspect" value="${suspect.id}" required>
      <span class="suspect-face">
        <span class="suspect-portrait"><img src="${suspect.portrait}" alt="" draggable="false" decoding="async">
          <span class="suspect-check" aria-hidden="true">${icon("check")}</span></span>
        <span class="suspect-number">${suspectLabel(suspect)}</span>
      </span>
    </label>`).join("");
}

suspectLineup.addEventListener("pointermove", event => {
  if (event.pointerType !== "mouse" || motionPreference.matches) return;
  const card = event.target.closest(".suspect-card");
  if (!card) return;
  const { left, top, width, height } = card.getBoundingClientRect();
  const x = (event.clientX - left) / width - .5;
  const y = (event.clientY - top) / height - .5;
  card.style.setProperty("--tilt-x", `${-y * 11}deg`);
  card.style.setProperty("--tilt-y", `${x * 15}deg`);
});

function selectedSuspect() {
  const id = suspectForm.querySelector('input[name="suspect"]:checked')?.value;
  return investigation.file.suspects.find(suspect => suspect.id === id);
}

function updateSuspectSelection() {
  const suspect = selectedSuspect();
  suspectSubmit.disabled = !suspect;
  suspectStatus.textContent = suspect ? `${suspectLabel(suspect)} 선택됨` : "용의자를 한 명 선택해 주세요.";
}

answerConfirm.querySelector("form").addEventListener("submit", event => {
  if (event.submitter?.value !== "reveal") return;
  event.preventDefault();
  answerConfirm.close("reveal");
  suspectPicker.showModal();
});

suspectForm.querySelector("[data-close-picker]").addEventListener("click", () => suspectPicker.close());
suspectForm.addEventListener("change", updateSuspectSelection);
suspectForm.addEventListener("submit", event => {
  event.preventDefault();
  const suspect = selectedSuspect();
  if (!suspect) return;
  submissionConfirm.querySelector(".submission-suspect").textContent = suspectLabel(suspect);
  submissionConfirm.showModal();
});

submissionConfirm.querySelector("form").addEventListener("submit", event => {
  if (event.submitter?.value !== "yes") return;
  event.preventDefault();
  const suspect = selectedSuspect();
  if (!suspect) return;
  submittedSuspect = suspect;
  completedSeconds = elapsedSeconds();
  clearInterval(clockInterval);
  caseClock.setAttribute("data-complete", "");
  caseClock.setAttribute("aria-label", "최종 풀이 시간");
  updateClock();
  submissionConfirm.close("yes");
  suspectPicker.close();
  showPage(answerPage());
});

hintConfirm.querySelector("form").addEventListener("submit", event => {
  if (event.submitter?.value !== "yes") return;
  const button = spread.querySelector(`.hint-trigger[data-hint="${selectedHint}"]`);
  if (!button) return;
  viewedHints.add(selectedHint);
  button.setAttribute("aria-expanded", "true");
  document.getElementById(button.getAttribute("aria-controls")).setAttribute("aria-hidden", "false");
});

viewer.addEventListener("close", () => viewerArt.replaceChildren());
if (bookState === "closed") setDeskRecord(desiredRecord);
showStage(bookState);
if (initialRecord === lockedRecord) requestLockedRecord();
