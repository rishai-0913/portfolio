# FitScore — Resume vs Job Description Matcher

## Overview

A web tool that takes a resume (PDF or paste) and a job description (text), then uses an LLM to analyse the match — scoring compatibility, identifying gaps, highlighting strengths, and generating actionable improvement suggestions.

**Target users:** Job seekers, HR teams, recruitment agencies, career coaches  
**Core value:** Instantly know how well a resume fits a role, and exactly what to change to improve the score

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Tailwind CSS |
| Backend | FastAPI (Python) |
| LLM | OpenAI GPT-4o |
| PDF Parsing | PyMuPDF |
| Validation | Pydantic |
| Containerisation | Docker + docker-compose |
| Deployment | Railway (backend) + Vercel (frontend) |

---

## Features

### Core
- Upload resume as PDF or paste raw text
- Paste job description text
- AI-generated match score (0–100) with breakdown
- Skills gap analysis — missing skills highlighted
- Matching keywords — skills/terms present in both
- Improvement suggestions — specific, actionable rewrites
- ATS compatibility check — flags resume formatting issues

### Score Breakdown
- Skills match (40%)
- Experience relevance (30%)
- Education fit (15%)
- Keywords / ATS score (15%)

### UI/UX
- Split view — resume on left, JD on right
- Animated score meter (0 → result)
- Colour-coded tags: matched (green), missing (red), partial (yellow)
- Suggestions panel with copy-to-clipboard for each improvement
- Export results as PDF report
- Mobile responsive

### Technical
- Structured output using OpenAI JSON mode / Pydantic
- Retry logic on LLM API failures
- Resume text cached in session — re-analyse against different JDs without re-uploading
- Rate limiting: 10 requests per IP per hour

---

## Project Structure

```
resume-jd-matcher/
├── backend/
│   ├── main.py               # FastAPI app + routes
│   ├── analyzer/
│   │   ├── parser.py         # PDF text extraction
│   │   ├── prompt.py         # System + user prompts
│   │   └── scorer.py         # LLM call + structured output parsing
│   ├── models/
│   │   └── schemas.py        # Pydantic models for request/response
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeInput.tsx
│   │   │   ├── JDInput.tsx
│   │   │   ├── ScoreMeter.tsx
│   │   │   ├── SkillTags.tsx
│   │   │   └── Suggestions.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyse` | Submit resume + JD, receive full analysis |
| POST | `/parse-pdf` | Extract text from uploaded PDF |

---

## LLM Output Schema

```json
{
  "score": 78,
  "breakdown": {
    "skills": 82,
    "experience": 75,
    "education": 90,
    "keywords": 65
  },
  "matched_skills": ["Python", "FastAPI", "Docker"],
  "missing_skills": ["Kubernetes", "AWS Lambda"],
  "suggestions": [
    "Add quantified achievements — e.g. 'Reduced API latency by 40%'",
    "Include Kubernetes in skills or mention container orchestration experience"
  ],
  "ats_issues": ["Avoid tables in resume — ATS systems may skip them"]
}
```

---

## Deployment

```bash
# Local
docker compose up --build

# Backend: localhost:8000
# Frontend: localhost:3000
```

**Production:**
- Backend → Railway
- Frontend → Vercel

---

## Estimated Build Time

| Phase | Time |
|-------|------|
| PDF parser + LLM prompt engineering | 0.5 day |
| FastAPI routes + Pydantic schemas | 0.5 day |
| React frontend + score UI | 1 day |
| Integration + edge case testing | 0.5 day |
| Docker + deployment | 0.5 day |
| **Total** | **~3 days** |

---

## Portfolio Value

- Highly relatable — every person with a job has used something like this
- Viral/shareable — people will send the link to friends
- Shows structured LLM output, prompt engineering, PDF parsing
- Clean visual output (score meter, tags) looks impressive in screenshots
- Covers: OpenAI, FastAPI, React, Pydantic, Docker
