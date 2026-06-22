from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from chat import get_response
from session import create_session, get_history, add_message, clear_session

app = FastAPI(
    title="CyberGuard",
    description="Cybersecurity Awareness Chatbot API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../frontend"), name="static")

MAX_MESSAGE_LENGTH = 1000


class ChatRequest(BaseModel):
    session_id: str
    message: str
    quiz_mode: bool = False


class NewSessionResponse(BaseModel):
    session_id: str


class ClearRequest(BaseModel):
    session_id: str


@app.get("/")
def serve_frontend():
    return FileResponse("../frontend/index.html")


@app.post("/new-session", response_model=NewSessionResponse)
def new_session():
    session_id = create_session()
    return {"session_id": session_id}


@app.post("/chat")
def chat(request: ChatRequest):
    session_id = request.session_id
    user_message = request.message.strip()

    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if len(user_message) > MAX_MESSAGE_LENGTH:
        raise HTTPException(status_code=400, detail=f"Message exceeds {MAX_MESSAGE_LENGTH} character limit.")

    add_message(session_id, "user", user_message)

    try:
        history = get_history(session_id)
        bot_reply = get_response(history, quiz_mode=request.quiz_mode)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))

    add_message(session_id, "assistant", bot_reply)

    return {"reply": bot_reply}


@app.post("/clear-session")
def clear(request: ClearRequest):
    clear_session(request.session_id)
    return {"status": "Session cleared."}
