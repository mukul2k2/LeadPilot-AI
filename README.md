# LeadPilot AI — Lead Follow-Up Agent for Packaging Machinery Sales

> **FDE Take-Home Assignment Solution**  
> Built with Next.js (App Router), TypeScript, Tailwind CSS, and Google Gemini API.

---

## 🚀 Live Demo & Quick Start

### 1. Run Locally
```bash
# 1. Install dependencies
npm install

# 2. (Optional) Add your Gemini API Key in .env.local
GEMINI_API_KEY=your_gemini_api_key_here

# 3. Start development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

*(Note: **Zero-Config Default with BYOK**: The app works out-of-the-box with pre-configured server environment keys or intelligent heuristic fallback. Reviewers can click the top-bar model button to switch between Google Gemini models, OpenAI, Groq, or DeepSeek and provide their own API keys).*

### 2. Deploy to Vercel (1-Click)
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → Import Git Repository.
3. Add Environment Variable:
   - `GEMINI_API_KEY`: `your_gemini_api_key`
4. Click **Deploy**. The app is ready to share with reviewers immediately!

---

## 📋 Assignment Requirements Compliance Checklist

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **At least 20 sample leads** | 20 rich B2B packaging equipment leads across carton sealers, pouch fillers, shrink wrappers, and capping lines. | ✅ Pass |
| **At least 10 WhatsApp chats** | 20 realistic conversational transcripts between buyers and reps with timestamps and objections. | ✅ Pass |
| **Hot, Warm, or Cold tagging** | Automated tagging via Gemini API with 1-line crisp rationale. | ✅ Pass |
| **Set next follow-up date** | Dynamic calculation based on urgency (Today/Tomorrow for Hot, 2-5d for Warm, 14-30d for Cold). | ✅ Pass |
| **Draft next follow-up message** | Tailored, professional WhatsApp messages generated for each lead context. | ✅ Pass |
| **Today's follow-ups at top** | Priority Queue ranks Overdue follow-ups first (flagged in red), followed by Due Today tasks. | ✅ Pass |
| **Overdue follow-ups stand out** | Prominent red alert borders, badges, and days-overdue counters. | ✅ Pass |
| **Lead drawer with chat & draft** | Slide-over drawer with WhatsApp bubbles, AI rationale, date picker, and editable draft desk. | ✅ Pass |
| **Edit draft & mark as sent** | Rep can edit draft text, copy it, open WhatsApp Web, or click "Mark as Sent" to update timeline. | ✅ Pass |
| **Add new lead or new chat** | "+ Add New Lead" modal & "Log WhatsApp Message" trigger real-time AI re-evaluation. | ✅ Pass |
| **Out of scope compliance** | No login, no fake payments, strictly focused on sales rep productivity. | ✅ Pass |

---

## 🎬 3-Minute Video Walkthrough Script (For Candidate Submission)

*Use this outline to record your demo video:*

* **0:00 - 0:30 | The 10-Second Test & The Problem:**
  > *"Hi everyone, this is LeadPilot AI. The company sells packaging equipment with 5 sales reps, but reps forget to follow up, and good leads go cold. The owner wants one screen that tells reps who to follow up with today and what to say. When a rep opens this screen, within 10 seconds they see: 4 overdue follow-ups in red at the top, and today's due follow-ups ranked by urgency."*

* **0:30 - 1:15 | Reviewing an Urgent Lead & Draft Copy:**
  > *"Let's look at Rajesh Sharma from Apex Agro. The system highlights him as 1 day overdue on a ₹14 Lakh pouch filler deal. I click 'Review & Send'. Here is the full WhatsApp transcript where he asked for a 50% advance deal. The AI diagnosed this as 'Hot' because the PO is ready today, and drafted an exact WhatsApp message ready to send. I can edit this draft, click 'Open in WhatsApp Web', or click 'Mark as Sent'. Watch what happens when I click 'Mark as Sent'—it logs the message to the chat and advances the follow-up date."*

* **1:15 - 2:00 | Real-Time Agent Re-evaluation:**
  > *"Now, what if the buyer texts back with a new condition? Let's simulate that: I type 'Can you give an extra 5% discount if we place the order by tomorrow?' and click 'Log & AI Run'. The Gemini agent instantly re-analyzes the conversation, updates the rationale, and produces a revised draft addressing the discount."*

* **2:00 - 2:40 | Adding a New Lead & Filtering by Rep:**
  > *"I can also filter by individual sales reps using the top bar—for example, viewing only Arun Verma's deals. When a rep gets a new inquiry, they click '+ Add New Lead', fill in the details, and the agent immediately scores the lead and drafts the initial outreach."*

* **2:40 - 3:00 | Conclusion & Architecture:**
  > *"LeadPilot AI is built with Next.js App Router, TypeScript, Tailwind CSS, and Google Gemini API with strict structured JSON output and offline resilience. Thank you!"*

---

## 📄 Submission Files
* `PLAN.md`: Full architecture plan and technical design.
* `SUBMISSION_NOTE.md`: Half-page submission note required by the assignment prompt.
