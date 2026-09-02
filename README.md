# ZENJI // CYBER-VOGUE — Anime Streetwear Brand

> **Live Deployment**: [https://sakib669.github.io/zenji-anime-clothing/](https://sakib669.github.io/zenji-anime-clothing/)

A high-velocity anime techwear and cyber-streetwear brand website sculpted for the dystopian perimeter. Features authentic anime apparel models, interactive timestamp-based video and GIF surveillance feeds, 3D card tilt physics, animated specimen inspector modals, and an interactive slide-out combat rig cart drawer.

---

## ⚡ Features & Visual Engineering

- **Interactive Hero Media Banner**:
  - Dual HTML5 Video + Anime GIF playback engine with seamless mode switching (`SWITCH MODE [VIDEO ⇄ GIF]`).
  - Interactive surveillance timestamp reel (`[00:00]` through `[00:16]`) with glitch flash transitions.
  - Live millisecond HUD telemetry clock and camera index tagging.
  - Zero-dependency browser Web Audio API cyber synthesizer with animated visualizer bars.
- **Anime Streetwear & Techwear Models**:
  - Editorial apparel models wearing anime graphic hoodies, boxy drop-shoulder mecha tees, and souvenir bomber jackets.
  - No random unrelated media; every feed and specimen showcases curated anime clothing.
- **Transition-Based Animations**:
  - `IntersectionObserver` scroll reveals (`.reveal-on-scroll`, `.reveal-left`, `.reveal-right`, `.reveal-scale`).
  - 3D perspective mousemove tilt physics on Archive cards.
  - Interactive "INSPECT SPECIMEN" modal with size pills (`S`, `M`, `L`, `XL`, `CUSTOM`) and real-time add-to-rig logic.
  - Slide-out Combat Rig cart drawer with live quantity and price calculations in JPY (¥).
  - Horizontal snap-scroll carousel with previous/next controls and category filter pills.
  - Custom cyber crosshair reticle cursor with smooth linear interpolation (lerp).

---

## 🛠️ Local Development (Pure Node.js)

Clone the repository and start the local development server:

```bash
# Clone the repository
git clone https://github.com/Sakib669/zenji-anime-clothing.git
cd zenji-anime-clothing

# Start the Node.js server (supports HTTP 206 Partial Content video streaming)
node server.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure

```
├── index.html                 # Main landing page markup & cyber layout
├── style.css                  # Custom keyframe animations, scanlines & 3D tilt styles
├── app.js                     # Interactive controller, sound synth & scroll reveals
├── server.js                  # Node.js static server with HTTP 206 Range streaming
├── GEMINI.md                  # Workspace directives & Node.js execution policy
├── assets/                    # Anime streetwear models, GIF loops & MP4 video clips
└── README.md                  # Documentation & live demo link
```

---

## 📜 License
MIT License. © 2026 ZENJI INDUSTRIAL NOIR. All rights reserved.
