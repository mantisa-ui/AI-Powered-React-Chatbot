# 🤖 AI-Powered React Chatbot

A modern, production-ready AI chatbot built with React 19, TypeScript, and Material UI. Features multi-conversation support, real-time AI responses powered by Groq, dark mode, and persistent storage.

🌐 **[Live Demo](https://your-app-url.vercel.app)** · 📖 **[Documentation](#features)** · 🐛 **[Report Bug](https://github.com/mantisa-ui/ai-chatbot/issues)**

---

## ✨ Features

- 🤖 **Real AI Responses** — Powered by Groq's Llama 3.1 (lightning fast!)
- 💬 **Multi-Chat Support** — Manage multiple conversations like ChatGPT
- 💾 **Persistent Storage** — Chats survive page refresh via localStorage
- 🌙 **Dark Mode** — Auto-detects system preference, toggle anytime
- 📝 **Markdown Rendering** — Beautiful formatting for AI responses
- 🎨 **Syntax Highlighting** — Code blocks with copy-to-clipboard
- 🧠 **Conversation Context** — AI remembers previous messages
- ⚡ **Optimistic UI** — Messages appear instantly
- 🛑 **Cancel Mid-Response** — Stop AI generation anytime
- 🔄 **Auto-Retry** — Smart error recovery
- 📱 **Mobile Responsive** — Slides-in drawer on small screens
- ⏱️ **Smart Timestamps** — Group chats by date (Today / Yesterday / Older)

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **UI Library** | Material UI v5 + Emotion |
| **State Management** | Zustand (with persist middleware) |
| **AI Provider** | Groq API (OpenAI-compatible SDK) |
| **Markdown** | react-markdown + remark-gfm |
| **Syntax Highlighting** | react-syntax-highlighter |
| **Deployment** | Vercel |

---

## 🏗️ Architecture

This project follows a **4-layer architecture** for clean separation of concerns: