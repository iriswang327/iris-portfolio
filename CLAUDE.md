# Museum of Iris — Claude Code Instructions

## Project
Portfolio for Iris Wang — Museum of Iris
Designer and strategist working at the edges 
of law, tech, and people.

## Stack
Next.js 15 App Router, TypeScript, Tailwind CSS,
Framer Motion, Geist Sans, Sanity CMS, Vercel

## Design System
- Font: Geist Sans ONLY — no serif ever
- Primary gradient: #F0ABFC → #A78BFA → #7DD3FC
- Background: #FAF9FF
- Foreground: #1A1625
- See guidelines.md for full system

## Code Standards
- TypeScript strict mode always
- Mobile first responsive
- Semantic HTML for accessibility
- All animations via Framer Motion
- CSS variables for theme/dark mode
- Reusable components — never repeat code
- Clean commit messages

## Component Rules
- Every repeated element = a component
- Props over hardcoded values
- Consistent naming: PascalCase components
- No inline styles — Tailwind only

## Accessibility
- All images have alt text
- Keyboard navigable
- ARIA labels on interactive elements
- Minimum 44px tap targets mobile

## Performance
- Images optimized via next/image
- Lazy loading on below-fold content
- No unused dependencies

## DO NOT
- Use serif fonts anywhere
- Use inline styles
- Hardcode content that belongs in Sanity
- Create duplicate components
- Skip TypeScript types