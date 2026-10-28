'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Building, GraduationCap, Award, Briefcase, Eye } from 'lucide-react'
import Image from 'next/image'
import SplitText from './SplitText'
import AnimatedModal from './motion/AnimatedModal'
import TiltCard from './motion/TiltCard'

const ACCENT_CHIP = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'

const experiences = [
    { title: 'Software Engineer – Full Stack', company: 'QueenSoft', location: 'Egypt', period: 'Jun 2025 – Present', year: '2025', description: 'Building Grace App, an AI-powered practice-management SaaS for Canadian mental-health professionals. Built most of the UI and API integration, single-handedly owned the appointment-scheduling module (availability checks and conflict detection), booking links and waitlist, and built AI session features (live transcription and session summaries) on Google Cloud.', technologies: ['Next.js', 'Nest.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Python', 'GCP', 'OpenAI', 'Gemini'], image: '/images/QueenSoft.jpg', isCurrent: true },
    { title: 'Assistant to Foundation Manager', company: 'CMF', location: 'Egypt', period: 'Aug 2024 – Mar 2026', year: '2024', description: 'Supported the foundation manager with reports, meetings, and event organization.', technologies: ['Microsoft Office', 'Reports', 'Event Organization'], image: '/images/CMF.jpg', isCurrent: false },
    { title: 'HR Team Leader (Volunteer)', company: 'Microsoft Student Partners (MSP)', location: 'Ain Shams University', period: 'Oct 2022 – Oct 2023', year: '2022', description: 'Led the HR team of a student tech community: coordinated members, organized internal events and activities, and kept the team engaged and aligned.', technologies: ['Leadership', 'Team Management', 'Event Organization'], image: '/images/MSP.jpg', isCurrent: false },
    { title: 'Database & Data Entry', company: 'CMF', location: 'Egypt', period: 'Sept 2022 – Feb 2023', year: '2022', description: 'Designed and implemented database system using Microsoft Access.', technologies: ['Access', 'Database Design', 'SQL', 'Data Modeling'], image: '/images/CMF.jpg', isCurrent: false }
  ]

  const education = [{ title: 'Bachelor of Computer and Information Science', institution: 'Ain Shams University', location: 'Egypt', period: 'Sept 2021 – July 2025', description: 'GPA: 3.025 | Graduation Project: A+', image: '/images/CS.jpg' }]

  const certifications = [
    { title: 'Android Internship', issuer: 'Banque Misr', date: 'Aug 2024', image: '/images/BM.jpg', certificateImage: '/images/Certifcation/BM.jpg' },
    { title: 'Data Engineering Training', issuer: 'Potenia', date: 'Aug 2023', image: '/images/POTENTIA.jpg', certificateImage: '/images/Certifcation/Potenia.png' },
    { title: 'Flutter Training', issuer: 'Support', date: 'Aug 2023', image: '/images/Support.jpg', certificateImage: '/images/Certifcation/Fluttersupport.jpg' },
    { title: 'Software Engineering Training', issuer: 'ALX', date: 'Feb 2023', image: '/images/ALX.jpg' }
  ]

  const courses = [
    { title: 'Claude Code 101', issuer: 'Anthropic', date: 'May 2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/Claude Code 101 .png', description: 'Learned the fundamentals of Claude Code CLI, including agentic coding, tool use, and AI-assisted development workflows.' },
    { title: 'Claude 101', issuer: 'Anthropic', date: 'Apr 2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/claude 101.png', description: 'Introductory course covering the fundamentals of Claude, prompt engineering, and effective AI interaction.' },
    { title: 'Claude Code in Action', issuer: 'Anthropic', date: 'Apr 2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/claude code in action.png', description: 'Practical course on leveraging Claude Code for real-world software development workflows.' },
    { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/AI Fluency Framework & Foundations course.png', description: 'Mastered AI collaboration principles including delegation, clear communication, critical evaluation, and responsible use.' },
    { title: 'Introduction to Claude Cowork', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/Claude coworker.png', description: 'Learned how to collaborate effectively with Claude as an AI coworker for enhanced productivity and teamwork.' },
    { title: 'Introduction to Sub-Agents', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/Introducation to Sub-Agents.png', description: 'Learned how to build and orchestrate sub-agents for multi-step AI workflows and complex task automation.' },
    { title: 'Introduction to Agent Skills', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/Introduction to agent skills.png', description: 'Learned how to define, configure, and use agent skills for building specialized AI agent capabilities.' },
    { title: 'AI Fluency: AI Capabilities & Limitations', issuer: 'Anthropic', date: '2025', image: '/images/anthropic.png', certificateImage: '/images/Certifcation/AI Capabilities and Limitations.png', description: 'Explored the capabilities and limitations of AI systems, understanding what AI can and cannot do for responsible and effective use.' },
    { title: 'Git & GitHub Bootcamp', issuer: 'Udemy', date: 'Aug 2025', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/GitCourse.jpg' },
    { title: 'Nest.js Complete Guide', issuer: 'Udemy', date: 'Jun 2025', image: '/images/Udemy.jpg', certificateImage: "/images/Certifcation/The Complete Developer's Guide in Nest.jpg" },
    { title: 'Freelancer Toolkit', issuer: 'E-Youth | ITIDA', date: 'Mar 2025', image: '/images/ITIDA.jpg' },
    { title: 'Flutter Course', issuer: 'Udemy', date: 'Sept 2023', image: '/images/Udemy.jpg' },
    { title: 'Python 3 Guide', issuer: 'Udemy', date: 'July 2023', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/Python.jpg' }
  ]

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const allItems = useMemo(() => [
    ...certifications.map(c => ({ ...c, type: 'certification' as const })),
    ...courses.map(c => ({ ...c, type: 'course' as const })),
  ], [])

  const issuerGroups = useMemo(() => {
    const map = new Map<string, { issuer: string; image: string; items: typeof allItems }>()
    for (const item of allItems) {
      if (!map.has(item.issuer)) {
        map.set(item.issuer, { issuer: item.issuer, image: item.image, items: [] })
      }
      map.get(item.issuer)!.items.push(item)
    }
    return Array.from(map.values())
  }, [allItems])

  const [activeFilter, setActiveFilter] = useState<'all' | 'certification' | 'course'>('all')
  const filterOptions = ['All', 'Certifications', 'Courses'] as const

  const filteredGroups = useMemo(() => {
    if (activeFilter === 'all') return issuerGroups
    return issuerGroups
      .map(g => ({ ...g, items: g.items.filter(item => item.type === activeFilter) }))
      .filter(g => g.items.length > 0)
  }, [issuerGroups, activeFilter])

  const [selectedCertificate, setSelectedCertificate] = useState<{ image: string; title: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback((image: string, title: string) => {
    setSelectedCertificate({ image, title })
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-4 block">My journey</span>
          <h2 className="heading-display text-clamp-section" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Experience &" charDelay={22} />{' '}
            <span className="text-gradient"><SplitText text="Education" charDelay={22} /></span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Education */}
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="card overflow-hidden mb-12"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="h-1" style={{ background: 'var(--accent-gradient)' }} />
              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                    <Image src={edu.image} alt={edu.institution} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span className="eyebrow" style={{ color: 'var(--accent-primary)' }}>Education</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{edu.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1.5"><Building size={14} />{edu.institution}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} />{edu.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} />{edu.period}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: ACCENT_CHIP, color: 'var(--accent-primary)' }}>
                      {edu.description}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Work Experience */}
          <div className="mb-14">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                <Briefcase className="text-white" size={16} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Work Experience</h3>
              <div className="flex-1 h-px ml-2" style={{ background: 'var(--card-border)' }} />
            </motion.div>

            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--card-border)' }} />

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="absolute -left-6 top-5 w-[15px] h-[15px] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: exp.isCurrent ? 'var(--live)' : 'var(--accent-primary)' }} />
                    </div>

                    <TiltCard>
                      <div className="card p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                          <Image src={exp.image} alt={exp.company} width={40} height={40} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" style={{ border: '1px solid var(--card-border)' }} loading="lazy" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h4 className="font-display text-base sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{exp.title}</h4>
                              <span
                                className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                                style={{
                                  background: exp.isCurrent ? 'color-mix(in srgb, var(--live) 14%, transparent)' : 'var(--glass-bg)',
                                  color: exp.isCurrent ? 'var(--live)' : 'var(--text-muted)',
                                  border: exp.isCurrent ? 'none' : '1px solid var(--glass-border)'
                                }}
                              >
                                {exp.period}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                              <span className="flex items-center gap-1"><Building size={13} />{exp.company}</span>
                              <span className="flex items-center gap-1"><MapPin size={13} />{exp.location}</span>
                            </div>
                            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((tech) => (
                                <span key={tech} className="px-2.5 py-1 text-xs rounded-md" style={{ background: ACCENT_CHIP, color: 'var(--accent-primary)' }}>{tech}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications & Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                <Award className="text-white" size={16} />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Certifications &amp; Courses</h3>
              <div className="flex-1 h-px ml-2" style={{ background: 'var(--card-border)' }} />
            </div>

            {/* Filter Pills */}
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              {filterOptions.map((option) => {
                const value = option === 'All' ? 'all' : option === 'Certifications' ? 'certification' : 'course'
                return (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(value)}
                    className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all touch-target"
                    style={activeFilter === value
                      ? { background: 'var(--accent-gradient)', color: 'white', boxShadow: '0 8px 24px -8px color-mix(in srgb, var(--accent-primary) 60%, transparent)' }
                      : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }
                    }
                  >
                    {option}
                  </button>
                )
              })}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="space-y-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filteredGroups.map((group, groupIndex) => {
                  const isCompact = group.items.length >= 5

                  /* Compact grouped card (collapses issuer walls like Anthropic) */
                  if (isCompact) {
                    return (
                      <motion.div
                        key={group.issuer}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 + groupIndex * 0.1, duration: 0.5 }}
                      >
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--card-border)' }}>
                            <Image src={group.image} alt={group.issuer} width={40} height={40} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{group.issuer}</h4>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{group.items.length} courses</p>
                          </div>
                          <div className="flex-1 h-px ml-3" style={{ background: 'var(--card-border)' }} />
                        </div>

                        <div className="card overflow-hidden">
                          <ul className="divide-y" style={{ borderColor: 'var(--card-border)' }}>
                            {group.items.map((item, i) => (
                              <li key={item.title + i} className="group flex items-center gap-4 px-5 py-4">
                                <span className="font-mono text-[11px] tabular-nums w-6 shrink-0 transition-colors group-hover:text-[color:var(--accent-primary)]" style={{ color: 'var(--text-muted)' }}>
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate transition-colors group-hover:text-[color:var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>{item.title}</p>
                                  <p className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                                    <Calendar size={11} />{item.date}
                                  </p>
                                </div>
                                {item.certificateImage && (
                                  <button
                                    onClick={() => openModal(item.certificateImage, item.title)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105 shrink-0 opacity-60 group-hover:opacity-100"
                                    style={{ background: 'color-mix(in srgb, var(--accent-primary) 12%, transparent)', color: 'var(--accent-primary)', border: '1px solid var(--glass-border)' }}
                                    aria-label={`View certificate for ${item.title}`}
                                  >
                                    <Eye size={13} />
                                    <span>View</span>
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )
                  }

                  /* Standard card grid for smaller issuers */
                  return (
                    <motion.div
                      key={group.issuer}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + groupIndex * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--card-border)' }}>
                          <Image src={group.image} alt={group.issuer} width={40} height={40} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <h4 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{group.issuer}</h4>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{group.items.length} {group.items.length === 1 ? 'item' : 'items'}</p>
                        </div>
                        <div className="flex-1 h-px ml-3" style={{ background: 'var(--card-border)' }} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {group.items.map((item, i) => {
                          const typeColor = item.type === 'certification' ? 'var(--live)' : 'var(--accent-primary)'
                          return (
                            <motion.div
                              key={item.title + i}
                              className="card group relative overflow-hidden p-5 flex flex-col"
                              initial={{ opacity: 0, y: 10 }}
                              animate={isInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ delay: 0.5 + groupIndex * 0.1 + i * 0.03, duration: 0.3 }}
                              whileHover={{ y: -4, borderColor: typeColor }}
                            >
                              {/* Accent left edge */}
                              <span className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" style={{ background: typeColor }} />

                              <div className="flex items-center gap-3 mb-3 pl-2">
                                <Image src={group.image} alt={group.issuer} width={44} height={44} className="w-11 h-11 rounded-lg object-cover shrink-0" style={{ border: '1px solid var(--card-border)' }} loading="lazy" />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: typeColor }} />
                                    <span className="eyebrow" style={{ color: typeColor }}>{item.type === 'certification' ? 'Certification' : 'Course'}</span>
                                  </div>
                                  <p className="text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>{group.issuer}</p>
                                </div>
                              </div>

                              <h4 className="font-display text-base font-semibold leading-snug mb-2 pl-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>

                              {'description' in item && item.description && (
                                <p className="text-xs leading-relaxed mb-4 line-clamp-2 pl-2" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                              )}

                              <div className="mt-auto flex items-center justify-between pl-2 pt-3" style={{ borderTop: '1px solid var(--card-border)' }}>
                                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                  <Calendar size={12} />
                                  {item.date}
                                </span>
                                {item.certificateImage ? (
                                  <button
                                    onClick={() => openModal(item.certificateImage, item.title)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                                    style={{ background: `color-mix(in srgb, ${typeColor} 12%, transparent)`, color: typeColor }}
                                    aria-label={`View certificate for ${item.title}`}
                                  >
                                    <Eye size={13} /> Certificate
                                  </button>
                                ) : (
                                  <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>No certificate</span>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatedModal isOpen={isModalOpen} onClose={closeModal} className="max-w-4xl">
        {selectedCertificate && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div className="relative h-[70vh] p-4" style={{ background: 'var(--bg-tertiary)' }}>
              <Image src={selectedCertificate.image} alt={selectedCertificate.title} fill className="object-contain" />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedCertificate.title}</h3>
            </div>
          </div>
        )}
      </AnimatedModal>
    </section>
  )
}

export default Experience
