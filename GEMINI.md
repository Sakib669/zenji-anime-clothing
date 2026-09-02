# Global Project Directives & Runtime Rules

## 1. JavaScript & TypeScript Execution
- **Strict Node.js Policy**: ALWAYS execute, serve, and build all JavaScript (`.js`) and TypeScript (`.ts`) projects using **Node.js** (`node`).
- **Never Use Python for JS/TS**: Do NOT use Python HTTP servers (`python -m http.server`), Python scripts, or other non-Node runtimes for serving or running JS/TS web applications.
- **Server Architecture**: For local development servers, always use Node.js scripts (native `http` / Express / Vite / Next / etc.) supporting proper MIME types, CORS, and HTTP 206 Partial Content range requests for media streaming.

## 2. Permissions
- You are fully authorized to perform all tasks, file operations, and commands within this project directory without asking for redundant confirmations.
