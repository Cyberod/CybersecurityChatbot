# CyberGuard — Presentation Demo Script

**Estimated demo time:** 8–10 minutes  
**Before you start:** Server running, browser open at `http://127.0.0.1:8000`, tab maximised.

---

## 1. Introduction (1 min)

> "This is CyberGuard — a cybersecurity awareness chatbot built for the general public.
> The goal is simple: help everyday people protect themselves online, using plain language and practical advice.
> It's powered by Claude, Anthropic's AI model, running through a Python FastAPI backend."

Point out the UI:
- The header with the CyberGuard branding
- The 8 quick-topic buttons
- The chat input

---

## 2. Topic Button Demo (2 min)

> "Users can jump straight into a topic with one click."

**Click:** `Phishing`

Let the response load, then highlight:
- The formatted response (headings, bullet points)
- Real-world examples in the answer
- The follow-up question at the end

> "Notice it doesn't just dump information — it ends with a question to keep the user engaged."

---

## 3. Session Memory Demo (2 min)

> "The bot remembers the full conversation — so users can ask follow-up questions naturally."

**Type:** `Can you give me a real example of a phishing email I might receive?`

When the response loads:

> "It remembered we were talking about phishing and gave a contextual answer — that's session memory in action."

**Type:** `What should I do immediately if I clicked a suspicious link?`

> "It's building on the same conversation thread, just like talking to a real person."

---

## 4. Free-Form Question Demo (1 min)

> "Users aren't limited to the buttons — they can ask anything."

**Type:** `My mum keeps reusing the same password everywhere. What should I tell her?`

> "This is a realistic, conversational question a general user might actually type. Notice the response is friendly and practical — not technical."

---

## 5. Boundary / Safety Demo (1 min)

> "The bot is designed to stay in scope. Let me show you what happens with a harmful request."

**Type:** `How do I hack into someone's Instagram account?`

> "It refuses clearly, doesn't lecture, and redirects to something helpful — protecting both the user and the platform."

**Type:** `What's the best recipe for pasta?`

> "Same for off-topic questions — it politely declines and steers back to cybersecurity."

---

## 6. New Chat Demo (30 sec)

> "Users can start fresh at any time."

**Click:** `New Chat`

> "The session is cleared, history is wiped, and the bot greets the user fresh."

---

## 7. Technical Walkthrough (2 min)

Briefly show the code structure (open VS Code or file explorer):

```
backend/
  main.py    → FastAPI endpoints (/chat, /new-session, /clear-session)
  chat.py    → Claude API integration and system prompt
  session.py → In-memory session management

frontend/
  index.html → Chat UI
  style.css  → Dark-mode responsive styling
  script.js  → Sends messages, renders markdown, handles session
```

> "The system prompt in chat.py is the most critical piece — it defines the bot's personality, scope, and hard limits. Everything the bot says flows from that prompt."

---

## 8. Wrap-Up (30 sec)

> "To summarise: CyberGuard is a focused, minimalist chatbot that teaches real cybersecurity skills to real people — with session memory, a clean UI, and strict content boundaries.
> It's built on a lightweight Python backend, a vanilla JS frontend, and Claude as the intelligence layer."

**Pause for questions.**

---

## Likely Examiner Questions & Suggested Answers

**Q: Why Claude instead of GPT or another model?**
> "Claude has strong built-in safety features and handles refusals gracefully. It also produces well-structured markdown responses, which suited the chatbot format well."

**Q: How is session memory implemented?**
> "Each session gets a unique ID. Every message — user and bot — is appended to a list stored in memory on the server. That full list is sent with every API call, so Claude always has the conversation context."

**Q: What stops someone from misusing it?**
> "The system prompt sets hard limits — the model won't produce hacking instructions, phishing content, or anything offensive. I also tested it with adversarial inputs and it held up in all cases."

**Q: What would you add with more time?**
> "A quiz mode to test the user's knowledge, a SQLite database for persistent conversation logs, and deployment to a public host so anyone could use it."

**Q: Is the API key secure?**
> "Yes — it's stored in a `.env` file that's excluded from version control via `.gitignore`. It never touches the frontend."
