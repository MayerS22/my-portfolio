'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { useLenis } from '@/providers/SmoothScrollProvider'

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Freelance', 'Projects', 'Contact']

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const lenis = useLenis()

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  return (
    <footer ref={ref} className="py-10 border-t" style={{ borderColor: 'var(--card-border)' }}>
      <motion.div
        className="container-content flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Quick nav */}
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-wide transition-colors hover:text-accent"
              style={{ color: 'var(--text-muted)' }}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MayerS22"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-colors hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mayer-frieg-7a0368226/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-colors hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Mayer Frieg. Designed &amp; built with passion.
          </p>
          <button
            onClick={toTop}
            className="p-2 rounded-lg transition-colors hover:text-accent"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </motion.div>
    </footer>
  )
}
