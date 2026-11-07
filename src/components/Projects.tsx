'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import ProjectDetailModal, { Project } from './ProjectDetailModal'
import SectionHeading from './scroll/SectionHeading'
import { gsap, ScrollTrigger, useGSAP, MQ } from '@/lib/gsap'

const projects: Project[] = [
  { id: 1, title: "Grace App", description: "AI-powered practice-management SaaS for Canadian mental-health professionals. Built most of the UI and API integration, owned the appointment-scheduling module (availability checks, conflict detection), booking links and waitlist, and built AI features: live session transcription and AI session summaries using OpenAI and Gemini on an event-driven Google Cloud pipeline.", image: "/images/GraceApp.png", images: ["/images/GraceApp.png"], technologies: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Python", "GCP", "OpenAI", "Gemini"], githubUrl: "#", liveUrl: "https://www.joingrace.ai/en/", category: "Full-Stack" },
  { id: 2, title: "MayerHub", description: "My all-in-one personal life manager: tasks, finances, calendar, notes, journal, health and reports, with AI-powered features like a smart food tracker and expense tracking. Shipped as a web app plus desktop installers for Windows, macOS and Linux on one shared backend.", image: "/images/MayerHub.png", images: ["/images/MayerHub.png"], technologies: ["Next.js", "TypeScript", "AI APIs", "Desktop"], githubUrl: "#", liveUrl: "https://mayer-rise-up.vercel.app", category: "Full-Stack" },
  { id: 3, title: "SafetyZone Consumer Website", description: "Modern consumer-facing website with real-time safety reporting and emergency services integration.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"], technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"], githubUrl: "#", liveUrl: "https://safetyzoone.com/", category: "Frontend" },
  { id: 4, title: "AutoInsight", description: "Graduation project (A+): a platform that turns company data into cleaned datasets, ML forecasts and chatbot answers for layoff planning. I built the frontend dashboard in a 5-person team.", image: "/images/AutoInsight.png", images: ["/images/AutoInsight.png"], technologies: ["React", "Vite", "Python", "ML"], githubUrl: "https://github.com/MayerS22/AutoInsight", liveUrl: "#", category: "Full-Stack" },
  { id: 5, title: "Mini-Instapay", description: "Microservices P2P payment platform with JWT auth, transaction history, RabbitMQ-driven notifications and financial reports. I built the React/Tailwind frontend in a 4-person team.", image: "/images/MiniInstapay.png", images: ["/images/MiniInstapay.png"], technologies: ["React", "Tailwind CSS", "Node.js", "MongoDB", "RabbitMQ", "Docker"], githubUrl: "#", liveUrl: "#", category: "Full-Stack" },
  { id: 6, title: "SafetyZone Provider App", description: "Mobile app for SafetyZone providers with real-time incident management, emergency response coordination, and communication with dispatch center.", image: "/images/SaftyZoneprovider/SaftyZone.png", images: ["/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"], technologies: ["Flutter", "Firebase", "Dart", "Socket.io"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
  { id: 7, title: "SafetyZone Consumer App", description: "Mobile app for SafetyZone consumers with real-time safety reporting, emergency services, and incident tracking.", image: "/images/safetyZoneConsumer/0.png", images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"], technologies: ["Flutter", "Firebase", "Dart", "REST APIs"], githubUrl: "#", liveUrl: "#", category: "Mobile" },
  { id: 8, title: "Speedo Transfer", description: "Money-transfer app built during my Banque Misr internship. I built the frontend with my team: screens, UI components and navigation in Jetpack Compose, connected to REST APIs.", image: "/images/Speedo.png", images: ["/images/Speedo.png"], technologies: ["Kotlin", "Jetpack Compose", "Material Design", "REST APIs"], githubUrl: "https://github.com/MayerS22/speedoo", liveUrl: "#", category: "Mobile" },
  { id: 9, title: "Checko", description: "Full-stack mobile todo with intelligent insights.", image: "/images/Checko/checko-1.jpeg", images: ["/images/Checko/checko-1.jpeg", "/images/Checko/checko-2.jpeg"], technologies: ["React Native", "Firebase", "TypeScript"], githubUrl: "https://github.com/MayerS22/Checko", liveUrl: "#", category: "Mobile" },
  { id: 10, title: "E-Commerce", description: "Mobile e-commerce with real-time data.", image: "/images/ecommerce-app.jpg", images: ["/images/ecommerce-app.jpg"], technologies: ["Flutter", "Firebase", "Dart"], githubUrl: "https://github.com/MayerS22/E-commerce-Mobile-App", liveUrl: "#", category: "Mobile" }
]

/** Shown as large case-study rows; everything else lives in the index list. */
const FEATURED_IDS = [1, 2]
const CATEGORIES = ['All', 'Full-Stack', 'Mobile', 'Frontend'] as const

const hasLink = (url?: string) => Boolean(url && url !== '#')

/**
 * Chapter 06. Featured work as alternating case-study rows (image wipes open, drifts with
 * the scroll), then a filterable index — on desktop, hovering a row floats its preview
 * image after the cursor.
 */
export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [hovered, setHovered] = useState<Project | null>(null)

  const openProjectModal = useCallback((project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }, [])

  const closeProjectModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const featured = useMemo(() => projects.filter((p) => FEATURED_IDS.includes(p.id)), [])
  const rest = useMemo(() => {
    const others = projects.filter((p) => !FEATURED_IDS.includes(p.id))
    return activeCategory === 'All' ? others : others.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Featured rows: image frame wipes open on enter, image drifts inside it (scrub), copy rises.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.utils.toArray<HTMLElement>('[data-feat]').forEach((row) => {
        const frame = row.querySelector('[data-feat-frame]')
        const img = row.querySelector('[data-feat-img]')
        gsap.fromTo(frame,
          { clipPath: 'inset(12% 12% 12% 12% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', ease: 'none', scrollTrigger: { trigger: row, start: 'top 90%', end: 'top 35%', scrub: true } })
        gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, {
          yPercent: 5, scale: 1.04, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        gsap.from(row.querySelectorAll('[data-feat-copy] > *'), {
          y: 40, opacity: 0, duration: 1, stagger: 0.08,
          scrollTrigger: { trigger: row, start: 'top 70%', toggleActions: 'play none none reverse' },
        })
      })
    })
  }, { scope: ref })

  // Index rows: re-created on filter change so new rows get their own reveal.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const rows = gsap.utils.toArray<HTMLElement>('[data-idx-row]')
      gsap.set(rows, { opacity: 0, y: 30 })
      gsap.set('[data-idx-line]', { scaleX: 0 })
      ScrollTrigger.batch(rows, {
        start: 'top 94%',
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, overwrite: true })
          gsap.to(batch.map((r) => r.querySelector('[data-idx-line]')), { scaleX: 1, duration: 1.2, stagger: 0.07, ease: 'expo.inOut' })
        },
      })
    })
  }, { scope: ref, dependencies: [activeCategory], revertOnUpdate: true })

  // Floating preview that trails the cursor over the index (desktop pointer only).
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.pointerMotion, () => {
      const preview = previewRef.current!
      const list = ref.current!.querySelector<HTMLElement>('[data-idx-list]')!
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' })
      const rTo = gsap.quickTo(preview, 'rotation', { duration: 0.8, ease: 'power3' })
      let lastX = 0
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX); yTo(e.clientY)
        rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6))
        lastX = e.clientX
      }
      const show = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'expo.out' })
      const hide = () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.35, ease: 'power3.in' })
      list.addEventListener('pointermove', onMove)
      list.addEventListener('pointerenter', show)
      list.addEventListener('pointerleave', hide)
      return () => {
        list.removeEventListener('pointermove', onMove)
        list.removeEventListener('pointerenter', show)
        list.removeEventListener('pointerleave', hide)
      }
    })
  }, { scope: ref })

  return (
    <section id="projects" ref={ref} className="section relative">
      <div className="container-content">
        <SectionHeading index="06" eyebrow="Portfolio" title="Featured" accent="Projects" intro="A showcase of my recent work." />

        {/* ── Featured case studies ── */}
        <div className="space-y-24 sm:space-y-32 mb-28 sm:mb-36">
          {featured.map((project, i) => {
            const flip = i % 2 === 1
            return (
              <article key={project.id} data-feat className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <button
                  type="button"
                  data-feat-frame
                  data-cursor="Open"
                  onClick={() => openProjectModal(project)}
                  className={`group relative block w-full aspect-[16/10] overflow-hidden rounded-3xl lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
                  style={{ background: 'var(--bg-tertiary)' }}
                  aria-label={`Open ${project.title} details`}
                >
                  <Image
                    data-feat-img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  {/* Palette duotone: tints the screenshot to the accent hue; lifts on hover/focus */}
                  <span
                    aria-hidden
                    className="absolute inset-0 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 group-focus-visible:opacity-0"
                    style={{ background: 'var(--accent-primary)' }}
                  />
                </button>

                <div data-feat-copy className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--accent-primary)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-10" style={{ background: 'var(--card-border)' }} />
                    <span className="eyebrow">{project.category}</span>
                  </div>
                  <h3 className="heading-display mb-5" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3">
                    {hasLink(project.liveUrl) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5"
                        style={{ background: 'var(--accent-gradient)' }}
                      >
                        Visit live <ArrowUpRight size={15} />
                      </a>
                    )}
                    {hasLink(project.githubUrl) && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                        style={{ border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                      >
                        <Github size={15} /> Code
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => openProjectModal(project)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
                      style={{ border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── Index ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <h3 className="heading-display text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
            More work <span className="font-mono text-base align-top" style={{ color: 'var(--text-muted)' }}>({String(rest.length).padStart(2, '0')})</span>
          </h3>
          <div role="group" aria-label="Filter projects" className="inline-flex flex-wrap p-1 rounded-full self-start" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
            {CATEGORIES.map((category) => {
              const active = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={active ? { background: 'var(--accent-gradient)' } : { color: 'var(--text-secondary)' }}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <ul data-idx-list className="relative border-t" style={{ borderColor: 'var(--card-border)' }}>
          {rest.map((project, i) => (
            <li key={project.id} data-idx-row className="relative">
              <span data-idx-line className="absolute left-0 right-0 bottom-0 h-px origin-left" style={{ background: 'var(--card-border)' }} />
              <div
                role="button"
                tabIndex={0}
                data-cursor="View"
                onClick={() => openProjectModal(project)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(project) } }}
                onPointerEnter={() => setHovered(project)}
                aria-label={`Open ${project.title} details`}
                className="group grid grid-cols-[auto_1fr_auto] lg:grid-cols-[3rem_1.4fr_1fr_8rem_auto] items-center gap-4 lg:gap-6 py-6 sm:py-7 cursor-pointer outline-none focus-visible:bg-[color:var(--glass-bg)]"
              >
                <span className="hidden lg:block font-mono text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Mobile thumbnail */}
                <span className="lg:hidden relative w-14 h-14 rounded-xl overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <Image src={project.image} alt="" fill className="object-cover" sizes="56px" />
                </span>
                <span className="min-w-0">
                  <span
                    className="block heading-display transition-[transform,color] duration-500 group-hover:translate-x-3"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </span>
                  <span className="lg:hidden block eyebrow mt-1">{project.category}</span>
                </span>
                <span className="hidden lg:block text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                  {project.technologies.slice(0, 3).join(' · ')}
                </span>
                <span className="hidden lg:block eyebrow">{project.category}</span>
                <span className="flex items-center gap-2">
                  {hasLink(project.githubUrl) && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {hasLink(project.liveUrl) && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}
                      aria-label={`${project.title} live site`}
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"
                    style={{ background: 'var(--glass-bg)', color: 'var(--text-primary)' }}
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className="invisible fixed left-0 top-0 z-40 pointer-events-none -ml-[150px] -mt-[100px] w-[300px] h-[200px] rounded-2xl overflow-hidden scale-50"
        style={{ background: 'var(--bg-tertiary)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)' }}
      >
        {hovered && <Image key={hovered.id} src={hovered.image} alt="" fill className="object-cover object-top" sizes="300px" />}
      </div>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
    </section>
  )
}
