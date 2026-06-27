# MoodLog — AI Journal & Sentiment Tracker

## Overview

An iOS journaling app that analyses your mood over time using NLP. Write daily entries in plain text — the app detects your emotional tone, tracks sentiment trends, and generates weekly AI-written insights about your mental patterns. Private, offline-first, and beautifully simple.

**Target users:** People who journal, anyone tracking their mental wellbeing, therapy clients, productivity-focused individuals  
**Core value:** Your journal understands you — not just stores you. See your emotional patterns before you feel them

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Frontend | React Native + Expo |
| Styling | NativeWind (Tailwind for React Native) |
| Charts | Victory Native (mood trends graphs) |
| Backend | FastAPI (Python) |
| Sentiment NLP | `cardiffnlp/twitter-roberta-base-sentiment` via HuggingFace (free) |
| Insights Generation | Groq LLaMA 3.1 70B (free) |
| Database | MongoDB Atlas (free tier) |
| Backend Deploy | Railway (free tier) |
| App Demo | Expo Go (QR code) + Expo Web → Vercel |

> **Cost: $0** — HuggingFace inference free tier + Groq free + MongoDB free + Railway free

---

## API Keys Setup

### 1. HuggingFace Inference API (Sentiment — free)

1. Go to `huggingface.co` → sign up
2. Go to **Settings** → **Access Tokens** → **New Token**
3. Select **Read** role → copy token

```env
HF_TOKEN=hf_your_token_here
```

**Model:** `cardiffnlp/twitter-roberta-base-sentiment-latest`  
**Free tier:** Generous free inference calls, no credit card needed

---

### 2. Groq API Key (Weekly insights — free)

1. Go to `console.groq.com` → sign up
2. **API Keys** → **Create API Key**

```env
GROQ_API_KEY=gsk_your_key_here
```

---

### 3. MongoDB Atlas (Database — free)

1. `cloud.mongodb.com` → **M0 Free Tier** cluster
2. Get connection string

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moodlog
```

---

### 4. Environment File

`backend/.env`:
```env
HF_TOKEN=hf_your_token_here
GROQ_API_KEY=gsk_your_key_here
MONGODB_URI=mongodb+srv://your_connection_string
APP_ENV=development
```

`backend/.env.example` (commit this):
```env
HF_TOKEN=your_huggingface_token_here
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string
APP_ENV=development
```

---

## Features

### Core
- Write daily journal entries (free text)
- Real-time sentiment analysis on each entry:
  - Emotion label: Positive / Negative / Neutral
  - Confidence score (0–1)
  - Dominant emotion: joy, sadness, anger, fear, surprise
- Mood score (1–10) calculated from sentiment
- Weekly AI-generated insight report:
  - Mood trend summary
  - Patterns detected (e.g. "You feel more positive on weekdays")
  - Personalised suggestions
- Mood calendar — colour-coded by day
- Trend graph — 7 / 30 day mood line chart
- Streak counter — consecutive days journaled

### UI/UX
- Minimal, calm interface (dark + soft purple accents)
- Daily prompt if user hasn't written yet ("How are you feeling today?")
- Emoji mood selector as optional quick-log
- Smooth mood graph animations
- Weekly report card with share option
- All data private — user-scoped by device ID

### Technical
- Sentiment runs on every save (debounced 1s)
- Weekly insights generated every Sunday via scheduled job
- Entries stored with sentiment metadata in MongoDB
- Mood score formula: weighted average of last 7 day sentiments
- Offline support: entries cached locally, synced when online

---

## Project Structure

```
moodlog/
├── backend/
│   ├── main.py                   # FastAPI app
│   ├── services/
│   │   ├── sentiment.py          # HuggingFace sentiment analysis
│   │   ├── insights.py           # Groq weekly insights generation
│   │   └── scheduler.py          # Weekly report cron job
│   ├── models/
│   │   └── schemas.py            # Pydantic models
│   ├── db/
│   │   └── mongo.py              # MongoDB connection + queries
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   └── Dockerfile
├── mobile/
│   ├── app/
│   │   ├── index.tsx             # Home — today's entry + mood
│   │   ├── journal.tsx           # Write / edit entry
│   │   ├── history.tsx           # Calendar + past entries
│   │   └── insights.tsx          # Weekly report screen
│   ├── components/
│   │   ├── MoodChart.tsx         # Victory Native line chart
│   │   ├── MoodCalendar.tsx      # Colour-coded calendar grid
│   │   ├── EntryCard.tsx
│   │   ├── InsightReport.tsx
│   │   └── StreakBadge.tsx
│   ├── services/
│   │   └── api.ts
│   ├── app.json
│   ├── package.json
│   └── tailwind.config.js
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/entries` | Save journal entry + run sentiment analysis |
| GET | `/entries` | List all entries for a user |
| GET | `/entries/{id}` | Get single entry with sentiment data |
| PUT | `/entries/{id}` | Update an entry |
| DELETE | `/entries/{id}` | Delete an entry |
| GET | `/insights/weekly` | Get latest weekly AI insight report |
| GET | `/mood/trend?days=7` | Get mood score trend data for chart |

---

## Sentiment Output Schema

```json
{
  "entry_id": "abc123",
  "text": "Had a really productive day. Finished the project ahead of schedule.",
  "sentiment": {
    "label": "positive",
    "score": 0.94,
    "emotions": {
      "joy": 0.81,
      "surprise": 0.10,
      "neutral": 0.09
    }
  },
  "mood_score": 8.2,
  "date": "2024-06-20"
}
```

---

## Weekly Insight Example

```
This week you wrote 6 entries. Your average mood score was 7.4 — 
up from 6.1 last week. You felt most positive on Wednesday and Thursday, 
often after completing work tasks. Your entries on Monday showed higher 
stress. Consider starting your week with a lighter workload if possible.
```

---

## Deployment

```bash
# Local backend
docker compose up --build
# Backend: localhost:8000

# Mobile — run on iPhone
npx expo start
# Scan QR code with Expo Go app
```

**Production:**
- Backend → Railway (add env vars in Railway dashboard)
- Web demo → `npx expo export --platform web` → Vercel

---

## Estimated Build Time

| Phase | Time |
|-------|------|
| HuggingFace sentiment + Groq insights | 1 day |
| FastAPI backend + MongoDB + scheduler | 1 day |
| React Native journal + home screen | 1 day |
| Mood chart + calendar (Victory Native) | 1 day |
| Weekly insights screen | 0.5 day |
| Integration + testing | 0.5 day |
| Deployment | 0.5 day |
| **Total** | **~5.5 days** |

---

## Portfolio Value

- NLP sentiment analysis in a real consumer product context
- Data visualisation (charts, calendar) makes demos visually rich
- Mental health + productivity space is growing fast — strong market signal
- Covers: HuggingFace, Groq, FastAPI, React Native, Expo, MongoDB, Victory Native
- Zero cost to run — always-on portfolio demo
