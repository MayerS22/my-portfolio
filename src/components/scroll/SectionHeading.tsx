'use client'

import { useRef, useState } from 'react'
import { gsap, SplitText, useGSAP, MQ } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  accent: string
  intro?: string
  className?: string
  align?: 'left' | 'center'
}

/**
 * Chapter heading used by every section: "02 — eyebrow", a giant two-part title
 * whose characters rise out of a mask when it enters, and a hairline drawn by the scroll.
 */
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

export default function SectionHeading({ index, eyebrow, title, accent, intro, className, align = 'left' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [minutes, setMinutes] = useState<number | null>(null)
  const n = parseInt(index, 10)
  const numeral = Number.isFinite(n) ? ROMAN[Math.max(0, n - 2)] ?? index : index

  useGSAP(() => {
    // Reading time for this chapter, measured from the section's own text
    const words = (ref.current!.closest('section')?.textContent ?? '').split(/s+/).filter(Boolean).length
    setMinutes(Math.max(1, Math.round(words / 220)))

    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const plain = SplitText.create(ref.current!.querySelector('[data-split="plain"]'), { type: 'chars', mask: 'chars' })
      // Gradient text can't survive per-char transforms (background-clip), so the accent splits by word
      // and each word carries its own gradient.
      const accent = SplitText.create(ref.current!.querySelector('[data-split="accent"]'), { type: 'words', mask: 'words', wordsClass: 'text-gradient' })
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%', toggleActions: 'play none none reverse' } })
      tl.from('[data-meta]', { y: 14, opacity: 0, duration: 0.6 })
        .from(plain.chars, { yPercent: 110, duration: 1, stagger: 0.025 }, 0.05)
        .from(accent.words, { yPercent: 110, duration: 1, stagger: 0.08 }, 0.2)
      const introEl = ref.current!.querySelector('[data-intro]')
      if (introEl) tl.from(introEl, { y: 20, opacity: 0, duration: 0.8 }, 0.35)
      // Clock stamp: the minute hand sweeps round, the hour hand settles
      tl.from('[data-clock-min]', { rotation: -720, duration: 1.8, ease: 'expo.out', svgOrigin: '12 12' }, 0.1)
        .from('[data-clock-hour]', { rotation: -180, duration: 1.8, ease: 'expo.out', svgOrigin: '12 12' }, 0.1)
        .from('[data-stamp]', { opacity: 0, x: -10, duration: 0.6 }, 0.2)

      gsap.fromTo('[data-rule]', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', end: 'bottom 45%', scrub: true },
      })
      return () => { plain.revert(); accent.revert() }
    })
  }, { scope: ref })

  return (
    <div ref={ref} className={cn('mb-14 sm:mb-20', align === 'center' && 'text-center', className)}>
      <div data-meta className={cn('flex items-center gap-4 mb-6 flex-wrap', align === 'center' && 'justify-center')}>
        <span className="font-serif text-base sm:text-lg" style={{ color: 'var(--accent-primary)' }}>
          <span className="serif-italic">Chapter</span> {numeral}
        </span>
        <span data-rule className="h-px w-16 origin-left" style={{ background: 'var(--accent-gradient)' }} />
        <span className="eyebrow">{eyebrow}</span>
        <span data-stamp className="hidden sm:inline-flex items-center gap-2 ml-auto pl-4 eyebrow !tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
          <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <g transform={`rotate(${((minutes ?? 1) * 30) % 360} 12 12)`}><line data-clock-hour x1="12" y1="12" x2="12" y2="7.5" stroke="var(--accent-primary)" strokeWidth="1.8" strokeLinecap="round" /></g>
            <g transform={`rotate(${((minutes ?? 1) * 30 + 60) % 360} 12 12)`}><line data-clock-min x1="12" y1="12" x2="12" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></g>
          </svg>
          {minutes ?? '–'} min read
        </span>
      </div>
      <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
        <span data-split="plain">{title}</span>{' '}
        <span data-split="accent" className="text-gradient">{accent}</span>
      </h2>
      {intro && (
        <p data-intro className={cn('mt-5 text-base sm:text-lg max-w-xl', align === 'center' && 'mx-auto')} style={{ color: 'var(--text-secondary)' }}>
          {intro}
        </p>
      )}
    </div>
  )
}
