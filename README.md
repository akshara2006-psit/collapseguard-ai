# CollapseGuard

CollapseGuard is an AI-powered developer wellness intelligence platform that analyzes developer behavioral patterns from GitHub activity to predict burnout risk. The system uses machine learning, behavioral feature engineering, and real-time analytics to transform developer activity data into actionable insights and intervention recommendations.

---

## Overview

CollapseGuard is designed to detect early signs of developer burnout by analyzing behavioral signals such as coding activity patterns, workload distribution, and time-based contribution behavior. It builds predictive models that estimate burnout risk and visualizes insights through an interactive analytics dashboard.

The system also includes simulation-based digital twin modeling to represent and analyze how developer behavior evolves over time under different workload conditions.

---

## Key Features

- AI-based burnout risk prediction using behavioral data
- GitHub activity pattern analysis (commit timing, frequency, intensity)
- Feature engineering from developer behavioral signals
- Detection of late-night coding activity patterns
- Workload volatility and weekend activity analysis
- Digital twin simulation for developer behavior modeling
- Real-time analytics dashboard with interactive visualizations
- Burnout forecasting and trend analysis
- Intervention and reflection tracking system

---

## System Architecture

### 1. Data Layer
- GitHub activity signals (simulated or extracted behavioral metrics)
- Time-series behavioral data processing

### 2. Feature Engineering Layer
- Late-night activity scoring
- Weekend intensity tracking
- Workload volatility measurement
- Behavioral pattern normalization

### 3. Machine Learning Layer
- Burnout risk prediction model
- Time-based forecasting engine
- Behavioral classification logic

### 4. Backend Layer (FastAPI)
- API endpoints for predictions and analytics
- Data processing pipeline
- Model inference handling

### 5. Frontend Layer (React)
- Interactive analytics dashboard
- Real-time visualization of burnout metrics
- User insights and prediction display

---

## Tech Stack

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- Data visualization libraries (charts/graphs)

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- Python data processing libraries

### Machine Learning
- Behavioral analytics modeling
- Time-series prediction logic
- Feature engineering pipelines

---

## Core Modules

### 1. Behavioral Analysis Engine
Processes developer activity patterns and extracts meaningful behavioral indicators.

### 2. Burnout Prediction System
Uses engineered features to predict burnout probability and risk levels.

### 3. Digital Twin Simulation
Simulates developer behavior under different workload conditions to analyze long-term impact.

### 4. Analytics Dashboard
Displays real-time insights, predictions, and behavioral trends using interactive visualizations.

---

## Project Flow
User Behavioral Data
↓
Feature Engineering Layer
↓
ML Prediction Model
↓
FastAPI Backend (Inference API)
↓
React Dashboard Visualization
---

## Project Structure
root/
│
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ ├── .env
│
├── frontend/
│ ├── collapse-guard/
│ │ ├── src/
│ │ ├── firebase.js
│ │ ├── package.json
│ │ ├── .env
│
└── README.md


---

## Local Setup Instructions

### Backend Setup (FastAPI)

Navigate to backend directory:
cd backend

Install dependencies:
pip install -r requirements.txt

Run backend server:
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload

Backend runs at:
http://127.0.0.1:8000

---

### Frontend Setup (React + Vite)

Navigate to frontend directory:
cd frontend
cd collapse-guard

Install dependencies:
npm install

Run frontend:
npm run dev

Frontend runs at:
http://localhost:5173



-------------------------------------------------------------------------------------------------------------------------------------
**Common Issues
Backend not starting

Ensure main.py exists inside backend directory and uvicorn command references correct app instance.

---
# Future Improvements
Integration with real GitHub API data
Advanced deep learning-based prediction models
Personalized burnout prevention recommendations
Long-term productivity tracking system
Team-level burnout analytics
Deployment with scalable cloud architecture
Proper initialization in frontend

