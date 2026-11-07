'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'

interface VelocityMarqueeProps {
  items: string[]
  /** Base direction: 1 = leftwards, -1 = rightwards. Scrolling up flips it. */
  direction?: 1 | -1
  outline?: boolean
}

/**
 * Infinite text strip driven by scroll events: it drifts on its own, speeds up with scroll
 * velocity, reverses when you scroll back up, and skews with the speed.
 */
export default function VelocityMarquee({ items, direction = 1, outline = false }: VelocityMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const track = ref.current!.querySelector<HTMLElement>('[data-marquee-track]')!
      const [from, to] = direction === 1 ? [0, -50] : [-50, 0]
      const loop = gsap.fromTo(track, { xPercent: from }, { xPercent: to, duration: 28, ease: 'none', repeat: -1 })
      // Start deep into the repeat cycle so a negative timeScale (scrolling up) never hits time 0.
      loop.totalTime(loop.duration() * 1000)
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' })

      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          // Direction-aware speed boost, eased back to cruising speed.
          gsap.to(loop, { timeScale: self.direction * (1 + Math.min(Math.abs(v) / 300, 5)), duration: 0.2, overwrite: true })
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2, ease: 'power2.out' })
          skewTo(gsap.utils.clamp(-12, 12, (v / -150) * direction))
        },
        onToggle: (self) => { if (!self.isActive) skewTo(0) },
      })
      return () => st.kill()
    })
  }, { scope: ref })

  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 pr-8 shrink-0">
          <span
            className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tight whitespace-nowrap"
            style={outline
              ? { color: 'transparent', WebkitTextStroke: '1px var(--text-muted)' }
              : { color: 'var(--text-primary)' }}
          >
            {item}
          </span>
          <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0" style={{ background: 'var(--accent-gradient)' }} />
        </span>
      ))}
    </>
  )

  return (
    <div ref={ref} className="relative overflow-hidden py-10 sm:py-14 select-none" aria-hidden>
      <div data-marquee-track className="flex w-max will-change-transform">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}
