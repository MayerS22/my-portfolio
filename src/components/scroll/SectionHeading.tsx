'use client'

import { useRef } from 'react'
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
export default function SectionHeading({ index, eyebrow, title, accent, intro, className, align = 'left' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
      <div data-meta className={cn('flex items-center gap-4 mb-6', align === 'center' && 'justify-center')}>
        <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--accent-primary)' }}>{index}</span>
        <span data-rule className="h-px w-16 origin-left" style={{ background: 'var(--accent-gradient)' }} />
        <span className="eyebrow">{eyebrow}</span>
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
