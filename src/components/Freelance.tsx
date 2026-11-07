'use client'

import { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { ExternalLink, Eye, ChevronLeft, ChevronRight, ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import SectionHeading from './scroll/SectionHeading'
import AnimatedModal from './motion/AnimatedModal'
import { gsap, useGSAP, MQ } from '@/lib/gsap'

export interface FreelanceProject {
  id: number
  title: string
  client: string
  description: string
  image: string
  images: string[]
  technologies: string[]
  duration: string
  liveUrl: string
  githubUrl: string
  category: string
}

const ACCENT_CHIP = 'color-mix(in srgb, var(--accent-primary) 12%, transparent)'

export default function Freelance() {
  const ref = useRef<HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const deliverables = useMemo<FreelanceProject[]>(() => [
    {
      id: 1, title: "Consumer Website", client: "SafetyZone",
      description: "Modern consumer-facing website with real-time safety reporting, emergency services integration, and responsive design.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/safetyZoneWebsite/1.png", "/images/safetyZoneWebsite/2.png", "/images/safetyZoneWebsite/3.png", "/images/safetyZoneWebsite/4.png", "/images/safetyZoneWebsite/5.png"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
      duration: "2 months", liveUrl: "https://safetyzoone.com/", githubUrl: "#", category: "Web"
    },
    {
      id: 2, title: "Consumer App", client: "SafetyZone",
      description: "Mobile app with real-time safety reporting, emergency services, incident tracking, and direct communication with civil defense.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/safetyZoneConsumer/0.png", "/images/safetyZoneConsumer/1.png", "/images/safetyZoneConsumer/2.png", "/images/safetyZoneConsumer/3.png", "/images/safetyZoneConsumer/4.png", "/images/safetyZoneConsumer/5.png"],
      technologies: ["Flutter", "Firebase", "Dart", "REST APIs"],
      duration: "3 months", liveUrl: "#", githubUrl: "#", category: "Mobile"
    },
    {
      id: 3, title: "Provider App", client: "SafetyZone",
      description: "Provider-facing mobile app with real-time incident management, emergency response coordination, and dispatch center communication.",
      image: "/images/SaftyZoneprovider/SaftyZone.png",
      images: ["/images/SaftyZoneprovider/SaftyZone.png", "/images/SaftyZoneprovider/HomePage.png", "/images/SaftyZoneprovider/BasicInfo.png", "/images/SaftyZoneprovider/chats.png", "/images/SaftyZoneprovider/Offers.png", "/images/SaftyZoneprovider/PendingScreen.png"],
      technologies: ["Flutter", "Firebase", "Dart", "Socket.io"],
      duration: "4 months", liveUrl: "#", githubUrl: "#", category: "Mobile"
    }
  ], [])

  const openModal = useCallback((project: FreelanceProject) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }, [])

  const goToNextImage = useCallback(() => {
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev + 1) % p.images.length)
      return p
    })
  }, [])

  const goToPrevImage = useCallback(() => {
    setSelectedProject((p) => {
      if (!p) return p
      setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length)
      return p
    })
  }, [])

  // Carousel arrow-key nav (Escape + overlay handled by AnimatedModal)
  useEffect(() => {
    if (!isModalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextImage()
      if (e.key === 'ArrowLeft') goToPrevImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isModalOpen, goToNextImage, goToPrevImage])


  // Stacking cards: while the next card slides up over a pinned (sticky) card, the one beneath
  // scales back and dims, scrubbed to the scroll. Screenshots drift inside their frames.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.desktopMotion, () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-fl-card]')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card.querySelector('[data-fl-inner]'), {
          scale: 0.9,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
        })
      })
    })
    mm.add(MQ.motion, () => {
      gsap.utils.toArray<HTMLElement>('[data-fl-img]').forEach((img) => {
        gsap.fromTo(img, { yPercent: -6, scale: 1.15 }, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      gsap.from(['[data-fl-intro]', '[data-fl-cta]'], {
        y: 40, opacity: 0, duration: 1, stagger: 0.1,
        scrollTrigger: { trigger: '[data-fl-intro]', start: 'top 85%', toggleActions: 'play none none reverse' },
      })
      gsap.utils.toArray<HTMLElement>('[data-fl-card]').forEach((card) => {
        gsap.from(card.querySelector('[data-fl-inner]'), {
          y: 80, opacity: 0, duration: 1,
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      })
    })
  }, { scope: ref })

  return (
    <section id="freelance" ref={ref} className="section relative overflow-clip">
      <div className="absolute inset-0 pointer-events-none gradient-mesh" />

      <div className="container-content relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Client work"
          title="Freelance"
          accent="Projects"
          intro="Real products, real clients — from concept to launch."
        />

        <div className="max-w-6xl mx-auto">
          {/* Case study intro */}
          <div data-fl-intro className="flex flex-col sm:flex-row sm:items-center gap-5 pb-10 mb-12 border-b" style={{ borderColor: 'var(--card-border)' }}>
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <Image src="/images/SaftyZoneprovider/SaftyZone.png" alt="SafetyZone" width={56} height={56} className="object-contain p-1.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="eyebrow" style={{ color: 'var(--accent-primary)' }}>Case study</span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={11} /> ~9 months
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                SafetyZone — safety &amp; emergency platform
              </h3>
              <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                A multi-platform product suite — web, consumer app, and provider app — delivering real-time safety
                reporting, emergency services, and dispatch coordination. Three deliverables, one connected experience.
              </p>
            </div>
            <a
              href="https://safetyzoone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white text-sm font-semibold rounded-full shrink-0 self-start sm:self-center"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <ExternalLink size={14} /> Visit
            </a>
          </div>

          {/* Stacking deliverable cards */}
          <div className="space-y-8 lg:space-y-[12vh]">
            {deliverables.map((project, index) => (
              <div
                key={project.id}
                data-fl-card
                className="lg:sticky"
                style={{ top: `calc(6.5rem + ${index * 1.75}rem)` }}
              >
                <article
                  data-fl-inner
                  className="card overflow-hidden grid grid-cols-1 md:grid-cols-2 origin-top will-change-transform"
                  style={{ boxShadow: '0 -20px 60px -30px rgba(0,0,0,0.5)' }}
                >
                  <div className="relative h-64 md:h-auto md:min-h-[440px] overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                    <Image
                      data-fl-img
                      src={project.images[1] || project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 dark-overlay" />
                    <span className="absolute bottom-4 left-5 font-display font-bold text-white/90 leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-6 sm:p-10 flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                      <span className="px-3 py-1 text-[11px] font-bold rounded-full text-white" style={{ background: 'var(--accent-gradient)' }}>
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1 px-3 py-1 text-[11px] font-medium rounded-full" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)' }}>
                        <Clock size={10} /> {project.duration}
                      </span>
                    </div>
                    <p className="eyebrow mb-2">{project.client}</p>
                    <h3 className="heading-display text-3xl sm:text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs rounded-md font-medium" style={{ background: ACCENT_CHIP, color: 'var(--accent-primary)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      {project.images.length > 1 && (
                        <button
                          onClick={() => openModal(project)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full transition-colors touch-target"
                          style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
                        >
                          <Eye size={14} /> Screenshots
                        </button>
                      )}
                      {project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-full text-white touch-target"
                          style={{ background: 'var(--accent-gradient)' }}
                        >
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div data-fl-cta className="text-center mt-20">
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Have a project in mind? Let&apos;s work together!</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-semibold transition-transform hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Let&apos;s Talk <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel modal (reuses AnimatedModal for overlay / Escape / body-lock) */}
      <AnimatedModal isOpen={isModalOpen} onClose={closeModal} className="max-w-5xl">
        {selectedProject && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div className="relative h-[50vh] sm:h-[65vh]" style={{ background: 'var(--bg-tertiary)' }}>
              <Image src={selectedProject.images[currentImageIndex] || selectedProject.image} alt={selectedProject.title} fill className="object-contain" priority sizes="100vw" />
              {selectedProject.images.length > 1 && (
                <>
                  <button onClick={goToPrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Previous image"><ChevronLeft size={22} /></button>
                  <button onClick={goToNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 glass rounded-full touch-target z-10" style={{ color: 'var(--text-primary)' }} aria-label="Next image"><ChevronRight size={22} /></button>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full z-10">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto pb-1 z-10 no-scrollbar">
                    {selectedProject.images.map((image, i) => (
                      <button key={i} onClick={() => setCurrentImageIndex(i)} className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden touch-target" style={{ border: i === currentImageIndex ? '2px solid var(--accent-primary)' : '2px solid rgba(255,255,255,0.25)' }} aria-label={`View image ${i + 1}`} aria-current={i === currentImageIndex ? 'true' : undefined}>
                        <Image src={image} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="p-5 text-center">
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedProject.client} &bull; {selectedProject.duration}</p>
            </div>
          </div>
        )}
      </AnimatedModal>
    </section>
  )
}
