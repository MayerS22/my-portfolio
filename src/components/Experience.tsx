'use client'

import { useRef, useState, useCallback, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Building, GraduationCap, Award, Briefcase, Eye, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import SplitText from './SplitText'
import AnimatedModal from './motion/AnimatedModal'
import TiltCard from './motion/TiltCard'

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const experiences = [
    { title: 'Software Engineer', company: 'QueenSoft', location: 'Egypt', period: 'July 2025 – Present', year: '2025', description: 'Full Stack Developer building scalable web applications.', technologies: ['Next.js', 'Nest.js', 'PostgreSQL', 'TypeScript', 'React', 'Node.js'], image: '/images/QueenSoft.jpg', isCurrent: true },
    { title: 'Assistant to Foundation Manager', company: 'CMF', location: 'Egypt', period: 'Aug 2024 – Mar 2026', year: '2024', description: 'Supported the foundation manager with reports, meetings, and event organization.', technologies: ['Microsoft Office', 'Reports', 'Event Organization'], image: '/images/CMF.jpg', isCurrent: false },
    { title: 'Microsoft Student Partner', company: 'Microsoft Tech Club', location: 'Egypt', period: 'Oct 2022 – Oct 2023', year: '2022', description: 'Led technical workshops and mentored students in Microsoft technologies.', technologies: ['Azure', 'Power Platform', 'Power BI', 'GitHub', 'Leadership'], image: '/images/MSP.jpg', isCurrent: false },
    { title: 'Database Administrator', company: 'CMF', location: 'Egypt', period: 'Sept 2022 – Feb 2023', year: '2022', description: 'Designed and implemented database system using Microsoft Access.', technologies: ['Access', 'Database Design', 'SQL', 'Data Modeling'], image: '/images/CMF.jpg', isCurrent: false }
  ]

  const education = [{ title: 'Bachelor of Computer and Information Science', institution: 'Ain Shams University', location: 'Egypt', period: 'Sept 2021 – July 2025', description: 'GPA: 3.005 | Graduation Project: A+', image: '/images/CS.jpg' }]

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
    { title: 'Git & GitHub Bootcamp', issuer: 'Udemy', date: 'Aug 2025', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/GitCourse.jpg' },
    { title: 'Nest.js Complete Guide', issuer: 'Udemy', date: 'Jun 2025', image: '/images/Udemy.jpg', certificateImage: "/images/Certifcation/The Complete Developer's Guide in Nest.jpg" },
    { title: 'Freelancer Toolkit', issuer: 'E-Youth | ITIDA', date: 'Mar 2025', image: '/images/ITIDA.jpg' },
    { title: 'Flutter Course', issuer: 'Udemy', date: 'Sept 2023', image: '/images/Udemy.jpg' },
    { title: 'Python 3 Guide', issuer: 'Udemy', date: 'July 2023', image: '/images/Udemy.jpg', certificateImage: '/images/Certifcation/Python.jpg' }
  ]

  const allItems = useMemo(() => [
    ...certifications.map(c => ({ ...c, type: 'certification' as const })),
    ...courses.map(c => ({ ...c, type: 'course' as const })),
  ], [certifications, courses])

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

  const [expandedIssuers, setExpandedIssuers] = useState<Set<string>>(() => new Set(issuerGroups.map(g => g.issuer)))

  const toggleIssuer = useCallback((issuer: string) => {
    setExpandedIssuers(prev => {
      const next = new Set(prev)
      if (next.has(issuer)) next.delete(issuer)
      else next.add(issuer)
      return next
    })
  }, [])

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
    <section id="experience" ref={sectionRef} className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full"
            style={{ color: 'var(--accent-primary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            My journey
          </motion.span>
          <h2 className="text-clamp-section font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            <SplitText text="Experience &" charDelay={25} />{' '}
            <span className="text-gradient"><SplitText text="Education" charDelay={25} /></span>
          </h2>
          <motion.p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            My professional journey and academic background
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Education — Featured Card */}
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden mb-14"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="h-1" style={{ background: 'var(--accent-gradient)' }} />
              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden" style={{ border: '1px solid var(--glass-border)' }}>
                    <Image src={edu.image} alt={edu.institution} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-primary)' }}>Education</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{edu.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                      <span className="flex items-center gap-1.5"><Building size={14} />{edu.institution}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} />{edu.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} />{edu.period}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                      {edu.description}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Work Experience — Simple dot + line timeline */}
          <div className="mb-14">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                <Briefcase className="text-white" size={16} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Work Experience</h3>
              <div className="flex-1 h-px ml-2" style={{ background: 'var(--glass-border)' }} />
            </motion.div>

            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--glass-border)' }} />

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + index * 0.1, duration: 0.4 }}
                  >
                    {/* Dot */}
                    <div className="absolute -left-6 top-5 w-[15px] h-[15px] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: exp.isCurrent ? '#22c55e' : 'var(--accent-primary)' }} />
                    </div>

                    {/* Card */}
                    <TiltCard>
                      <div
                        className="rounded-xl p-5 sm:p-6 transition-all duration-300"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                      >
                      <div className="flex items-start gap-3">
                        <Image src={exp.image} alt={exp.company} width={40} height={40} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" style={{ border: '1px solid var(--glass-border)' }} loading="lazy" />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{exp.title}</h4>
                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full" style={{ background: exp.isCurrent ? 'rgba(34, 197, 94, 0.1)' : 'var(--glass-bg)', color: exp.isCurrent ? '#22c55e' : 'var(--text-muted)', border: exp.isCurrent ? 'none' : '1px solid var(--glass-border)' }}>
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
                              <span key={tech} className="px-2.5 py-1 text-xs rounded-md" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>{tech}</span>
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

          {/* Certifications & Courses — Grouped by Issuer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                <Award className="text-white" size={16} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Certifications & Courses</h3>
              <div className="flex-1 h-px ml-2" style={{ background: 'var(--glass-border)' }} />
            </div>

            <div className="space-y-3">
              {issuerGroups.map((group) => {
                const isExpanded = expandedIssuers.has(group.issuer)
                return (
                  <div
                    key={group.issuer}
                    className="rounded-xl overflow-hidden transition-all duration-300"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}
                  >
                    <button
                      onClick={() => toggleIssuer(group.issuer)}
                      className="w-full flex items-center gap-3 p-4 text-left"
                    >
                      <Image src={group.image} alt={group.issuer} width={32} height={32} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" style={{ border: '1px solid var(--glass-border)' }} loading="lazy" />
                      <span className="font-semibold text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{group.issuer}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}>
                        {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                      </span>
                      <ChevronDown
                        size={16}
                        style={{ color: 'var(--text-muted)', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t" style={{ borderColor: 'var(--glass-border)' }}>
                        {group.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 px-4 py-3 transition-colors duration-200 group"
                            style={{ borderTop: idx > 0 ? '1px solid var(--glass-border)' : 'none' }}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                                <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: item.type === 'certification' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(99, 102, 241, 0.1)', color: item.type === 'certification' ? '#22c55e' : 'var(--accent-primary)', fontSize: '10px' }}>
                                  {item.type === 'certification' ? 'CERT' : 'COURSE'}
                                </span>
                              </div>
                              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.date}</span>
                              {'description' in item && item.description && (
                                <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                              )}
                            </div>
                            {item.certificateImage && (
                              <button
                                onClick={() => openModal(item.certificateImage, item.title)}
                                className="p-2 flex-shrink-0 touch-target rounded-lg transition-all opacity-40 group-hover:opacity-100"
                                style={{ color: 'var(--accent-primary)' }}
                                aria-label="View certificate"
                              >
                                <Eye size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
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
