const scenes = {
  intro: document.getElementById("introScene"),
  puzzle: document.getElementById("puzzleScene"),
  reunion: document.getElementById("reunionScene"),
  final: document.getElementById("finalScene"),
  ending: document.getElementById("endingScene"),
};

const introLines = [
  {
    speaker: "Lat",
    text: 'Hello… mera naam "Lat" hai. Mujhe darr lag raha hai, kyunki main kho gaya hoon… aur jis jagah ko main ghar maanta tha, uska raasta yaad nahi aa raha.',
  },
  {
    speaker: "Lat",
    text: "Kya aap meri madad karoge? Main aapse koi promise ya answer nahi maang raha… bas us darwaze tak pahunchne mein help chahiye.",
  },
  {
    speaker: "Lat",
    text: "Do saal ho gaye. Duniya chalti rahi, par mere andar ek jagah bilkul quiet ho gayi. Main apne dost ko bahut miss karta hoon—uski awaaz, uski smile, aur bas uska theek hona.",
  },
  {
    speaker: "Lat",
    text: "Par usse milne se pehle mujhe khud ko sambhalna hoga—college, health, fear aur soul. Sachi care sirf paas jaana nahi; khud ko itna safe banana bhi hai ki hum kisi aur par bojh na banein.",
  },
];

const reunionLines = [
  {
    speaker: "Lat",
    text: "Tum saamne ho… aur mujhe lag raha hai jaise meri duniya ne do saal baad phir se saans li ho. Thank you—sirf milane ke liye nahi, mujhe yahan tak sambhal kar laane ke liye.",
  },
  {
    speaker: "Friend",
    text: "Haan, hum do saal se mile nahi. Par mujhe pata tha ki yeh meri care karta hai—sirf mujhe paane ke liye nahi, balki meri health, safety, dreams aur growth ke liye.",
  },
  {
    speaker: "Friend",
    text: "Kabhi-kabhi yeh meri fikr mein fasting bhi kar leta hai, jabki uska digestive system weak hai. Uski feeling precious hai—but real love apne aap ko hurt karke prove nahi hota. Main chahti hoon yeh apni health ko bhi utni hi importance de.",
  },
  {
    speaker: "Lat",
    text: "Tumhari absence ne mujhe weak zaroor kiya, par meri care ko bitter nahi banaya. Main tumse baat karna, support karna aur tumhari khushi ka hissa banna chahta hoon—sirf tab, jitna tum comfortable ho.",
  },
  {
    speaker: "Lat",
    text: "Main tumhe miss karta hoon, par tumhari space se ladna nahi chahta. Main tumhare paas pressure bankar nahi, peace bankar aana chahta hoon. Isliye pehle main apni life sort karunga.",
  },
  {
    speaker: "Both",
    text: "Paanch saal tak ek hi insaan ki care karna tough ho sakta hai. Par jab woh feeling real ho, woh possession nahi banti—woh patience, prayer, respect aur growth ban jaati hai. Humari madad karne ke liye thank you.",
  },
];

const finalMessage = `Humara toh path sort ho gaya…

Par Rishav abhi bhi apni life ke raste par hai. Woh aapko bahut miss karta hai—kabhi ek memory ki tarah nahi, balki us insaan ki tarah jiska theek hona uske liye genuinely matter karta hai.

Pehle woh chup-chaap wait karta raha ki shayad aap use dhoondh loge. Ab woh samajh raha hai ki care ka matlab sirf wait karna nahi hota. Care ka matlab khud ko heal karna, apne fear face karna, health sambhalna, future banana, aur phir respect ke saath aapke darwaze tak aana bhi hota hai.

Usne ek message diya tha:

“Kitabon mein fairies aur apsaras ke baare mein bahut likha hai, par mere liye tumhari presence kisi fantasy se zyada real aur beautiful hai—jaise ghar lautne ke baad milne wala sukoon. Main tumhari bahut gehri care karta hoon.

Maine message karna isliye nahi roka kyunki feeling kam ho gayi; maine tumhari space aur comfort ka respect kiya. Main tumhe convince, control, ya guilty feel nahi karana chahta. Main bas chahta hoon ki tum healthy raho, grow karo, apne dreams achieve karo aur dil se khush raho.

Tum mujhe choose karo ya na karo, tumhari dignity aur happiness mere liye important rahegi. Aur agar kabhi tum mujhe apni life mein jagah do, main us jagah ko noise se nahi—care, honesty, loyalty aur peace se bharna chahta hoon.

The more your little heaven grows, the happier I will be.”

Baaki puzzle God, time aur honest effort solve karenge. Rishav aapse milne ke liye bahut excited hai, lekin jaldi ya pressure ke saath nahi. Woh apni taraf se 100% effort de raha hai—taaki jab mile, toh sirf feelings lekar nahi, stability aur respect lekar aaye.`;

const achievementLabels = {
  college: "College Sorted",
  health: "Health Sorted",
  fear: "Fear Sorted",
  soul: "Soul Sorted",
};

let introIndex = 0;
let reunionIndex = 0;
let selectedPiece = null;
let draggedPiece = null;
let solvedKeys = new Set();
let achievementTimer = null;
let typewriterTimer = null;

const introText = document.getElementById("introText");
const introSpeaker = document.getElementById("introSpeaker");
const introProgress = document.getElementById("introProgress");
const nextIntro = document.getElementById("nextIntro");

const reunionText = document.getElementById("reunionText");
const reunionSpeaker = document.getElementById("reunionSpeaker");
const reunionProgress = document.getElementById("reunionProgress");
const nextReunion = document.getElementById("nextReunion");

const pieces = [...document.querySelectorAll(".puzzle-piece")];
const slots = [...document.querySelectorAll(".path-slot")];
const achievement = document.getElementById("achievement");
const achievementText = document.getElementById("achievementText");
const solvedCount = document.getElementById("solvedCount");
const puzzleHint = document.getElementById("puzzleHint");
const door = document.getElementById("door");
const latWalker = document.getElementById("latWalker");
const typewriterText = document.getElementById("typewriterText");
const continueFinal = document.getElementById("continueFinal");
const skipFinal = document.getElementById("skipFinal");
const replayBtn = document.getElementById("replayBtn");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = musicToggle.querySelector(".music-icon");

let musicWasStarted = false;

function syncMusicButton() {
  const isPaused = bgMusic.paused;
  musicToggle.classList.toggle("is-muted", isPaused);
  musicToggle.setAttribute("aria-label", isPaused ? "Play background music" : "Pause background music");
  musicToggle.title = isPaused ? "Play song.mp3" : "Pause song.mp3";
  musicIcon.textContent = isPaused ? "♪" : "♫";
}

async function startBackgroundMusic() {
  if (!bgMusic.paused) return;

  try {
    bgMusic.volume = 0.46;
    await bgMusic.play();
    musicWasStarted = true;
    syncMusicButton();
  } catch (error) {
    // Browsers may block audio until a clear user gesture, or song.mp3 may be missing.
    syncMusicButton();
  }
}

musicToggle.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (bgMusic.paused) {
    await startBackgroundMusic();
  } else {
    bgMusic.pause();
    syncMusicButton();
  }
});

bgMusic.addEventListener("play", syncMusicButton);
bgMusic.addEventListener("pause", syncMusicButton);
bgMusic.addEventListener("ended", syncMusicButton);

// Mobile and desktop browsers allow music after the visitor's first gesture.
document.addEventListener(
  "pointerdown",
  (event) => {
    if (event.target.closest("#musicToggle")) return;
    if (!musicWasStarted) startBackgroundMusic();
  },
  { once: true }
);

function showScene(name) {
  Object.values(scenes).forEach((scene) => scene.classList.remove("scene-active"));
  scenes[name].classList.add("scene-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function animateText(element, text, speed = 22) {
  if (element._typingTimer) {
    clearInterval(element._typingTimer);
  }

  element.textContent = "";
  let index = 0;

  element._typingTimer = setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      clearInterval(element._typingTimer);
      element._typingTimer = null;
    }
  }, speed);
}

function renderIntro() {
  const line = introLines[introIndex];
  introSpeaker.textContent = line.speaker;
  introProgress.textContent = `${introIndex + 1} / ${introLines.length}`;
  nextIntro.innerHTML =
    introIndex === introLines.length - 1
      ? 'Help Lat <span aria-hidden="true">→</span>'
      : 'Next <span aria-hidden="true">→</span>';
  animateText(introText, line.text);
}

function renderReunion() {
  const line = reunionLines[reunionIndex];
  reunionSpeaker.textContent = line.speaker;
  reunionProgress.textContent = `${reunionIndex + 1} / ${reunionLines.length}`;
  nextReunion.innerHTML =
    reunionIndex === reunionLines.length - 1
      ? 'Read the message <span aria-hidden="true">→</span>'
      : 'Next <span aria-hidden="true">→</span>';
  animateText(reunionText, line.text, 15);
}

function createStars() {
  const stars = document.getElementById("stars");
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 48; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    fragment.appendChild(star);
  }

  stars.appendChild(fragment);
}

function clearPieceSelection() {
  pieces.forEach((piece) => piece.classList.remove("selected"));
  selectedPiece = null;
}

function showAchievement(key) {
  achievementText.textContent = achievementLabels[key];
  achievement.classList.add("show");

  clearTimeout(achievementTimer);
  achievementTimer = setTimeout(() => {
    achievement.classList.remove("show");
  }, 1800);
}

function markSolved(key) {
  if (!key || solvedKeys.has(key)) return;

  const piece = pieces.find((item) => item.dataset.key === key);
  const slot = slots.find((item) => item.dataset.key === key);

  if (!piece || !slot) return;

  solvedKeys.add(key);
  piece.classList.remove("selected");
  piece.classList.add("solved");
  piece.setAttribute("aria-disabled", "true");
  slot.classList.add("solved");
  slot.setAttribute("aria-label", `${achievementLabels[key]} — solved`);
  solvedCount.textContent = solvedKeys.size;
  puzzleHint.textContent = `${achievementLabels[key]} — path ka ek hissa roshan ho gaya.`;
  showAchievement(key);
  selectedPiece = null;
  draggedPiece = null;

  if (solvedKeys.size === 4) {
    completePuzzle();
  }
}

function tryPlace(piece, slot) {
  if (!piece || !slot || piece.classList.contains("solved")) return;

  if (piece.dataset.key === slot.dataset.key) {
    markSolved(piece.dataset.key);
  } else {
    slot.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 280 }
    );
    puzzleHint.textContent = "Yeh piece yahan fit nahi hota—matching name try karo.";
  }
}

pieces.forEach((piece) => {
  piece.addEventListener("click", () => {
    if (piece.dataset.justDragged === "true") return;
    if (piece.classList.contains("solved")) return;

    const wasSelected = piece.classList.contains("selected");
    clearPieceSelection();

    if (!wasSelected) {
      selectedPiece = piece;
      piece.classList.add("selected");
      puzzleHint.textContent = `${piece.querySelector("strong").textContent} selected. Ab matching step tap karo.`;
    }
  });

  piece.addEventListener("dragstart", () => {
    draggedPiece = piece;
    piece.classList.add("selected");
  });

  piece.addEventListener("dragend", () => {
    draggedPiece = null;
    piece.classList.remove("selected");
  });
 });

// Touch-friendly drag-and-drop. Native HTML drag remains available on desktop.
pieces.forEach((piece) => {
  let clone = null;
  let startX = 0;
  let startY = 0;
  let moved = false;

  function moveClone(x, y) {
    if (!clone) return;
    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;

    slots.forEach((slot) => slot.classList.remove("touch-target"));
    const target = document.elementFromPoint(x, y)?.closest(".path-slot");
    if (target && !target.classList.contains("solved")) {
      target.classList.add("touch-target");
    }
  }

  piece.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || piece.classList.contains("solved")) return;

    startX = event.clientX;
    startY = event.clientY;
    moved = false;
    clone = piece.cloneNode(true);
    clone.classList.add("touch-drag-clone");
    clone.removeAttribute("draggable");
    document.body.appendChild(clone);
    piece.classList.add("touch-dragging");
    piece.setPointerCapture(event.pointerId);
    moveClone(event.clientX, event.clientY);
  });

  piece.addEventListener("pointermove", (event) => {
    if (!clone) return;
    event.preventDefault();

    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 7) {
      moved = true;
    }
    moveClone(event.clientX, event.clientY);
  });

  function finishTouchDrag(event) {
    if (!clone) return;

    const x = event.clientX;
    const y = event.clientY;
    const target = document.elementFromPoint(x, y)?.closest(".path-slot");

    clone.remove();
    clone = null;
    piece.classList.remove("touch-dragging");
    slots.forEach((slot) => slot.classList.remove("touch-target"));

    if (moved) {
      piece.dataset.justDragged = "true";
      setTimeout(() => {
        piece.dataset.justDragged = "false";
      }, 250);
      tryPlace(piece, target);
    }
  }

  piece.addEventListener("pointerup", finishTouchDrag);
  piece.addEventListener("pointercancel", finishTouchDrag);
});

slots.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (slot.classList.contains("solved")) return;
    tryPlace(selectedPiece, slot);
  });

  slot.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      tryPlace(selectedPiece, slot);
    }
  });

  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    slot.classList.add("drag-over");
  });

  slot.addEventListener("dragleave", () => {
    slot.classList.remove("drag-over");
  });

  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("drag-over");
    tryPlace(draggedPiece, slot);
  });
});

function completePuzzle() {
  puzzleHint.textContent = "Path complete! Lat is going to the door…";
  door.classList.add("ready");
  latWalker.classList.add("walking");

  setTimeout(() => {
    door.classList.add("open");
  }, 1100);

  setTimeout(() => {
    showScene("reunion");
    renderReunion();
  }, 2600);
}

function finishFinalMessage() {
  clearInterval(typewriterTimer);
  typewriterTimer = null;
  typewriterText.textContent = finalMessage;
  skipFinal.classList.add("hidden");
  continueFinal.classList.remove("hidden");
}

function startFinalMessage() {
  showScene("final");
  typewriterText.textContent = "";
  continueFinal.classList.add("hidden");
  skipFinal.classList.remove("hidden");

  let index = 0;
  clearInterval(typewriterTimer);

  typewriterTimer = setInterval(() => {
    typewriterText.textContent += finalMessage.charAt(index);
    index += 1;

    if (index >= finalMessage.length) {
      finishFinalMessage();
    }
  }, 14);
}

function resetStory() {
  introIndex = 0;
  reunionIndex = 0;
  selectedPiece = null;
  draggedPiece = null;
  solvedKeys = new Set();

  clearInterval(typewriterTimer);
  clearPieceSelection();

  pieces.forEach((piece) => {
    piece.classList.remove("solved");
    piece.removeAttribute("aria-disabled");
  });

  slots.forEach((slot) => {
    slot.classList.remove("solved", "drag-over");
    slot.setAttribute("aria-label", `${slot.dataset.key} path slot`);
  });

  solvedCount.textContent = "0";
  puzzleHint.textContent = "Select a piece, then tap its matching step.";
  door.classList.remove("ready", "open");
  latWalker.classList.remove("walking");
  typewriterText.textContent = "";
  continueFinal.classList.add("hidden");
  skipFinal.classList.remove("hidden");

  showScene("intro");
  renderIntro();
}

nextIntro.addEventListener("click", () => {
  if (introIndex < introLines.length - 1) {
    introIndex += 1;
    renderIntro();
  } else {
    showScene("puzzle");
  }
});

nextReunion.addEventListener("click", () => {
  if (reunionIndex < reunionLines.length - 1) {
    reunionIndex += 1;
    renderReunion();
  } else {
    startFinalMessage();
  }
});

skipFinal.addEventListener("click", finishFinalMessage);
typewriterText.addEventListener("click", () => {
  if (typewriterTimer) finishFinalMessage();
});
typewriterText.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && typewriterTimer) {
    event.preventDefault();
    finishFinalMessage();
  }
});

continueFinal.addEventListener("click", () => {
  showScene("ending");
});

replayBtn.addEventListener("click", resetStory);

syncMusicButton();
createStars();
renderIntro();
