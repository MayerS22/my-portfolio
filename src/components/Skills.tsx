'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SplitText from './SplitText'

const skillCategories = [
  {
    title: 'Frontend',
    color: 'var(--accent-primary)',
    skills: [
      { name: 'React', emoji: '⚛️' },
      { name: 'Next.js', emoji: '▲' },
      { name: 'TypeScript', emoji: '🔷' },
      { name: 'JavaScript', emoji: '🟨' },
      { name: 'HTML5', emoji: '🟧' },
      { name: 'CSS3', emoji: '🎨' },
      { name: 'Tailwind CSS', emoji: '🌊' },
      { name: 'Redux', emoji: '🔄' },
    ],
  },
  {
    title: 'Backend',
    color: 'var(--accent-secondary)',
    skills: [
      { name: 'Node.js', emoji: '🟢' },
      { name: 'Nest.js', emoji: '🐈' },
      { name: 'Express.js', emoji: '🚂' },
      { name: 'Python', emoji: '🐍' },
      { name: 'C++', emoji: '⚡' },
      { name: 'Firebase', emoji: '🔥' },
      { name: 'REST APIs', emoji: '🔗' },
    ],
  },
  {
    title: 'Database & Cloud',
    color: '#22c55e',
    skills: [
      { name: 'PostgreSQL', emoji: '🐘' },
      { name: 'MongoDB', emoji: '🍃' },
      { name: 'SQL', emoji: '🗃️' },
    ],
  },
]

function FlipCard({ name, emoji, color, delay }: { name: string, emoji: string, color: string, delay: number }) {
  return (
    <motion.div
      className="perspective-[600px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      <motion.div
        className="relative w-full preserve-3d"
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{
          y: -4,
          scale: 1.04,
          transition: { duration: 0.2 },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-default select-none"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 6px 20px ${color}18` }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          <span className="text-lg flex-shrink-0">{emoji}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{name}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={sectionRef} className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
          >
            What I work with
          </span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="My" charDelay={40} />{' '}
            <span className="text-gradient"><SplitText text="Skills" charDelay={40} /></span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            A comprehensive toolkit of technologies and frameworks
          </p>
        </motion.div>

        {/* Categories */}
        <div className="max-w-5xl mx-auto space-y-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIndex * 0.12, duration: 0.6 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: `${category.color}15` }}
                >
                  <span style={{ color: category.color, fontWeight: 700 }}>{category.title[0]}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{category.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{category.skills.length} technologies</p>
                </div>
                <div className="flex-1 h-px ml-2" style={{ background: 'var(--glass-border)' }} />
              </div>

              {/* Skill cards with flip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.skills.map((skill, i) => (
                  <FlipCard
                    key={skill.name}
                    name={skill.name}
                    emoji={skill.emoji}
                    color={category.color}
                    delay={0.3 + catIndex * 0.12 + i * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
