# 🌌 EmoSPACE — Emotion-Aware Interactive Environment

> **HackTheVibe — Team: 404_NOT_FURRED**


---

## 🧠 What is EmoSPACE?

EmoSPACE is a **real-time emotion-aware chatbot and gravity simulation** that reads how you feel from your words and **transforms its entire visual world** in response — changing the background, weather effects, atmospheric lighting, and chatbot personality based on your emotional state.

You type. The world listens. The environment reacts.

---

## 💡 Idea & Innovation

Traditional chatbots respond with text. EmoSPACE goes further — it creates an **immersive emotional environment** where:

- The entire background scene changes to reflect your emotion (sunny, stormy, volcanic, serene)
- Weather effects (rain, snow, wind, particles) respond dynamically
- A contextually-aware chatbot replies using emotion-specific reply banks
- A gravity simulation layer shifts with your emotional state
- Mood transitions give tactile visual feedback on every emotion change

**Real-world impact:** Mental health awareness, emotional journaling, interactive therapy tools, and accessible emotion-driven UX design.

---

## 🛠️ Full Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | Component-based UI framework |
| **Vite** | 6 | Lightning-fast dev server & bundler |
| **Framer Motion** | 12 | Smooth animations, letter-by-letter text effects, page transitions |
| **Axios** | 1.x | HTTP client for emotion API calls |
| **Chart.js** | 4.x | Emotion history doughnut chart visualization |
| **CSS3** | — | Glassmorphism, backdrop-filter, keyframe animations, responsive layout |
| **Google Fonts** | Press Start 2P | Pixel-art typography for the landing page |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime |
| **Express** | 5 | REST API server |
| **CORS** | 2.x | Cross-origin request handling |
| **Mongoose** | 8.x | MongoDB ODM for emotion log persistence |
| **dotenv** | — | Environment variable management |
| **@huggingface/inference** | 3.x | Hugging Face model API client |

### Database

| Technology | Purpose |
|---|---|
| **MongoDB** | Persistent storage of emotion detection logs and session data |

---

## 🤖 AI Models Used

### Primary Emotion Detection Model

**[`j-hartmann/emotion-english-distilroberta-base`](https://huggingface.co/j-hartmann/emotion-english-distilroberta-base)**
- Architecture: DistilRoBERTa (distilled BERT variant)
- Task: `text-classification` (multi-class emotion)
- Labels: `joy`, `sadness`, `anger`, `fear`, `disgust`, `surprise`, `neutral`
- Inference: Hugging Face Inference API (cloud, no GPU required)
- Why chosen: Best-in-class accuracy for the 7-class Ekman emotion taxonomy, production-ready via HF API, minimal latency

### Emotion Label Mapping

The raw Hartmann model outputs are mapped to our visual emotion system:

| Hartmann Label | EmoSPACE Bucket | Visual Scene |
|---|---|---|
| `joy` | Happy | Sunny fields, flowers, warm light |
| `surprise` | Happy | Same warm scene (positive valence) |
| `sadness` | Sad | Rain clouds, grey atmosphere |
| `fear` | Stress | Dark storm, thunder flash |
| `disgust` | Angry | Volcanic / harsh lighting |
| `anger` | Angry | Red tones, heavy effects |
| `neutral` | Neutral | Clear sky, calm environment |

---

## 🎨 Art & Visual Design

### Aseprite — Pixel Art

All character sprites and environmental effect sprites were created using **[Aseprite](https://www.aseprite.org/)**, a professional pixel art and animation tool:

| Asset | Description |
|---|---|
| `cat_sprite.png` | Character sprite — pixel-art cat companion |
| `cloud_sprite.png` | Floating cloud effect |
| `whitecloud_sprite.png` | Lighter cloud layer for parallax |
| `rain_sprite.png` | Rain particle effect |
| `flower_sprite.png` | Individual flower asset for happy scene |
| `flowerfield_sprite.png` | Full-width flower field for joy state |
| `sun_sprite.png` | Rotating sun effect for happy state |
| `thunder_sprite.png` | Lightning bolt for stress/fear state |
| `bubble_sprite.png` | Ambient bubble effects |
| `landing page bg.jpeg` | Landing screen pixel-art scene (satellite dish, clouds, warm sky) |

### Creativity & Visual Style

- **Glassmorphism** — Chat UI panels use `backdrop-filter: blur` with translucent backgrounds revealing the live scene behind them
- **Pixel Art Aesthetic** — `Press Start 2P` Google Font + Aseprite sprites for a retro-game feel
- **Mood-tinted Chat Bubbles** — Bot reply bubbles shift color per emotion bucket
- **Letter-by-letter Spring Animation** — The `EmoSPACE` title on the landing page springs in letter-by-letter using Framer Motion `staggerChildren` + `type: "spring"` physics
- **Continuous Glow Pulse** — Each letter has a staggered `letterGlow` CSS keyframe animation creating a living, breathing title
- **Full-screen Mood Transitions** — A color-coded flash overlay (`MoodTransition`) fires on every mood change using `AnimatePresence`
- **Gravity Overlay** — A top-right glassmorphism badge (`GravityOverlay`) displays current emotional gravity state with smooth fade transitions

---

## 🌦️ Weather & Environment System

Each mood maps to a complete environmental layer stack rendered in React:

```
Background image (moodConfig.js)
    ↓
AngryScene — volcanic / red sky overlay
    ↓
WeatherEffect — weather particles (rain, thunder, flowers, sun, clouds)
    ↓
Character — animated cat companion
    ↓
UI Layer — Chat window + Input bar
    ↓
GravityOverlay — top-right mood indicator
    ↓
MoodTransition — full-screen flash on mood change
```

---

## 💬 Chatbot Reply System

Replies are grouped by emotion bucket in `replyBank.js`:

- **6 emotion buckets**: joy, sadness, anxiety (fear), anger, calm, neutral
- **25+ handcrafted replies** tailored per emotion
- **Repeat-avoidance** — `pickReply()` tracks the last bot reply and always picks a different one
- **Graceful fallback** — If the API server is unreachable, `detectMoodLocally()` runs a regex keyword scan on the typed text and still changes the scene

---

## 📂 Project Structure

```
EmoSPACE/
├── client/                         # React + Vite frontend
│   ├── src/
│   │   ├── assets/
│   │   │   ├── backgrounds/        # Mood background images (JPEG)
│   │   │   ├── character/          # Aseprite cat sprite
│   │   │   └── effects/            # Aseprite weather/particle sprites
│   │   ├── components/
│   │   │   ├── LandingPage.jsx/css # Pixel-art landing page
│   │   │   ├── Background.jsx      # Mood-driven background switcher
│   │   │   ├── WeatherEffect.jsx   # Particle effect system
│   │   │   ├── ChatWindow.jsx/css  # Scrollable chat bubble UI
│   │   │   ├── InputBar.jsx        # User input + API caller
│   │   │   ├── GravityOverlay.jsx  # Mood badge overlay
│   │   │   ├── MoodTransition.jsx  # Full-screen mood flash
│   │   │   ├── AngryScene.jsx      # Anger-specific environment
│   │   │   └── Character.jsx       # Animated cat companion
│   │   ├── config/
│   │   │   ├── moodConfig.js       # Mood → background/effect mapping
│   │   │   └── replyBank.js        # Emotion reply dictionary + picker
│   │   ├── App.jsx                 # Root — state, routing, layout
│   │   ├── main.jsx
│   │   └── index.css               # Global styles & animations
│   └── vite.config.js
│
├── server/                         # Express backend
│   ├── controllers/
│   │   └── emotionController.js    # HF API caller, label mapping, DB log
│   ├── models/
│   │   └── EmotionLog.js           # Mongoose schema
│   ├── routes/
│   │   └── emotion.js
│   ├── server.js                   # Express app entry point
│   └── .env                        # HF_TOKEN, MONGO_URI (not committed)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas cloud URI)
- [Hugging Face API token](https://huggingface.co/settings/tokens) (free)

### Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd EmoSPACE

# 2. Backend
cd server
npm install
# Create .env with:
# HF_TOKEN=your_huggingface_token
# MONGO_URI=mongodb://localhost:27017/emospace
npm run dev        # Starts on http://localhost:8000

# 3. Frontend (new terminal)
cd client
npm install
npm run dev        # Opens http://localhost:5173
```

---

## 📡 API Reference

| Method | Endpoint | Body | Response |
|---|---|---|---|
| `POST` | `/chat` | `{ text, session_id }` | `{ emotion, score }` |
| `GET` | `/api/emotion/history` | — | Array of emotion logs |

---

## 🔭 Future Scope

- **Voice input** — Detect emotion from speech using Whisper + audio emotion models
- **Multi-user rooms** — Shared emotional environments for group sessions
- **Emotion timeline** — Visual graph of your mood across a session
- **Therapist mode** — Structured CBT-style prompts based on detected emotion
- **Mobile app** — React Native port with haptic mood feedback
- **Offline model** — Run a quantized emotion model locally via ONNX/WebAssembly

---

## 📋 Vibe Log (AI Disclosure)



### 🤖 GitHub Copilot

GitHub Copilot was used extensively throughout development as an inline coding assistant inside VS Code:

| Area | How Copilot Was Used |
|---|---|
| **React Components** | Autocompleted boilerplate for `useEffect`, `useRef`, and `useState` hooks across `ChatWindow.jsx`, `InputBar.jsx`, and `App.jsx` |
| **CSS Animations** | Suggested keyframe animation patterns for `letterGlow`, `bubbleIn`, and `ringPulse` effects |
| **Express Routes** | Scaffolded the `/chat` API route structure and Mongoose model schema |
| **Framer Motion** | Autocompleted `variants` objects and `AnimatePresence` usage in `MoodTransition.jsx` and `LandingPage.jsx` |
| **Keyword Fallback** | Helped draft the `detectMoodLocally()` regex keyword map in `InputBar.jsx` |
| **Reply Bank** | Suggested phrasing and structure for emotion-specific chatbot replies in `replyBank.js` |
| **Debugging** | Provided inline fix suggestions for the scroll auto-detection threshold and Vite asset import resolution |

> All Copilot suggestions were reviewed, tested, and often significantly modified by the team before use. Core architecture, emotional design decisions, and creative direction remained entirely human-driven.

### Other AI Tools

| Tool | Used For |
|---|---|
| **Hugging Face `j-hartmann/emotion-english-distilroberta-base`** | Core emotion detection from user text (backend inference) |
| **Antigravity (Google DeepMind AI assistant)** | Complex multi-file refactoring, layout debugging, and README generation |
| **Aseprite** | All pixel-art sprite creation (character, weather effects, landing background — *not AI-generated*) |

---

## 👾 Team — 404_NOT_FURRED

| Name | Role |
|---|---|
| **Rohith Krishna S** | Full-stack development, AI integration, backend API |
| **Bhuvana P** | Pixel art (Aseprite), visual design, environment system |
| **Jishnu V** | Frontend development, UI/UX design, CSS animations |

> 

---


