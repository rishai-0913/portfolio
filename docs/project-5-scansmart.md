# ScanSmart — AI Receipt & Document Scanner

## Overview

An iOS app that uses the camera to scan any receipt, invoice, or document and instantly extracts structured data using OCR and LLM. Converts a photo into clean, queryable information — line items, totals, dates, vendor names — ready to export or save.

**Target users:** Small business owners, freelancers, finance teams, travellers tracking expenses  
**Core value:** Point, shoot, done — no manual data entry ever again

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Frontend | React Native + Expo |
| Styling | NativeWind (Tailwind for React Native) |
| Camera | Expo Camera API |
| Backend | FastAPI (Python) |
| OCR | Tesseract (self-hosted, free) |
| Data Extraction | Groq LLaMA 3.1 70B (free) |
| Database | MongoDB Atlas (free tier) |
| Backend Deploy | Railway (free tier) |
| App Demo | Expo Go (QR code) + Expo Web → Vercel |

> **Cost: $0** — Tesseract is open source, Groq free tier, MongoDB Atlas free, Railway free

---

## API Keys Setup

### 1. Groq API Key (LLM extraction — free)

1. Go to `console.groq.com`
2. Sign up → **API Keys** → **Create API Key**
3. Copy key (starts with `gsk_...`)

```env
GROQ_API_KEY=gsk_your_key_here
```

**Model used:** `llama-3.1-70b-versatile`

---

### 2. Tesseract OCR (fully local — no key needed)

Installs as a system dependency + Python package:

```bash
# macOS
brew install tesseract

# In requirements.txt
pytesseract
Pillow
opencv-python
```

No API key, no cost, runs fully on your server.

---

### 3. MongoDB Atlas (Database — free)

1. `cloud.mongodb.com` → create free account
2. Create **M0 Free Tier** cluster
3. Get connection string

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/scansmart
```

---

### 4. Environment File

`backend/.env`:
```env
GROQ_API_KEY=gsk_your_key_here
MONGODB_URI=mongodb+srv://your_connection_string
APP_ENV=development
MAX_IMAGE_SIZE_MB=10
TESSERACT_CMD=/usr/bin/tesseract
```

`backend/.env.example` (commit this):
```env
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string
APP_ENV=development
MAX_IMAGE_SIZE_MB=10
TESSERACT_CMD=/usr/bin/tesseract
```

---

## Features

### Core
- Capture document with camera or pick from gallery
- Auto-crop and perspective correction on scanned image
- OCR text extraction via Tesseract
- LLM-powered structured data extraction:
  - Vendor / merchant name
  - Date and time
  - Line items with quantities and prices
  - Subtotal, tax, total
  - Payment method
  - Document type (receipt, invoice, bill)
- Save scans with extracted data to history
- Export as JSON or CSV
- Search saved scans by vendor, date, or amount

### UI/UX
- Full-screen camera with document edge detection overlay
- Processing animation: scanning → extracting → done
- Clean card display of extracted data
- Editable fields — correct any OCR errors inline
- History feed with thumbnail previews
- Filter by document type or date range

### Technical
- Image preprocessing: grayscale, threshold, denoise before OCR
- Confidence scoring on OCR output — flags low-confidence text
- LLM structured output with JSON mode (Pydantic validation)
- Fallback: if OCR confidence is low, prompt user to retake
- Images stored as base64 in MongoDB (or Railway volume)

---

## Project Structure

```
scansmart/
├── backend/
│   ├── main.py                  # FastAPI app
│   ├── services/
│   │   ├── ocr.py               # Tesseract OCR + image preprocessing
│   │   ├── extractor.py         # Groq LLM structured extraction
│   │   └── image.py             # Image handling + crop/resize
│   ├── models/
│   │   └── schemas.py           # Pydantic models
│   ├── db/
│   │   └── mongo.py             # MongoDB connection + queries
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   └── Dockerfile
├── mobile/
│   ├── app/
│   │   ├── index.tsx            # Home — scan history
│   │   ├── camera.tsx           # Camera capture screen
│   │   └── scan/[id].tsx        # Scan detail + extracted data
│   ├── components/
│   │   ├── CameraView.tsx
│   │   ├── ScanCard.tsx
│   │   ├── ExtractedData.tsx
│   │   └── ProcessingOverlay.tsx
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
| POST | `/scan` | Upload image, receive OCR text + extracted data |
| GET | `/scans` | List all saved scans |
| GET | `/scans/{id}` | Get a single scan with full data |
| PUT | `/scans/{id}` | Update/correct extracted data |
| DELETE | `/scans/{id}` | Delete a scan |
| GET | `/scans/export?format=csv` | Export all scans as CSV |

---

## LLM Output Schema

```json
{
  "document_type": "receipt",
  "vendor": "Starbucks",
  "date": "2024-06-20",
  "time": "09:34",
  "line_items": [
    { "name": "Caffe Latte", "qty": 1, "price": 4.95 },
    { "name": "Blueberry Muffin", "qty": 1, "price": 3.25 }
  ],
  "subtotal": 8.20,
  "tax": 0.74,
  "total": 8.94,
  "payment_method": "Visa ****4821",
  "confidence": 0.94
}
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
- Backend → Railway (Tesseract pre-installed on Railway's base image)
- Web demo → `npx expo export --platform web` → Vercel

---

## Estimated Build Time

| Phase | Time |
|-------|------|
| Tesseract OCR + image preprocessing | 1 day |
| Groq LLM extraction + Pydantic schema | 0.5 day |
| FastAPI backend + MongoDB | 0.5 day |
| React Native camera + capture screen | 1 day |
| History feed + detail screen | 0.5 day |
| Integration + testing | 0.5 day |
| Deployment | 0.5 day |
| **Total** | **~4.5 days** |

---

## Portfolio Value

- Camera + OCR + LLM = visually impressive demo
- Strong B2B use case — easy to sell to small businesses
- Covers: Tesseract, Groq, FastAPI, React Native, Expo, MongoDB
- Zero cost to run — perfect for live portfolio demo
