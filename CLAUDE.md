# CLAUDE.md — Mayer Frieg Portfolio

## Project Overview

Personal portfolio website for **Mayer Frieg**, a Full-Stack Developer based in Cairo, Egypt. Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

- **Live URL:** https://mayerfrieg.dev
- **Deployment:** Vercel
- **Font:** Geist Sans + Geist Mono

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15.5.9 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, custom CSS variables |
| Animations | Framer Motion (installed), CSS IntersectionObserver (primary) |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |

---

## Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Geist fonts, SEO metadata
│   ├── page.tsx            # Main page composing all sections
│   ├── globals.css         # Theme variables, card styles, animations
│   └── test/page.tsx       # Test page
├── components/
│   ├── Header.tsx          # Fixed nav with scroll detection, active section tracking
│   ├── Hero.tsx            # Two-column layout (text + photo), typing animation, CTAs, social links
│   ├── About.tsx           # Bio, skill focus card, stat counters
│   ├── Skills.tsx          # 3-category grid, horizontal scroll on mobile
│   ├── Experience.tsx      # Education, work, certifications, courses + certificate modal
│   ├── Freelance.tsx       # Client projects with image carousel modal
│   ├── Projects.tsx        # Portfolio projects with category filter + detail modal
│   ├── Contact.tsx         # Email/phone/location cards, CV link, social links
│   ├── Footer.tsx          # Simple footer
│   ├── ScrollAnimations.tsx # IntersectionObserver provider (no render, side-effect only)
│   ├── TextReveal.tsx      # Slide-up + fade text reveal on scroll
│   ├── SplitText.tsx       # Character-by-character staggered reveal
│   ├── ProjectDetailModal.tsx # Reusable modal with image carousel + keyboard nav
│   ├── ScrollProgress.tsx  # Scroll progress indicator
│   ├── BackToTop.tsx       # Scroll-to-top button
│   ├── HeroSimple.tsx      # Simplified hero variant
│   └── NoSSR.tsx           # Client-only wrapper
├── hooks/
│   ├── useMounted.ts
│   ├── useIsomorphicLayoutEffect.ts
│   ├── useScrollAnimation.ts
│   └── useScrollAnimate.ts
└── lib/
    └── utils.ts
```

### Page Section Order (top to bottom)

1. **Header** — Fixed, transparent → blurred on scroll. Active section tracking. Mobile hamburger menu.
2. **Hero** — Full-width overlay layout: profile photo (`/Me.jpeg`) fills the right half as a background image with gradient fade overlay for text readability. Text content sits on the left. Staggered slide-up entrance animations on every element (badge, name, typing, CTAs, socials) with increasing delays (300ms–1700ms). Photo slides in from right. Glass-blur on interactive elements. Scroll indicator centered at bottom.
3. **About** — Bio text, Full-Stack Development focus card, 5 stat counters.
4. **Skills** — Frontend / Backend / Database & Cloud categories. Grid on desktop, horizontal scroll on mobile.
5. **Experience** — Two-column: Education + Work (left), Certifications + Courses (right). Certificate image modal.
6. **Freelance** — Client project cards with image carousel modal.
7. **Projects** — Category-filtered project grid (All / Full-Stack / Mobile / Frontend). Detail modal.
8. **Contact** — Email, phone, location cards. Social links. CV viewer + email buttons.
9. **Footer** — "Designed & Built with passion"

### Dynamic Imports

`Experience`, `Projects`, `Freelance` are loaded via `next/dynamic` with skeleton placeholders. `ScrollProgress` and `BackToTop` are SSR-disabled.

---

## Design System

### Color Theme (Light Neutral + Green Accent)

```
Background layers:  neutral-200 → neutral-300 → neutral-400 (alternating sections)
Card background:    #e5e5eb  (var --card-bg)
Card border:        #c4c4ca  (var --card-border)
Accent:             #22c55e  (green-600)
Accent hover:       #16a34a  (green-700)
Text primary:       #09090b  (neutral-950)
Text secondary:     #52525b  (neutral-600)
```

Section backgrounds alternate: Hero (300) → About (400) → Skills (300) → Experience (400) → Freelance (200) → Projects (300) → Contact (400)

### Typography

- Hero titles: `clamp(2rem, 6vw, 4rem)` via `.text-clamp-hero`
- Section titles: `clamp(1.5rem, 4vw, 2.5rem)` via `.text-clamp-section`

### Animations

- **Scroll animations:** CSS-only via `.scroll-animate` → `.visible` class toggled by `IntersectionObserver`
- **Text reveal:** `TextReveal` component — slide-up + fade per word with configurable delay
- **Split text:** `SplitText` component — character-by-character stagger
- **Typing cursor:** CSS `blink` keyframe
- **Delays:** `.delay-100` through `.delay-400` for staggered entry

### Responsive

- Touch targets: 48px minimum (`.touch-target`)
- Mobile: horizontal scroll for skill cards, hamburger nav, touch feedback (scale on active)
- Safe area support for notched devices
- `prefers-reduced-motion` disables animations

---

## Portfolio Data Objects

### About Stats

| Icon | Value | Label |
|------|-------|-------|
| Code | 1+ | Years Experience |
| Users | 7+ | Featured Projects |
| Briefcase | 3 | Live Freelance |
| Zap | 100% | Client Satisfaction |
| Target | 24/7 | Support Available |

### Skills Categories

**Frontend:** React, HTML5, CSS3, JavaScript, TypeScript, Next.js, Tailwind CSS, Redux

**Backend:** Node.js, Python, C++, Express.js, Firebase, Nest.js, REST APIs, GraphQL

**Database & Cloud:** SQL, Power BI, Data Engineering, PostgreSQL, MongoDB, Cloud Services

### Work Experience

| Title | Company | Period | Technologies |
|-------|---------|--------|-------------|
| Software Engineer | QueenSoft | July 2025 – Present | Next.js, Nest.js, PostgreSQL, TypeScript, React, Node.js |
| Administrative Assistant | CMF | Aug 2023 – Present | Microsoft Office, Data Entry, Report Generation |
| Microsoft Student Partner | Microsoft Tech Club | Oct 2022 – Oct 2023 | Azure, Power Platform, Power BI, GitHub, Leadership |
| Database Administrator | CMF | Sept 2022 – Feb 2023 | Access, Database Design, SQL, Data Modeling |

### Education

- **Bachelor of Computer and Information Science** — Ain Shams University, Egypt (Sept 2021 – July 2025), GPA: 3.005

### Certifications

| Title | Issuer | Date | Certificate Image |
|-------|--------|------|-------------------|
| Android Internship | Banque Misr | Aug 2024 | `/images/Certifcation/BM.jpg` |
| Data Engineering Training | Potenia | Aug 2023 | `/images/Certifcation/Potenia.png` |
| Flutter Training | Support | Aug 2023 | `/images/Certifcation/Fluttersupport.jpg` |
| Software Engineering Training | ALX | Feb 2023 | — |

### Courses

| Title | Issuer | Date | Certificate Image |
|-------|--------|------|-------------------|
| AI Fluency: Framework & Foundations | Anthropic | 2025 | `/images/Certifcation/AI Fluency Framework & Foundations course.png` |
| Git & GitHub Bootcamp | Udemy | Aug 2025 | `/images/Certifcation/GitCourse.jpg` |
| Nest.js Complete Guide | Udemy | Jun 2025 | `/images/Certifcation/The Complete Developer's Guide in Nest.jpg` |
| Freelancer Toolkit | E-Youth \| ITIDA | Mar 2025 | — |
| Flutter Course | Udemy | Sept 2023 | — |
| Python 3 Guide | Udemy | July 2023 | `/images/Certifcation/Python.jpg` |

### Freelance Projects

| Title | Client | Duration | Technologies | Live URL |
|-------|--------|----------|-------------|----------|
| SafetyZone Consumer Website | SafetyZone | 2 months | Next.js, React, TypeScript, Tailwind CSS, Firebase | https://safetyzoone.com/ |
| SafetyZone Consumer App | SafetyZone | 3 months | Flutter, Firebase, Dart, REST APIs | — |
| SafetyZone Provider App | SafetyZone | 4 months | Flutter, Firebase, Dart, Socket.io | — |

### Featured Projects

| # | Title | Category | Technologies | GitHub |
|---|-------|----------|-------------|--------|
| 1 | AutoInsight | Full-Stack | React, Vite, Python, ML | github.com/MayerS22/AutoInsight |
| 2 | SafetyZone Consumer App | Mobile | Flutter, Firebase, Dart, REST APIs | — |
| 3 | Speedo Transfer | Mobile | Kotlin, Jetpack Compose, MVVM, Firebase | github.com/MayerS22/speedoo |
| 4 | Checko | Mobile | React Native, Firebase, TypeScript | github.com/MayerS22/Checko |
| 5 | E-Commerce | Mobile | Flutter, Firebase, Dart | github.com/MayerS22/E-commerce-Mobile-App |
| 6 | SafetyZone Provider App | Mobile | Flutter, Firebase, Dart, Socket.io | — |
| 7 | SafetyZone Consumer Website | Frontend | Next.js, React, TypeScript, Tailwind CSS | — (live: safetyzoone.com) |

### Social Links

- GitHub: https://github.com/MayerS22
- LinkedIn: https://www.linkedin.com/in/mayer-frieg-7a0368226/
- Email: mayerfrieg@outlook.com
- Phone: +20 188 244 283
- CV: `/images/Cv/Mayer Soliman CV.pdf`

---

## Image Assets

```
public/images/
├── ALX.jpg, AutoInsight.png, BM.jpg, CMF.jpg, CS.jpg
├── ITIDA.jpg, MSP.jpg, POTENTIA.jpg, QueenSoft.jpg
├── Speedo.png, Support.jpg, Taskify.png, Udemy.jpg
├── anthropic.png, ecommerce-app.jpg
├── Mayer Soliman.png, Mayer.jpg, Me.jpeg
├── Certifcation/          # Certificate images (BM.jpg, Potenia.png, etc.)
├── Checko/                # checko-1.jpeg, checko-2.jpeg
├── Cv/                    # Mayer Soliman CV.pdf
├── SaftyZoneprovider/     # HomePage.png, BasicInfo.png, chats.png, Offers.png, PendingScreen.png, SaftyZone.png
├── safetyZoneConsumer/    # 0.png through 5.png
├── safetyZoneWebsite/     # 1.png through 5.png
└── speedo/                # Speedo app screenshots
```

---

## Key Conventions

- All section components are `'use client'` (no server components for sections)
- Static data (projects, experiences, skills) is hardcoded inline with `useMemo`
- Modal handlers use `useCallback` to avoid re-renders
- Image carousel modals support keyboard navigation (Escape, ArrowLeft, ArrowRight) and body scroll lock
- Projects/Freelance use separate but similar modal implementations (Freelance has inline modal, Projects uses `ProjectDetailModal`)
- All project data arrays use `#` as placeholder for unavailable URLs
- Section IDs match nav items: `home`, `about`, `skills`, `experience`, `projects`, `freelance`, `contact`
- Hero section `ref` is `#home`, About is `#about`, etc.
