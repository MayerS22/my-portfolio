'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer ref={ref} className="py-8 border-t" style={{ borderColor: 'var(--glass-border)' }}>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Mayer Frieg. Designed & Built with passion.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Next.js, React, Framer Motion
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
