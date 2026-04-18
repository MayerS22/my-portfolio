'use client'

import { motion } from 'framer-motion'
import { Terminal, Zap, Cloud, Sparkles } from 'lucide-react'

export default function CurrentlyBuilding() {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}>
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'var(--accent-gradient)' }} />

            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-10" style={{ background: 'var(--accent-primary)' }} />

            <div className="relative p-6 sm:p-8" style={{ fontFamily: 'var(--font-geist-mono)' }}>
              {/* Header row */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-gradient)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
                  <Terminal size={18} className="text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent-primary)' }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--accent-primary)' }} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-primary)' }}>
                    Currently
                  </span>
                </div>
              </div>

              {/* Terminal lines */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Zap size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    Building scalable web apps at{' '}
                    <span className="text-gradient font-semibold">QueenSoft</span>{' '}
                    with <span style={{ color: 'var(--accent-primary)' }}>Next.js</span> &{' '}
                    <span style={{ color: 'var(--accent-secondary)' }}>Nest.js</span>
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Cloud size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-secondary)' }} />
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Exploring AI-powered development tools & cloud architecture
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Sparkles size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#fbbf24' }} />
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    Deepening expertise in system design & distributed systems
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
