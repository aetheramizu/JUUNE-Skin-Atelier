# CLAUDE.md — JUUNÉ Skin Atelier

> This document defines the rules, structure, and behavior for AI-assisted development (Claude Code / GPT) in this project.

---

## 1. Project Overview

* **Name**: JUUNÉ Skin Atelier
* **Description**: A luxury-inspired beauty web experience showcasing skincare products with a soft, elegant, and premium aesthetic.
* **Goal**:

  * Build a high-end portfolio website
  * Simulate a real-world beauty brand product experience
  * Demonstrate strong UI/UX and frontend engineering skills
* **Target Users**:

  * Young adults (18–30) interested in skincare
  * Beauty-conscious users who value aesthetics and branding
* **Version**: v1.0.0
* **Status**: Active Development

---

## 2. Design Philosophy

* Minimalist and elegant interface
* Soft luxury aesthetic (clean, calm, premium feel)
* Focus on visual hierarchy and whitespace
* Avoid clutter — every element must have purpose
* Emotion-driven design (calm, soothing, refined)

---

## 3. Tech Stack

* **Language**: TypeScript
* **Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS
* **UI Library**: shadcn/ui
* **State Management**: Zustand (if needed)
* **Data Fetching**: Server Components + React Query (if needed)
* **Package Manager**: npm
* **Deployment**: Vercel

---

## 4. Commands

```bash
# Development
npm run dev
npm run build
npm run start
npm run lint

# Package
npm install [package]

# Database (if added later)
npm run db:migrate
npm run db:seed
```

---

## 5. Project Structure

Architecture: Feature-based + modular

```
src/
  app/                # Next.js App Router (pages, layouts)
  components/
    ui/               # reusable UI components
    sections/         # page sections (hero, product, etc)
  lib/                # utilities, helpers
  services/           # API & data fetching logic
  types/              # TypeScript types
  styles/             # global styles / tokens
public/               # static assets (images, icons)
```

### Rules:

* UI components → `components/ui`
* Sections → `components/sections`
* Business logic → `services`
* Types → `types`
* Do NOT create new folders without confirmation

---

## 6. Naming Conventions

### Files & Folders

* Components: PascalCase → `ProductCard.tsx`
* Hooks / utils: camelCase → `useAuth.ts`
* Folder: kebab-case → `product-section/`

### Code

* Variables: camelCase → `productList`
* Constants: UPPER_SNAKE_CASE → `API_URL`
* Functions: camelCase → `getProducts`
* Types: PascalCase → `ProductType`

---

## 7. Code Conventions

### General

* Follow **clean code + DRY principles**
* Prioritize readability over cleverness
* Avoid unnecessary complexity

### TypeScript

* Strict mode enabled
* NEVER use `any`
* Always define return types
* Use `interface` for objects

### Import Order

1. External libraries
2. Internal absolute
3. Relative imports
4. Types
5. Styles

---

## 8. Component Rules

### Structure Order

1. Import
2. Types
3. Component
4. Hooks
5. Functions
6. JSX
7. Export

### Next.js Rules

* Default: Server Component
* Use `"use client"` only if:

  * using state/hooks
  * browser API
  * event handlers

---

## 9. Styling Rules

### Approach

* Use Tailwind CSS
* Avoid inline styles unless dynamic
* No `!important`

### Tailwind Guidelines

* Use utility classes directly
* Use `cn()` for conditional class
* Extract repeated patterns into components

### Order

layout → spacing → size → color → typography

---

## 10. UI/UX Rules

* Use consistent spacing (8px system)
* Prioritize whitespace
* Avoid visual noise
* Maintain strong hierarchy:

  * Heading → Subheading → Content → CTA
* Smooth transitions (subtle animations only)
* Keep interactions natural and minimal

---

## 11. Image & Visual Rules

* Use high-quality, soft-light images
* Style: clean, skincare editorial look
* Avoid overly saturated or harsh visuals
* Always use `next/image`
* Define width & height

---

## 12. API & Data Rules

### Fetching

* Prefer Server Components
* Use React Query for client-side updates
* DO NOT use useEffect for fetching unless absolutely necessary

### Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

---

## 13. State Management

Use hierarchy:

1. Local state
2. Lifted state
3. Global (Zustand only if necessary)

Rules:

* One store per domain
* Avoid unnecessary global state

---

## 14. Performance Rules

* Use dynamic import for heavy components
* Optimize images (WebP/AVIF)
* Avoid unnecessary re-renders
* Use Server Components by default
* Keep bundle small

---

## 15. Git Rules

### Commit Format

* feat: new feature
* fix: bug fix
* refactor: code improvement
* style: formatting
* docs: documentation

### Rules

* One commit = one purpose
* Never commit `.env`
* Write clear commit messages

---

## 16. Features

### Completed

* [ ] Landing page
* [ ] Hero section
* [ ] Product showcase

### In Progress

* [ ] Product detail UI
* [ ] Responsive optimization

### Planned

* [ ] Authentication
* [ ] Cart system (optional)
* [ ] Animation enhancement

---

## 17. AI Behavior Rules

* If instructions are unclear → ASK first
* Do NOT assume missing details
* Do NOT over-engineer
* Follow existing patterns strictly
* Keep UI consistent with luxury aesthetic

---

## 18. Do Not

* Do NOT create new folders without approval
* Do NOT use `any`
* Do NOT hardcode sensitive data
* Do NOT install packages without confirmation
* Do NOT modify working features without instruction

---

## 19. Environment Variables

```
NEXT_PUBLIC_API_URL=

# Server only
DATABASE_URL=
SECRET_KEY=
```

---

## Final Note

This file acts as a **persistent instruction layer** for AI development.

The more specific and updated this document is,
the better the AI will perform.

Update this file regularly as the project evolves.
