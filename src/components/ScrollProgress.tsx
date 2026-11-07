'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import Hourglass from '@/components/book/Hourglass'
import { onFocus, toggleFocus, getFocus, fmtClock, type FocusState } from '@/lib/focus'
import { play } from '@/lib/sound'

const CHAPTERS = [
  { id: 'home', numeral: '—', name: 'Prologue' },
  { id: 'about', numeral: 'I', name: 'About' },
  { id: 'skills', numeral: 'II', name: 'Skills' },
  { id: 'experience', numeral: 'III', name: 'Journey' },
  { id: 'freelance', numeral: 'IV', name: 'Freelance' },
  { id: 'projects', numeral: 'V', name: 'Work' },
  { id: 'contact', numeral: '∞', name: 'Epilogue' },
]

const WPM = 220

/**
 * Reading progress, told with time: a gilt bar across the top, and (desktop) a brass hourglass
 * on the left margin that drains as you read, with the current chapter and minutes left.
 * The chapter numeral turns like a page whenever the chapter changes.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)
  const [minsLeft, setMinsLeft] = useState<number | null>(null)
  const [focus, setFocus] = useState<FocusState>(getFocus)
  const focusRef = useRef(focus)
  focusRef.current = focus

  // Focus session: the glass flips over, then drains with the 25-minute timer instead of the scroll
  useEffect(() => onFocus((st) => {
    const glass = railRef.current?.querySelector('svg')
    const was = focusRef.current
    setFocus(st)
    if (!glass) return
    if (st.running && !was.running) {
      gsap.timeline()
        .to(glass, { rotation: 180, duration: 0.7, ease: 'back.inOut(1.6)' })
        .set(glass, { rotation: 0, '--p': 0 })
    } else if (st.running) {
      glass.style.setProperty('--p', String(1 - st.remaining / st.total))
    } else if (was.running) {
      gsap.fromTo(glass, { rotation: -20 }, { rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' })
    }
  }), [])

  useGSAP(() => {
    const totalWords = (document.querySelector('main')?.textContent ?? '').split(/\s+/).filter(Boolean).length
    const totalMins = totalWords / WPM
    const glass = railRef.current!.querySelector('svg')
    let lastMins = -1
    const tilt = glass ? gsap.quickTo(glass, 'rotation', { duration: 0.6, ease: 'power3' }) : null

    gsap.fromTo(barRef.current, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          if (glass && !focusRef.current.running) glass.style.setProperty('--p', self.progress.toFixed(4))
          const m = Math.max(0, Math.ceil(totalMins * (1 - self.progress)))
          if (m !== lastMins) { lastMins = m; setMinsLeft(m) }
          // Tilt the glass with scroll velocity, like it's being carried
          tilt?.(gsap.utils.clamp(-12, 12, self.getVelocity() / 300))
        },
      },
    })

    CHAPTERS.forEach((c, i) => {
      const el = document.getElementById(c.id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => { if (self.isActive) { setChapter(i); play('page', 0.5) } },
      })
    })

    gsap.fromTo(railRef.current, { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 1, delay: 1.2 })
  })

  // Page-turn the numeral when the chapter changes
  useGSAP(() => {
    gsap.fromTo('[data-rail-numeral]', { rotationX: -90, opacity: 0 }, { rotationX: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)' })
    gsap.fromTo('[data-rail-name]', { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })
  }, { dependencies: [chapter], scope: railRef })

  const c = CHAPTERS[chapter]

  return (
    <>
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left scroll-progress"
        style={{ transform: 'scaleX(0)', background: 'var(--accent-text-gradient)', boxShadow: '0 0 12px rgba(214,168,92,0.6)' }}
      />
      <div
        ref={railRef}
        className="scroll-progress hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-[55] flex-col items-center gap-3 pointer-events-none select-none invisible"
      >
        <button
          type="button"
          onClick={toggleFocus}
          className="pointer-events-auto group relative p-1 -m-1 rounded-md"
          aria-label={focus.running ? `Stop focus session (${fmtClock(focus.remaining)} left)` : 'Flip the hourglass: start a 25-minute focus session'}
          aria-pressed={focus.running}
          data-cursor={focus.running ? 'Stop' : 'Focus'}
        >
          <Hourglass className="w-6 h-10 transition-transform duration-300 group-hover:scale-110" />
          {focus.running && <span aria-hidden className="absolute -inset-1.5 rounded-full animate-ping opacity-30" style={{ border: '1px solid var(--accent-primary)' }} />}
        </button>
        <span className="w-px h-8" style={{ background: 'var(--border-hair)' }} />
        <div style={{ perspective: 300 }}>
          <span data-rail-numeral className="block font-serif text-xl leading-none" style={{ color: 'var(--accent-primary)' }}>
            {c.numeral}
          </span>
        </div>
        <span
          data-rail-name
          className="eyebrow !text-[0.6rem] !tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {c.name}
        </span>
        <span className="w-px h-8" style={{ background: 'var(--border-hair)' }} />
        <span aria-live="polite" className="font-mono text-[0.6rem] tabular-nums text-center leading-tight" style={{ color: focus.running ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
          {focus.running ? (
            <>{fmtClock(focus.remaining)}<br />focus</>
          ) : focus.done ? (
            <>done<br />rest 5</>
          ) : (
            <>{minsLeft ?? '–'}<br />min</>
          )}
        </span>
      </div>
    </>
  )
}
