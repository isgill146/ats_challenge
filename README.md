# AI Interview Assistant

An intelligent AI-powered platform that simulates real-world technical interviews and evaluates candidates based on their responses.

Built with:
- **Next.js 14 (App Router)**
- **OpenAI GPT-3.5 API**
- **TailwindCSS**
- **TypeScript**
- **Vitest** (for backend unit testing)

---

## Features

- **Multi-Turn, Context-Aware Interview Flow**
  - Dynamic follow-up questions based on candidate responses.
  - Seamless adaptive conversation without manual resets.
  - Real-time typing indicator, timestamps, smooth scrolling UX.

- **Candidate Fit Evaluation**
  - Scoring based on:
    - Technical Acumen
    - Communication Skills
    - Responsiveness & Agility (based on timing)
    - Problem-Solving & Adaptability
    - Cultural Fit & Soft Skills
  - Detailed score breakdown + final composite score.

- **Backend**
  - Modular structure (Routes → Controllers → Services → Helpers).
  - Joi-based request validation.
  - Centralized structured error handling and logging.
  - External OpenAI service abstraction.

- **Frontend**
  - Fully custom chat interface (no template libraries like shadcn/ui).
  - Professional upload form for Job Description and CV.
  - Smooth real-time UX with timestamps and auto-scroll.

- **Testing**
  - Full unit test coverage:
    - Joi form validations
    - OpenAI service prompt generation
    - Multi-turn chat flow
    - Timing metrics and scoring algorithm

---

## Project Structure

/app /api /chat → Dynamic multi-turn chat API /score → Candidate fit scoring API /components InterviewChat.tsx → Interactive chat component JobDescriptionForm.tsx → Upload form for JD + CV QuestionOutput.tsx → (Optional) Initial question output ScoreCard.tsx → Candidate scoring summary /backend /controllers /services /helpers /external → OpenAI integration /validation → Joi schemas utils.ts → Utility functions /tests /backend validation.test.ts openaiService.test.ts chatFlow.test.ts scoring.test.ts /public /styles



Modular and clean separation between frontend, backend, helpers, and tests.

---

## Getting Started (Local Development)

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Create a env file:
OPENAI_API_KEY=your-openai-api-key-here


3. **Run the development server**


npm run dev


⚙️ Deployment Instructions

This project is fully optimized for Vercel deployment.

Why is Backend inside Next.js?
=> To simplify deployment without managing a separate Node.js server.


⚙️ Testing Instructions
Backend unit tests are written using Vitest.

To run all tests:
=> npm run test




## Documentation

Parsing of Job Description and Candidate CV
JD and CV are accepted as free-text fields via a form.

Inputs are truncated if they are too large (using a utility function) to stay within OpenAI token limits.


**Prompt Design Strategy**

Inputs passed into prompts:

1. Job Description
2. Candidate CV
3. Conversation history (for chat flow)
4. Candidate interview answers (for scoring)
5. Average Answer Time (for responsiveness scoring)

The prompts are carefully engineered to:

- Focus only on job-related questions.
- Ask follow-up questions dynamically based on previous answers.
- Avoid greetings or filler text.
- Enforce strict JSON output formats where necessary (e.g., for scoring).


**Limitations**
If using a free-tier OpenAI account, strict API limits apply:

Requests per minute (RPM) - 3
Requests per day (RPD) - 200

These limits may cause occasional 429 errors (e.g., "Quota Exceeded") during frequent testing or large payloads.