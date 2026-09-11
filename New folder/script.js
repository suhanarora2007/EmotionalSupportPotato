// ---- Config ----
const STORAGE_KEY_SESSIONS = "potato_sessions_today";

const RESPONSES = [
  "That sounds like it's really about your fear of Tuesdays.",
  "Interesting. Have you considered that the real problem is your Wi-Fi router?",
  "I'm sensing this connects back to something your childhood pet said to you.",
  "Let's sit with that. Actually, let's stand with that. Sitting is part of the problem.",
  "What I'm hearing is: you need a nap, but emotionally.",
  "That's valid. Also, slightly your fault. But mostly valid.",
  "Have you tried talking to a houseplant instead? I hear they're better listeners.",
  "This is giving 'unresolved feelings about a group project from 2019.'",
  "I can't help but notice you didn't mention potatoes once. Curious.",
  "Sounds like a you problem, but I still love and support you.",
  "That's a lot. Have you tried turning it off and on again? Yourself, I mean.",
  "I'm not saying it's about your mother. I'm also not not saying that.",
  "Deep breath in. Deep breath out. Did that fix it? No? Worth a shot.",
  "Your aura is giving 'forgot to eat lunch again.'",
  "This tracks with what the other vegetables have been saying about you.",
];

const MOODS = [
  { word: "content", pct: 55, color: "#7c9473" },
  { word: "thriving", pct: 85, color: "#6a8f5c" },
  { word: "wobbly", pct: 40, color: "#c99a4b" },
  { word: "suspicious", pct: 30, color: "#c9834b" },
  { word: "unbothered", pct: 70, color: "#7c9473" },
  { word: "a little crispy", pct: 20, color: "#d9705a" },
  { word: "deeply rooted", pct: 90, color: "#6a8f5c" },
  { word: "mashed (emotionally)", pct: 15, color: "#d9705a" },
];

// ---- Elements ----
const potatoEl = document.getElementById("potato");
const mouthEl = document.getElementById("mouth");
const moodFill = document.getElementById("moodFill");
const moodWord = document.getElementById("moodWord");
const responseArea = document.getElementById("responseArea");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionCountEl = document.getElementById("sessionCount");

// ---- Interaction 1: submit message -> potato listens -> response reveals ----
function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;

  sendBtn.disabled = true;
  userInput.disabled = true;
  potatoEl.classList.add("listening");
  responseArea.innerHTML = '<span class="placeholder">Potato is thinking very hard...</span>';

  const listenTime = 900 + Math.random() * 500;

  setTimeout(() => {
    potatoEl.classList.remove("listening");

    const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    responseArea.innerHTML = '<span class="reply">' + response + "</span>";

    shiftMood();

    userInput.value = "";
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }, listenTime);
}

// ---- Interaction 2: mood meter shifts randomly, unrelated to what you typed ----
function shiftMood() {
  const mood = MOODS[Math.floor(Math.random() * MOODS.length)];
  moodFill.style.width = mood.pct + "%";
  moodFill.style.background = mood.color;
  moodWord.textContent = mood.word;

  mouthEl.classList.remove("flat", "frown");
  if (mood.pct < 25) {
    mouthEl.classList.add("frown");
  } else if (mood.pct < 45) {
    mouthEl.classList.add("flat");
  }
}

// ---- Interaction 3: end session resets the conversation + tracks sessions ----
function endSession() {
  responseArea.innerHTML = '<span class="placeholder">Session ended. The potato will remember this. Probably.</span>';
  userInput.value = "";
  moodFill.style.width = "55%";
  moodFill.style.background = "#7c9473";
  moodWord.textContent = "content";
  mouthEl.classList.remove("flat", "frown");

  const current = parseInt(localStorage.getItem(STORAGE_KEY_SESSIONS) || "0", 10);
  const updated = current + 1;
  localStorage.setItem(STORAGE_KEY_SESSIONS, updated);
  sessionCountEl.textContent = updated;
}

// ---- Events ----
sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});
resetBtn.addEventListener("click", endSession);

// ---- Init ----
(function init() {
  const savedSessions = parseInt(localStorage.getItem(STORAGE_KEY_SESSIONS) || "0", 10);
  sessionCountEl.textContent = savedSessions;
  responseArea.innerHTML = '<span class="placeholder">Tell the potato what\'s on your mind. It will not understand, but it will care.</span>';
})();
