'use client'

import { useRef, useState, useCallback } from 'react'
import { Calendar, MapPin, Building, GraduationCap, Briefcase } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from './scroll/SectionHeading'
import AnimatedModal from './motion/AnimatedModal'
import Credentials from './Credentials'
import TiltCard from './motion/TiltCard'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'

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
  const timelineRef = useRef<HTMLDivElement>(null)

  const [activeExp, setActiveExp] = useState(0)

  // Timeline: line drawn by scroll; each role card reveals on enter and becomes the "active" role
  // shown in the sticky panel while it crosses the middle of the viewport.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.fromTo('[data-timeline-fill]', { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 60%', end: 'bottom 60%', scrub: 0.6 },
      })

      gsap.utils.toArray<HTMLElement>('[data-exp-card]').forEach((card) => {
        gsap.from(card, {
          x: 60, opacity: 0, duration: 1,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      })

      gsap.from('[data-edu-card]', {
        y: 50, opacity: 0, scale: 0.96, duration: 1,
        scrollTrigger: { trigger: '[data-edu-card]', start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    })

    // Active role = last card whose top has crossed 55% of the viewport. Computed on every scroll
    // update (not toggle events) so fast jumps / nav clicks can't leave the panel stale.
    const cards = gsap.utils.toArray<HTMLElement>('[data-exp-card]')
    const dots = cards.map((c) => c.querySelector('[data-timeline-dot]'))
    let current = -1
    const sync = () => {
      const line = window.innerHeight * 0.55
      let idx = 0
      cards.forEach((c, i) => { if (c.getBoundingClientRect().top < line) idx = i })
      if (idx === current) return
      current = idx
      setActiveExp(idx)
      dots.forEach((d, i) => gsap.to(d, { scale: i === idx ? 1.8 : 1, duration: 0.4, ease: 'back.out(3)' }))
    }
    ScrollTrigger.create({ trigger: timelineRef.current, start: 'top bottom', end: 'bottom top', onUpdate: sync, onRefresh: sync })
  }, { scope: sectionRef })

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
    <section id="experience" ref={sectionRef} className="section relative overflow-clip">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading index="04" eyebrow="My journey" title="Experience &" accent="Education" />

        <div className="max-w-6xl mx-auto">
          {/* Work Experience: sticky role panel + timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                    <Briefcase className="text-white" size={16} />
                  </div>
                  <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Work Experience</h3>
                </div>
                <div className="heading-display tabular-nums leading-none mb-6" style={{ fontSize: 'clamp(5rem, 9vw, 8rem)' }}>
                  <span className="text-gradient">{String(activeExp + 1).padStart(2, '0')}</span>
                  <span className="text-3xl align-top ml-2" style={{ color: 'var(--text-muted)' }}>/ {String(experiences.length).padStart(2, '0')}</span>
                </div>
                <div key={activeExp} className="exp-panel-swap">
                  <Image src={experiences[activeExp].image} alt="" width={48} height={48} className="w-12 h-12 rounded-xl object-cover mb-4" style={{ border: '1px solid var(--card-border)' }} />
                  <p className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{experiences[activeExp].company}</p>
                  <p className="eyebrow">{experiences[activeExp].period}</p>
                </div>
                <div className="flex gap-1.5 mt-8">
                  {experiences.map((exp, i) => (
                    <span key={exp.title} className="h-1 rounded-full transition-all duration-500" style={{ width: i === activeExp ? 40 : 12, background: i === activeExp ? 'var(--accent-gradient)' : 'var(--card-border)' }} />
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8 lg:hidden">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-gradient)' }}>
                  <Briefcase className="text-white" size={16} />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>Work Experience</h3>
              </div>

              <div ref={timelineRef} className="relative pl-8">
                <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: 'var(--card-border)' }} />
                <div data-timeline-fill className="absolute left-[7px] top-2 bottom-2 w-px origin-top" style={{ background: 'var(--accent-gradient)' }} />

                <div className="space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.title} data-exp-card className="relative">
                      <div className="absolute -left-8 top-6 w-[15px] h-[15px] flex items-center justify-center">
                        <div data-timeline-dot className="w-2.5 h-2.5 rounded-full" style={{ background: exp.isCurrent ? 'var(--live)' : 'var(--accent-primary)' }} />
                      </div>

                      <TiltCard>
                        <div className="card p-6 sm:p-7">
                          <div className="flex items-start gap-4">
                            <Image src={exp.image} alt={exp.company} width={44} height={44} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" style={{ border: '1px solid var(--card-border)' }} loading="lazy" />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-display text-lg sm:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{exp.title}</h4>
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
                              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{exp.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {exp.technologies.map((tech) => (
                                  <span key={tech} className="px-2.5 py-1 text-xs rounded-md" style={{ background: ACCENT_CHIP, color: 'var(--accent-primary)' }}>{tech}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          {education.map((edu) => (
            <div key={edu.title} data-edu-card className="card overflow-hidden mb-20">
              <div className="h-1" style={{ background: 'var(--accent-gradient)' }} />
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden" style={{ border: '1px solid var(--card-border)' }}>
                    <Image src={edu.image} alt={edu.institution} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span className="eyebrow" style={{ color: 'var(--accent-primary)' }}>Education</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{edu.title}</h3>
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
            </div>
          ))}

          {/* Certifications & Courses — credentials ledger */}
          <Credentials certifications={certifications} courses={courses} onOpen={openModal} />
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
