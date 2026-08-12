# 🛡️ CollapseGuard

### AI-Powered Developer Burnout Intelligence & Prevention Platform

CollapseGuard is an **AI-powered developer wellness intelligence platform** that analyzes GitHub behavioral patterns to identify early signs of developer burnout.

It combines **behavioral feature engineering, machine learning, AI-powered coaching, forecasting, digital-twin simulation, and interactive analytics** to transform developer activity into meaningful wellness insights and actionable recommendations.

> **Goal:** Help developers understand unhealthy work patterns before they turn into burnout.

---

## 🚀 Why CollapseGuard?

Modern developers often work irregular hours, maintain long coding streaks, work on weekends, and experience highly variable workloads.

Traditional productivity tools measure **how much work is completed**.

CollapseGuard focuses on **whether that work pattern is sustainable**.

The platform analyzes behavioral signals such as:

* 🌙 Late-night coding activity
* 🔥 Long work streaks
* 📊 Workload volatility
* 📅 Weekend activity
* 📈 Burnout score trends
* ⚡ Contribution intensity
* 🔄 Behavioral consistency

These signals are converted into a **burnout risk score**, predictions, visual insights, and personalized AI recommendations.

---

# ✨ Key Features

### 🧠 AI Burnout Risk Prediction

Analyzes engineered behavioral features to estimate developer burnout risk and classify the current risk level.

### 📊 Behavioral Analytics

Transforms GitHub activity into meaningful behavioral indicators including:

* Late-night intensity
* Weekend activity ratio
* Workload volatility
* Work streak index
* Consistency score
* Contribution patterns

### 📈 Burnout Forecasting

Uses historical burnout scores and behavioral signals with a **Linear Regression forecasting model** to estimate future burnout trends.

### 🤖 AI Burnout Coach

Provides personalized, context-aware recommendations using an AI-powered conversational assistant.

The coach can consider:

* Current burnout score
* Burnout status
* Behavioral features
* Previous conversation history
* User messages

### 🧬 Digital Twin Simulation

Models a developer's behavioral state and allows workload scenarios to be explored to understand how changes in behavior can influence future burnout risk.

### 💬 Reflection Tracking

Allows developers to record personal reflections and mood information alongside burnout measurements.

### 🔐 GitHub Authentication

Supports GitHub-based authentication through the backend authentication layer.

### 📊 Interactive Dashboard

A React-based dashboard presents:

* Burnout score
* Risk status
* Behavioral metrics
* Forecasts
* AI insights
* Recommendations
* Reflections
* Interactive charts and visualizations

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     GitHub Activity  │
                    │  Behavioral Signals  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Feature Engineering  │
                    │                      │
                    │ • Late-night activity│
                    │ • Weekend activity   │
                    │ • Workload volatility│
                    │ • Work streaks       │
                    │ • Consistency        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   ML Risk Analysis   │
                    │                      │
                    │ Burnout Score        │
                    │ Risk Classification  │
                    │ Forecasting           │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │  AI Coach       │          │ Digital Twin    │
       │ Recommendations │          │ Simulation      │
       └────────┬────────┘          └────────┬────────┘
                │                            │
                └──────────────┬─────────────┘
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Dashboard    │
                    │                      │
                    │ Analytics • Forecast │
                    │ AI Coach • Reflection│
                    └──────────────────────┘
```

---

# 🧩 Core Modules

## 1. Behavioral Feature Engineering

The feature engineering layer converts raw developer activity into behavioral indicators that can be used by the prediction system.

Key indicators include:

* `late_night_intensity`
* `weekend_ratio`
* `work_streak_index`
* `volatility_index`
* `consistency_score`

---

## 2. Burnout Prediction Engine

The prediction engine analyzes behavioral features and produces a burnout score and corresponding risk level.

The system is designed to identify patterns associated with potential overwork rather than simply measuring developer productivity.

---

## 3. Burnout Forecasting

Historical burnout scores are processed using a machine-learning forecasting model.

The current implementation uses **Linear Regression** combined with behavioral feature impact and historical volatility to generate future burnout predictions.

```text
Historical Burnout Scores
          ↓
Linear Regression
          ↓
Trend / Slope Analysis
          ↓
Behavioral Feature Impact
          ↓
Volatility Adjustment
          ↓
Future Burnout Predictions
```

---

## 4. AI Burnout Coach

CollapseGuard integrates an AI conversational assistant through **OpenRouter**.

The AI coach receives relevant burnout context and provides human-like responses instead of simply displaying raw analytics.

Example:

```text
Developer:
"I feel exhausted after coding all night."

CollapseGuard AI:
"Your recent late-night activity may be reducing recovery
time. Consider ending today's session earlier and taking
a proper break before continuing."
```

---

## 5. Digital Twin Simulation

The digital twin component represents developer behavioral patterns and allows different workload conditions to be explored.

This provides a simulation-oriented approach to answering questions such as:

> "What could happen to my burnout risk if my current work pattern continues?"

---

## 6. Reflection System

Developers can record:

* Mood
* Personal reflections
* Burnout level
* Timestamp

Reflections are stored and retrieved through backend APIs, allowing developers to compare subjective experiences with behavioral analytics.

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* **Vite**
* **JavaScript (ES6+)**
* Interactive data visualization
* Firebase authentication/services where configured

## Backend

* **Python**
* **FastAPI**
* **Uvicorn**
* **Pydantic**
* **Starlette**
* **Session Middleware**
* **CORS Middleware**

## Machine Learning & Data Processing

* **Scikit-learn**
* **NumPy**
* Linear Regression
* Behavioral feature engineering
* Time-series analysis

## AI

* **OpenRouter API**
* OpenAI-compatible API client
* AI-powered burnout coaching

## Authentication & Services

* GitHub OAuth
* Firebase
* Environment-based secret management

---

# 📁 Project Structure

```text
collapseguard-phase4/
│
├── backend/
│   ├── ai_coach.py
│   ├── auth.py
│   ├── config.py
│   ├── database.py
│   ├── feature_engineering.py
│   ├── github_service.py
│   ├── main.py
│   ├── ml_model.py
│   ├── models.py
│   ├── requirements.txt
│   ├── reflections.json
│   └── .env
│
├── frontend/
│   └── collapse-guard/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── pages/
│       │   └── ...
│       ├── package.json
│       ├── vite.config.js
│       └── .env
│
├── .gitignore
└── README.md
```

> **Note:** `.env` files contain secrets and should never be committed to GitHub.

---

# 🔄 Application Flow

```text
User
 │
 ▼
GitHub Authentication
 │
 ▼
Developer Activity Data
 │
 ▼
Behavioral Feature Engineering
 │
 ▼
Burnout Risk Analysis
 │
 ├───────────────┐
 ▼               ▼
Forecasting     AI Coach
 │               │
 └───────┬───────┘
         ▼
Digital Twin / Simulation
         │
         ▼
Interactive Dashboard
         │
         ▼
Insights + Recommendations
         │
         ▼
Reflection Tracking
```

---

# 🔌 Backend API

The FastAPI backend currently provides functionality including:

| Endpoint              | Method  | Purpose                    |
| --------------------- | ------- | -------------------------- |
| `/`                   | GET     | Backend health/status      |
| Authentication routes | Various | GitHub authentication      |
| `/ai-chat`            | POST    | AI burnout coaching        |
| `/save-reflection`    | POST    | Save developer reflection  |
| `/get-reflections`    | GET     | Retrieve reflections       |
| `/reflections`        | GET     | Reflection retrieval alias |
| `/predict-burnout`    | POST    | Generate burnout forecast  |

### Example burnout prediction request

```json
{
  "burnout_history": [32, 38, 45, 52],
  "features": {
    "late_night_intensity": 60,
    "weekend_ratio": 45,
    "volatility_index": 50,
    "consistency_score": 40
  }
}
```

The API returns future burnout predictions for the next four periods.

---

# 💻 Local Development

## Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js 18+
* npm
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/akshara2006-psit/collapseguard-ai.git
cd collapseguard-ai
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create and activate a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`.

Example:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SESSION_SECRET=your_session_secret
```

> Never commit real API keys, GitHub secrets, Firebase credentials, or other private credentials.

Start the FastAPI server:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend/collapse-guard
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file:

```text
.env
```

Add the required frontend configuration values.

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Sensitive credentials should be stored in environment variables.

### Backend

```text
backend/.env
```

Typical configuration includes:

```text
OPENROUTER_API_KEY
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
SESSION_SECRET
```

### Frontend

```text
frontend/collapse-guard/.env
```

Frontend-specific configuration such as Firebase/Vite environment variables should be stored here.

### Security

The project uses `.gitignore` to prevent sensitive and generated files from being committed.

Never upload:

```text
.env
.env.local
API keys
OAuth secrets
private credentials
__pycache__/
```

---

# 📊 Example Insights

CollapseGuard can transform behavioral data into insights such as:

### Low Risk

> Your current work pattern appears relatively sustainable. Continue maintaining consistent work and recovery cycles.

### Moderate Risk

> Your workload is becoming more intensive. Consider introducing regular breaks and reducing consecutive work sessions.

### High Risk

> Your current activity pattern indicates possible overwork. Reducing late-night sessions and protecting recovery time may help lower burnout risk.

---

# 🎯 Project Objectives

CollapseGuard aims to:

* Detect early behavioral indicators of developer burnout
* Convert GitHub activity into meaningful wellness metrics
* Forecast potential future burnout trends
* Provide personalized AI-based interventions
* Encourage healthier developer work patterns
* Combine objective behavioral signals with subjective reflections
* Explore developer behavior through digital-twin simulation

---

# 🚀 Future Improvements

Planned improvements include:

* Real GitHub API-based behavioral data ingestion
* More advanced machine-learning models
* Improved time-series forecasting
* Personalized intervention strategies
* Long-term wellness tracking
* Team-level burnout analytics
* More sophisticated digital-twin simulations
* Cloud-native scalable deployment
* Automated wellness alerts
* Improved model explainability

---

# 🌐 Deployment

The project can be deployed as a full-stack application with:

```text
React / Vite Frontend
        ↓
FastAPI Backend
        ↓
Machine Learning + AI Services
        ↓
GitHub / Firebase / OpenRouter
```

For production deployment, environment variables must be configured through the hosting platform rather than committed to the repository.

---

# 🔒 Security Considerations

CollapseGuard handles authentication credentials and third-party API configuration.

The project therefore follows these practices:

* Secrets stored in environment variables
* `.env` files excluded through `.gitignore`
* OAuth credentials not hard-coded into source files
* Generated Python cache files excluded from version control
* Production secrets should be managed through deployment-platform environment variables

---

# 🧪 Development Notes

CollapseGuard is currently designed as a research-oriented full-stack prototype demonstrating the combination of:

**Behavioral Analytics + Machine Learning + Generative AI + Digital Twin Simulation + Developer Wellness**

The burnout score should be interpreted as a **behavioral risk indicator**, not a medical diagnosis.

---

# 👩‍💻 Author

**Akshara Gupta**

GitHub:
https://github.com/akshara2006-psit

---

# ⭐ Project

If you find CollapseGuard interesting, consider giving the repository a ⭐ on GitHub.

**CollapseGuard — Understand your work patterns. Predict burnout. Build sustainably.**
