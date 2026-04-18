'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  const texts = useMemo(() => ['Full Stack Developer', 'React Specialist', 'Node.js Expert', 'Problem Solver'], [])

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 60
    const pauseTime = 1500
    const timer = setTimeout(() => {
      const current = texts[textIndex]
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }
      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }, typeSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, textIndex, texts])

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <section id="home" className="min-h-screen" />

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle static gradient */}
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-20 pb-10 lg:pt-0 lg:pb-0">

        {/* ═══ LEFT: Text Content ═══ */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-sm"
            style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22c55e' }} />
            </span>
            Available for new opportunities
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]"
              style={{ color: 'var(--text-primary)' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
            >
              Mayer
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-gradient"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.65 }}
            >
              Frieg
            </motion.h1>
          </div>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="font-mono text-lg sm:text-xl mb-4 h-8 flex items-center"
          >
            <span style={{ color: 'var(--accent-primary)' }}>{'>'}</span>
            <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>{currentText}</span>
            <motion.span
              className="typing-cursor inline-block ml-0.5"
              style={{ color: 'var(--accent-primary)' }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            >|</motion.span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-base sm:text-lg max-w-lg leading-relaxed mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            Building scalable web &amp; mobile experiences with modern technologies.
            Passionate about clean code, innovative solutions, and user-centered design.
          </motion.p>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-2 mb-8 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            <MapPin size={14} style={{ color: 'var(--accent-primary)' }} />
            Cairo, Egypt
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--accent-gradient)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(99, 102, 241, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="flex items-center gap-3"
          >
            {[
              { href: 'https://github.com/MayerS22', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/mayer-frieg-7a0368226/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:mayerfrieg@outlook.com', icon: Mail, label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-xl"
                style={{ color: 'var(--text-muted)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                whileHover={{ y: -3, scale: 1.1, boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT: Photo ═══ */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute -inset-6 rounded-3xl blur-[60px] opacity-20 group-hover:opacity-35 transition-opacity duration-500" style={{ background: 'var(--accent-gradient)' }} />

            {/* Gradient border */}
            <div className="relative rounded-2xl p-[2px] gradient-border-animated">
              <div className="relative w-[300px] h-[360px] sm:w-[360px] sm:h-[420px] lg:w-[420px] lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/Me.jpeg"
                  alt="Mayer Frieg"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)' }} />
                <div className="absolute inset-x-0 bottom-0 h-2/5" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-40" style={{ borderColor: 'var(--accent-primary)' }} />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-40" style={{ borderColor: 'var(--accent-primary)' }} />
              </div>
            </div>

            {/* Floating tech badges */}
            <motion.div
              className="absolute -right-5 top-14 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--accent-primary)' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-primary)' }} />Next.js</span>
            </motion.div>
            <motion.div
              className="absolute -left-5 bottom-32 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--accent-secondary)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-secondary)' }} />React</span>
            </motion.div>
            <motion.div
              className="absolute -right-3 bottom-14 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3178c6' }} />TypeScript</span>
            </motion.div>
            <motion.div
              className="absolute -left-3 top-32 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#339933' }} />Node.js</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
