# 🚀 LeadPilot AI — Sales Follow-Up Command Center

> An AI-powered sales follow-up copilot designed for B2B packaging equipment sales teams. It bridges the gap between scattered WhatsApp conversations and daily sales prioritization, telling every rep **who to follow up with today and what exact message to say**.

---

## 📌 The Problem & The 10-Second Test

A company manufactures and sells industrial packaging machinery ($2,000 to $50,000 equipment such as pouch fillers, carton sealers, strapping machines, and shrink wrappers) across **5 sales reps**.

* **The Pain:** Leads live across messy Excel sheets and WhatsApp chats. Reps forget to follow up, good leads go cold, and the business owner has zero visibility into who needs contact today.
* **The Solution (The 10-Second Rule):** When a sales rep opens LeadPilot AI in the morning, within 10 seconds they immediately see:
  1. 🚨 **Overdue follow-ups** highlighted in bold red alerts with days-overdue counters.
  2. 📅 **Today's scheduled follow-ups** ranked by urgency (Hot leads first).
  3. 💬 **Contextual, ready-to-send WhatsApp drafts** for every lead.

---

## ✨ Key Features

* **⚡ Priority Follow-Up Radar:** Automatically surfaces overdue and today's due leads ranked by urgency so reps never miss high-intent buyers.
* **💬 WhatsApp Chat History:** WhatsApp-styled message bubbles displaying complete buyer-rep negotiations, timestamps, and delivery requirements.
* **🤖 Multi-Model AI Agent:** Automatically analyzes conversation context to:
  * Classify leads as **Hot**, **Warm**, or **Cold**.
  * Provide a concise **1-line rationale** explaining the score.
  * Schedule the **next follow-up date**.
  * Generate a natural, high-conversion **WhatsApp follow-up draft**.
* **🔄 Live Agent Re-evaluation:** Reps can log incoming buyer WhatsApp replies, instantly prompting the AI agent to re-evaluate the deal and update the draft.
* **✅ One-Click Actions:**
  * Edit drafts directly.
  * Launch **WhatsApp Web** with pre-filled text (`wa.me`).
  * **"Mark as Sent"** logs the message to chat and automatically advances the follow-up timeline.
* **🔑 Zero-Config Default + BYOK (Bring Your Own Key):**
  * Works out of the box using server environment keys or intelligent offline heuristics.
  * In-app settings modal lets users select between **Google Gemini** (`gemini-3.5-flash-lite`, `gemini-3.8-flash`) or **OpenAI-compatible models** (`gpt-4o-mini`, Groq, DeepSeek) and provide their own API keys with live connectivity testing.
* **👥 Sales Rep Filtering:** View team-wide pipeline metrics or filter by individual sales reps (*Arun Verma, Neha Patil, Karan Mehta, Vikram Singh, Sneha Rao*).

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** |
| **Language** | **TypeScript** |
| **Styling** | **Tailwind CSS (v4)** |
| **Icons** | **Lucide React** |
| **Primary AI Engine** | **Google Gemini API (`@google/genai` SDK)** |
| **BYOK Providers** | **OpenAI, Groq, DeepSeek** via unified adapter |
| **Persistence** | **LocalStorage** with zero-downtime heuristic fallback |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js:** v18.18.0 or higher
* **npm:** v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/LeadPilot-AI.git
cd LeadPilot-AI

# Install dependencies
npm install
```

### 3. Environment Configuration (Optional)
Create a `.env.local` file in the root directory:
```env
# Optional: Add your Gemini API Key (or enter it directly via in-app settings)
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the application runs on its built-in rule-based heuristic fallback engine with zero errors).*

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ☁️ 1-Click Deployment to Vercel

1. Push this repository to your GitHub account.
2. Sign in to **[vercel.com](https://vercel.com)** and click **"Add New"** → **"Project"**.
3. Import your `LeadPilot-AI` repository.
4. Add the environment variable:
   * `GEMINI_API_KEY`: `your_gemini_api_key`
5. Click **Deploy**. Your app will be live at `https://your-project.vercel.app` in under 60 seconds!

---

## 📊 Dataset Overview

* **20 Realistic B2B Packaging Machinery Leads:** Covers machinery ranging from $2,000 to $50,000 (multihead weighers, continuous band sealers, shrink tunnels, liquid piston fillers, induction cappers).
* **20 WhatsApp Chat Transcripts:** Realistic negotiations covering pricing terms, 50% advance conditions, layout drawings, and sample test seals.
* **5 Sales Reps:** Arun Verma, Neha Patil, Karan Mehta, Vikram Singh, and Sneha Rao.

---

## 📄 License
This project is open-source and available under the MIT License.
