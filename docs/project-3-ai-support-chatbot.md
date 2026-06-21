# Helix — AI Customer Support Chatbot

## Overview

A fully functional AI-powered customer support chatbot that businesses can configure with their own knowledge base (FAQs, product docs, policies) and embed on any website. Built with LangGraph for stateful multi-turn conversation management, with a clean embeddable widget and a separate admin panel for configuration.

**Target users:** E-commerce businesses, SaaS companies, service providers  
**Core value:** A plug-and-play AI support agent that answers customer questions from your own content — no human needed for common queries

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend (widget) | React + Tailwind CSS |
| Admin Panel | React + Tailwind CSS |
| Backend | FastAPI (Python) |
| Conversation Engine | LangGraph |
| LLM | OpenAI GPT-4o |
| Knowledge Base | ChromaDB (vector store) |
| Session State | Redis (in-memory for dev) |
| Embeddings | OpenAI `text-embedding-3-small` |
| Containerisation | Docker + docker-compose |
| Deployment | Railway (backend) + Vercel (frontend) |

---

## Features

### Chatbot Widget
- Floating chat button — embeds on any website with a single script tag
- Multi-turn conversation with full memory within a session
- Typing indicator + streaming responses
- Quick reply buttons for common questions
- Fallback to human handoff message when confidence is low
- Powered by badge (white-label option)
- Mobile responsive

### LangGraph Conversation Flow
- **Node: Greeting** — detects new session, sends welcome message
- **Node: Intent Classifier** — routes to appropriate handler
- **Node: RAG Retriever** — fetches relevant KB chunks
- **Node: Response Generator** — crafts grounded answer
- **Node: Clarification** — asks follow-up if query is ambiguous
- **Node: Fallback** — handles out-of-scope queries gracefully
- **Edge conditions** — confidence threshold routing between nodes

### Admin Panel
- Upload knowledge base files (PDF, DOCX, TXT)
- Add/edit/delete FAQ entries manually
- View conversation logs and session history
- Analytics dashboard — top questions, unanswered queries, session count
- Customise widget: colour, greeting message, bot name, avatar
- Generate embed script (copy one line of code)

### Technical
- Session management: each visitor gets a unique session ID
- Conversation history: last 10 messages stored per session
- Confidence scoring: low-confidence answers trigger clarification node
- Source grounding: every answer cites the KB chunk it came from
- Rate limiting: 30 messages per session per hour
- CORS configured for cross-origin widget embedding

---

## LangGraph State Schema

```python
class ChatState(TypedDict):
    session_id: str
    messages: list[BaseMessage]
    intent: str
    retrieved_docs: list[str]
    confidence: float
    needs_clarification: bool
    handoff_triggered: bool
```

---

## Project Structure

```
ai-support-chatbot/
├── backend/
│   ├── main.py                  # FastAPI app
│   ├── graph/
│   │   ├── state.py             # ChatState TypedDict
│   │   ├── nodes.py             # All LangGraph nodes
│   │   ├── edges.py             # Conditional edge logic
│   │   └── graph.py            # Graph assembly + compile
│   ├── kb/
│   │   ├── loader.py            # File ingestion
│   │   └── retriever.py        # ChromaDB retrieval
│   ├── api/
│   │   ├── chat.py             # /chat endpoint
│   │   └── admin.py            # Admin panel endpoints
│   ├── models/
│   │   └── schemas.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── widget/                  # Embeddable chat widget
│   │   ├── ChatWidget.tsx
│   │   ├── MessageBubble.tsx
│   │   └── embed.ts            # Single-file embed script
│   ├── admin/                   # Admin panel
│   │   ├── Dashboard.tsx
│   │   ├── KnowledgeBase.tsx
│   │   ├── Conversations.tsx
│   │   └── Settings.tsx
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | Send message, receive AI response |
| GET | `/chat/history/{session_id}` | Get session conversation history |
| POST | `/admin/kb/upload` | Upload knowledge base file |
| GET | `/admin/kb` | List all KB documents |
| DELETE | `/admin/kb/{id}` | Remove a KB document |
| GET | `/admin/analytics` | Get usage analytics |
| GET | `/admin/conversations` | List all sessions |
| PUT | `/admin/settings` | Update widget configuration |

---

## Embed Code (what clients get)

```html
<script
  src="https://your-domain.com/widget.js"
  data-bot-id="your-bot-id"
  data-color="#4F7EFF"
  data-greeting="Hi! How can I help you today?"
></script>
```

---

## Deployment

```bash
# Local
docker compose up --build

# Backend:    localhost:8000
# Widget:     localhost:3000
# Admin:      localhost:3001
```

**Production:**
- Backend → Railway
- Frontend → Vercel
- Redis → Railway Redis plugin

---

## Estimated Build Time

| Phase | Time |
|-------|------|
| LangGraph conversation flow | 1.5 days |
| FastAPI backend + KB ingestion | 1 day |
| Chat widget (React) | 1 day |
| Admin panel (React) | 1 day |
| Integration + testing | 0.5 day |
| Docker + deployment | 0.5 day |
| **Total** | **~5.5 days** |

---

## Portfolio Value

- LangGraph is cutting-edge — very few freelancers showcase it
- Admin panel + embeddable widget = full product, not just a demo
- Directly sellable as a service to any business
- Covers: LangGraph, LangChain, FastAPI, React, ChromaDB, Docker, Redis
- Strong Upwork/Fiverr pitch: "I'll build a custom AI chatbot for your business"
