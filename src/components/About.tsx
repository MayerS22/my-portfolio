'use client'

import { useRef } from 'react'
import SectionHeading from './scroll/SectionHeading'
import { gsap, SplitText, useGSAP, MQ } from '@/lib/gsap'
import { play } from '@/lib/sound'

/** Honest tallies only: each one is backed by content elsewhere on the site. */
const ledger = [
  { value: 9, suffix: '+', label: 'projects built' },
  { value: 3, suffix: '', label: 'products live' },
  { value: 24, suffix: '', label: 'tools on the shelf' },
  { value: 1, suffix: '+', label: 'years shipping' },
]

const HABITS = ['Read', 'Plan', 'Build', 'Learn']
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
/** Which days get a tick in the habit tracker (decorative pattern, a mostly-full week). */
const TICKS = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 1, 1],
]

/**
 * Chapter I. Mayer's diary lies open on the desk. As you scroll, the spread tilts up towards you,
 * the entries write themselves line by line in ink, a sticky note lands on the page, the habit
 * tracker fills with ticks and the ledger tallies count up, all with gold-pen margin notes.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    const q = gsap.utils.selector(sectionRef)

    mm.add(MQ.motion, () => {
      const diary = q('[data-diary]')[0]

      // The diary tilts up off the desk as it comes into view
      gsap.fromTo(diary,
        { rotationX: 38, y: 120, scale: 0.92 },
        { rotationX: 6, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: diary, start: 'top bottom', end: 'top 25%', scrub: 1 } })

      // Handwriting: each line is revealed left → right like a pen moving across it.
      // Every paragraph writes itself as it crosses the viewport, so whatever is on screen is being written.
      const splits = q('[data-write]').map((el) => {
        const split = SplitText.create(el, { type: 'lines', linesClass: 'diary-line' })
        gsap.set(split.lines, { clipPath: 'inset(0 100% 0 0)' })
        gsap.to(split.lines, {
          clipPath: 'inset(0 0% 0 0)',
          ease: 'none',
          stagger: 0.5,
          duration: 0.5,
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 62%', scrub: 0.6, onEnter: () => play('scratch', 0.6) },
        })
        return split
      })

      // Pen strokes: underlines, circles, arrows, ticks
      q('[data-stroke]').forEach((el) => {
        gsap.fromTo(el, { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.fromTo(q('[data-tick]'), { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, duration: 0.25, stagger: 0.035, ease: 'power1.out',
        scrollTrigger: { trigger: q('[data-habits]')[0], start: 'top 80%', toggleActions: 'play none none reverse' },
      })
      gsap.from(q('[data-note]'), {
        y: -80, rotation: 18, opacity: 0, duration: 1.1, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: q('[data-note]')[0], start: 'top 85%', toggleActions: 'play none none reverse' },
      })
      gsap.from(q('[data-margin]'), {
        opacity: 0, x: -12, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: diary, start: 'top 55%', toggleActions: 'play none none reverse' },
      })

      // Ledger tallies count up in ink
      q('[data-count]').forEach((el) => {
        const target = Number((el as HTMLElement).dataset.count)
        const counter = { v: 0 }
        gsap.to(counter, {
          v: target, duration: 1.6, ease: 'power3.out',
          onUpdate: () => { el.textContent = String(Math.round(counter.v)) },
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      // The fountain pen rolls a little as you scroll past
      gsap.fromTo(q('[data-pen]'), { rotation: -38, x: 30 }, {
        rotation: -24, x: -20, ease: 'none',
        scrollTrigger: { trigger: diary, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      return () => splits.forEach((sp) => sp.revert())
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-clip">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading index="02" eyebrow="Get to know me" title="Dear" accent="Diary" intro="A few pages from the journal I keep on my desk." />

        <div style={{ perspective: '2000px' }}>
          <div data-diary className="relative mx-auto max-w-6xl origin-bottom" style={{ transformStyle: 'preserve-3d' }}>
            {/* Leather boards peeking out around the pages */}
            <div className="leather absolute -inset-3 sm:-inset-4 rounded-lg" style={{ boxShadow: '0 60px 90px -40px rgba(0,0,0,0.9)' }} />
            {/* Elastic strap & ribbon */}
            <div aria-hidden className="hidden md:block absolute top-[-16px] bottom-[-16px] -right-1 w-3 rounded-sm z-20" style={{ background: 'linear-gradient(90deg, #2a1608, #4a2a14, #2a1608)', boxShadow: '0 0 6px rgba(0,0,0,0.6)' }} />
            <div aria-hidden className="absolute -bottom-14 left-[46%] w-4 h-20 z-0" style={{ background: '#7a2a22', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />

            <div className="relative grid md:grid-cols-2 rounded-[6px] overflow-hidden">
              {/* ── Left page: the entry ── */}
              <div className="paper relative px-7 py-9 sm:px-12 sm:py-12 md:min-h-[640px]">
                <div className="page-gutter page-gutter--right hidden md:block" />
                <div aria-hidden className="coffee-ring absolute -left-10 -bottom-12 w-48 h-48 rotate-12 opacity-80" />

                <div className="flex items-baseline justify-between mb-6 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                  <span>Entry No. 1</span>
                  <span>Cairo, Egypt</span>
                </div>

                <div className="font-hand ink-blue leading-[1.55]" style={{ fontSize: 'clamp(1.45rem, 2.3vw, 2rem)' }}>
                  <p data-write className="mb-1">Dear diary,</p>
                  <p data-write className="mb-5">
                    I&apos;m a full-stack developer from Cairo who never stops learning. I love the puzzle of a hard problem
                    and the craft of solving it creatively.
                  </p>
                  <p data-write className="mb-5">
                    I build <span className="relative inline-block">complete
                      <svg aria-hidden viewBox="0 0 120 12" className="absolute left-0 -bottom-1 w-full h-3" preserveAspectRatio="none">
                        <path data-stroke pathLength={1} className="ink-stroke" d="M2 8 C 30 3, 70 11, 118 5" fill="none" stroke="#9a6424" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span> web applications, from responsive front ends to the robust back ends behind them.
                  </p>
                  <p data-write className="mb-5">
                    These days I&apos;m shipping production apps at <span className="font-semibold">QueenSoft</span> with
                    Next.js &amp; Nest.js.
                  </p>
                  <p data-write>
                    Off the clock: exploring new tech, open source, and sharing what I learn with the developer community.
                  </p>
                  <p data-write className="mt-6 text-right">— M.</p>
                </div>

                {/* Margin doodle */}
                <div data-margin className="hidden sm:flex absolute left-10 sm:left-12 bottom-8 items-center gap-2 font-hand ink-gold text-xl rotate-[-4deg] pointer-events-none" aria-hidden>
                  <svg viewBox="0 0 40 40" className="w-7 h-7">
                    <path data-stroke pathLength={1} className="ink-stroke" d="M20 3 L 24 15 L 37 15 L 26 23 L 30 36 L 20 28 L 10 36 L 14 23 L 3 15 L 16 15 Z" fill="none" stroke="#c48a3e" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                  <span>keep going, one page a day</span>
                </div>
              </div>

              {/* ── Right page: habits, sticky note, ledger ── */}
              <div className="paper relative px-7 py-9 sm:px-12 sm:py-12 md:min-h-[640px] border-t md:border-t-0" style={{ borderColor: 'var(--paper-line)' }}>
                <div className="page-gutter hidden md:block" />

                {/* Sticky note */}
                <div data-note className="relative ml-auto mb-6 sm:mb-0 sm:absolute sm:right-10 sm:top-8 w-44 sm:w-48 p-4 rotate-[4deg] z-10" style={{ background: 'linear-gradient(180deg, #f3dc8a, #e8cb6e)', boxShadow: '0 12px 20px -8px rgba(60,40,10,0.5)' }}>
                  <span aria-hidden className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 rotate-[-3deg]" style={{ background: 'rgba(255,255,255,0.45)' }} />
                  <p className="font-hand text-[1.35rem] leading-tight" style={{ color: '#3a2a10' }}>
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle animate-pulse" style={{ background: '#3f7a2e' }} />
                    Now: building at QueenSoft
                  </p>
                  <p className="font-hand text-lg mt-1" style={{ color: '#5a4520' }}>Next.js · Nest.js · AI</p>
                </div>

                <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-6">Habits I keep</p>
                <ul className="font-hand ink-blue space-y-1 mb-8 sm:max-w-[60%]" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}>
                  <li data-write><span className="ink-gold mr-2">~</span>a book always on the go</li>
                  <li data-write><span className="ink-gold mr-2">~</span>time blocked, priorities first</li>
                  <li data-write><span className="ink-gold mr-2">~</span>small wins, every single day</li>
                </ul>

                {/* Habit tracker */}
                <div data-habits className="mb-10 overflow-x-auto">
                  <table className="font-hand ink-blue text-lg border-collapse">
                    <thead>
                      <tr>
                        <th className="w-16" />
                        {DAYS.map((d, i) => (
                          <th key={i} className="w-8 sm:w-9 font-normal opacity-60 text-base">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {HABITS.map((h, r) => (
                        <tr key={h}>
                          <td className="pr-2 text-left">{h}</td>
                          {TICKS[r].map((on, c) => (
                            <td key={c} className="h-8 sm:h-9 text-center border" style={{ borderColor: 'var(--paper-line)' }}>
                              {on ? (
                                <svg viewBox="0 0 20 20" className="w-5 h-5 mx-auto" aria-hidden>
                                  <path data-tick pathLength={1} className="ink-stroke" d="M4 11 L 8 15 L 16 5" fill="none" stroke={r === 0 ? '#9a6424' : '#22314f'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ) : null}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ledger */}
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-3">The ledger</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {ledger.map((item, i) => (
                    <div key={item.label} className="relative flex items-baseline gap-2 border-b pb-2" style={{ borderColor: 'var(--paper-line)' }}>
                      <span className="relative font-hand ink-blue font-bold leading-none" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)' }}>
                        <span data-count={item.value}>{item.value}</span>{item.suffix}
                        {i === 0 && (
                          <svg aria-hidden viewBox="0 0 100 60" className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)] pointer-events-none" preserveAspectRatio="none">
                            <path data-stroke pathLength={1} className="ink-stroke" d="M50 4 C 90 2, 98 30, 80 50 C 60 62, 15 58, 5 36 C -2 16, 25 4, 56 8" fill="none" stroke="#c48a3e" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-hand text-lg leading-tight opacity-80 ink-blue">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fountain pen resting on the diary */}
            <svg data-pen aria-hidden viewBox="0 0 300 40" className="hidden md:block absolute -right-10 -bottom-8 w-64 z-30 pointer-events-none drop-shadow-[0_12px_10px_rgba(0,0,0,0.55)]">
              <defs>
                <linearGradient id="pen-body" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#3a1a14" />
                  <stop offset="0.4" stopColor="#7a3226" />
                  <stop offset="1" stopColor="#24100c" />
                </linearGradient>
                <linearGradient id="pen-gold" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#f0cd8a" />
                  <stop offset="1" stopColor="#8a5c28" />
                </linearGradient>
              </defs>
              <path d="M2 20 L 40 13 L 40 27 Z" fill="url(#pen-gold)" />
              <line x1="6" y1="20" x2="38" y2="20" stroke="#5a3a1a" strokeWidth="0.8" />
              <rect x="40" y="11" width="16" height="18" rx="2" fill="url(#pen-gold)" />
              <rect x="56" y="9" width="200" height="22" rx="11" fill="url(#pen-body)" />
              <rect x="170" y="8" width="8" height="24" rx="2" fill="url(#pen-gold)" />
              <path d="M190 6 L 270 6 Q 276 6 276 12 L 276 14 L 190 14 Z" fill="url(#pen-gold)" />
              <ellipse cx="258" cy="20" rx="6" ry="11" fill="#24100c" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
