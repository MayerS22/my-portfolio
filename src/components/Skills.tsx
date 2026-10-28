'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { Layout, Server, Database, ArrowDown } from 'lucide-react'
import SplitText from './SplitText'

const skillCategories = [
  {
    title: 'Frontend',
    icon: Layout,
    color: 'var(--accent-primary)',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'var(--accent-secondary)',
    skills: ['Node.js', 'Nest.js', 'Express.js', 'Python', 'C++', 'Firebase', 'REST APIs', 'Java'],
  },
  {
    title: 'Database & Cloud',
    icon: Database,
    color: 'var(--live)',
    skills: ['PostgreSQL', 'MongoDB', 'SQL', 'Redis'],
  },
]

/** A single parallax column — drifts vertically as the section scrolls past. */
function SkillColumn({
  category,
  index,
  y,
}: {
  category: (typeof skillCategories)[number]
  index: number
  y: MotionValue<number>
}) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = category.icon

  return (
    <motion.div
      style={prefersReducedMotion ? {} : { y }}
      // Asymmetric vertical offsets so the parallax drift is visible at rest
      className={index === 1 ? 'lg:mt-20' : index === 2 ? 'lg:mt-8' : ''}
    >
      {/* Column header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
        >
          <Icon size={18} style={{ color: category.color }} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {category.title}
          </h3>
          <p className="text-xs eyebrow" style={{ color: 'var(--text-muted)' }}>
            {category.skills.length} tools
          </p>
        </div>
      </div>

      {/* Skill rows */}
      <ul className="space-y-px">
        {category.skills.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            className="group relative flex items-center gap-4 py-3.5 cursor-default"
          >
            {/* Animated underline */}
            <span
              className="absolute left-0 bottom-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{ background: category.color }}
            />
            {/* Index */}
            <span className="font-mono text-[11px] tabular-nums w-6 shrink-0" style={{ color: 'var(--text-muted)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {/* Dot */}
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-150"
              style={{ background: category.color }}
            />
            {/* Name */}
            <span
              className="font-display text-base sm:text-lg font-medium transition-colors duration-300 group-hover:text-[color:var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Differential vertical drift — columns flow up & down at different speeds as you scroll.
  const yUp = useTransform(scrollYProgress, [0, 1], [70, -70])
  const yDown = useTransform(scrollYProgress, [0, 1], [-70, 70])
  const yMid = useTransform(scrollYProgress, [0, 1], [40, -40])
  const columnY = [yUp, yDown, yMid]

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="eyebrow mb-4 block">What I work with</span>
            <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
              <SplitText text="My" charDelay={30} />{' '}
              <span className="text-gradient"><SplitText text="Skills" charDelay={30} /></span>
            </h2>
            <p className="mt-3 text-base sm:text-lg max-w-md" style={{ color: 'var(--text-secondary)' }}>
              A comprehensive toolkit of technologies and frameworks.
            </p>
          </div>
          {!prefersReducedMotion && (
            <span className="eyebrow flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              Scroll <ArrowDown size={13} className="animate-bounce" />
            </span>
          )}
        </motion.div>

        {/* Parallax columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {skillCategories.map((category, index) => (
            <SkillColumn key={category.title} category={category} index={index} y={columnY[index]} />
          ))}
        </div>
      </div>
    </section>
  )
}
