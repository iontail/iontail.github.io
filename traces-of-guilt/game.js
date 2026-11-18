const clues = {
  clock: {
    number: "01",
    title: "Wall clock",
    description: "The clock was knocked off the wall when its bracket broke. It stopped at 10:14. A fresh scratch in the tape cabinet shows the clock struck it while the cabinet door was open."
  },
  case: {
    number: "02",
    title: "Reel case",
    description: "The empty case has a strip of blue tape marked ‘B-17’. That same code was written next to one person's signature on the sign-in sheet."
  },
  log: {
    number: "03",
    title: "Sign-in sheet",
    description: "Iris Reed left at 10:07. Mara Voss signed in at 10:12, then out at 10:16 with item B-17. Leon Bell arrived at 10:21."
  }
};

const found = new Set();
const dialog = document.querySelector(".clue-dialog");
const clueButtons = document.querySelectorAll("[data-clue]");
const progress = document.querySelector("#progress");
const suspectForm = document.querySelector(".suspects");
const result = document.querySelector(".result");

for (const button of clueButtons) {
  button.addEventListener("click", () => {
    const id = button.dataset.clue;
    const clue = clues[id];
    found.add(id);
    progress.textContent = `${found.size} of ${Object.keys(clues).length} clues found`;

    for (const clueButton of clueButtons) {
      if (clueButton.dataset.clue !== id) continue;
      clueButton.classList.add("is-found");
      clueButton.setAttribute("aria-label", `Inspect ${clue.title.toLowerCase()} (found)`);
    }

    document.querySelector("#clue-number").textContent = `Evidence ${clue.number}`;
    document.querySelector("#clue-title").textContent = clue.title;
    document.querySelector("#clue-description").textContent = clue.description;
    dialog.showModal();
  });
}

suspectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const suspect = new FormData(suspectForm).get("suspect");

  if (found.size < Object.keys(clues).length) {
    result.textContent = "Inspect all three clues before submitting your theory.";
  } else if (suspect === "mara") {
    result.textContent = "Case solved. Mara was in Studio B at 10:14 and signed out with B-17, the missing master reel.";
  } else {
    result.textContent = "Check the sign-in sheet again. Who was in Studio B at 10:14 and left with B-17?";
  }
});

suspectForm.addEventListener("change", () => {
  result.textContent = "";
});
