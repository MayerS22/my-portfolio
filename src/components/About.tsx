'use client'

import { useRef } from 'react'
import { Code, Users, Zap, Briefcase, Cloud, Sparkles, Award } from 'lucide-react'
import SectionHeading from './scroll/SectionHeading'
import { gsap, ScrollTrigger, SplitText, useGSAP, MQ } from '@/lib/gsap'

const stats = [
  { icon: Code, value: 1, suffix: '+', label: 'Years Experience', color: 'var(--accent-primary)' },
  { icon: Users, value: 9, suffix: '+', label: 'Projects Built', color: 'var(--accent-secondary)' },
  { icon: Briefcase, value: 3, suffix: '', label: 'Live Products', color: 'var(--live)' },
  { icon: Award, value: 100, suffix: '%', label: 'Client Satisfaction', color: 'var(--warning)' },
]

/** Chapter 02 — the bio reads itself: words light up as the scroll passes over them. */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      // Scrubbed word highlight
      const split = SplitText.create('[data-about-statement]', { type: 'words' })
      gsap.fromTo(split.words, { opacity: 0.14 }, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-about-statement]', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })

      // Supporting copy + card
      gsap.from('[data-about-fade]', {
        y: 40, opacity: 0, duration: 1, stagger: 0.12,
        scrollTrigger: { trigger: '[data-about-detail]', start: 'top 80%', toggleActions: 'play none none reverse' },
      })

      // Stats: cards rise in as a batch, numbers count up on enter (event-driven)
      ScrollTrigger.batch('[data-stat]', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(batch, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, overwrite: true })
          batch.forEach((card) => {
            const el = card.querySelector<HTMLElement>('[data-count]')!
            const target = Number(el.dataset.count)
            const counter = { v: 0 }
            gsap.to(counter, {
              v: target, duration: 1.6, ease: 'power3.out',
              onUpdate: () => { el.textContent = String(Math.round(counter.v)) },
            })
          })
        },
      })
      gsap.set('[data-stat]', { opacity: 0 })

      return () => split.revert()
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading index="02" eyebrow="Get to know me" title="About" accent="Me" />

        {/* Scroll-highlighted statement */}
        <p
          data-about-statement
          className="font-display font-semibold leading-[1.12] tracking-tight max-w-5xl"
          style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
        >
          I&apos;m a passionate Full-Stack Developer based in Cairo, Egypt who thrives on continuous learning and
          creative problem-solving. I specialize in building complete web applications — from responsive frontend
          interfaces to robust backend systems.
        </p>

        {/* Detail row */}
        <div data-about-detail className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-16 sm:mt-20">
          <div data-about-fade className="lg:col-span-7 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <p>
              Currently building production apps at{' '}
              <span className="text-gradient font-semibold">QueenSoft</span> with Next.js &amp; Nest.js.
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
              open-source, or sharing knowledge with the developer community.
            </p>
          </div>

          <div data-about-fade className="lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: 'var(--live)' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--live)' }} />
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Currently building at QueenSoft
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5"><Zap size={12} style={{ color: 'var(--accent-primary)' }} /> Next.js</span>
                <span className="flex items-center gap-1.5"><Cloud size={12} style={{ color: 'var(--accent-secondary)' }} /> Nest.js</span>
                <span className="flex items-center gap-1.5"><Sparkles size={12} style={{ color: 'var(--warning)' }} /> AI &amp; Cloud</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 sm:mt-24 rounded-2xl overflow-hidden" style={{ background: 'var(--card-border)' }}>
          {stats.map((stat) => (
            <div key={stat.label} data-stat className="p-6 sm:p-8 relative" style={{ background: 'var(--bg-secondary)' }}>
              <stat.icon size={20} className="mb-6" style={{ color: stat.color }} />
              <div className="heading-display text-gradient mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                <span data-count={stat.value}>{stat.value}</span>{stat.suffix}
              </div>
              <div className="eyebrow">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
