'use client'

import { useRef } from 'react'
import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { gsap, useGSAP, MQ } from '@/lib/gsap'

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Freelance', 'Projects', 'Contact']

/** Closing frame: the oversized wordmark rises out of the page edge as you reach the bottom. */
export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const lenis = useLenis()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.from('[data-footer-mark]', {
        yPercent: 70,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
    })
  }, { scope: ref })

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))
  const go = (e: React.MouseEvent, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (lenis) lenis.scrollTo(`#${id}`)
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative overflow-hidden border-t pt-14" style={{ borderColor: 'var(--card-border)' }}>
      <div className="container-content flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => go(e, item.toLowerCase())}
              className="eyebrow transition-colors hover:text-[color:var(--accent-primary)]"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://github.com/MayerS22" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors hover:text-[color:var(--accent-primary)] touch-target flex items-center justify-center" style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }} aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href="https://www.linkedin.com/in/mayer-frieg-7a0368226/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full transition-colors hover:text-[color:var(--accent-primary)] touch-target flex items-center justify-center" style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }} aria-label="LinkedIn">
            <Linkedin size={17} />
          </a>
          <button onClick={toTop} className="p-2.5 rounded-full transition-colors hover:text-[color:var(--accent-primary)] touch-target flex items-center justify-center" style={{ color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }} aria-label="Back to top">
            <ArrowUp size={17} />
          </button>
        </div>
      </div>

      <div className="container-content mt-10">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Mayer Frieg. Designed &amp; built with passion.
        </p>
      </div>

      {/* Wordmark */}
      <div className="mt-6 overflow-hidden" aria-hidden>
        <div
          data-footer-mark
          className="heading-display text-center whitespace-nowrap leading-[0.8] select-none text-gradient"
          style={{ fontSize: 'clamp(3.5rem, 16vw, 19rem)', opacity: 0.9 }}
        >
          Mayer Frieg
        </div>
      </div>
    </footer>
  )
}
