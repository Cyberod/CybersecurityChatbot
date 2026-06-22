import uuid

# Stores conversation histories in memory: { session_id: [messages] }
sessions: dict = {}


def create_session() -> str:
    session_id = str(uuid.uuid4())
    sessions[session_id] = []
    return session_id


def get_history(session_id: str) -> list:
    return sessions.get(session_id, [])


def add_message(session_id: str, role: str, content: str):
    if session_id not in sessions:
        sessions[session_id] = []
    sessions[session_id].append({"role": role, "content": content})


def clear_session(session_id: str):
    if session_id in sessions:
        sessions[session_id] = []
