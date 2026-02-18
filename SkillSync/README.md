# SkillSync 🚀  
**Full-Stack Skill & Project Tracking Platform**

![CI](https://github.com/faizangit123/skillsync/actions/workflows/ci.yml/badge.svg)
![Django](https://img.shields.io/badge/Django-REST%20Framework-092E20?logo=django)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?logo=postgresql)

---
**SCREENSHOT**
<img width="1920" height="1080" alt="skill" src="https://github.com/user-attachments/assets/8ca5976d-0860-47dd-9988-a20e8fd03c88" />
---

<img width="1920" height="1080" alt="Screenshot 2026-01-20 190623" src="https://github.com/user-attachments/assets/5d39e22b-ab60-45e7-bb47-fb2fb8dcaad7" />

---

<img width="1920" height="1080" alt="Screenshot 2026-01-20 190637" src="https://github.com/user-attachments/assets/1f75fa70-1469-4cd7-9044-97ca156bee61" />

---

<img width="1920" height="1080" alt="Screenshot 2026-01-20 190715" src="https://github.com/user-attachments/assets/acb243bd-8c42-4b43-968f-4f8f98c5bf56" />

---

## 📌 Overview

**SkillSync** is a **production-ready full-stack web application** designed to help developers track their **skills, projects, milestones, and progress analytics**.

The project demonstrates **real-world software engineering practices**, including:

- API-first backend development
- Clean, scalable frontend architecture
- JWT-based authentication
- Dockerized infrastructure
- CI/CD automation using GitHub Actions
- Cloud deployment (Render + Vercel)

---

## ✨ Key Features

### 🔐 Authentication
- JWT-based login & registration
- Secure protected routes
- Access & refresh token handling
- Auto-login after registration

### 🧠 Skills Management
- Create, update, and delete skills
- Skill categorization (Frontend, Backend, DevOps, etc.)
- Proficiency level & experience tracking

### 📁 Projects & Milestones
- Project CRUD operations
- Project status tracking (Planned, In Progress, Completed)
- Milestone creation and completion toggle
- Skill-to-project relationship mapping

### 📊 Dashboard & Analytics
- Project progress overview
- Milestone completion statistics
- Skill usage insights
- User-based data isolation
- **Google Analytics 4 (GA4) configured to track web traffic, user behavior, and page interactions for the production-deployed React application**


---

## 🧱 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- Context API
- Modular component architecture

### Backend
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- RESTful API design
- Environment-based settings

### Database
- PostgreSQL 16.11

### DevOps & Infrastructure
- Docker & Docker Compose
- GitHub Actions (CI)
- Render (Backend Hosting)
- Vercel (Frontend Hosting)

---

## 🏗️ Architecture Overview
```
Browser (Client)
|
v
Frontend (React + Vite) ---> Backend (Django REST)
| |
v v
Vercel Render
|
v
PostgreSQL
```
---


## 📂 Project Structure
```
SKILLSYNC-V3/
├── .github/
│ └── workflows/
│ └── ci.yml
├── skillsync-backend/
│ ├── apps/
│ ├── core/
│ ├── manage.py
│ └── Dockerfile
├── skillsync-frontend/
│ ├── src/
│ ├── public/
│ ├── vite.config.ts
│ └── Dockerfile
├── docker-compose.yml
├── .gitignore
├── LICENSE
└── README.md
```


---

 ## 🚀 Local Development 




### 1️⃣ Run with Docker
```bash
- Copy code
```docker compose up --build
```
### 2️⃣ Access the application

- Frontend: http://localhost:8080

- Backend API: http://localhost:8000

### 🌍 Production Deployment
# Backend (Render)
- Dockerized Django application

- Gunicorn WSGI server

- PostgreSQL database

- Environment-based configuration

# Frontend (Vercel)
- Vite production build

- Environment variable–based API connection

- Optimized static hosting

---

### 🔐 Environment Variables
# Frontend (Vercel)
```
env
Copy code
VITE_API_BASE_URL=https://skillsync-w0lo.onrender.com
```
# Backend (Render)
```
env
Copy code
DEBUG=False
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://...
ALLOWED_HOSTS=skillsync-w0lo.onrender.com
```
### 🤖 CI/CD Pipeline
- This project uses GitHub Actions for Continuous Integration.

# On every push & pull request:
- Install dependencies

- uild frontend & backend

- Validate project integrity

---

### 📄 CI Workflow:

```bash
Copy code
.github/workflows/ci.yml
```
---

### 🔒 Security Considerations
- JWT authentication with refresh tokens

- Environment-based secrets

- CORS protection

- User-based data access control

- Production-ready backend configuration

---

### 📡 API Design
- RESTful endpoints

- Token-based authentication

- Clear separation of concerns

- API-first approach (frontend easily replaceable)

### 👤 Author & Contact
- Vishal Kumar
- Full-Stack Developer

---
#LINK - GitHub: https://github.com/vishalkumar6397

##LINK - Email: vishalkumarmtr6397@gmail.com
---

### ⭐ Support
- If you find this project useful:

# ⭐ Star the repository

- 🍴 Fork it

- 📚 Use it as a learning reference

