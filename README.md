# Grievance Submission Form

A production-ready multi-step grievance/request submission workflow built with **Next.js App Router**, **TypeScript**, **Material UI**, and **Zod** validation.

---

## Live Demo

🔗 [https://grievance-form-gaqq.vercel.app](https://grievance-form-gaqq.vercel.app)

---

## Features

- ✅ Multi-step form with **Next / Back** navigation (4 steps)
- ✅ **Per-step Zod validation** — only validates current step fields
- ✅ **Draft save & restore** — progress persists in localStorage via Zustand
- ✅ **Review & Submit** page with edit links back to each step
- ✅ **Server Action** for final submission with server-side re-validation
- ✅ Clean **App Router** folder structure with route groups
- ✅ Built entirely with **Material UI** components

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | Framework & App Router |
| React | 18.x | UI library |
| TypeScript | 5.x | Type safety |
| Zod | 3.x | Schema validation |
| React Hook Form | 7.x | Form state management |
| Material UI | 6.x | Component library |
| Zustand | 5.x | Global state + draft persistence |

---

## Project Structure
```
src/
├── app/
│   ├── (form)/
│   │   └── form/
│   │       ├── layout.tsx        # Shared form layout wrapper
│   │       ├── step-1/page.tsx   # Step 1 — Personal information
│   │       ├── step-2/page.tsx   # Step 2 — Grievance details
│   │       ├── step-3/page.tsx   # Step 3 — Supporting information
│   │       ├── review/page.tsx   # Step 4 — Review & submit
│   │       └── success/page.tsx  # Confirmation page
│   ├── actions/
│   │   └── submit.ts             # Server Action (form submission)
│   ├── providers.tsx             # MUI ThemeProvider wrapper
│   └── layout.tsx                # Root layout with AppRouterCacheProvider
├── components/
│   ├── form/
│   │   └── FormNavigation.tsx    # Reusable Next/Back buttons
│   └── ui/
│       └── FormStepper.tsx       # MUI Stepper progress indicator
├── lib/
│   └── schemas.ts                # All Zod schemas + inferred TS types
├── store/
│   └── formStore.ts              # Zustand store with localStorage persistence
└── types/
    └── form.ts                   # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js **v18** or higher
- npm **v9** or higher
- Git

### Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/chittatosha-mohanta/grievance-form.git
cd grievance-form
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:3000
```

The home page automatically redirects to `/form/step-1`.

---

## How It Works

### Multi-step Navigation
The form uses Next.js App Router with a route group `(form)` containing 4 pages — `step-1`, `step-2`, `step-3`, and `review`. Navigation between steps uses `useRouter().push()`. A shared `layout.tsx` wraps all steps with the MUI Stepper and card container.

### Per-step Validation
Each step has its own Zod schema in `src/lib/schemas.ts`:

- `stepOneSchema` — validates personal information fields
- `stepTwoSchema` — validates grievance details
- `stepThreeSchema` — validates supporting info + terms agreement
- `fullFormSchema` — merged schema used for final server-side validation

React Hook Form uses `zodResolver` to trigger validation only when the user clicks Next, keeping the UX clean.

### Draft Save & Restore
Zustand's `persist` middleware automatically syncs form state to `localStorage` under the key `grievance-form-draft`. If a user refreshes mid-form or closes the tab, their progress is fully restored when they return.

### Server Action
`src/app/actions/submit.ts` is marked with `"use server"`. It receives the complete form data from the Review page, re-validates it using `fullFormSchema.safeParse()`, and processes the submission. This ensures data integrity regardless of client-side state. In a production app, this is where you would connect to a database (Prisma, Supabase, etc.).

---

## Form Flow
```
/form/step-1  →  Personal Info
      ↓
/form/step-2  →  Grievance Details
      ↓
/form/step-3  →  Supporting Information
      ↓
/form/review  →  Review & Submit (calls Server Action)
      ↓
/form/success →  Confirmation
```

---

## Scripts
```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

This project is deployed on **Vercel** with zero configuration. Every push to the `main` branch triggers an automatic redeployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chittatosha-mohanta/grievance-form)

---

## Author

**Chittatosha Mohanta**
[GitHub](https://github.com/chittatosha-mohanta)