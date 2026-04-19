'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, MapPin, Github, Linkedin, Printer, ArrowUpRight, Send, Download } from 'lucide-react'
import SplitText from './SplitText'
import { confettiBurst } from '@/lib/confetti'

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-28 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.07]" style={{ background: 'var(--accent-primary)', bottom: '-10%', right: '10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05]" style={{ background: 'var(--accent-secondary)', top: '-10%', left: '5%' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            Let&apos;s connect
          </motion.span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Get In" charDelay={25} />{' '}
            <span className="text-gradient"><SplitText text="Touch" charDelay={25} /></span>
          </h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main CTA cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {/* Email card */}
            <motion.a
              href="mailto:mayerfrieg@outlook.com"
              className="group rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{ background: 'var(--accent-gradient)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.25 }}
              whileHover={{ scale: 1.02, boxShadow: '0 16px 50px rgba(99, 102, 241, 0.35)' }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => confettiBurst(e.clientX, e.clientY)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Send size={22} className="text-white" />
                  </div>
                  <ArrowUpRight size={20} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Send me an email</h3>
                <p className="text-white/70 text-sm">mayerfrieg@outlook.com</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            </motion.a>

            {/* CV card */}
            <motion.a
              href="/images/Cv/Mayer Soliman CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-6 sm:p-8 relative overflow-hidden"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12, duration: 0.25 }}
              whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)', boxShadow: '0 16px 50px rgba(99, 102, 241, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => confettiBurst(e.clientX, e.clientY)}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                    <Download size={22} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <ArrowUpRight size={20} className="transition-all" style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>View my CV</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Download or view in browser</p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full" style={{ background: 'var(--glass-bg)' }} />
            </motion.a>
          </div>

          {/* Info cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <motion.a
              href="tel:+20188244283"
              className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-300"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.2 }}
              whileHover={{ y: -2, borderColor: 'var(--accent-primary)', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.08)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                <Phone size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Phone</p>
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>+20 188 244 283</p>
              </div>
            </motion.a>

            <motion.div
              className="group flex items-center gap-4 p-5 rounded-xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.17, duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <MapPin size={18} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Cairo, Egypt</p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => window.print()}
              className="group flex items-center gap-4 p-5 rounded-xl transition-all duration-300 no-print"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.19, duration: 0.2 }}
              whileHover={{ y: -2, borderColor: 'var(--accent-primary)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                <Printer size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Quick action</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Print resume</p>
              </div>
            </motion.button>
          </div>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-3 pt-4"
            style={{ borderTop: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.2 }}
          >
            <span className="text-xs font-medium mr-2" style={{ color: 'var(--text-muted)' }}>Find me on</span>
            {[
              { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'var(--accent-gradient)', color: 'white' }}
                whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                aria-label={social.label}
              >
                <social.icon size={16} />
                <span className="hidden sm:inline">{social.label}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
