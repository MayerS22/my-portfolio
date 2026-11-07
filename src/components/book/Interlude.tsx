'use client'

import { useRef } from 'react'
import { gsap, SplitText, useGSAP, MQ } from '@/lib/gsap'
import { blobPath } from '@/lib/pageTurn'

interface InterludeProps {
  quote: string
  author: string
  /** Word in the quote to set in gilt italics. */
  highlight?: string
  /** Folio shown in the margins, e.g. "42". */
  folio: string
  /** Which prop sits beside the quote. */
  motif?: 'clock' | 'book' | 'candle'
}

/**
 * A breath between chapters: one line from a book Mayer would keep on his desk.
 * The letters ink in out of a blur as you scroll through, a giant quotation mark drifts,
 * a pocket-watch hand turns with the scroll, and an ink flourish signs it off.
 */
const BLOOM = blobPath(2.7)

export default function Interlude({ quote, author, highlight, folio, motif = 'clock' }: InterludeProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(ref)

    mm.add(MQ.motion, () => {
      const split = SplitText.create(q('[data-quote]'), { type: 'words,chars' })
      // Gradient text can't survive per-char transforms on the parent — give each gilt char its own.
      split.chars.forEach((c) => { if ((c as HTMLElement).closest('[data-hl]')) c.classList.add('text-gradient') })
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'center 45%', scrub: 0.8 },
      })
      tl.fromTo(split.chars,
        { opacity: 0.08, yPercent: 35 },
        { opacity: 1, yPercent: 0, stagger: 0.012, duration: 0.25 }, 0)
        .fromTo(q('[data-flourish]'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.3 }, '>-0.1')
        .fromTo(q('[data-author]'), { opacity: 0, letterSpacing: '0.6em' }, { opacity: 1, letterSpacing: '0.25em', duration: 0.25 }, '<')

      // Ink bleed: parchment blooms out from the centre in an ink-blot shape, the quote turns to ink,
      // then the blot recedes as you leave. One transformed shape: cheap to composite.
      const section = ref.current!
      const cover = () => (Math.hypot(section.offsetWidth, section.offsetHeight) / 2 / 62) * 1.12
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section, start: 'top 70%', end: 'bottom 30%', scrub: 0.6, invalidateOnRefresh: true,
          // Text turns to ink only while the parchment fully covers it (CSS handles the colours, theme-safe)
          onUpdate: (self) => section.classList.toggle('inked', self.progress > 0.27 && self.progress < 0.7),
        },
      })
        .fromTo(q('[data-bloom]'), { scale: 0, rotation: -25 }, { scale: cover, rotation: 0, duration: 0.32, ease: 'power2.in' }, 0)
        .to(q('[data-bloom]'), { scale: 0, rotation: 25, duration: 0.26, ease: 'power2.out' }, 0.74)

      // Through the whole pass: quote mark drifts & turns, watch hand sweeps, folios slide
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
        .fromTo(q('[data-qmark]'), { yPercent: -30, rotation: -12 }, { yPercent: 40, rotation: 8 }, 0)
        .fromTo(q('[data-watch-hand]'), { rotation: -90, svgOrigin: '50 50' }, { rotation: 270, svgOrigin: '50 50' }, 0)
        .fromTo(q('[data-folio-l]'), { y: 80 }, { y: -80 }, 0)
        .fromTo(q('[data-folio-r]'), { y: -80 }, { y: 80 }, 0)

      return () => split.revert()
    })
  }, { scope: ref })

  const parts = highlight ? quote.split(highlight) : [quote]

  return (
    <section ref={ref} aria-label={`Quote by ${author}`} className="relative overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 pointer-events-none gradient-mesh opacity-60" />
      {/* Parchment ink-bloom (scaled by the scroll; hidden at scale 0) */}
      <svg
        data-bloom
        aria-hidden
        viewBox="-100 -100 200 200"
        className="absolute left-1/2 top-1/2 -ml-[80px] -mt-[80px] w-[160px] h-[160px] pointer-events-none will-change-transform"
        style={{ transform: 'scale(0)' }}
      >
        <path d={BLOOM} fill="var(--paper)" />
      </svg>

      {/* Margin folios */}
      <span data-folio-l className="hidden md:block absolute left-8 top-1/2 font-serif serif-italic text-sm" style={{ color: 'var(--text-muted)' }}>
        — {folio} —
      </span>
      <span data-folio-r className="hidden md:block absolute right-8 top-1/2 font-mono text-[0.65rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)', writingMode: 'vertical-rl' }}>
        Interlude
      </span>

      <div className="container-content relative">
        <div className="relative max-w-5xl mx-auto text-center">
          <span
            data-qmark
            aria-hidden
            className="absolute -top-24 sm:-top-36 left-1/2 -translate-x-1/2 font-serif leading-none select-none pointer-events-none text-gradient"
            style={{ fontSize: 'clamp(10rem, 26vw, 22rem)', opacity: 0.18 }}
          >
            &ldquo;
          </span>

          <Motif kind={motif} />

          <blockquote className="relative">
            <p
              data-quote
              className="serif-italic leading-[1.12] tracking-tight"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 5.2vw, 4.75rem)' }}
            >
              {parts.length === 2 ? (
                <>
                  {parts[0]}
                  <span data-hl className="text-gradient">{highlight}</span>
                  {parts[1]}
                </>
              ) : (
                quote
              )}
            </p>
            <footer className="mt-12 flex flex-col items-center gap-3">
              <svg viewBox="0 0 220 24" className="w-40 sm:w-52" aria-hidden>
                <path
                  data-flourish
                  pathLength={1}
                  className="ink-stroke"
                  d="M4 14 C 40 2, 70 22, 110 12 S 170 2, 200 14 Q 210 18, 216 8"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <cite data-author className="not-italic font-mono text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-primary)' }}>
                {author}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

function Motif({ kind }: { kind: 'clock' | 'book' | 'candle' }) {
  if (kind === 'clock') {
    return (
      <svg viewBox="0 0 100 100" className="w-14 h-14 mx-auto mb-10" aria-hidden>
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent-primary)" strokeWidth="0.8" opacity="0.5" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="50" y1="10" x2="50" y2={i % 3 === 0 ? 17 : 14} stroke="var(--accent-primary)" strokeWidth={i % 3 === 0 ? 2 : 1} transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <line x1="50" y1="50" x2="50" y2="28" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" transform="rotate(300 50 50)" />
        <line data-watch-hand x1="50" y1="56" x2="50" y2="16" stroke="var(--accent-primary)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="var(--accent-primary)" />
        <rect x="45" y="0" width="10" height="6" rx="2" fill="var(--accent-primary)" transform="translate(0 -4)" />
      </svg>
    )
  }
  if (kind === 'book') {
    return (
      <svg viewBox="0 0 120 80" className="w-20 h-14 mx-auto mb-10" aria-hidden>
        <path d="M60 18 C 45 8, 22 8, 8 14 V 70 C 22 64, 45 64, 60 74 Z" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M60 18 C 75 8, 98 8, 112 14 V 70 C 98 64, 75 64, 60 74 Z" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinejoin="round" />
        {[26, 34, 42, 50].map((y) => (
          <g key={y} opacity="0.5">
            <line x1="18" y1={y} x2="50" y2={y + 3} stroke="var(--accent-primary)" strokeWidth="1" />
            <line x1="70" y1={y + 3} x2="102" y2={y} stroke="var(--accent-primary)" strokeWidth="1" />
          </g>
        ))}
        <line data-watch-hand x1="60" y1="18" x2="60" y2="74" stroke="transparent" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 40 80" className="w-8 h-16 mx-auto mb-10" aria-hidden>
      <path className="flicker" style={{ transformOrigin: '20px 30px' }} d="M20 6 C 26 16, 27 22, 20 30 C 13 22, 14 16, 20 6 Z" fill="#f2c97e" />
      <rect x="12" y="32" width="16" height="40" rx="2" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
      <line data-watch-hand x1="20" y1="30" x2="20" y2="34" stroke="var(--text-muted)" strokeWidth="1.5" />
      <rect x="6" y="72" width="28" height="5" rx="2" fill="var(--accent-primary)" />
    </svg>
  )
}
