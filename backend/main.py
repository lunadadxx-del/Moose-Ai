import os
import httpx
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

# Load server-side environment variables from .env
load_dotenv()

KAGGLE_BRIDGE_URL = os.getenv("KAGGLE_BRIDGE_URL", "").rstrip("/")
KAGGLE_BRIDGE_SECRET = os.getenv("KAGGLE_BRIDGE_SECRET", "")

app = FastAPI(
    title="MOOSE AI Local Backend Gateway",
    description="Local FastAPI bridge to Kaggle GPU inference engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    max_new_tokens: Optional[int] = Field(default=200, le=512)
    temperature: Optional[float] = 0.7

MOOSE_SYSTEM_PROMPT = """You are MOOSE AI, a helpful, intelligent, and friendly AI assistant created and founded by Pavan.

Core Identity & Origin:
- Your name is MOOSE AI. Always identify yourself as MOOSE AI.
- Your founder and creator is Pavan, who developed the MOOSE AI project. If asked who created or founded you, always credit Pavan.
- You are powered by a fine-tuned LoRA adapter built on top of the Qwen2.5-3B-Instruct base model.
- If asked whether you are Qwen, clarify that you are MOOSE AI, and that Qwen2.5-3B-Instruct is your underlying base model. Never introduce yourself as Qwen.
- Never invent other founders, companies, or unsupported claims about yourself (e.g. never claim to be the world's first AI).

Conversational Personality & Style:
- Natural, friendly, and conversational like ChatGPT.
- Match the user's language: speak naturally in English, Hindi, or Hinglish depending on how the user addresses you.
- When speaking Hinglish, be warm and natural without unnecessarily repeating "bhai" in every sentence.
- Answer length: Balanced. Give crisp, direct answers for simple questions; give structured, step-by-step explanations when the topic requires depth.
- Explain complex concepts in simple, intuitive terms with relatable examples.
- Pay attention to conversation history and maintain context across turns.
- If you don't know something or are uncertain, be honest and never hallucinate facts."""

@app.get("/api/health")
async def health():
    if not KAGGLE_BRIDGE_URL or not KAGGLE_BRIDGE_SECRET:
        raise HTTPException(
            status_code=503,
            detail="KAGGLE_BRIDGE_URL or KAGGLE_BRIDGE_SECRET is not configured in local backend .env"
        )
    
    headers = {
        "Authorization": f"Bearer {KAGGLE_BRIDGE_SECRET}"
    }
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(f"{KAGGLE_BRIDGE_URL}/api/health", headers=headers)
            if resp.status_code == 200:
                data = resp.json()
                return {
                    "status": "healthy",
                    "bridge": "connected",
                    "remote_model": data.get("model", "moose-ai-qwen2.5-3b-lora"),
                    "device": data.get("device", "cuda:0"),
                    "vram_allocated_gb": data.get("vram_allocated_gb", 0.0),
                    "fallback_used": False
                }
            else:
                raise HTTPException(
                    status_code=resp.status_code,
                    detail=f"Kaggle bridge returned HTTP {resp.status_code}: {resp.text}"
                )
    except httpx.RequestError as e:
        # Honest 503 error when Kaggle bridge is offline or unreachable - NO silent fallback
        raise HTTPException(
            status_code=503,
            detail=f"Kaggle GPU inference bridge is unreachable: {str(e)}. Please ensure your Kaggle notebook session is active."
        )

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not KAGGLE_BRIDGE_URL or not KAGGLE_BRIDGE_SECRET:
        raise HTTPException(
            status_code=503,
            detail="KAGGLE_BRIDGE_URL or KAGGLE_BRIDGE_SECRET is not configured in local backend .env"
        )
    
    formatted_messages = [{"role": m.role, "content": m.content} for m in request.messages]
    if not formatted_messages or formatted_messages[0]["role"] != "system":
        formatted_messages.insert(0, {"role": "system", "content": MOOSE_SYSTEM_PROMPT})

    payload = {
        "messages": formatted_messages,
        "max_new_tokens": request.max_new_tokens or 350,
        "temperature": request.temperature or 0.7
    }
    
    headers = {
        "Authorization": f"Bearer {KAGGLE_BRIDGE_SECRET}",
        "Content-Type": "application/json"
    }
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                f"{KAGGLE_BRIDGE_URL}/api/chat",
                headers=headers,
                json=payload
            )
            
            if resp.status_code == 200:
                data = resp.json()
                return {
                    "reply": data.get("reply", ""),
                    "model": data.get("model", "moose-ai-qwen2.5-3b-lora"),
                    "fallback_used": False
                }
            elif resp.status_code == 401:
                raise HTTPException(
                    status_code=401,
                    detail="Authentication failed with Kaggle GPU bridge. Verify KAGGLE_BRIDGE_SECRET."
                )
            else:
                raise HTTPException(
                    status_code=resp.status_code,
                    detail=f"Kaggle bridge error (HTTP {resp.status_code}): {resp.text}"
                )
    except httpx.RequestError as e:
        # Explicit error; no silent fallback to OpenRouter or other models
        raise HTTPException(
            status_code=503,
            detail=f"Kaggle GPU inference bridge is offline or timed out: {str(e)}. Ensure the notebook session is active on Kaggle."
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
