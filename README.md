# CyberGuard — Cybersecurity Awareness Chatbot

A minimalist intelligent chatbot that educates the general public on cybersecurity awareness and practical online safety tips. Built as a final year student project.

---

## Features

- Conversational AI powered by Claude (Haiku model)
- Session memory — the bot remembers context within a conversation
- 8 cybersecurity topic areas with quick-access buttons
- Clean dark-mode chat UI
- Refuses off-topic and harmful requests
- Mobile responsive

## Topics Covered

| Topic | Description |
|---|---|
| Phishing | Recognising fake emails, SMS, and voice scams |
| Passwords | Creating strong passwords, using password managers |
| MFA | What multi-factor authentication is and how to enable it |
| Scams | Romance scams, tech support fraud, impersonation |
| Safe Browsing | Spotting dangerous links, safe downloads |
| Public Wi-Fi | Risks of unsecured networks, VPN usage |
| Software Updates | Why updates matter and how to stay patched |
| Social Media Privacy | Oversharing risks, privacy settings |

---

## Project Structure

```
CybersecurityChatbot/
├── backend/
│   ├── main.py        # FastAPI app — API endpoints
│   ├── chat.py        # Claude API integration + system prompt
│   └── session.py     # In-memory session management
├── frontend/
│   ├── index.html     # Chat UI structure
│   ├── style.css      # Dark-mode styling
│   └── script.js      # Frontend logic and API calls
├── .env               # API key (not committed)
├── .gitignore
└── requirements.txt
```

---

## Prerequisites

- Python 3.10 or higher
- An Anthropic API key — sign up at [console.anthropic.com](https://console.anthropic.com)

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd CybersecurityChatbot
```

### 2. Create and activate a virtual environment

```bash
python -m venv myenv

# On Windows
myenv\Scripts\activate

# On macOS/Linux
source myenv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add your API key

Create a `.env` file in the root directory:

```
ANTHROPIC_API_KEY=your_api_key_here
```

### 5. Run the application

```bash
cd backend
uvicorn main:app --host 127.0.0.1 --port 8000
```

### 6. Open in your browser

```
http://127.0.0.1:8000
```

---

## How to Use

1. **Type a question** in the input box and press Enter or click Send
2. **Use topic buttons** at the top to instantly ask about a specific area
3. **Ask follow-up questions** — the bot remembers the conversation context
4. **Click New Chat** to start a fresh conversation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| AI Model | Claude Haiku (Anthropic API) |
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Markdown | marked.js (CDN) |

---

## Security & Ethical Notes

- The bot strictly refuses to assist with hacking, attacks, or any offensive security content
- All responses are for **educational purposes only**
- No user data is stored permanently — session history is held in memory and cleared on reset
- API key is stored in `.env` and excluded from version control

---

## License

This project was built for academic purposes as a final year project.
