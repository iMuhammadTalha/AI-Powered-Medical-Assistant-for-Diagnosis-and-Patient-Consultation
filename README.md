---
title: AI-Powered-Medical-Assistant-for-Diagnosis-and-Patient-Consultation
emoji: 🏥  
colorFrom: blue  
colorTo: green  
sdk: docker  # or "streamlit" or "docker" depending on your app  
app_file: Dockerfile  # Main file of your application  
pinned: false  
---

# AI-Powered-Medical-Assistant-for-Diagnosis-and-Patient-Consultation

## Overview
AI-Powered Medical Assistant is a smart healthcare application designed to assist in medical diagnosis and patient consultation. The system leverages AI-driven algorithms to provide preliminary assessments based on patient symptoms and medical history. The application consists of a FastAPI backend and a React frontend, offering a seamless user experience for both patients and healthcare professionals.

## Features
- **AI-Based Diagnosis**: Uses computer vision and large language models to analyze symptoms and suggest possible conditions.
- **Patient Consultation**: Provides guidance on the next steps for treatment and consultation.
- **Real-Time Updates**: Ensures up-to-date medical recommendations.
- **Listening & Speaking**: Patients can record their voice for queries, and the system provides written and sound responses.

## Project Setup

### For Backend setup
#### Prerequisites:
- Python 3.8+
- Virtual environment (venv)
- FastAPI & Uvicorn

#### Installation Steps:

1. Clone the repository:
```bash
git clone https://github.com/iMuhammadTalha/AI-Powered-Medical-Assistant-for-Diagnosis-and-Patient-Consultation.git
```

2. Navigate to the backend folder:
```bash 
cd backend
``` 

3. Create and activate a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```
4. Install dependencies:
```bash 
pip install -r requirements.txt
```

5. Run the backend server:
```bash
uvicorn app.main:app --reload
```

## For Frontend Setup
#### Prerequisites:
- Node.js 16+
- npm

#### Installation Steps:
1. Navigate to the frontend directory:
```bash 
cd frontend
```

2. Install required dependencies:
```bash 
npm install
```

3. Run the development server:
```bash 
npm run dev
```

## Technologies Used
- Backend: FastAPI, Uvicorn, Python
- Frontend: React.js, Tailwind CSS
- Computer Vision & LLM: Grok, LAMA, gtt


## Usage Instructions

- Enter Symptoms & query:
Patients can input symptoms for AI-based diagnosis via text, speech, or an image.

- View Diagnosis & Recommendations:
The system suggests potential treatment conditions via text or sound.

## Deployment

This project supports deployment using Docker and Hugging Face Spaces.

### Using Docker:
1. Ensure Docker is installed.
2. Build and run the container:
```bash
docker build -t ai-medical-assistant .
docker run -p 8000:8000 ai-medical-assistant
```

### Hosted on Hugging Face:
You can also explore the application on Hugging Face.

### Developed by:
Muhammad Talha

Email: muhammadtalha3810@gmail.com