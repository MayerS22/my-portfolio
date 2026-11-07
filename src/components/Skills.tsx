'use client'

import { useRef } from 'react'
import { Layout, Server, Database, ArrowRight } from 'lucide-react'
import SectionHeading from './scroll/SectionHeading'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Layout,
    color: 'var(--accent-primary)',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'var(--accent-secondary)',
    skills: ['Node.js', 'Nest.js', 'Express.js', 'Python', 'REST APIs', 'GraphQL', 'Socket.io', 'Firebase'],
  },
  {
    title: 'Data, Cloud & AI',
    icon: Database,
    color: 'var(--live)',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Google Cloud', 'Docker', 'OpenAI API', 'Gemini API', 'CI/CD'],
  },
]

// Horizontal-mode classes use the literal `lg:motion-safe:` variant (must stay literal for Tailwind's scanner)
// — it matches MQ.desktopMotion, the query GSAP pins under.

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ── Desktop: pinned horizontal scroll ("live" scrubbed scrolling) ──
    mm.add(MQ.desktopMotion, () => {
      const track = trackRef.current!
      const pin = pinRef.current!
      const panels = gsap.utils.toArray<HTMLElement>('[data-skill-panel]')
      const distance = () => track.scrollWidth - pin.clientWidth

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // Event-driven UI: progress bar + active-panel counter follow the scroll.
          onUpdate: (self) => {
            gsap.set('[data-skill-progress]', { scaleX: self.progress })
            const active = Math.min(panels.length, Math.floor(self.progress * panels.length) + 1)
            if (counterRef.current) counterRef.current.textContent = String(active).padStart(2, '0')
          },
        },
      })

      // Giant outlined word drifts slower than the track for depth.
      gsap.to('[data-skill-ghost]', {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: 1.5 },
      })

      // Each panel's rows rise in as that panel slides into view (nested in the horizontal tween).
      panels.forEach((panel) => {
        gsap.from(panel.querySelectorAll('[data-skill-item]'), {
          yPercent: 120,
          opacity: 0,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 85%',
            end: 'left 35%',
            scrub: 0.5,
          },
        })
      })
    })

    // ── Mobile / tablet: event-triggered batch reveal on enter ──
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set('[data-skill-item]', { opacity: 0, y: 16 })
      ScrollTrigger.batch('[data-skill-item]', {
        start: 'top 92%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, overwrite: true }),
      })
    })
  }, { scope: sectionRef })

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div ref={pinRef} className={`relative z-10 lg:motion-safe:h-screen lg:motion-safe:flex lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden`}>
        {/* Ghost word behind the track */}
        <span
          data-skill-ghost
          aria-hidden
          className={`hidden lg:motion-safe:block absolute left-0 bottom-[6vh] font-display font-bold leading-none whitespace-nowrap pointer-events-none select-none text-[22vw]`}
          style={{ color: 'transparent', WebkitTextStroke: '1px var(--card-border)' }}
        >
          Toolkit · Stack · Toolkit
        </span>

        <div className="container-content relative">
          {/* Header */}
          <div className="mb-14 sm:mb-20 lg:motion-safe:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <SectionHeading
              index="03"
              eyebrow="What I work with"
              title="My"
              accent="Skills"
              intro="A comprehensive toolkit of technologies and frameworks."
              className="mb-0 sm:mb-0"
            />

            {/* Desktop scroll HUD: counter + progress */}
            <div className={`hidden lg:motion-safe:flex flex-col items-end gap-3 min-w-48`}>
              <span className="eyebrow flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <span ref={counterRef} style={{ color: 'var(--text-primary)' }}>01</span>
                / {String(skillCategories.length).padStart(2, '0')}
                <ArrowRight size={13} />
              </span>
              <div className="h-px w-48 relative" style={{ background: 'var(--card-border)' }}>
                <div
                  data-skill-progress
                  className="absolute inset-0 origin-left"
                  style={{ background: 'var(--accent-gradient)', transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Track: grid on mobile, horizontal strip on desktop */}
        <div
          ref={trackRef}
          className={`container-content grid grid-cols-1 md:grid-cols-2 gap-10 lg:motion-safe:flex lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:gap-[6vw] lg:motion-safe:pr-[10vw] will-change-transform`}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <article
                key={category.title}
                data-skill-panel
                className={`lg:motion-safe:w-[min(62vw,820px)] lg:motion-safe:shrink-0 lg:motion-safe:pt-8 lg:motion-safe:border-t`}
                style={{ borderColor: 'var(--card-border)' }}
              >
                {/* Panel header */}
                <div className={`flex items-center gap-3 mb-6 lg:motion-safe:mb-10`}>
                  <span className={`hidden lg:motion-safe:inline font-mono text-sm tabular-nums mr-2`} style={{ color: 'var(--text-muted)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                  >
                    <Icon size={18} style={{ color: category.color }} />
                  </div>
                  <div>
                    <h3 className={`font-display text-lg lg:motion-safe:text-3xl font-semibold leading-tight`} style={{ color: 'var(--text-primary)' }}>
                      {category.title}
                    </h3>
                    <p className="text-xs eyebrow" style={{ color: 'var(--text-muted)' }}>
                      {category.skills.length} tools
                    </p>
                  </div>
                </div>

                {/* Skill rows */}
                <ul className={`space-y-px lg:motion-safe:grid lg:motion-safe:grid-cols-2 lg:motion-safe:gap-x-10 lg:motion-safe:space-y-0`}>
                  {category.skills.map((skill, i) => (
                    <li key={skill} className="overflow-hidden">
                      <div data-skill-item className={`group relative flex items-center gap-4 py-3.5 lg:motion-safe:py-4 cursor-default`}>
                        <span
                          className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                          style={{ background: category.color }}
                        />
                        <span className="font-mono text-[11px] tabular-nums w-6 shrink-0" style={{ color: 'var(--text-muted)' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150"
                          style={{ background: category.color }}
                        />
                        <span
                          className={`font-display text-base sm:text-lg lg:motion-safe:text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium transition-colors duration-300 group-hover:text-[color:var(--text-primary)]`}
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {skill}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
