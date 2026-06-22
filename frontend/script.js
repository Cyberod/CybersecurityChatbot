const API_BASE = "http://127.0.0.1:8000";

const chatWindow      = document.getElementById("chatWindow");
const userInput       = document.getElementById("userInput");
const sendBtn         = document.getElementById("sendBtn");
const newChatBtn      = document.getElementById("newChatBtn");
const quizBtn         = document.getElementById("quizBtn");
const quizBanner      = document.getElementById("quizBanner");
const typingIndicator = document.getElementById("typingIndicator");
const topicBtns       = document.querySelectorAll(".topic-btn");

let sessionId = null;
let isQuizMode = false;

// ── Startup ──────────────────────────────────────────────
async function init() {
  sessionId = await createSession();
  showWelcomeMessage();
}

async function createSession() {
  const res = await fetch(`${API_BASE}/new-session`, { method: "POST" });
  const data = await res.json();
  return data.session_id;
}

// ── Welcome Message ───────────────────────────────────────
function showWelcomeMessage() {
  const welcome = `Hi there! I'm CyberGuard 🛡️

I'm here to help you stay safe online. You can ask me anything about cybersecurity — from spotting phishing emails to protecting your passwords.

Use the topic buttons above to get started quickly, or just type your question below.`;
  appendMessage("bot", welcome);
}

// ── Append Message to Chat Window ────────────────────────
function appendMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", role);

  const label = document.createElement("div");
  label.classList.add("message-label");
  label.textContent = role === "user" ? "You" : "CyberGuard";

  const bubble = document.createElement("div");
  bubble.classList.add("message-bubble");

  if (role === "bot") {
    bubble.classList.add("markdown");
    bubble.innerHTML = marked.parse(text);
  } else {
    bubble.textContent = text;
  }

  wrapper.appendChild(label);
  wrapper.appendChild(bubble);
  chatWindow.appendChild(wrapper);
  scrollToBottom();
}

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ── Typing Indicator ──────────────────────────────────────
function showTyping() {
  typingIndicator.classList.add("visible");
  scrollToBottom();
}

function hideTyping() {
  typingIndicator.classList.remove("visible");
}

// ── Send Message ──────────────────────────────────────────
async function sendMessage(text) {
  const message = text || userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  setInputDisabled(true);
  showTyping();

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message, quiz_mode: isQuizMode })
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    hideTyping();
    appendMessage("bot", data.reply);

  } catch (err) {
    hideTyping();
    appendMessage("bot", "Sorry, something went wrong. Please check your connection and try again.");
  } finally {
    setInputDisabled(false);
    userInput.focus();
  }
}

// ── New Chat ──────────────────────────────────────────────
async function startNewChat() {
  await fetch(`${API_BASE}/clear-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId })
  });

  chatWindow.innerHTML = "";
  sessionId = await createSession();
  exitQuizMode();
  showWelcomeMessage();
}

// ── Quiz Mode ─────────────────────────────────────────────
async function startQuizMode() {
  await fetch(`${API_BASE}/clear-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId })
  });

  chatWindow.innerHTML = "";
  sessionId = await createSession();
  isQuizMode = true;

  quizBtn.textContent = "❌ Exit Quiz";
  quizBtn.classList.add("active");
  quizBanner.classList.add("visible");
  userInput.placeholder = "Type your answer here...";

  // Trigger the quiz to start by sending a silent opening message
  setInputDisabled(true);
  showTyping();

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message: "Start the quiz", quiz_mode: true })
    });

    const data = await res.json();
    hideTyping();
    appendMessage("bot", data.reply);
  } catch (err) {
    hideTyping();
    appendMessage("bot", "Sorry, something went wrong starting the quiz. Please try again.");
  } finally {
    setInputDisabled(false);
    userInput.focus();
  }
}

function exitQuizMode() {
  isQuizMode = false;
  quizBtn.textContent = "🎯 Quiz Mode";
  quizBtn.classList.remove("active");
  quizBanner.classList.remove("visible");
  userInput.placeholder = "Ask me anything about staying safe online...";
}

// ── Helpers ───────────────────────────────────────────────
function setInputDisabled(disabled) {
  userInput.disabled = disabled;
  sendBtn.disabled = disabled;
}

// ── Event Listeners ───────────────────────────────────────
sendBtn.addEventListener("click", () => sendMessage());

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

newChatBtn.addEventListener("click", startNewChat);

quizBtn.addEventListener("click", () => {
  if (isQuizMode) {
    startNewChat();
  } else {
    startQuizMode();
  }
});

topicBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!isQuizMode) sendMessage(btn.dataset.topic);
  });
});

// ── Init ──────────────────────────────────────────────────
init();
