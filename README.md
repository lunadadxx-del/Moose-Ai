# MOOSE AI — Personal AI Assistant

> **Third-Year Computer Science Major Project**  
> Inspired by ChatGPT and Claude. Designed for custom open-source LLM fine-tuning and retrieval-augmented generation (RAG).

---

## 📌 Project Overview

**MOOSE AI** is a modern, modular AI chat platform developed from the ground up to host our own fine-tuned open-source language models (LLaMA 3 / Qwen 2.5). 

The project follows a phased engineering roadmap:
- **Phase 1 (Current Milestone):** Project Architecture & Frontend Foundation (Next.js App Router, TypeScript, Tailwind CSS, Lucide React).
- **Phase 2 (Future):** Python + FastAPI Inference Engine, vLLM / Hugging Face integration.
- **Phase 3 (Future):** PostgreSQL + Vector Database (pgvector / Chroma) for Retrieval-Augmented Generation (RAG).
- **Phase 4 (Future):** Multi-modal interactions, file ingestion, and fine-tuned model evaluation.

---

## 🎨 UI Architecture & Design

- **Dark Charcoal Theme:** Deep slate/charcoal tones (`#0B0E14`, `#0F121A`, `#141824`) for reduced eye strain and high readability.
- **Color Accents:** Subtle cyan and royal blue highlights (`#38BDF8`, `#6366F1`) harmonized with the Moose AI suit-wearing robot mascot.
- **Sidebar:**
  - Branding with custom geometric Moose Antler + AI node logo.
  - Quick action: **New Chat** button with shortcut hint (`⌘N`).
  - History section categorized by *Today*, *Yesterday*, and *Previous 7 Days*.
  - Settings modal launcher.
  - User profile with live status indicator.
  - Collapsible mechanism with desktop collapse and mobile drawer overlay.
- **Main Chat Interface:**
  - **Header:** Model switcher badge (`Moose-7B`), sample conversation toggle, share action, and parameter controls.
  - **Welcome Screen:** High-resolution mascot avatar with radiant glowing ring, welcoming headline, and four interactive prompt cards:
    1. *Explain a concept*
    2. *Write code*
    3. *Analyze a document*
    4. *Help me learn something new*
  - **Message Stream:** Clean distinction between User messages and Assistant responses, complete with formatted code blocks, syntax header, copy-to-clipboard buttons, and feedback controls.
  - **Floating Message Input:** Auto-resizing textarea, attachment button placeholder, voice input button placeholder, active send button, and disclaimer footer.

---

## 📁 Repository Directory Structure

```text
MooseAi/
├── frontend/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css          # Dark charcoal theme tokens & tailwind
│   │   ├── layout.tsx           # Metadata and root wrapper
│   │   └── page.tsx             # Main chat application page
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatHeader.tsx       # Header with model selector & controls
│   │   │   ├── MessageInput.tsx     # Floating multi-line input box
│   │   │   ├── MessageItem.tsx      # User/assistant bubbles + code renderer
│   │   │   ├── MessageList.tsx      # Smooth scrollable message feed
│   │   │   ├── SuggestedPrompts.tsx # 4 interactive prompt cards
│   │   │   └── WelcomeScreen.tsx    # Mascot hero avatar + greeting
│   │   ├── sidebar/
│   │   │   ├── ChatHistoryList.tsx  # Categorized conversation history
│   │   │   ├── Sidebar.tsx          # Collapsible responsive sidebar
│   │   │   └── UserProfile.tsx      # User card and status
│   │   └── ui/
│   │       ├── Avatar.tsx           # Mascot & user avatar component
│   │       ├── Button.tsx           # Reusable styled button primitives
│   │       ├── MooseLogo.tsx        # Geometric Moose SVG logo & branding
│   │       ├── SettingsModal.tsx    # System configuration & model modal
│   │       └── Tooltip.tsx          # Accessible floating tooltip
│   ├── hooks/
│   │   ├── useChat.ts               # Chat state, sessions, and demo switcher
│   │   └── useSidebar.ts            # Responsive sidebar toggle & breakpoint hook
│   ├── lib/
│   │   ├── constants.ts             # App config, mock history, suggested prompts
│   │   └── utils.ts                 # Formatting and clipboard helpers
│   ├── public/
│   │   ├── moose-avatar.png         # Robot mascot character (suit & glowing eyes)
│   │   └── moose-logo.svg           # Scalable SVG branding
│   ├── styles/
│   │   └── theme.css                # Custom scrollbars & keyframe animations
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v26.13.0)
- **npm**: v9.0.0 or higher

### Steps

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

5. **Production Build & Verification:**
   ```bash
   npm run build
   ```

---

## 📋 Status & Completion Checklist (Phase 1)

- [x] Initial project structure organized according to specifications.
- [x] Next.js (App Router) + TypeScript + Tailwind CSS configured.
- [x] Lucide React icon integration.
- [x] Moose AI branding and 3D mascot avatar integrated into Welcome Screen and message responses.
- [x] Collapsible sidebar with New Chat button, categorized chat history, settings button, and user profile.
- [x] Header with model selector badge and sample conversation preview toggle.
- [x] Welcome screen with exact requested prompts (*Explain a concept*, *Write code*, *Analyze a document*, *Help me learn something new*).
- [x] Floating centered message input with attachment placeholder, voice placeholder, send button, and disclaimer.
- [x] Reusable message components with formatted code block renderer and copy button.
- [x] Settings modal presenting project architecture and model specs.
- [x] Fully responsive across Mobile, Tablet, and Desktop.
- [x] Zero TypeScript errors, clean production build.
- [x] Development server verified on `http://localhost:3000`.

*Phase 2 will commence after user review and approval.*
