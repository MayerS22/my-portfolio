# CLAUDE.md — Mayer Frieg Portfolio

## Project Overview

Personal portfolio website for **Mayer Frieg**, a Full-Stack Developer based in Cairo, Egypt. Built with Next.js 15 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

- **Live URL:** https://mayerfrieg.dev
- **Deployment:** Vercel
- **Font:** Space Grotesk (display) + Geist Sans (body/UI) + Geist Mono (labels)
- **Direction:** Editorial scroll-story — ocean palette (deep-sea teal, cerulean, icy glaze, frost white); dark default, light supported. Every section is a GSAP ScrollTrigger "chapter".

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15.5.9 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS v4, CSS-variable design tokens (`@theme` + `:root`/`[data-theme]`) |
| Animations | GSAP 3 + ScrollTrigger (scroll-linked / scrubbed / pinned) · Framer Motion (entrances, hover, modals) |
| Smooth scroll | Lenis driven by `gsap.ticker` + `ScrollTrigger.update` (`SmoothScrollProvider`, auto-disabled under reduced-motion) |
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
│   ├── layout.tsx          # Root layout: Geist + Space Grotesk fonts, SEO metadata, theme FOUC script, skip link
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Theme tokens (@theme + :root/[data-theme]), utilities, editorial type scale
├── components/
│   ├── Header.tsx          # Fixed nav, scroll detection, active-section tracking, focus-trapped mobile menu
│   ├── Hero.tsx            # Two-column (text + photo), oversized split name, parallax, MagneticButton CTAs
│   ├── About.tsx           # Editorial bio, "currently building" card, stat counters
│   ├── Skills.tsx          # SIGNATURE: pinned horizontal-scroll oversized type (desktop) / grid (mobile, reduced-motion)
│   ├── Experience.tsx      # Education, work timeline, grouped certs/courses (large issuers collapse to a list)
│   ├── Freelance.tsx       # SafetyZone case study (3 deliverables) + AnimatedModal carousel
│   ├── Projects.tsx        # Category-filtered bento grid + ProjectDetailModal
│   ├── Contact.tsx         # Email/CV CTAs, info row, social links, confetti
│   ├── Footer.tsx          # Quick nav + social echo, Lenis back-to-top
│   ├── ThemeProvider.tsx   # Dark/light theme context + localStorage (renders immediately; FOUC handled in layout)
│   ├── PageLoader.tsx      # First-paint loader (gates content until rAF)
│   ├── CommandPalette.tsx  # ⌘K palette (combobox/listbox semantics, focus-trapped)
│   ├── ProjectDetailModal.tsx # Carousel modal + keyboard nav
│   ├── ScrollProgress.tsx  # Top scroll-progress bar (token-driven)
│   ├── BackToTop.tsx       # Lenis scroll-to-top
│   ├── TextReveal.tsx      # Slide-up + fade (view-toggle)
│   ├── Credentials.tsx     # Certifications & courses ledger (used inside Experience)
│   ├── Testimonials.tsx
│   ├── scroll/             # GSAP scroll/pointer pieces
│   │   ├── SectionHeading.tsx   # "0N — eyebrow" + SplitText char/word mask reveal + scrubbed rule
│   │   ├── VelocityMarquee.tsx  # Text strip; speed/direction/skew follow scroll velocity
│   │   └── CustomCursor.tsx     # Dot + trailing ring; grows on links, labels on [data-cursor]
│   └── motion/             # Framer Motion primitives (entrances, hover, modals)
│       ├── MotionSection.tsx
│       └── StaggerGrid.tsx, TiltCard.tsx, MagneticButton.tsx, AnimatedModal.tsx
├── providers/
│   └── SmoothScrollProvider.tsx  # Lenis + useLenis hook (skipped under reduced-motion)
├── hooks/
│   ├── useMounted.ts
│   └── useFocusTrap.ts     # Focus trap + restore for modals/menus
└── lib/
    ├── utils.ts            # cn() (clsx + tailwind-merge)
    ├── animations.ts       # Shared Framer Motion variants + EASE_EDITORIAL
    └── confetti.ts         # confettiBurst()
```

### Page Section Order (top to bottom)

1. **Header** — Fixed; GSAP entrance; **hides on scroll down, returns on scroll up** (ScrollTrigger direction). Active section computed from rects (pin-safe). Desktop nav labels scramble on hover (ScrambleText). Mobile menu is a focus-trapped `role="dialog"`.
2. **Hero** (01) — Split name "Mayer / Frieg" with the portrait between them. Desktop: **pinned** for +140%; the scroll splits the name apart, recedes the portrait and reveals the tagline word by word. Mouse parallax on name/photo. Mobile: stacked, no pin.
   - Velocity marquee between Hero and About.
3. **About** (02) — Bio statement whose words light up as you scroll (scrubbed SplitText), detail row + "currently building" card, stats grid with count-up on enter.
4. **Skills** (03) — GSAP **pinned horizontal track** (desktop): category panels slide sideways, ghost outline word, counter + progress HUD, row reveals via `containerAnimation`. Mobile: grid with batch reveals.
5. **Experience** (04) — Sticky role panel (index, logo, company, period) that follows the role in view + self-drawing timeline; education card; **Credentials ledger** (`Credentials.tsx`): sticky summary (counts, segmented filter, issuer logos) + year-grouped rows, row click opens the certificate `AnimatedModal`.
6. **Freelance** (05) — SafetyZone case study intro + **stacking sticky cards** (each card scales back/dims as the next slides over) + `AnimatedModal` carousel.
7. **Projects** (06) — Two **featured case-study rows** (Grace, MayerHub; `FEATURED_IDS`) with clip-path wipe + image parallax (accent duotone tint → full color on hover); then a filterable **index list** with a cursor-following preview image (desktop) / thumbnails (mobile). `ProjectDetailModal`.
   - Outline velocity marquee before Contact.
8. **Contact** (07) — Giant "Get In Touch" mailto CTA scaled by scroll, email/CV cards, info row, socials, confetti.
9. **Footer** — Nav + socials + back-to-top, oversized wordmark that rises with the scroll.

### Dynamic Imports

`Experience`, `Projects`, `Freelance` are loaded via `next/dynamic` with skeleton placeholders. `ScrollProgress` and `BackToTop` are SSR-disabled.

---

## Design System

### Visual Direction — Ocean

Deep-sea teal backbone, frost-white text, cerulean/icy-glaze accents used sparingly (dots, rules, accent words). Subtle animated film grain (`body::after`, `--grain-opacity`).
Palette: Deep Sea Teal `#0C3846` · Arctic Ocean `#2A7387` · Cerulean Ripple `#5EB0C8` · Icy Glaze `#9FD3E3` · Frost White `#E4F4F8`.
Dark mode is the default; light mode is fully supported via the `[data-theme]` token swap in `globals.css`.

```
Dark (default)                          Light
  --bg-primary:     #082c38              --bg-primary:     #e4f4f8 (Frost White)
  --bg-secondary:   #0c3846 (Deep Sea)   --bg-secondary:   #eef8fb
  --text-primary:   #e4f4f8 (Frost)      --text-primary:   #0c3846 (Deep Sea)
  --text-secondary: #9fd3e3 (Icy Glaze)  --text-secondary: #24606f
  --text-muted:     #6fa6b8              --text-muted:     #3d7383
  --accent-primary: #5eb0c8 (Cerulean)   --accent-primary: #2a7387 (Arctic Ocean)
  --accent-gradient: Frost->Icy fill     --accent-gradient: Deep Sea->Arctic fill   (buttons, badges, bars)
  --accent-ink:     #0c3846              --accent-ink:     #e4f4f8                  (text on fills)
  --accent-text-gradient: Icy->Cerulean (dark) / Deep Sea->Arctic (light), used by .text-gradient
```

**Fill rule:** any element whose inline style uses `--accent-gradient` automatically gets `--accent-ink` text (global rule in `globals.css`) — don't add `text-white` to fills.
Semantic tokens (both themes): `--live` (green — "available/current"), `--warning`, `--info`.
Cards: `var(--card-bg)` + `1px var(--card-border)`, hairline borders, minimal shadow. `.glass` (blur) is reserved for the header and overlays only, not default cards.
`.dark-overlay` is **always dark** (white text sits on photos in both themes).
**Rule:** prefer `var(--*)` tokens (or token classes via `@theme`) over hardcoded hex — color-mix is used for tinted accents so they adapt to theme.

### Typography

- Display face: **Space Grotesk** via `.font-display` / `.heading-display` (weight 700, letter-spacing -0.03em, line-height 0.98).
- Hero: `var(--type-display)` = `clamp(2.75rem, 9vw, 8rem)` via `.text-clamp-hero`.
- Section titles: `var(--type-section)` = `clamp(2rem, 5vw, 4rem)` via `.text-clamp-section`.
- Eyebrow labels: `.eyebrow` (Geist Mono, uppercase, tracked 0.18em).
- Body / UI: Geist Sans. Labels / `>`-prefix: Geist Mono.

### Animations

- **Two engines, split by job:**
  - **GSAP** owns everything tied to scroll or pointer: scrubbed timelines, pins, scroll events, SplitText, ScrambleText, cursor, parallax. Import from `@/lib/gsap` (registers ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP once; exports `gsap`, `ScrollTrigger`, `SplitText`, `useGSAP`, `MQ`). Always `useGSAP(..., { scope })` + `gsap.matchMedia()` with `MQ.motion` / `MQ.desktopMotion` / `MQ.mobileMotion` / `MQ.pointerMotion` so reduced-motion and cleanup are automatic.
  - **Framer Motion** owns hover/tap micro-interactions (`TiltCard`, `MagneticButton`), header mobile menu, and modals (`AnimatedModal`).
  - Never let both engines animate the same element's transform — GSAP targets a wrapper (`data-*` hook) around Framer elements.
- **Pins:** Hero (desktop) and Skills (desktop). Freelance stacking and the Experience/Credentials panels use CSS `sticky` — their sections are `overflow-clip` (not `overflow-hidden`, which breaks sticky).
- **Tailwind + GSAP media:** horizontal/pinned layouts use the literal `lg:motion-safe:` variant (must be literal — Tailwind can't see classes built from template strings).
- **Gradient text + SplitText:** split gradient words by *word* with `wordsClass: 'text-gradient'` — per-char transforms break `background-clip: text`.
- **Refresh:** `SmoothScrollProvider` calls `ScrollTrigger.refresh()` (debounced) whenever page height changes (lazy sections, images, filters). Filtered lists re-create their triggers via `useGSAP({ dependencies, revertOnUpdate: true })`.
- **Shared variants** in `lib/animations.ts` (`fadeInUp`, `staggerContainer`, `staggerItem`, `modal*`); `EASE_EDITORIAL = cubic-bezier(0.16,1,0.3,1)`.
- **Smooth scroll:** Lenis via `SmoothScrollProvider`, ticked by `gsap.ticker` (skipped entirely under reduced-motion).
- **Accessibility:** all GSAP effects live inside `MQ.motion`-gated matchMedia blocks, so reduced-motion gets static, fully visible content (no pins, no grain animation). The custom cursor is decorative; the native cursor stays.

### Responsive

- Touch targets: 44–48px minimum (`.touch-target`)
- Mobile: Skills falls back to a wrap grid (no pinned scroll); hamburger nav with focus trap; touch feedback (scale on active)
- Safe area support for notched devices
- `prefers-reduced-motion` disables all motion (scroll-linked primitives bail out; Skills pin → grid; Lenis skipped)

---

## Portfolio Data Objects

### About Stats

| Icon | Value | Label |
|------|-------|-------|
| Code | 1+ | Years Experience |
| Users | 9+ | Projects Built |
| Briefcase | 3 | Live Products |
| Award | 100% | Client Satisfaction |

### Skills Categories

**Frontend:** React, HTML5, CSS3, JavaScript, TypeScript, Next.js, Tailwind CSS, Redux

**Backend:** Node.js, Python, C++, Express.js, Firebase, Nest.js, REST APIs, GraphQL, Java

**Database & Cloud:** SQL, Power BI, Data Engineering, PostgreSQL, MongoDB, Cloud Services, Redis

### Work Experience

| Title | Company | Period | Technologies |
|-------|---------|--------|-------------|
| Software Engineer | QueenSoft | July 2025 – Present | Next.js, Nest.js, PostgreSQL, TypeScript, React, Node.js |
| Assistant to Foundation Manager | CMF | Aug 2024 – Mar 2026 | Microsoft Office, Reports, Event Organization |
| Microsoft Student Partner | Microsoft Tech Club | Oct 2022 – Oct 2023 | Azure, Power Platform, Power BI, GitHub, Leadership |
| Database Administrator | CMF | Sept 2022 – Feb 2023 | Access, Database Design, SQL, Data Modeling |

### Education

- **Bachelor of Computer and Information Science** — Ain Shams University, Egypt (Sept 2021 – July 2025), GPA: 3.005, Graduation Project: A+

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
| Claude Code 101 | Anthropic | May 2025 | `/images/Certifcation/Claude Code 101 .png` |
| Claude 101 | Anthropic | Apr 2025 | `/images/Certifcation/claude 101.png` |
| Claude Code in Action | Anthropic | Apr 2025 | `/images/Certifcation/claude code in action.png` |
| AI Fluency: Framework & Foundations | Anthropic | 2025 | `/images/Certifcation/AI Fluency Framework & Foundations course.png` |
| Introduction to Claude Cowork | Anthropic | 2025 | `/images/Certifcation/Claude coworker.png` |
| Introduction to Sub-Agents | Anthropic | 2025 | `/images/Certifcation/Introducation to Sub-Agents.png` |
| Introduction to Agent Skills | Anthropic | 2025 | `/images/Certifcation/Introduction to agent skills.png` |
| AI Fluency: AI Capabilities & Limitations | Anthropic | 2025 | `/images/Certifcation/AI Capabilities and Limitations.png` |
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
| 8 | Grace App | Full-Stack | React, Node.js, Redis, TypeScript, PostgreSQL | — (live: joingrace.ai) |
| 9 | Taskify | Full-Stack | React, Node.js, JavaScript, REST APIs | — |

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
- Static data (projects, experiences, skills) is module-scope or wrapped in `useMemo`; Experience's data arrays live at module scope
- Modal handlers use `useCallback` to avoid re-renders
- `AnimatedModal` (`components/motion/`) is the shared modal base: Escape-to-close, body scroll lock, `prefers-reduced-motion` variants, optional close button. `ProjectDetailModal` and the Freelance carousel build on it (Freelance adds ArrowLeft/ArrowRight image nav)
- `useFocusTrap` (`hooks/`) traps + restores focus in the Header mobile menu and CommandPalette
- All project data arrays use `#` as placeholder for unavailable URLs; dead `#` links are hidden in the UI
- Section IDs match nav items (order): `home`, `about`, `skills`, `experience`, `freelance`, `projects`, `contact`
- Color usage: prefer `var(--*)` tokens / token classes over hardcoded hex; tinted accents use `color-mix(... var(--accent-primary) ...)` so they adapt to theme
- Keyboard: nav is `<a href>` with a modifier-click guard (new-tab works); active item carries `aria-current`
