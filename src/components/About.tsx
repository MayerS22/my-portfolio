'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Users, Zap, Briefcase, Cloud, Sparkles, Award } from 'lucide-react'
import SplitText from './SplitText'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 800
    const steps = 8
    const stepTime = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (step >= steps) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <div ref={ref}>{count}{suffix}</div>
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { icon: Code, value: 1, suffix: '+', label: 'Years Experience', color: 'var(--accent-primary)' },
    { icon: Users, value: 9, suffix: '+', label: 'Projects Built', color: 'var(--accent-secondary)' },
    { icon: Briefcase, value: 3, suffix: '', label: 'Live Products', color: 'var(--live)' },
    { icon: Award, value: 100, suffix: '%', label: 'Client Satisfaction', color: 'var(--warning)' },
  ]

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-4 block">Get to know me</span>
          <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="About" charDelay={35} />{' '}
            <span className="text-gradient"><SplitText text="Me" charDelay={35} /></span>
          </h2>
        </motion.div>

        {/* Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-5xl">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="heading-display text-3xl sm:text-4xl mb-6" style={{ color: 'var(--text-primary)' }}>
              Turning ideas into{' '}
              <span className="text-gradient">digital reality.</span>
            </h3>
            <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I&apos;m a passionate Full-Stack Developer based in Cairo, Egypt who thrives on
                continuous learning and creative problem-solving. I specialize in building complete
                web applications — from responsive frontend interfaces to robust backend systems.
              </p>
              <p>
                Currently building production apps at{' '}
                <span className="text-gradient font-semibold">QueenSoft</span> with Next.js &amp; Nest.js.
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
                open-source, or sharing knowledge with the developer community.
              </p>
            </div>
          </motion.div>

          {/* Currently building card */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="card p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: 'var(--live)' }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'var(--live)' }} />
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Currently building at QueenSoft
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5">
                  <Zap size={12} style={{ color: 'var(--accent-primary)' }} /> Next.js
                </span>
                <span className="flex items-center gap-1.5">
                  <Cloud size={12} style={{ color: 'var(--accent-secondary)' }} /> Nest.js
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} style={{ color: 'var(--warning)' }} /> AI &amp; Cloud
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mt-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="card p-6 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: stat.color }} />
              <stat.icon size={22} className="mx-auto mb-3" style={{ color: stat.color }} />
              <div className="text-3xl sm:text-4xl heading-display text-gradient mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
