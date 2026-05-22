from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from auth import router as auth_router
import os
import requests
from dotenv import load_dotenv
from openai import OpenAI
from typing import Optional, Dict, List
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
app = FastAPI()
app.include_router(auth_router)
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

from pydantic import BaseModel
import json
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    burnout_score: Optional[float] = None
    burnout_status: Optional[str] = None
    features: Optional[Dict] = None
    history: Optional[List[Dict]] = []
# @app.post("/ai-chat")
# def ai_chat(req: ChatRequest):
#     try:
#         response = client.chat.completions.create(
#             model="openai/gpt-4o-mini",  # or mistral/llama
#             messages=[
#                 {"role": "system", "content": "You are a helpful AI assistant for developers."},
#                 {"role": "user", "content": req.message}
#             ],
#             temperature=0.8,
#             extra_headers={
#                 "HTTP-Referer": "http://localhost:5173",
#                 "X-Title": "CollapseGuard"
#             }
#         )

#         return {"reply": response.choices[0].message.content}

#     except Exception as e:
#         print("CHAT ERROR:", e)
#         return {"reply": "⚠️ AI error"}
class Reflection(BaseModel):
    mood: str
    text: str
    burnout: float
@app.post("/ai-chat")
def ai_chat(req: ChatRequest):
    try:
        context = ""

        if req.burnout_score is not None:
            context = f"""
User Burnout Data:
- Score: {req.burnout_score}
- Status: {req.burnout_status}

If user asks about score, ALWAYS refer to this data.
"""
        messages=[
                
                  {
    "role": "system",
    "content": f"""
You are an AI burnout coach inside a developer productivity dashboard called CollapseGuard.

{context}

STRICT RULES:

- Use burnout data ONLY when relevant
- If user asks casual questions (like "how are you") → respond naturally
- Do NOT repeat burnout score unnecessarily
- Keep conversation human-like and friendly
- Act like a real assistant, not a report generator
- Keep answers short unless user asks deep questions


Examples:
User: is my score safe?
→ Answer using their score directly

User: I feel stressed
→ Give advice based on their burnout level

Avoid:
- generic explanations
- asking unnecessary questions
"""
} ,
                {"role": "user", "content": req.message}
            ]
        if req.history:
            messages.extend(req.history)

        # ✅ Step 3: Add current user message
        messages.append({
            "role": "user",
            "content": req.message
        })

        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=messages,
            
            temperature=0.8,
            extra_headers={
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "CollapseGuard"
            }

        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        print("CHAT ERROR:", e)
        return {"reply": "⚠️ AI error"}
@app.post("/save-reflection")
def save_reflection(data: Reflection):

    try:
        with open("reflections.json", "r") as f:
            reflections = json.load(f)

    except:
        reflections = []

    reflections.append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "mood": data.mood,
        "text": data.text,
        "burnout": data.burnout
    })

    with open("reflections.json", "w") as f:
        json.dump(reflections, f, indent=2)

    return {"status": "saved"}
@app.get("/get-reflections")
def get_reflections():

    try:
        with open("reflections.json", "r") as f:
            data = json.load(f)

        return data[::-1]

    except:
        return []
@app.get("/")
def root():
    
    return {"message": "CollapseGuard Backend Running"}

# GITHUB_CLIENT_ID = "Ov23lipQ7wIj8Rbgfs5E"
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# @app.get("/login")
# def login():
#     return {
#         "auth_url": f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&scope=repo"
#     }
# def generate_ai_coach(result, total_commits):
#     score = result["score"]
#     features = result["feature_breakdown"]

#     late = features.get("late_night_intensity", 0)
#     streak = features.get("work_streak_index", 0)
#     volatility = features.get("volatility_index", 0)
#     weekend = features.get("weekend_ratio", 0)

#     insight = ""
#     risk = ""
#     advice = []

#     # 🔥 Insight
#     if score < 30:
#         insight = "You're in a strong and sustainable productivity zone."
#     elif score < 60:
#         insight = "You're showing early signs of burnout creeping in."
#     else:
#         insight = "Your current work pattern indicates a high burnout risk."

#     # ⚠️ Risk reasoning
#     if late > 40:
#         risk += "Frequent late-night coding is affecting recovery. "
#     if streak > 50:
#         risk += "Long work streaks without breaks detected. "
#     if volatility > 50:
#         risk += "Your workload is highly inconsistent. "
#     if weekend > 40:
#         risk += "Significant weekend work reducing rest cycles. "

#     if risk == "":
#         risk = "Your workflow is relatively balanced."

#     # 💡 Advice
#     if late > 40:
#         advice.append("Reduce late-night work sessions.")
#     if streak > 50:
#         advice.append("Introduce regular break cycles.")
#     if volatility > 50:
#         advice.append("Maintain a more consistent daily workload.")
#     if weekend > 40:
#         advice.append("Protect weekends for recovery.")

#     if not advice:
#         advice.append("Keep maintaining your current healthy workflow.")

#     # ✨ Final Output
#     return f"""
# Insight:
# {insight}

# Risk:
# {risk}

# Advice:
# - {"\n- ".join(advice)}
# """
# import random

# def generate_ai_coach(result, total_commits):
#     score = result["score"]
#     features = result["feature_breakdown"]

#     late = features.get("late_night_intensity", 0)
#     streak = features.get("work_streak_index", 0)
#     volatility = features.get("volatility_index", 0)
#     weekend = features.get("weekend_ratio", 0)

#     insights = []
#     advice = []

#     # 🔥 Insight logic (multi-condition)
#     if late > 40:
#         insights.append("You're working late nights frequently, which can reduce recovery time.")
#         advice.append("Try limiting late-night coding sessions.")

#     if streak > 50:
#         insights.append("You're maintaining long work streaks without breaks.")
#         advice.append("Introduce breaks to avoid mental fatigue.")

#     if volatility > 50:
#         insights.append("Your workload is highly inconsistent.")
#         advice.append("Maintain a steady and predictable workflow.")

#     if weekend > 40:
#         insights.append("You're working heavily on weekends.")
#         advice.append("Reserve weekends for rest and recovery.")

#     # fallback if no strong signals
#     if not insights:
#         insights.append("Your workflow looks balanced and sustainable.")
#         advice.append("Keep maintaining your current rhythm.")

#     # 🔥 Randomize (makes it feel AI)
#     insight = random.choice([
#     f"Observation: {random.choice(insights)}",
#     f"Pattern detected: {random.choice(insights)}",
#     f"Insight: {random.choice(insights)}"
# ])
#     selected_advice = random.sample(advice, min(2, len(advice)))

#     return f"""
# Insight:
# {insight}

# Advice:
# - {"\n- ".join(selected_advice)}
# """


def generate_ai_coach(result, total_commits):
    try:
        prompt = f"""
You are an elite startup mentor and burnout coach.

Analyze the developer deeply and give HUMAN-like insight.

Data:
- Burnout Score: {result["score"]}
- Risk Level: {result["status"]}
- Total Commits: {total_commits}
- Features: {result["feature_breakdown"]}

Rules:
- Be specific (no generic advice)
- Vary wording every time
- Sound like a real mentor, not a robot
- Keep it concise but impactful

Format EXACTLY like this:

Insight:
<1-2 lines>

Risk:
<short explanation>

Advice:
- point 1
- point 2
- point 3
"""

        response = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],

    extra_headers={
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "CollapseGuard"
    }
)

        return response.choices[0].message.content

    except Exception:
        # 🔥 SMART FALLBACK LOGIC
        score = result["score"]
        features = result["feature_breakdown"]

        insight = ""
        risk = ""
        advice = []

        # ---- Insight ----
        if score < 30:
            insight = "You are in a strong and sustainable productivity zone."
            risk = "Low burnout risk."
            advice.append("Keep maintaining your current rhythm.")
        elif score < 60:
            insight = "Your workload is starting to increase noticeably."
            risk = "Moderate burnout risk."
            advice.append("Take short breaks between work sessions.")
        else:
            insight = "Your workload pattern indicates possible overwork."
            risk = "High burnout risk."
            advice.append("Reduce workload immediately.")
            advice.append("Prioritize rest and recovery.")

        # ---- Feature-based tweaks ----
        if features.get("late_night_intensity", 0) > 40:
            advice.append("Avoid late-night coding sessions.")

        if features.get("weekend_ratio", 0) > 40:
            advice.append("Try to disconnect during weekends.")

        if features.get("work_streak_index", 0) > 50:
            advice.append("Break long work streaks with rest days.")

        return f"""Insight:
{insight}

Risk:
{risk}

Advice:
- {'\n- '.join(advice)}"""
from sklearn.linear_model import LinearRegression
import numpy as np

class PredictRequest(BaseModel):
    burnout_history: List[float]
    features: Optional[Dict] = {}

@app.post("/predict-burnout")
def predict_burnout(req: PredictRequest):
    try:
        scores = req.burnout_history

        if len(scores) < 2:
            return {"prediction": [scores[-1]] * 4}

        # ---- Prepare data ----
        X = np.array(range(len(scores))).reshape(-1, 1)
        y = np.array(scores)

        # ---- Train ML model ----
        model = LinearRegression()
        model.fit(X, y)

        # ---- Feature impact ----
        f = req.features or {}
        behavior_shift = (
            f.get("late_night_intensity", 0) * 0.02 +
            f.get("weekend_ratio", 0) * 0.015 +
            f.get("volatility_index", 0) * 0.02 -
            f.get("consistency_score", 0) * 0.015
        )

        # ---- Detect flat trend ----
        slope = model.coef_[0]
        is_flat = abs(slope) < 0.05

        # ---- Real variation (NOT random) ----
        volatility = np.std(y)

        # future = []

        # # ---- Predict next 4 weeks ----
        # for i in range(1, 5):
        #     base_pred = model.predict([[len(scores) + i]])[0]

        #     if is_flat:
        #         # 🔥 FIX: remove flatness intelligently
        #         adjusted = (
        #             base_pred
        #             + behavior_shift * (i * 1.2)
        #             + volatility * (0.15 * i)
        #         )
        #     else:
        #         # 📈 normal ML
        #         adjusted = base_pred + behavior_shift * i

        #     # clamp 0–100
        #     adjusted = max(0, min(100, adjusted))

        #     future.append(round(adjusted, 1))

        future = []

        for i in range(1, 5):
            base_pred = model.predict([[len(scores) + i]])[0]

    # 🔥 Use real data signals only
            adjusted = (
        base_pred
        + behavior_shift * i
        + slope * i              # real trend
        + volatility * 0.1 * i   # real variation from history
    )

            adjusted = max(0, min(100, adjusted))
            future.append(round(adjusted, 1))

            return {"prediction": future}

    except Exception as e:
        print("PREDICT ERROR:", e)
        return {"prediction": [scores[-1]] * 4}
        app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    return FileResponse("dist/index.html")