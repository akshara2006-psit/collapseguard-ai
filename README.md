# CollapseGuard

A full-stack web application built using React (frontend) and FastAPI (Python backend), featuring GitHub OAuth authentication and Firebase integration for scalable authentication and backend services.

---

## Overview

CollapseGuard is a modular full-stack application designed to handle secure authentication, backend API communication, and frontend state management. It integrates GitHub OAuth for login and Firebase for additional services such as authentication and configuration management.

---

## Features

- GitHub OAuth authentication flow
- Fast and responsive React (Vite) frontend
- FastAPI-based backend service
- Firebase integration for authentication/services
- Secure API communication between frontend and backend
- Environment-based configuration using .env files
- Modular and scalable project structure

---

## Tech Stack

### Frontend
- React.js (Vite)
- JavaScript (ES6+)
- Firebase SDK
- Fetch API / Axios

### Backend
- FastAPI (Python)
- Uvicorn ASGI server
- Requests library

### Authentication
- GitHub OAuth 2.0  
  GitHub Inc. (developer platform for OAuth authentication)

- Firebase  
  Google Firebase (backend-as-a-service platform)

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

**OAuth issues

Check:

Correct GitHub client ID and secret
Correct callback URL
Backend running before login attempt
Firebase issues

**Verify:

Firebase config values
Proper initialization in frontend


**Future Improvements
JWT-based authentication system
Database integration (PostgreSQL or Firestore)
Role-based access control
Protected frontend routes
Deployment on cloud platforms
Session persistence and refresh tokens
