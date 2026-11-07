'use client'

import { useRef } from 'react'
import { Phone, MapPin, Github, Linkedin, Printer, ArrowUpRight, Send, Download } from 'lucide-react'
import MagneticButton from './motion/MagneticButton'
import { confettiBurst } from '@/lib/confetti'
import { gsap, ScrollTrigger, SplitText, useGSAP, MQ } from '@/lib/gsap'

const ACCENT_CHIP = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'

/** Chapter 07 — a giant call-to-action that scales into place with the scroll, then the ways to reach me. */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const split = SplitText.create('[data-cta-line="plain"]', { type: 'chars' })
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '[data-cta]', start: 'top 95%', end: 'top 25%', scrub: 1 },
      })
      tl.from('[data-cta]', { scale: 0.72, opacity: 0.2, duration: 1 }, 0)
        .from(split.chars, { yPercent: 60, opacity: 0, stagger: 0.03, duration: 0.5 }, 0)
        .from('[data-cta-line="accent"]', { xPercent: 12, opacity: 0, duration: 0.7 }, 0.2)

      gsap.set('[data-contact-item]', { y: 40, opacity: 0 })
      ScrollTrigger.batch('[data-contact-item]', {
        start: 'top 92%',
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, overwrite: true }),
      })
      return () => split.revert()
    })
  }, { scope: sectionRef })

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[520px] h-[520px] rounded-full blur-[140px] opacity-[0.08]" style={{ background: 'var(--accent-primary)', bottom: '-12%', right: '8%' }} />
      </div>

      <div className="container-content relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--accent-primary)' }}>07</span>
          <span className="h-px w-16" style={{ background: 'var(--accent-gradient)' }} />
          <span className="eyebrow">Let&apos;s connect</span>
        </div>

        {/* Scroll-scaled CTA */}
        <a
          data-cta
          href="mailto:mayerfrieg@outlook.com"
          onClick={(e) => confettiBurst(e.clientX, e.clientY)}
          className="group block origin-left mb-16 sm:mb-24"
          aria-label="Get in touch — send an email to mayerfrieg@outlook.com"
        >
          <span className="heading-display block leading-[0.9]" style={{ fontSize: 'clamp(3.25rem, 11vw, 11rem)', color: 'var(--text-primary)' }}>
            <span data-cta-line="plain" className="block">Get In</span>
            <span data-cta-line="accent" className="flex items-center gap-[0.15em]">
              <span className="text-gradient">Touch</span>
              <ArrowUpRight
                className="shrink-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
                style={{ width: '0.7em', height: '0.7em', color: 'var(--accent-primary)' }}
              />
            </span>
          </span>
          <span className="mt-6 block text-base sm:text-lg max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? I&apos;d love to hear about it.
          </span>
        </a>

        <div className="max-w-5xl">
          {/* Main CTA cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <a
              data-contact-item
              href="mailto:mayerfrieg@outlook.com"
              className="group rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--accent-gradient)' }}
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
            </a>

            <a
              data-contact-item
              href="/images/Cv/Mayer Frieg CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group card p-6 sm:p-8 relative overflow-hidden transition-transform hover:-translate-y-1"
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
            </a>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <a data-contact-item href="tel:+201288244283" className="group flex items-center gap-4 p-5 card">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ACCENT_CHIP }}>
                <Phone size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Phone</p>
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>+20 128 824 4283</p>
              </div>
            </a>

            <div data-contact-item className="group flex items-center gap-4 p-5 card">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'color-mix(in srgb, var(--accent-secondary) 12%, transparent)' }}>
                <MapPin size={18} style={{ color: 'var(--accent-secondary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Cairo, Egypt</p>
              </div>
            </div>

            <button
              data-contact-item
              onClick={() => window.print()}
              className="group flex items-center gap-4 p-5 card text-left no-print"
              aria-label="Print or save resume as PDF"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ACCENT_CHIP }}>
                <Printer size={18} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>Quick action</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Save as PDF</p>
              </div>
            </button>
          </div>

          {/* Social links */}
          <div data-contact-item className="flex items-center gap-3 pt-8 flex-wrap" style={{ borderTop: '1px solid var(--card-border)' }}>
            <span className="eyebrow mr-2">Find me on</span>
            {[
              { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
            ].map((social) => (
              <MagneticButton
                key={social.label}
                href={social.href}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
              >
                <social.icon size={16} />
                <span>{social.label}</span>
                <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
