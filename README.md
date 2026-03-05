![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Algorithm](https://img.shields.io/badge/Algorithm-HuffmanCoding-purple)
![Deployment](https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render-black)


# AI Resume Analyzer

An AI-powered web application that analyzes resumes against job descriptions and provides insights such as match score, skill gaps, and improvement suggestions.

The platform helps job seekers quickly understand how well their resume matches a specific job role.

---

## Live Demo

Frontend (Vercel):  
https://resume-matching-zeta.vercel.app

Backend (Render):  
https://resume-matching.onrender.com

---

## Features

- Upload resume (PDF)
- Paste job description
- AI-based resume-job matching
- Match score visualization
- Skill distribution analysis
- Missing skill detection
- Skill radar chart
- Improvement suggestions for resume

---

## Tech Stack

Frontend
- React
- React Router
- Recharts (data visualization)
- CSS

Backend
- Python
- Flask
- Flask-CORS
- PDF parsing libraries

Deployment
- Vercel (Frontend)
- Render (Backend)

---

## Architecture

User
↓
React Frontend (Vercel)
↓
Flask Backend API (Render)
↓
Resume Parsing + Skill Analysis

---

## Installation (Local Setup)

Clone the repository
git clone https://github.com/Kandpalharsha/Resume-Matching.git

### Backend Setup
cd backend
pip install -r requirements.txt
python app.py
http://localhost:5000

### Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on
http://localhost:5173

---

## Environment Variables

Create `.env` file in frontend:

---
## Live Demo

Frontend:
https://resume-matching-zeta.vercel.app/

Backend API:
https://resume-matching-5av2.onrender.com/

## Future Improvements

- Advanced semantic skill matching
- Resume keyword optimization
- ATS score prediction
- Resume improvement suggestions using LLMs
- Support for DOCX resumes

---

## Author
Harsha Kandpal  
GitHub: https://github.com/Kandpalharsha


