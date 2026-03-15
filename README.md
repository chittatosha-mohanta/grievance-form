# Grievance Form

Multi-step grievance submission app built with Next.js App Router, TypeScript, Material UI, React Hook Form, Zod, and Zustand.

## What This Project Does

- Collects grievance details through a 4-step flow.
- Validates each step on the client with Zod.
- Re-validates full payload on submit in a server action.
- Supports local draft save and restore.
- Provides a review screen before final submit.

## Current Status

- Submissions are validated and a mock grievance ID is generated.
- Final submissions are not persisted to a database yet.
- Drafts are stored in browser local storage.

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Material UI 7
- React Hook Form 7
- Zod 4
- Zustand 5

## App Flow

1. Step 1: Personal Information
2. Step 2: Grievance Details
3. Step 3: Supporting Information
4. Review and Submit
5. Success page

## Draft Behavior

Two local storage keys are used:

- `grievance-form-draft`: in-progress persisted state from Zustand.
- `grievance-form-saved-draft`: explicit draft saved from the Review page.

User flow:

1. Fill the form steps.
2. On Review page, click Save Draft (left-side button).
3. App returns to Step 1.
4. Click Load Saved Draft button at the bottom to restore saved data.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
https://grievance-form-nu.vercel.app/form/step-1
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
      app/
            (form)/form/
                  step-1/page.tsx
                  step-2/page.tsx
                  step-3/page.tsx
                  review/page.tsx
                  success/page.tsx
            actions/submit.ts
      components/
            form/FormNavigation.tsx
            ui/FormStepper.tsx
      lib/schemas.ts
      store/formStore.ts
      types/form.ts
```

## Submission Data

- Final submitted data is not stored permanently yet.
- To persist submissions, connect `app/actions/submit.ts` to a database (for example PostgreSQL + Prisma).

## Next Improvements

- Add database persistence for final submissions.
- Add submission listing/admin view.
- Add autosave timestamp in UI.
- Add test coverage for schemas and store.

## Author

Chittatosha Mohanta
