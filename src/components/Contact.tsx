'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MapPin, Github, Linkedin, Printer, ArrowUpRight, Send, Download } from 'lucide-react'
import SplitText from './SplitText'
import MagneticButton from './motion/MagneticButton'
import { confettiBurst } from '@/lib/confetti'

const ACCENT_CHIP = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'
const ACCENT_GLOW = 'color-mix(in srgb, var(--accent-primary) 50%, transparent)'

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[460px] h-[460px] rounded-full blur-[140px] opacity-[0.06]" style={{ background: 'var(--accent-primary)', bottom: '-12%', right: '8%' }} />
      </div>

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-4 block">Let&apos;s connect</span>
          <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Get In" charDelay={25} />{' '}
            <span className="text-gradient"><SplitText text="Touch" charDelay={25} /></span>
          </h2>
          <motion.p
            className="mt-3 text-base sm:text-lg max-w-md"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl">
          {/* Main CTA cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Email card */}
            <motion.a
              href="mailto:mayerfrieg@outlook.com"
              className="group rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{ background: 'var(--accent-gradient)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, boxShadow: `0 16px 50px -12px ${ACCENT_GLOW}` }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => confettiBurst(e.clientX, e.clientY)}
              aria-label="Send an email to mayerfrieg@outlook.com"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Send size={22} className="text-white" />
                  </div>
                  <ArrowUpRight size={20} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-1">Send me an email</h3>
                <p className="text-white/70 text-sm">mayerfrieg@outlook.com</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            </motion.a>

            {/* CV card */}
            <motion.a
              href="/images/Cv/Mayer Frieg CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-6 sm:p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, borderColor: 'var(--accent-primary)', boxShadow: `0 16px 40px -16px ${ACCENT_GLOW}` }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => confettiBurst(e.clientX, e.clientY)}
              aria-label="View CV (PDF)"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: ACCENT_CHIP }}>
                    <Download size={22} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <ArrowUpRight size={20} className="transition-all" style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>View my CV</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Download or view in browser</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-50" style={{ background: ACCENT_CHIP }} />
            </motion.a>
          </div>

          {/* Info cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <motion.a
              href="tel:+201288244283"
              className="group flex items-center gap-4 p-5 card"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.26, duration: 0.3 }}
              whileHover={{ y: -2, borderColor: 'var(--accent-primary)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ACCENT_CHIP }}>
                <Phone size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Phone</p>
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>+20 128 824 4283</p>
              </div>
            </motion.a>

            <div
              className="group flex items-center gap-4 p-5 card"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'color-mix(in srgb, var(--accent-secondary) 12%, transparent)' }}>
                <MapPin size={18} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Cairo, Egypt</p>
              </div>
            </div>

            <motion.button
              onClick={() => window.print()}
              className="group flex items-center gap-4 p-5 card text-left no-print"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.3 }}
              whileHover={{ y: -2, borderColor: 'var(--accent-primary)' }}
              aria-label="Print or save resume as PDF"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ACCENT_CHIP }}>
                <Printer size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Quick action</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Save as PDF</p>
              </div>
            </motion.button>
          </div>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-3 pt-6 flex-wrap"
            style={{ borderTop: '1px solid var(--card-border)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.3 }}
          >
            <span className="eyebrow mr-2">Find me on</span>
            {[
              { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
            ].map((social) => (
              <MagneticButton
                key={social.label}
                href={social.href}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--accent-gradient)', color: 'white' }}
              >
                <social.icon size={16} />
                <span className="hidden sm:inline">{social.label}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
