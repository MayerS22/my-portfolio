'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Users, Zap, Briefcase, Terminal, Cloud, Sparkles, Layers, Cpu, Globe, GitBranch, Rocket, Shield, Award } from 'lucide-react'
import SplitText from './SplitText'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, target])

  return <div ref={ref}>{count}{suffix}</div>
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    { icon: Code, value: 1, suffix: '+', label: 'Years Experience', color: 'var(--accent-primary)' },
    { icon: Users, value: 7, suffix: '+', label: 'Featured Projects', color: 'var(--accent-secondary)' },
    { icon: Briefcase, value: 3, suffix: '', label: 'Live Freelance', color: '#22c55e' },
    { icon: Award, value: 100, suffix: '%', label: 'Client Satisfaction', color: '#f59e0b' },
  ]

  const skills = [
    { icon: Layers, name: 'React & Next.js', desc: 'Frontend frameworks' },
    { icon: Cpu, name: 'Node.js & Nest.js', desc: 'Backend runtime' },
    { icon: Globe, name: 'TypeScript', desc: 'Type-safe code' },
    { icon: Terminal, name: 'Python', desc: 'Scripting & ML' },
    { icon: Rocket, name: 'Firebase', desc: 'Cloud platform' },
    { icon: GitBranch, name: 'PostgreSQL & MongoDB', desc: 'Databases' },
    { icon: Shield, name: 'REST & GraphQL', desc: 'API design' },
    { icon: Code, name: 'Tailwind CSS', desc: 'Utility styling' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-28 relative overflow-hidden">
      {/* Static background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.06]" style={{ background: 'var(--accent-primary)', top: '10%', right: '-5%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.04]" style={{ background: 'var(--accent-secondary)', bottom: '10%', left: '-5%' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Get to know me
          </motion.span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="About" charDelay={40} />{' '}
            <span className="text-gradient"><SplitText text="Me" charDelay={40} /></span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Full-Stack Developer crafting digital experiences
          </p>
        </motion.div>

        {/* Main glass card */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="glass rounded-2xl overflow-hidden relative">
            {/* Animated gradient top line */}
            <div className="h-1 gradient-border-animated" style={{ borderRadius: 0 }} />

            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full blur-[80px] opacity-[0.06]" style={{ background: 'var(--accent-primary)' }} />

            <div className="relative p-6 sm:p-10">
              {/* Bio */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Turning Ideas Into{' '}
                  <span className="text-gradient">Digital Reality</span>
                </h3>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
                  <p>
                    I&apos;m a passionate Full-Stack Developer based in Cairo, Egypt who thrives on continuous learning
                    and creative problem-solving. I specialize in building complete web applications — from responsive
                    frontend interfaces to robust backend systems.
                  </p>
                  <p>
                    Currently building production apps at{' '}
                    <span className="text-gradient font-semibold">QueenSoft</span> with Next.js & Nest.js.
                    When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source,
                    or sharing knowledge with the developer community.
                  </p>
                </div>
              </motion.div>

              {/* Currently strip */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 px-5 py-4 rounded-xl mb-10"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#22c55e' }} />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#22c55e' }} />
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Currently building at QueenSoft</span>
                </div>
                <div className="hidden sm:block w-px h-4" style={{ background: 'var(--glass-border)' }} />
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <motion.span className="flex items-center gap-1.5" whileHover={{ color: 'var(--accent-primary)' }}>
                    <Zap size={12} style={{ color: 'var(--accent-primary)' }} /> Next.js
                  </motion.span>
                  <motion.span className="flex items-center gap-1.5" whileHover={{ color: 'var(--accent-secondary)' }}>
                    <Cloud size={12} style={{ color: 'var(--accent-secondary)' }} /> Nest.js
                  </motion.span>
                  <motion.span className="flex items-center gap-1.5" whileHover={{ color: '#fbbf24' }}>
                    <Sparkles size={12} style={{ color: '#fbbf24' }} /> AI & Cloud
                  </motion.span>
                </div>
              </motion.div>

              {/* Skills grid */}
              <div>
                <motion.h4
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: 'var(--text-muted)' }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  Technologies I work with
                </motion.h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      className="group p-4 rounded-xl transition-all duration-300 cursor-default relative overflow-hidden"
                      style={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      whileHover={{
                        y: -5,
                        borderColor: 'var(--accent-primary)',
                        boxShadow: '0 8px 25px rgba(99,102,241,0.15)',
                      }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.06), transparent 70%)' }} />
                      <skill.icon size={20} className="mb-2 transition-colors duration-300" style={{ color: 'var(--accent-primary)' }} />
                      <p className="text-sm font-medium relative z-10" style={{ color: 'var(--text-primary)' }}>{skill.name}</p>
                      <p className="text-[11px] mt-0.5 relative z-10" style={{ color: 'var(--text-muted)' }}>{skill.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-6 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5, scale: 1.03 }}
            >
              {/* Accent dot glow */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: stat.color, boxShadow: `0 0 10px ${stat.color}` }} />

              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={isInView ? { rotate: 0, scale: 1 } : {}}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.4, type: 'spring' }}
              >
                <stat.icon size={22} className="mx-auto mb-3" style={{ color: stat.color }} />
              </motion.div>
              <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
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
