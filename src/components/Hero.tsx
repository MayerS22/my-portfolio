'use client'

import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/motion/MagneticButton'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const socials = useMemo(() => [
    { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:mayerfrieg@outlook.com', icon: Mail, label: 'Email' },
  ], [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-28 pb-16 lg:pt-0 lg:pb-0"
        style={prefersReducedMotion ? {} : { opacity: sectionOpacity }}
      >
        {/* ═══ LEFT: Text ═══ */}
        <motion.div
          className="lg:col-span-7 order-2 lg:order-1"
          style={prefersReducedMotion ? {} : { y: textY }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 mb-8 eyebrow"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: 'var(--live)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--live)' }} />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Name — oversized display */}
          <h1 className="heading-display text-clamp-hero" style={{ color: 'var(--text-primary)' }}>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              >
                Mayer
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-gradient"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                Frieg
              </motion.span>
            </span>
          </h1>

          {/* Accent rule */}
          <motion.div
            className="rule-accent w-24 my-8"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          />

          {/* Role + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="max-w-xl space-y-3"
          >
            <p className="font-display text-xl sm:text-2xl font-medium" style={{ color: 'var(--text-primary)' }}>
              Full-Stack Developer
            </p>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Building scalable web &amp; mobile experiences with modern technologies —
              clean code, thoughtful interfaces, and systems that last.
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-2 mt-6 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            <MapPin size={14} style={{ color: 'var(--accent-primary)' }} />
            Cairo, Egypt
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <MagneticButton
              href="#projects"
              className="px-8 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--accent-gradient)' }}
            >
              View My Work <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
            >
              Get In Touch
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex items-center gap-3 mt-10"
          >
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-xl transition-colors"
                style={{ color: 'var(--text-muted)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                whileHover={{ y: -3, color: 'var(--accent-primary)' }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══ RIGHT: Photo ═══ */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative group w-full max-w-[380px]"
            style={prefersReducedMotion ? {} : { y: photoY }}
          >
            <div className="relative rounded-2xl p-[2px]" style={{ background: 'var(--accent-gradient)' }}>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/Me.jpeg"
                  alt="Mayer Frieg"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 380px, 380px"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
